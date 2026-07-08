import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sprout, CheckCircle, Cpu } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatItem[] = [
  {
    value: '580+',
    label: 'Supported Markets',
    description: 'Active APMC mandis integrated',
    icon: <MapPin className="h-6 w-6" />,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    value: '36+',
    label: 'Commodities',
    description: 'Grains, oilseeds, fruits & vegetables',
    icon: <Sprout className="h-6 w-6" />,
    color: 'text-primary-green bg-green-50 border-green-100',
  },
  {
    value: '94.2%',
    label: 'Prediction Accuracy',
    description: 'Validated by AI backtesting models',
    icon: <CheckCircle className="h-6 w-6" />,
    color: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    value: '28,450+',
    label: 'Forecasts Generated',
    description: 'Price predictions updated daily',
    icon: <Cpu className="h-6 w-6" />,
    color: 'text-blue-600 bg-blue-50 border-blue-100',
  },
];

const OverviewStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border shrink-0 ${stat.color}`}>
            {stat.icon}
          </div>
          <div>
            <div className="text-2xl font-extrabold text-text-dark tracking-tight leading-none">
              {stat.value}
            </div>
            <div className="text-sm font-bold text-gray-700 mt-1">
              {stat.label}
            </div>
            <div className="text-xs text-gray-400 mt-0.5 leading-tight">
              {stat.description}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewStats;
