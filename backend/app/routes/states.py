from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

STATE_DISTRICTS = {
    "Gujarat": ["Rajkot", "Banaskantha", "Mehsana", "Sabarkantha"],
    "Uttar Pradesh": ["Auraiya", "Hapur", "Muzaffarnagar", "Kanpur Dehat"]
}

@router.get("/states", response_model=List[str])
async def get_states():
    return list(STATE_DISTRICTS.keys())

@router.get("/districts/{state}", response_model=List[str])
async def get_districts(state: str):
    for s in STATE_DISTRICTS:
        if s.lower() == state.lower():
            return STATE_DISTRICTS[s]
    raise HTTPException(status_code=404, detail="State not supported")
