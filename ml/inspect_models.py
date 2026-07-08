import joblib
import os
import sys

# Try to import catboost
try:
    from catboost import CatBoostRegressor
except ImportError:
    CatBoostRegressor = None

print("Checking models...")

# Check UP Model
up_model_path = 'saved_models/uttar_pradesh/uttar_pradesh_crop_price_forecasting_model.pkl'
if os.path.exists(up_model_path):
    try:
        model = joblib.load(up_model_path)
        print(f"\n✅ Loaded UP Model: {type(model)}")
        if hasattr(model, 'feature_names_in_'):
            print("UP Model Expected Features:", list(model.feature_names_in_))
        elif hasattr(model, 'n_features_in_'):
            print("UP Model Number of Features:", model.n_features_in_)
    except Exception as e:
        print(f"❌ Error loading UP model: {e}")
else:
    print("❌ UP Model not found.")

# Check UP Encoders
up_encoders_path = 'saved_models/uttar_pradesh/uttar_pradesh_label_encoders.pkl'
if os.path.exists(up_encoders_path):
    try:
        encoders = joblib.load(up_encoders_path)
        print(f"✅ Loaded UP Encoders: {type(encoders)}")
        if isinstance(encoders, dict):
            print("UP Encoders keys:", list(encoders.keys()))
            for k, v in encoders.items():
                if hasattr(v, 'classes_'):
                    print(f"  - Encoder '{k}': {list(v.classes_)[:5]}... (total {len(v.classes_)})")
        else:
            print("UP Encoders details:", encoders)
    except Exception as e:
        print(f"❌ Error loading UP encoders: {e}")

# Check Gujarat Model
guj_model_path = 'saved_models/Gujarat/gujarat_crop_price_model.cbm'
if os.path.exists(guj_model_path):
    if CatBoostRegressor:
        try:
            model = CatBoostRegressor()
            model.load_model(guj_model_path)
            print(f"\n✅ Loaded Gujarat CatBoost Model")
            if hasattr(model, 'feature_names_'):
                print("Gujarat Model Expected Features:", model.feature_names_)
        except Exception as e:
            print(f"❌ Error loading Gujarat model: {e}")
    else:
        print("\n⚠️ CatBoost is not installed. Cannot inspect Gujarat model.")
else:
    print("❌ Gujarat Model not found.")
