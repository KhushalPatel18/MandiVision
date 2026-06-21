import React from 'react';
import { Sparkles, Truck, Users, Calendar } from 'lucide-react';
import Card from '../ui/Card';

interface ExplanationFactor {
  title: string;
  impact: 'high' | 'medium' | 'low';
  direction: 'positive' | 'negative';
  description: string;
  icon: React.ReactNode;
}

const ModelExplanation: React.FC = () => {
  const factors: ExplanationFactor[] = [
    {
      title: 'Arrival Volumes Decline',
      impact: 'high',
      direction: 'positive',
      description: 'Mandi arrival registers show a 14.2% drop in harvest shipments over the past fortnight, severely squeezing instant supply reserves.',
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: 'Peak Seasonal Demand',
      impact: 'high',
      direction: 'positive',
      description: 'Historical retail demand curves for this commodity spike during current mid-season months, pushing processing mills to hoard inventories.',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'LSTM Pattern Match',
      impact: 'medium',
      direction: 'positive',
      description: 'Neural networks matched the current price curve to the Q3 2022 market rally cycles with an 89.6% temporal match profile.',
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: 'Regional Supply Tightening',
      impact: 'medium',
      direction: 'positive',
      description: 'Neighboring trade corridors in adjoining states reported rain delay disruptions, preventing inter-state spot rate dilution.',
      icon: <Calendar className="h-5 w-5" />,
    },
  ];

  const impactStyles = {
    high: 'text-rose-600 bg-rose-50 border-rose-100',
    medium: 'text-amber-600 bg-amber-50 border-amber-100',
    low: 'text-blue-600 bg-blue-50 border-blue-100',
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-150/60 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] w-full">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary-green" />
        <h2 className="text-xl font-extrabold text-text-dark">AI Model Attribution Log</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {factors.map((factor) => (
          <Card 
            key={factor.title} 
            className="p-5 border border-gray-100/90 bg-gray-50/30 hover:border-green-100 transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-green-50 border border-green-100 text-primary-green flex items-center justify-center">
                  {factor.icon}
                </div>
                <h4 className="font-bold text-text-dark text-sm sm:text-base">{factor.title}</h4>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-lg ${impactStyles[factor.impact]}`}>
                {factor.impact} Impact
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              {factor.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModelExplanation;
