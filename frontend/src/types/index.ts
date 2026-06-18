export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  colorClass: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SupportedState {
  name: string;
  code: string;
  description: string;
  commodities: string[];
  mandiCount: number;
  districts?: DistrictOption[];
}

export interface DistrictOption {
  name: string;
  markets: string[];
}

export interface StateLocationOption {
  state: SupportedStateName;
  districts: DistrictOption[];
}

export type SupportedStateName = 'Gujarat' | 'Uttar Pradesh';

export interface PredictionInputValues {
  state: SupportedStateName;
  commodity: string;
  district: string;
  market: string;
  variety: string;
  priceDate: string;
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
  lag1: number;
  lag3: number;
  lag7: number;
  rollingMean3: number;
  rollingMean7: number;
}

export interface CommodityData {
  name: string;
  category: string;
  currentPrice: number;
  predictedPrice: number;
  accuracy: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}
