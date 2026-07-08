import api from './axios';

export interface MarketHistoryItem {
  date: string;
  price: number;
}

export interface MarketOverviewResponse {
  currentPrice: number;
  predictedPrice: number;
  difference: number;
  changePercentage: number;
  arrivalDate: string;
  minPrice: number;
  maxPrice: number;
  confidence?: number;
  targetDate: string;
  targetDateStr: string;
  history: MarketHistoryItem[];
}

export interface GetMarketOverviewParams {
  state: string;
  district?: string;
  market?: string;
  commodity: string;
  variety?: string;
  horizon?: number;
}

export const getMarketOverviewApi = async (params: GetMarketOverviewParams): Promise<MarketOverviewResponse> => {
  const response = await api.get('/api/dashboard/market-overview', { params });
  return response.data.data;
};
