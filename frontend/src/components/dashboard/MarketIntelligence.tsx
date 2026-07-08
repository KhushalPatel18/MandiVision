import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from 'lucide-react';

interface IntelligenceMetricProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

const metrics: IntelligenceMetricProps[] = [
  {
    label: 'Current Market Spot',
    value: '₹7,200/Qtl',
    change: '+1.2%',
    trend: 'up',
    description: 'Latest daily transactional average spot rate',
  },
  {
    label: 'Running 30-Day Average',
    value: '₹6,950/Qtl',
    change: '+3.4%',
    trend: 'up',
    description: 'Stabilized rolling price index average',
  },
  {
    label: 'Weekly Price Volatility',
    value: '₹450 Delta',
    change: '+6.25%',
    trend: 'up',
    description: 'Aggregated pricing band spread over 7 days',
  },
  {
    label: 'Monthly Price Shift',
    value: '₹1,240 Delta',
    change: '-2.1%',
    trend: 'down',
    description: 'Total structural price variation over 30 days',
  },
];

const MarketIntelligence: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-150/60 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] w-full">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary-green" />
        <h2 className="text-xl font-extrabold text-text-dark">Market Intelligence Indicators</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric) => {
          const isUp = metric.trend === 'up';
          const isDown = metric.trend === 'down';

          return (
            <div 
              key={metric.label}
              className="p-5 rounded-2xl bg-gray-50/20 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="text-xl font-black text-text-dark mt-1 block">
                  {metric.value}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100/60 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 leading-tight">
                  {metric.description}
                </span>
                {isUp && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center shrink-0">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {metric.change}
                  </span>
                )}
                {isDown && (
                  <span className="text-xs font-bold text-red-500 flex items-center shrink-0">
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    {metric.change}
                  </span>
                )}
                {metric.trend === 'stable' && (
                  <span className="text-xs font-bold text-gray-400 flex items-center shrink-0">
                    <Minus className="h-3.5 w-3.5" />
                    Stable
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketIntelligence;
