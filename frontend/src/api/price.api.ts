import api from './axios';

export interface PriceHistoryItem {
  id: string;
  date: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  commodity: string;
  market: string;
  district: string;
  state: string;
}

export interface GetPriceHistoryParams {
  state?: string;
  district?: string;
  market?: string;
  commodity?: string;
}

export const getPriceHistoryApi = async (params: GetPriceHistoryParams): Promise<PriceHistoryItem[]> => {
  const response = await api.get('/api/prices/history', { params });
  return response.data.data;
};
