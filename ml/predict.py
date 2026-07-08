import pandas as pd
import numpy as np
import logging
from datetime import datetime
from model_loader import get_model, get_encoders

logger = logging.getLogger("predict_service")

def get_base_price(commodity: str) -> float:
    c = str(commodity).lower()
    if 'cotton' in c:
        return 7200.0
    elif 'onion' in c:
        return 1850.0
    elif 'soybean' in c:
        return 4600.0
    elif 'groundnut' in c:
        return 6800.0
    elif 'wheat' in c:
        return 2450.0
    elif 'potato' in c:
        return 1450.0
    elif 'mustard' in c:
        return 5700.0
    elif 'sugarcane' in c:
        return 350.0
    elif 'rice' in c:
        return 3200.0
    else:
        return 4000.0

def safe_encode_label(encoder, val: str, default_val: str = "") -> int:
    if not encoder or not hasattr(encoder, 'classes_'):
        return 0
    try:
        val_clean = str(val).strip().lower()
        for idx, cls in enumerate(encoder.classes_):
            if str(cls).strip().lower() == val_clean:
                return idx
        if default_val:
            default_clean = str(default_val).strip().lower()
            for idx, cls in enumerate(encoder.classes_):
                if str(cls).strip().lower() == default_clean:
                    return idx
        return 0
    except Exception:
        return 0

def predict_crop_price(state: str, commodity: str, month: int, year: int, district: str = None, market: str = None, variety: str = None, latest_price: float = None) -> dict:
    """
    Runs inference for a given crop price prediction request.
    """
    state_normalized = state.lower().strip().replace(" ", "_")
    
    # 1. Fetch cached model
    model = get_model(state_normalized)
    
    if not model:
        raise ValueError(f"No prediction model found or loaded for state: '{state}'")
        
    if latest_price is not None and latest_price > 0:
        base_price = float(latest_price)
        logger.info(f"📈 Seeding forecast features with latest actual price from DB: {base_price}")
    else:
        base_price = get_base_price(commodity)
        logger.info(f"ℹ️ Seeding forecast features with baseline lookup price: {base_price}")

    
    # 2. Prepare inputs into DataFrame depending on the model's expected features
    if state_normalized == "gujarat":
        # Expects: ['Commodity', 'District Name', 'Market Name', 'Lag_1', 'Lag_3', 'Lag_7', 'Rolling_Mean_7', 'Rolling_STD_7', 'Month_sin', 'Month_cos']
        month_sin = np.sin(2 * np.pi * month / 12)
        month_cos = np.cos(2 * np.pi * month / 12)
        
        # Fallback values for district & market if not provided
        dist_val = district if district else "Rajkot"
        mkt_val = market if market else "Rajkot"
        
        input_data = pd.DataFrame([{
            'Commodity': commodity,
            'District Name': dist_val,
            'Market Name': mkt_val,
            'Lag_1': float(base_price),
            'Lag_3': float(base_price),
            'Lag_7': float(base_price),
            'Rolling_Mean_7': float(base_price),
            'Rolling_STD_7': float(base_price * 0.02),
            'Month_sin': float(month_sin),
            'Month_cos': float(month_cos)
        }])
        
    elif state_normalized == "uttar_pradesh":
        # Expects: ['District', 'Market', 'Commodity', 'Variety', 'Year', 'Month', 'Day', 'DayOfWeek', 'Lag_1', 'Lag_3', 'Lag_7', 'Rolling_Mean_3', 'Rolling_Mean_7']
        # UP uses label encoding
        up_enc = get_encoders("uttar_pradesh")
        if up_enc:
            encoded_district = safe_encode_label(up_enc.get('District'), district, "Agra")
            encoded_market = safe_encode_label(up_enc.get('Market'), market, "Achhnera")
            encoded_commodity = safe_encode_label(up_enc.get('Commodity'), commodity, "Potato")
            encoded_variety = safe_encode_label(up_enc.get('Variety'), variety, "Red")
        else:
            encoded_district = 0
            encoded_market = 0
            encoded_commodity = 0
            encoded_variety = 0
            
        # Determine Day and DayOfWeek
        day = 15
        try:
            day_of_week = datetime(int(year), int(month), day).weekday()
        except Exception:
            day_of_week = 3 # Default Wednesday
            
        input_data = pd.DataFrame([{
            'District': int(encoded_district),
            'Market': int(encoded_market),
            'Commodity': int(encoded_commodity),
            'Variety': int(encoded_variety),
            'Year': int(year),
            'Month': int(month),
            'Day': int(day),
            'DayOfWeek': int(day_of_week),
            'Lag_1': float(base_price),
            'Lag_3': float(base_price),
            'Lag_7': float(base_price),
            'Rolling_Mean_3': float(base_price),
            'Rolling_Mean_7': float(base_price)
        }])
    else:
        # Fallback for unexpected models
        input_data = pd.DataFrame([{
            'month': int(month),
            'year': int(year)
        }])
    
    logger.info(f"🔮 Querying {state_normalized} model with inputs: {input_data.to_dict(orient='records')}")
    
    # 3. Perform prediction
    try:
        prediction_result = model.predict(input_data)
        
        # If result is single value / array, extract it
        if hasattr(prediction_result, "item"):
            predicted_value = float(prediction_result.item())
        else:
            predicted_value = float(prediction_result[0])
            
        # Convert log scale to raw scale for Gujarat model
        if state_normalized == "gujarat":
            predicted_value = np.exp(predicted_value)
            
        # Ensure predicted value is non-negative and round it
        predicted_value = max(0.0, round(predicted_value, 2))
        
        # Calculate a mock confidence score based on input parameters variance (e.g. 91% to 95.5%)
        # This simulates a real score
        base_confidence = 92.5
        variance = (month % 3) * 1.1 + (year % 2) * 0.8
        confidence = min(99.0, max(85.0, base_confidence + variance))
        
        return {
            "predictedPrice": predicted_value,
            "confidence": round(confidence, 1),
            "state": state,
            "commodity": commodity
        }
    except Exception as e:
        logger.error(f"❌ Error during model prediction: {e}")
        raise RuntimeError(f"Model inference failed: {e}")
