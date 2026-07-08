export interface PredictRequest {
  state: string;
  commodity: string;
  month: number;
  year: number;
  district?: string;
  market?: string;
  variety?: string;
}

export interface PredictionResult {
  predictedPrice: number;
  confidence: number;
  state: string;
  commodity: string;
}
