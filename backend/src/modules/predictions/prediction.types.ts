export interface PredictionResponse {
  id: string;
  predictedPrice: number;
  confidence: number;
  commodityId: string;
  createdAt: Date;
}

export interface CreatePredictionInput {
  commodityId: string;
  marketId: string;
  targetDate: string;
}
