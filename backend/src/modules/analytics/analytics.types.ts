export interface AnalyticsSummary {
  totalCrops: number;
  totalMarkets: number;
  totalPriceRecords: number;
  totalPredictions: number;
}

export interface PriceTrend {
  date: string;
  avgPrice: number;
}
