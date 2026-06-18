import axios from 'axios';
import type { PredictionResponse } from '../types/prediction';

export interface PredictionPayload {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  forecastPeriod: 7 | 15 | 30;
}

export const API_BASE_URL = 'http://localhost:8000';

export const getStates = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${API_BASE_URL}/states`);
  return response.data;
};

export const getDistricts = async (state: string): Promise<string[]> => {
  const response = await axios.get<string[]>(`${API_BASE_URL}/districts/${state}`);
  return response.data;
};

export const getMarkets = async (_state: string, district: string): Promise<string[]> => {
  const response = await axios.get<string[]>(`${API_BASE_URL}/markets/${district}`);
  return response.data;
};

export const getCommodities = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${API_BASE_URL}/commodities`);
  return response.data;
};

export const predictPrice = async (payload: PredictionPayload): Promise<PredictionResponse> => {
  // Map frontend forecastPeriod to backend forecast_days
  const response = await axios.post<PredictionResponse>(`${API_BASE_URL}/predict`, {
    state: payload.state,
    district: payload.district,
    market: payload.market,
    commodity: payload.commodity,
    variety: payload.variety,
    forecast_days: payload.forecastPeriod
  });
  return response.data;
};
