import api from './axios';

export interface PredictRequest {
  state: string;
  commodity: string;
  month: number;
  year: number;
  district?: string;
  market?: string;
  variety?: string;
}

export interface PredictResponse {
  predictedPrice: number;
  confidence: number;
  state: string;
  commodity: string;
}

export interface PredictionHistoryItem {
  id: string;
  userId: string;
  state: string;
  commodity: string;
  predictedPrice: number;
  confidence: number;
  createdAt: string;
}

export const predictApi = async (data: PredictRequest): Promise<PredictResponse> => {
  const response = await api.post('/api/predictions/predict', data);
  return response.data.data;
};

export const getPredictionHistoryApi = async (): Promise<PredictionHistoryItem[]> => {
  const response = await api.get('/api/predictions/history');
  return response.data.data;
};
