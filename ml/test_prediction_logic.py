import os
import pandas as pd
import numpy as np
from catboost import CatBoostRegressor

# Load model
model_path = r"d:\MandiVision\ml\saved_models\Gujarat\gujarat_crop_price_model.cbm"
model = CatBoostRegressor()
model.load_model(model_path)

# Prepare variables
month = 7
year = 2026
base_price = 7200.0  # Cotton
month_sin = np.sin(2 * np.pi * month / 12)
month_cos = np.cos(2 * np.pi * month / 12)

# Case 1: Raw inputs
df_raw = pd.DataFrame([{
    'Commodity': 'Cotton',
    'District Name': 'Rajkot',
    'Market Name': 'Rajkot',
    'Lag_1': float(base_price),
    'Lag_3': float(base_price),
    'Lag_7': float(base_price),
    'Rolling_Mean_7': float(base_price),
    'Rolling_STD_7': float(base_price * 0.02),
    'Month_sin': float(month_sin),
    'Month_cos': float(month_cos)
}])

# Case 2: Log-transformed inputs
log_base = np.log(base_price)
df_log = pd.DataFrame([{
    'Commodity': 'Cotton',
    'District Name': 'Rajkot',
    'Market Name': 'Rajkot',
    'Lag_1': float(log_base),
    'Lag_3': float(log_base),
    'Lag_7': float(log_base),
    'Rolling_Mean_7': float(log_base),
    'Rolling_STD_7': float(0.02),  # small std on log scale
    'Month_sin': float(month_sin),
    'Month_cos': float(month_cos)
}])

# Case 3: Log-transformed target only (inputs raw)
# Case 4: Inputs raw, model output is exp(pred)

pred_raw = model.predict(df_raw)[0]
pred_log = model.predict(df_log)[0]

results = f"""
=== Prediction Test Results ===

1. Raw Inputs:
   - Inputs: Lag = {base_price}
   - Model Output: {pred_raw}
   - exp(Model Output): {np.exp(pred_raw)}
   - expm1(Model Output): {np.expm1(pred_raw)}

2. Log-transformed Inputs:
   - Inputs: Lag = {log_base}
   - Model Output: {pred_log}
   - exp(Model Output): {np.exp(pred_log)}
   - expm1(Model Output): {np.expm1(pred_log)}
"""

with open("test_prediction_results.txt", "w") as f:
    f.write(results)

print("Done! Results written to test_prediction_results.txt")
