import datetime
from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from app.database.database import Base

class MarketPrice(Base):
    __tablename__ = "market_prices"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(String, index=True, nullable=False)
    district = Column(String, index=True, nullable=False)
    market = Column(String, index=True, nullable=False)
    commodity = Column(String, index=True, nullable=False)
    variety = Column(String, index=True, nullable=False)
    arrival_date = Column(Date, index=True, nullable=False)
    
    min_price = Column(Float, nullable=False)
    max_price = Column(Float, nullable=False)
    modal_price = Column(Float, nullable=False)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
