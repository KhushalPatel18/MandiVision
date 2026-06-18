from pydantic import BaseModel
from typing import List

class PredictionRequest(BaseModel):
    state: str
    district: str
    market: str
    commodity: str
    variety: str
    forecast_days: int = 30

class PricePoint(BaseModel):
    date: str
    price: float

class Insights(BaseModel):
    trend: str
    volatility: str
    recommendation: str

class PredictionResponse(BaseModel):
    commodity: str
    market: str
    currentPrice: float
    forecastPrice: float
    growth: float
    confidence: float
    historicalPrices: List[PricePoint]
    forecastPrices: List[PricePoint]
    insights: Insights
