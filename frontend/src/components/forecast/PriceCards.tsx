import React from 'react';
import Card from '../ui/Card';
import { IndianRupee, ArrowUpRight, ArrowDownRight, Award, TrendingUp } from 'lucide-react';

interface PriceCardsProps {
  currentPrice: number;
  forecastPrice: number;
  growth: number;
  confidence: number;
}

const PriceCards: React.FC<PriceCardsProps> = ({
  currentPrice,
  forecastPrice,
  growth,
  confidence,
}) => {
  const isGrowthPositive = growth >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Current Price */}
      <Card hoverable className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">Current Avg Rate</span>
          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-text-dark">
            <IndianRupee className="h-5 w-5" />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-dark">
          ₹{currentPrice.toLocaleString('en-IN')}
          <span className="text-xs font-semibold text-muted font-normal ml-0.5">/Qtl</span>
        </span>
        <p className="text-[11px] text-muted mt-2">Real-time daily spot index price</p>
      </Card>

      {/* Forecast Price */}
      <Card hoverable className="relative overflow-hidden bg-gradient-to-br from-white to-green-50/10 border-primary/10">
        <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-xl uppercase tracking-wider">
          AI Target
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">Forecasted Price</span>
          <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-primary">
          ₹{forecastPrice.toLocaleString('en-IN')}
          <span className="text-xs font-semibold text-muted font-normal ml-0.5">/Qtl</span>
        </span>
        <p className="text-[11px] text-muted mt-2">Target price at forecast boundary</p>
      </Card>

      {/* Growth Rate */}
      <Card hoverable className="bg-gradient-to-br from-white to-gray-50/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">Projected Change</span>
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${isGrowthPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
            {isGrowthPositive ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
          </div>
        </div>
        <span className={`text-3xl font-extrabold ${isGrowthPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {isGrowthPositive ? '+' : ''}{growth}%
        </span>
        <p className="text-[11px] text-muted mt-2">Relative rate shift expected</p>
      </Card>

      {/* Confidence */}
      <Card hoverable className="bg-gradient-to-br from-white to-gray-50/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">Model Accuracy</span>
          <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Award className="h-5 w-5" />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-dark">
          {confidence}%
        </span>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
          <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${confidence}%` }} />
        </div>
      </Card>
    </div>
  );
};

export default PriceCards;
