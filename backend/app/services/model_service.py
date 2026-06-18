import os
import joblib
import pickle
import logging

logger = logging.getLogger(__name__)

# Cache model and encoders in module globals
encoders = None
up_model = None
catboost_available = False
gujarat_model = None

# Detect CatBoost support
try:
    from catboost import CatBoostRegressor
    catboost_available = True
except ImportError:
    catboost_available = False

def load_models():
    global encoders, up_model, gujarat_model
    
    # Absolute paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    encoders_path = os.path.join(base_dir, "models", "encoders.pkl")
    up_model_path = os.path.join(base_dir, "models", "price_model.pkl")
    gujarat_model_path = os.path.join(base_dir, "models", "gujarat_crop_price_model.cbm")
    
    # Encoders
    try:
        if os.path.exists(encoders_path):
            with open(encoders_path, "rb") as f:
                encoders = pickle.load(f)
            logger.info("Label encoders loaded successfully.")
        else:
            logger.warning(f"Label encoders not found at {encoders_path}")
    except Exception as e:
        logger.error(f"Error loading label encoders: {e}")

    # UP XGBoost Model
    try:
        if os.path.exists(up_model_path):
            up_model = joblib.load(up_model_path)
            logger.info("UP price prediction model loaded successfully.")
        else:
            logger.warning(f"UP model not found at {up_model_path}")
    except Exception as e:
        logger.error(f"Error loading UP model: {e}")

    # Gujarat CatBoost Model
    if catboost_available:
        try:
            if os.path.exists(gujarat_model_path):
                gujarat_model = CatBoostRegressor()
                gujarat_model.load_model(gujarat_model_path)
                logger.info("Gujarat CatBoost model loaded successfully.")
            else:
                logger.warning(f"Gujarat model not found at {gujarat_model_path}")
        except Exception as e:
            logger.error(f"Error loading Gujarat model: {e}")

def get_encoded_value(column: str, value: str) -> int:
    """
    Safely encode categorical variable value using scikit-learn LabelEncoder.
    Falls back to first category (0) if category is unknown or missing.
    """
    if encoders is None or column not in encoders:
        return 0
    
    le = encoders[column]
    try:
        # Exact match
        if value in le.classes_:
            return int(le.transform([value])[0])
        
        # Case insensitive mapping
        lower_classes = [c.lower() for c in le.classes_]
        if value.lower() in lower_classes:
            idx = lower_classes.index(value.lower())
            return int(le.transform([le.classes_[idx]])[0])
    except Exception as e:
        logger.debug(f"Encoder exception for {column}={value}: {e}")
        
    return 0
