import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface RiskMetric {
  title: string;
  level: 'Low' | 'Medium' | 'High';
  description: string;
  score: number; // out of 100
}

const riskMetrics: RiskMetric[] = [
  {
    title: 'Market Price Volatility',
    level: 'Medium',
    description: 'Fluctuations remain within standard bounds. Transport networks are stable, but fuel pricing changes may introduce moderate friction.',
    score: 42,
  },
  {
    title: 'Demand Volatility Risk',
    level: 'Low',
    description: 'Processing unit orders and grain requirements are highly consistent. Mill operational reserves indicate a sustained procurement trend.',
    score: 18,
  },
  {
    title: 'Supply Chain Disruptions',
    level: 'High',
    description: 'Monsoon delays in neighboring districts are causing warehouse dispatch delays, leading to short-term local mandi supply gaps.',
    score: 76,
  },
  {
    title: 'Price Corridor Stability',
    level: 'Medium',
    description: 'APMC spot limits prevent rapid panic trading, but secondary traders are bidding slightly wider margins to lock down allocations.',
    score: 55,
  },
];

const RiskAssessment: React.FC = () => {
  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-100';
      case 'High':
        return 'text-rose-700 bg-rose-50 border-rose-100';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-100';
    }
  };

  const getProgressColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-emerald-500';
      case 'Medium':
        return 'bg-amber-500';
      case 'High':
        return 'bg-rose-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-150/60 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] w-full">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-5">
        <ShieldAlert className="h-5 w-5 text-rose-600 animate-pulse" />
        <div>
          <h2 className="text-xl font-extrabold text-text-dark">Agri-Market Risk Assessment</h2>
          <p className="text-xs text-gray-400 mt-0.5">Automated index scoring identifying potential price volatility threats.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {riskMetrics.map((risk) => (
          <div 
            key={risk.title}
            className="p-5 rounded-2xl bg-gray-50/20 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="font-extrabold text-text-dark text-sm sm:text-base">{risk.title}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-lg ${getBadgeColor(risk.level)}`}>
                  {risk.level} Risk
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                {risk.description}
              </p>
            </div>

            {/* Score progress slider */}
            <div className="mt-6 pt-4 border-t border-gray-100/50">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase mb-2">
                <span>Threat Ratio Index</span>
                <span>{risk.score}/100</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getProgressColor(risk.level)}`}
                  style={{ width: `${risk.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskAssessment;
