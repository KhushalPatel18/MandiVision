import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowUpRight, ShieldAlert, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import Card from '../ui/Card';

interface InsightCard {
  title: string;
  confidence: number;
  impact: 'Critical' | 'Moderate' | 'Optimistic';
  recommendation: string;
  icon: React.ReactNode;
}

const insights: InsightCard[] = [
  {
    title: 'Demand Surge Projected',
    confidence: 91.5,
    impact: 'Optimistic',
    recommendation: 'Agri-processing demand is rising. Model advises holding stocks for another 12-14 days to lock in 4-6% higher price thresholds.',
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: 'Regional Supply Pressures',
    confidence: 88.0,
    impact: 'Critical',
    recommendation: 'Incoming truck shipments from neighbor APMC yards are delayed. Expect instant spot price spikes; liquidate surplus stock in segments.',
    icon: <ShieldAlert className="h-5 w-5" />,
  },
  {
    title: 'Harvest Influx Peak',
    confidence: 94.2,
    impact: 'Moderate',
    recommendation: 'Sub-district fields are entering peak harvest cycle next week. Expect arrival volume diluting spot rates. Sell ready stocks immediately.',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: 'Export Margins Opening',
    confidence: 85.4,
    impact: 'Optimistic',
    recommendation: 'Global port rates make international sales margins extremely favorable. Target trading houses routing to bulk export corridors.',
    icon: <ArrowUpRight className="h-5 w-5" />,
  },
  {
    title: 'Warehouse Viability Advisories',
    confidence: 90.0,
    impact: 'Moderate',
    recommendation: 'Warehouse storage costs are projected to break even if held past 20 days. Ensure crop moisture levels are below 12% before cell storage.',
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

const AIInsightsCenter: React.FC = () => {
  const impactStyles = {
    Critical: 'text-rose-600 bg-rose-50 border-rose-100',
    Moderate: 'text-amber-600 bg-amber-50 border-amber-100',
    Optimistic: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-150/60 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] w-full">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-5">
        <Lightbulb className="h-5 w-5 text-primary-green" />
        <div>
          <h2 className="text-xl font-extrabold text-text-dark">AI Predictive Insights Center</h2>
          <p className="text-xs text-gray-400 mt-0.5">Automated recommendations compiled using contextual sentiment feeds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="p-5 bg-gray-50/20 border border-gray-100 rounded-2xl flex flex-col justify-between h-64"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-green-50/80 border border-green-100 text-primary-green flex items-center justify-center shrink-0">
                  {insight.icon}
                </div>
                <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-lg ${impactStyles[insight.impact]}`}>
                  {insight.impact}
                </span>
              </div>
              <h3 className="font-bold text-text-dark text-sm leading-snug">{insight.title}</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                {insight.recommendation}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100/50 flex items-center justify-between">
              <span className="text-[9px] text-gray-500 font-bold uppercase">Confidence</span>
              <span className="text-xs font-black text-primary-green">{insight.confidence}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightsCenter;
