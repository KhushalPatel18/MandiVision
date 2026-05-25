import type { FeatureItem, StatItem, StepItem, SupportedState, CommodityData } from '../types';

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'ai-prediction',
    title: 'AI Price Prediction',
    description: 'Advanced machine learning models analyze historical patterns and seasonality to predict future mandi prices with high precision.',
    iconName: 'TrendingUp',
    colorClass: 'text-primary-green bg-green-50 border-green-100',
  },
  {
    id: 'historical-trends',
    title: 'Historical Market Trends',
    description: 'Explore years of historical price and arrival volume charts to understand cyclical market behaviors and long-term crop economics.',
    iconName: 'BarChart2',
    colorClass: 'text-accent-brown bg-amber-50 border-amber-100',
  },
  {
    id: 'state-analytics',
    title: 'State-wise Analytics',
    description: 'Deep-dive regional price analysis across major producing states. Compare local APMC market prices side-by-side easily.',
    iconName: 'Globe',
    colorClass: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    id: 'realtime-insights',
    title: 'Real-time Market Insights',
    description: 'Receive instantaneous arrivals data and spot pricing from daily APMC updates across dozens of trading nodes.',
    iconName: 'Zap',
    colorClass: 'text-amber-500 bg-yellow-50 border-yellow-100',
  },
  {
    id: 'future-forecasting',
    title: 'Future Price Forecasting',
    description: 'Get structured multi-week and monthly price forecasts to plan your harvest timing and crop storage strategically.',
    iconName: 'Calendar',
    colorClass: 'text-purple-600 bg-purple-50 border-purple-100',
  },
  {
    id: 'farmer-dashboard',
    title: 'Farmer-friendly Dashboard',
    description: 'A simple, highly visual, localized interface designed specifically for farmers to check rates instantly on any device.',
    iconName: 'Layout',
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
];

export const STATS_DATA: StatItem[] = [
  {
    value: '500+',
    label: 'Supported Markets',
    description: 'APMC mandis integrated across states',
    iconName: 'MapPin',
  },
  {
    value: '30+',
    label: 'Commodities Covered',
    description: 'Cereal, pulses, oilseeds & vegetables',
    iconName: 'Sprout',
  },
  {
    value: '94.2%',
    label: 'Prediction Accuracy',
    description: 'Validated by backtesting model results',
    iconName: 'CheckCircle',
  },
  {
    value: '15,000+',
    label: 'Daily Forecasts',
    description: 'Data points updated dynamically',
    iconName: 'Cpu',
  },
];

export const STEPS_DATA: StepItem[] = [
  {
    number: '01',
    title: 'Select Commodity',
    description: 'Choose your harvested crop, location state, and local APMC mandi market from a straightforward, searchable menu.',
    iconName: 'Search',
  },
  {
    number: '02',
    title: 'Analyze Market Data',
    description: 'Our proprietary ML engines process arrival volume, weather parameters, historical cycles, and neighboring market dynamics.',
    iconName: 'Activity',
  },
  {
    number: '03',
    title: 'Get AI Prediction',
    description: 'Receive localized pricing forecasts, trend analysis, storage recommendations, and the optimal time to sell your harvest.',
    iconName: 'CheckSquare',
  },
];

export const STATES_DATA: SupportedState[] = [
  {
    name: 'Gujarat',
    code: 'GJ',
    description: 'Leading producer of cotton, groundnut, and cumin seeds. Major trading hubs in Rajkot, Gondal, and Unjha.',
    commodities: ['Cotton (Kapas)', 'Groundnut', 'Wheat (Gehun)', 'Cumin (Jeera)', 'Castor Seed', 'Potato'],
    mandiCount: 220,
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    description: 'Leading producer of wheat, sugarcane, and potatoes. Major trading corridors in Western UP, Central Plains, and Purvanchal (e.g., Auraiya, Hapur, Muzaffarnagar).',
    commodities: ['Wheat (Gehun)', 'Potato (Aloo)', 'Mustard (Sarson)', 'Sugarcane', 'Rice (Paddy)', 'Gram (Chana)'],
    mandiCount: 380,
  },
];

export const COMMODITIES_DATA: CommodityData[] = [
  {
    name: 'Cotton (Kapas)',
    category: 'Fibre',
    currentPrice: 7200,
    predictedPrice: 7650,
    accuracy: 94.8,
    trend: 'up',
    change: 6.25,
  },
  {
    name: 'Onion (Pyaz)',
    category: 'Vegetable',
    currentPrice: 1850,
    predictedPrice: 1600,
    accuracy: 92.5,
    trend: 'down',
    change: -13.51,
  },
  {
    name: 'Soybean',
    category: 'Oilseed',
    currentPrice: 4600,
    predictedPrice: 4680,
    accuracy: 93.9,
    trend: 'stable',
    change: 1.74,
  },
  {
    name: 'Groundnut',
    category: 'Oilseed',
    currentPrice: 6800,
    predictedPrice: 7150,
    accuracy: 95.1,
    trend: 'up',
    change: 5.15,
  },
  {
    name: 'Wheat (Gehun)',
    category: 'Cereal',
    currentPrice: 2450,
    predictedPrice: 2520,
    accuracy: 96.2,
    trend: 'up',
    change: 2.86,
  },
  {
    name: 'Potato (Aloo)',
    category: 'Vegetable',
    currentPrice: 1450,
    predictedPrice: 1720,
    accuracy: 94.5,
    trend: 'up',
    change: 18.62,
  },
];
