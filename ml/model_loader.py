import os
import joblib
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("model_loader")

# Memory cache for loaded models and encoders
models = {}
encoders = {}

def load_models():
    """
    Loads pre-trained models for Gujarat (CatBoost) and Uttar Pradesh (Scikit-Learn/Pickle)
    once into memory on startup.
    """
    global models, encoders
    
    # 1. Load Gujarat CatBoost Model
    guj_model_path = os.getenv("GUJARAT_MODEL_PATH", "saved_models/Gujarat/gujarat_crop_price_model.cbm")
    if os.path.exists(guj_model_path):
        try:
            from catboost import CatBoostRegressor
            logger.info(f"🔄 Loading Gujarat CatBoost model: {guj_model_path}...")
            model = CatBoostRegressor()
            model.load_model(guj_model_path)
            models["gujarat"] = model
            logger.info("✅ Successfully cached Gujarat model.")
            

        except ImportError:
            logger.error("❌ 'catboost' library is not installed. Cannot load Gujarat model.")
        except Exception as e:
            logger.error(f"❌ Failed to load Gujarat CatBoost model: {e}")
    else:
        logger.error(f"❌ Gujarat model not found at path: {guj_model_path}")

    # 2. Load Uttar Pradesh Scikit-Learn Model
    up_model_path = os.getenv("UP_MODEL_PATH", "saved_models/uttar_pradesh/uttar_pradesh_crop_price_forecasting_model.pkl")
    if os.path.exists(up_model_path):
        try:
            logger.info(f"🔄 Loading Uttar Pradesh model: {up_model_path}...")
            models["uttar_pradesh"] = joblib.load(up_model_path)
            logger.info("✅ Successfully cached Uttar Pradesh model.")
        except Exception as e:
            logger.error(f"❌ Failed to load Uttar Pradesh model: {e}")
    else:
        logger.error(f"❌ Uttar Pradesh model not found at path: {up_model_path}")

    # 3. Load Uttar Pradesh Encoders
    up_encoders_path = os.getenv("UP_ENCODERS_PATH", "saved_models/uttar_pradesh/uttar_pradesh_label_encoders.pkl")
    if os.path.exists(up_encoders_path):
        try:
            logger.info(f"🔄 Loading Uttar Pradesh encoders: {up_encoders_path}...")
            encoders["uttar_pradesh"] = joblib.load(up_encoders_path)
            logger.info("✅ Successfully cached Uttar Pradesh label encoders.")
        except Exception as e:
            logger.error(f"❌ Failed to load Uttar Pradesh encoders: {e}")
    else:
        logger.error(f"❌ Uttar Pradesh encoders not found at path: {up_encoders_path}")

    # Inspect features and write to features.txt
    try:
        inspect_path = "features.txt"
        with open(inspect_path, "w", encoding="utf-8") as f:
            f.write("=== Model Inspection Output ===\n\n")
            
            # UP Model
            if "uttar_pradesh" in models:
                m = models["uttar_pradesh"]
                f.write(f"UP Model Type: {type(m)}\n")
                if hasattr(m, 'feature_names_in_'):
                    f.write(f"UP Features: {list(m.feature_names_in_)}\n")
                elif hasattr(m, 'n_features_in_'):
                    f.write(f"UP Features count: {m.n_features_in_}\n")
                    
            # UP Encoders
            if "uttar_pradesh" in encoders:
                encs = encoders["uttar_pradesh"]
                f.write(f"UP Encoders type: {type(encs)}\n")
                if isinstance(encs, dict):
                    f.write(f"UP Encoders keys: {list(encs.keys())}\n")
                    
            # Gujarat Model
            if "gujarat" in models:
                m = models["gujarat"]
                f.write(f"Gujarat Model Type: {type(m)}\n")
                if hasattr(m, 'feature_names_'):
                    f.write(f"Gujarat Features: {m.feature_names_}\n")
                # Also write parameters
                if hasattr(m, 'get_params'):
                    f.write(f"Gujarat Model Params: {m.get_params()}\n")
            
            logger.info(f"💾 Wrote model details to {inspect_path}")
    except Exception as ie:
        logger.error(f"❌ Failed to write features.txt: {ie}")

def get_model(state: str):
    """
    Retrieves a loaded model for a specific state.
    """
    state_key = state.lower().strip().replace(" ", "_")
    return models.get(state_key)

def get_encoders(state: str):
    """
    Retrieves loaded label encoders for a specific state.
    """
    state_key = state.lower().strip().replace(" ", "_")
    return encoders.get(state_key)
