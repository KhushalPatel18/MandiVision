from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.prediction_service import predict_crop_price

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict(
    payload: PredictionRequest,
    db: Session = Depends(get_db)
):
    return predict_crop_price(
        db=db,
        state=payload.state,
        district=payload.district,
        market=payload.market,
        commodity=payload.commodity,
        variety=payload.variety,
        forecast_days=payload.forecast_days
    )
