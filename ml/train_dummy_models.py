import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import joblib
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("train_dummy_models")

def train_and_save():
    logger.info("🏋️ Training mock models for Gujarat and Maharashtra...")
    
    # 1. Create a dummy dataset mapping (month, year) to crop prices
    # We repeat the pattern to have enough samples for scikit-learn fit
    X = pd.DataFrame({
        'month': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] * 10,
        'year': [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029] * 12
    })
    
    # Target prices for Gujarat: Cotton base (~7200) + month factors + year trends
    y_guj = 6500 + X['month'] * 110 + (X['year'] - 2020) * 160
    
    # Target prices for Maharashtra: Onion/Wheat base (~2500/4000)
    y_mah = 4500 + X['month'] * 85 + (X['year'] - 2020) * 120

    # Ensure models directory exists
    os.makedirs("models", exist_ok=True)

    # 2. Train and save Gujarat Model
    model_gujarat = LinearRegression()
    model_gujarat.fit(X, y_guj)
    gujarat_path = "models/gujarat_model.pkl"
    joblib.dump(model_gujarat, gujarat_path)
    logger.info(f"💾 Saved Gujarat model to '{gujarat_path}'")

    # 3. Train and save Maharashtra Model
    model_maharashtra = LinearRegression()
    model_maharashtra.fit(X, y_mah)
    maharashtra_path = "models/maharashtra_model.pkl"
    joblib.dump(model_maharashtra, maharashtra_path)
    logger.info(f"💾 Saved Maharashtra model to '{maharashtra_path}'")
    
    logger.info("✅ Mock models successfully generated.")

if __name__ == "__main__":
    train_and_save()
