export interface PredictionResponse {
  currentPrice: number;
  forecastPrice: number;
  growth: number;
  confidence: number;
  historicalPrices: {
    date: string;
    price: number;
  }[];
  forecastPrices: {
    date: string;
    price: number;
  }[];
  insights?: {
    trend: string;
    volatility: string;
    recommendation: string;
  };
}
