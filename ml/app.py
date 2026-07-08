import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import uvicorn
import logging

from model_loader import load_models, models
from predict import predict_crop_price

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("fastapi_app")

app = FastAPI(
    title="MandiVision ML Prediction Service",
    description="Python prediction service using FastAPI for crop price predictions",
    version="1.0.0"
)

# Startup event to cache models once
@app.on_event("startup")
def startup_event():
    logger.info("🚀 MandiVision ML Service starting up...")
    load_models()

# Input Validation Schema
class PredictionRequest(BaseModel):
    state: str = Field(..., example="Gujarat")
    commodity: str = Field(..., example="Cotton")
    month: int = Field(..., ge=1, le=12, example=6)
    year: int = Field(..., ge=2020, le=2050, example=2026)
    district: str = Field(None, example="Rajkot")
    market: str = Field(None, example="Rajkot APMC")
    variety: str = Field(None, example="FAQ")
    latestPrice: float = Field(None, example=7200.0)

class PredictionResponse(BaseModel):
    predictedPrice: float
    confidence: float
    state: str
    commodity: str

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    """
    Price forecast endpoint. Selects appropriate model based on state and returns predictions.
    """
    try:
        result = predict_crop_price(
            state=request.state,
            commodity=request.commodity,
            month=request.month,
            year=request.year,
            district=request.district,
            market=request.market,
            variety=request.variety,
            latest_price=request.latestPrice
        )

        return result
    except ValueError as ve:
        logger.error(f"⚠️ Validation or configuration error: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"❌ Internal inference error: {e}")
        raise HTTPException(status_code=500, detail=f"Inference engine failure: {str(e)}")

@app.get("/health")
def health():
    """
    Service health check endpoint.
    """
    loaded = list(models.keys())
    return {
        "status": "healthy",
        "loaded_models": loaded,
        "models_count": len(loaded)
    }

if __name__ == "__main__":
    # Get port from env or default to 8000
    port = int(os.getenv("PORT", 8000))
    logger.info(f"⚡ Starting server on port {port}...")
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=False)
