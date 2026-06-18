import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database.database import engine, Base
from app.services.model_service import load_models
from app.routes import prediction, states, markets, commodities

# Logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Auto-create tables on launch
try:
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables verified/created successfully.")
except Exception as e:
    logger.error(f"Error creating database tables: {e}")

app = FastAPI(title="MandiVision AI API", version="1.0.0")

# CORS Configuration
origins = [
    settings.FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Starting MandiVision backend, loading serializations...")
    load_models()

@app.get("/")
def read_root():
    return {"status": "operational", "service": "MandiVision AI Forecasting Server"}

# Register routers
app.include_router(states.router, tags=["Locations"])
app.include_router(markets.router, tags=["Locations"])
app.include_router(commodities.router, tags=["Commodities"])
app.include_router(prediction.router, tags=["Predictions"])
