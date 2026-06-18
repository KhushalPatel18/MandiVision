from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

DISTRICT_MARKETS = {
    "rajkot": ["Rajkot APMC", "Gondal APMC", "Jetpur Market Yard"],
    "banaskantha": ["Deesa APMC", "Palanpur APMC", "Tharad Market Yard"],
    "mehsana": ["Unjha APMC", "Visnagar Market Yard", "Mehsana APMC"],
    "sabarkantha": ["Himmatnagar APMC", "Idar Market Yard", "Talod APMC"],
    "auraiya": ["Auraiya Mandi", "Dibiyapur Market", "Achhalda Yard"],
    "hapur": ["Hapur Mandi", "Garhmukteshwar Yard", "Pilkhua Market"],
    "muzaffarnagar": ["Muzaffarnagar Mandi", "Khatauli Yard", "Shamli Market"],
    "kanpur dehat": ["Rura Mandi", "Akbarpur Market", "Pukhrayan Yard"]
}

@router.get("/markets/{district}", response_model=List[str])
async def get_markets(district: str):
    dist_lower = district.lower()
    if dist_lower not in DISTRICT_MARKETS:
        raise HTTPException(status_code=404, detail="District markets not found")
    return DISTRICT_MARKETS[dist_lower]
