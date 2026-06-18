from fastapi import APIRouter
from typing import List

router = APIRouter()

COMMODITIES_LIST = [
    "Potato",
    "Onion",
    "Tomato",
    "Wheat",
    "Rice",
    "Cotton"
]

@router.get("/commodities", response_model=List[str])
async def get_commodities():
    return COMMODITIES_LIST
