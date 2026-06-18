import React from 'react';
import Card from '../ui/Card';
import { TrendingUp, AlertTriangle, Scale, Compass } from 'lucide-react';

const QuickInsights: React.FC = () => {
  const insights = [
    {
      title: 'Demand Rising',
      description: 'Arrival volumes across major potato and cotton corridors have decreased by 8% over the past fortnight, driving buyer competition.',
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Stable Market',
      description: 'Wheat prices remain tightly bound to national minimum support prices (MSP), keeping volatility indicators at historic lows.',
      icon: <Scale className="h-5 w-5 text-blue-500" />,
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      title: 'Moderate Volatility',
      description: 'Tomato and onion indices show moderate risk profiles due to localized unseasonal rainfall disruptions in Maharashtra.',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      bg: 'bg-amber-50 border-amber-100',
    },
  ];

  return (
    <Card hoverable className="h-full">
      <div className="flex items-center gap-2 mb-6">
        <Compass className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold text-text-dark">Quick Insights</h3>
      </div>

      <div className="space-y-4">
        {insights.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-4 rounded-2xl border ${item.bg} transition-all duration-200 hover:scale-[1.01]`}
          >
            <div className="p-2 rounded-xl bg-white shadow-sm shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-dark mb-0.5">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QuickInsights;
