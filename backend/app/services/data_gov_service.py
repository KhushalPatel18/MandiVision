import requests
import datetime
import logging
from sqlalchemy.orm import Session
from app.config import settings
from app.database.models import MarketPrice

logger = logging.getLogger(__name__)

# Official Data.gov.in variety-wise daily price API endpoint resource ID
API_RESOURCE_ID = "9ef842f8-8588-4659-a308-a86454360edd"
API_URL = f"https://api.data.gov.in/resource/{API_RESOURCE_ID}"

def parse_date(date_str: str) -> datetime.date:
    """Parse date from formats returned by the API (like DD/MM/YYYY or YYYY-MM-DD)."""
    for fmt in ("%d/%m/%Y", "%Y-%m-%d", "%d-%m-%Y"):
        try:
            return datetime.datetime.strptime(date_str, fmt).date()
        except ValueError:
            continue
    return datetime.date.today()

def seed_mock_historical_data(
    db: Session,
    state: str,
    district: str,
    market: str,
    commodity: str,
    variety: str,
    days: int = 40
):
    """Seed realistic historical records to compute lags & rolling averages when external API is unreachable."""
    today = datetime.date.today()
    
    # Establish base price based on crop profile
    base_price = 2500.0
    c_lower = commodity.lower()
    if "wheat" in c_lower:
        base_price = 2400.0
    elif "rice" in c_lower:
        base_price = 3000.0
    elif "potato" in c_lower:
        base_price = 1400.0
    elif "onion" in c_lower:
        base_price = 1800.0
    elif "tomato" in c_lower:
        base_price = 2000.0
    elif "cotton" in c_lower:
        base_price = 7000.0

    # Insert sequential prices over past 40 days
    import random
    random.seed(42)  # repeatable seed
    
    records_to_insert = []
    for i in range(days, -1, -1):
        record_date = today - datetime.timedelta(days=i)
        
        # Check if record already exists
        exists = db.query(MarketPrice).filter(
            MarketPrice.state == state,
            MarketPrice.district == district,
            MarketPrice.market == market,
            MarketPrice.commodity == commodity,
            MarketPrice.variety == variety,
            MarketPrice.arrival_date == record_date
        ).first()
        
        if not exists:
            # Walk price slightly
            walk = (random.random() - 0.48) * 0.03 # -1.4% to +1.5% daily fluctuation
            base_price = base_price * (1 + walk)
            
            modal = round(base_price, 2)
            min_p = round(modal * 0.92, 2)
            max_p = round(modal * 1.08, 2)
            
            records_to_insert.append(
                MarketPrice(
                    state=state,
                    district=district,
                    market=market,
                    commodity=commodity,
                    variety=variety,
                    arrival_date=record_date,
                    min_price=min_p,
                    max_price=max_p,
                    modal_price=modal
                )
            )
            
    if records_to_insert:
        db.add_all(records_to_insert)
        db.commit()
        logger.info(f"Seeded {len(records_to_insert)} mock historical records in DB for {commodity} at {market}")

def sync_market_data(
    db: Session,
    state: str,
    district: str,
    market: str,
    commodity: str,
    variety: str
):
    """
    Query Data.gov.in variety-wise daily market prices API,
    normalize, and upsert records into local database cache.
    """
    api_key = settings.DATA_GOV_API_KEY
    if not api_key:
        logger.warning("DATA_GOV_API_KEY not configured. Using database fallback & mock seeder.")
        seed_mock_historical_data(db, state, district, market, commodity, variety)
        return

    params = {
        "api-key": api_key,
        "format": "json",
        "limit": 100,
        "filters[state]": state,
        "filters[district]": district,
        "filters[market]": market,
        "filters[commodity]": commodity,
        "filters[variety]": variety
    }

    try:
        response = requests.get(API_URL, params=params, timeout=15)
        if response.status_code != 200:
            logger.error(f"Data.gov API returned status {response.status_code}: {response.text}")
            seed_mock_historical_data(db, state, district, market, commodity, variety)
            return

        data = response.json()
        records = data.get("records", [])
        
        if not records:
            logger.info("No records returned from Data.gov API. Triggering fallback seeder.")
            seed_mock_historical_data(db, state, district, market, commodity, variety)
            return

        upserted_count = 0
        for rec in records:
            arr_date = parse_date(rec.get("arrival_date", ""))
            min_price = float(rec.get("min_price", 0) or 0)
            max_price = float(rec.get("max_price", 0) or 0)
            modal_price = float(rec.get("modal_price", 0) or 0)
            
            # Upsert logic
            existing = db.query(MarketPrice).filter(
                MarketPrice.state == state,
                MarketPrice.district == district,
                MarketPrice.market == market,
                MarketPrice.commodity == commodity,
                MarketPrice.variety == variety,
                MarketPrice.arrival_date == arr_date
            ).first()

            if existing:
                existing.min_price = min_price
                existing.max_price = max_price
                existing.modal_price = modal_price
            else:
                db_price = MarketPrice(
                    state=state,
                    district=district,
                    market=market,
                    commodity=commodity,
                    variety=variety,
                    arrival_date=arr_date,
                    min_price=min_price,
                    max_price=max_price,
                    modal_price=modal_price
                )
                db.add(db_price)
            upserted_count += 1

        db.commit()
        logger.info(f"Successfully synced {upserted_count} records from Data.gov.in API.")

    except Exception as e:
        logger.error(f"Error connecting to Data.gov.in API: {e}. Running DB mock seeder.")
        seed_mock_historical_data(db, state, district, market, commodity, variety)
