import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Sprout } from 'lucide-react';

interface CommodityPerformance {
  name: string;
  category: string;
  price: number;
  change: number;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  sparklineData: { value: number }[];
}

const commodities: CommodityPerformance[] = [
  {
    name: 'Cotton (Kapas)',
    category: 'Fibre',
    price: 7200,
    change: 6.25,
    sentiment: 'Bullish',
    sparklineData: [{ value: 6800 }, { value: 6900 }, { value: 6850 }, { value: 7100 }, { value: 7050 }, { value: 7200 }],
  },
  {
    name: 'Wheat (Gehun)',
    category: 'Cereal',
    price: 2450,
    change: 2.86,
    sentiment: 'Bullish',
    sparklineData: [{ value: 2380 }, { value: 2400 }, { value: 2390 }, { value: 2420 }, { value: 2430 }, { value: 2450 }],
  },
  {
    name: 'Groundnut',
    category: 'Oilseed',
    price: 6800,
    change: 5.15,
    sentiment: 'Bullish',
    sparklineData: [{ value: 6450 }, { value: 6500 }, { value: 6600 }, { value: 6550 }, { value: 6700 }, { value: 6800 }],
  },
  {
    name: 'Potato (Aloo)',
    category: 'Vegetable',
    price: 1450,
    change: 18.62,
    sentiment: 'Bullish',
    sparklineData: [{ value: 1200 }, { value: 1250 }, { value: 1300 }, { value: 1350 }, { value: 1400 }, { value: 1450 }],
  },
  {
    name: 'Soybean',
    category: 'Oilseed',
    price: 4600,
    change: -1.2,
    sentiment: 'Bearish',
    sparklineData: [{ value: 4720 }, { value: 4680 }, { value: 4700 }, { value: 4650 }, { value: 4620 }, { value: 4600 }],
  },
];

const TopCommodities: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-150/60 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] w-full">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-5">
        <Sprout className="h-5 w-5 text-primary-green" />
        <div>
          <h2 className="text-xl font-extrabold text-text-dark">Top Commodities Performance</h2>
          <p className="text-xs text-gray-400 mt-0.5">Real-time daily spot index tracker for leading mandi crops.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {commodities.map((crop, idx) => {
          const isUp = crop.change > 0;
          const sentimentColors = {
            Bullish: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            Bearish: 'bg-rose-50 text-rose-700 border-rose-100',
            Neutral: 'bg-gray-50 text-gray-700 border-gray-100',
          };

          return (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="p-5 bg-gray-50/20 border border-gray-100 rounded-2xl flex flex-col justify-between h-48"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-extrabold text-text-dark text-sm truncate max-w-[110px]">{crop.name}</h3>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{crop.category}</span>
                  </div>
                  <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-lg ${sentimentColors[crop.sentiment]}`}>
                    {crop.sentiment}
                  </span>
                </div>
                
                <div className="mt-4">
                  <span className="text-lg font-black text-text-dark">
                    ₹{crop.price.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-0.5 text-xs font-bold mt-0.5">
                    {isUp ? (
                      <span className="text-emerald-600 flex items-center">
                        <ArrowUpRight className="h-3.5 w-3.5" /> +{crop.change}%
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center">
                        <ArrowDownRight className="h-3.5 w-3.5" /> {crop.change}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Sparkline mini-graph */}
              <div className="h-10 w-full mt-4 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={crop.sparklineData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={isUp ? '#10B981' : '#F43F5E'}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCommodities;
