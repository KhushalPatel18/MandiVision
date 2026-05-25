import React from 'react';

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
