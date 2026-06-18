import pandas as pd

def prepare_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Given a sorted dataframe of pricing data containing at least the columns:
    'arrival_date' (or 'Price_Date'), and 'modal_price' (or 'Modal_Price').
    Returns a dataframe containing engineered columns:
    - Year
    - Month
    - Day
    - DayOfWeek
    - Lag_1, Lag_3, Lag_7
    - Rolling_Mean_3, Rolling_Mean_7
    """
    df = df.copy()
    if 'arrival_date' in df.columns:
        df['Price_Date'] = pd.to_datetime(df['arrival_date'])
    elif 'Price_Date' in df.columns:
        df['Price_Date'] = pd.to_datetime(df['Price_Date'])
    else:
        raise ValueError("DataFrame must contain 'arrival_date' or 'Price_Date' column.")

    price_col = 'modal_price' if 'modal_price' in df.columns else 'Modal_Price'
    if price_col not in df.columns:
        raise ValueError(f"DataFrame must contain pricing column '{price_col}'.")

    # Sort chronologically
    df = df.sort_values(by='Price_Date').reset_index(drop=True)

    # Date components
    df['Year'] = df['Price_Date'].dt.year
    df['Month'] = df['Price_Date'].dt.month
    df['Day'] = df['Price_Date'].dt.day
    df['DayOfWeek'] = df['Price_Date'].dt.dayofweek

    # Shift / Lags
    df['Lag_1'] = df[price_col].shift(1)
    df['Lag_3'] = df[price_col].shift(3)
    df['Lag_7'] = df[price_col].shift(7)

    # Rolling window averages
    df['Rolling_Mean_3'] = df[price_col].rolling(window=3).mean()
    df['Rolling_Mean_7'] = df[price_col].rolling(window=7).mean()

    return df
