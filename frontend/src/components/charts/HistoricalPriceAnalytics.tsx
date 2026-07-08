import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { BarChart2, Activity, Info } from 'lucide-react';

type TimeFrame = '7D' | '30D' | '90D' | '1Y';

const generateMockHistory = (timeframe: TimeFrame, basePrice: number) => {
  let count = 30;
  if (timeframe === '7D') count = 7;
  if (timeframe === '90D') count = 90;
  if (timeframe === '1Y') count = 365;

  const points = [];
  const start = new Date();
  start.setDate(start.getDate() - count);

  let currentPrice = basePrice * 0.92;
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    // Add random walk with slight upward drift
    const change = (Math.random() - 0.45) * (basePrice * 0.015);
    currentPrice += change;
    points.push({
      date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      price: Math.round(currentPrice),
    });
  }
  return points;
};

interface HistoricalPriceAnalyticsProps {
  basePrice: number;
}

const HistoricalPriceAnalytics: React.FC<HistoricalPriceAnalyticsProps> = ({ basePrice }) => {
  const [activeTab, setActiveTab] = useState<TimeFrame>('30D');

  const historyData = useMemo(() => {
    return generateMockHistory(activeTab, basePrice);
  }, [activeTab, basePrice]);

  const metrics = useMemo(() => {
    const prices = historyData.map(h => h.price);
    const sum = prices.reduce((acc, p) => acc + p, 0);
    const avg = Math.round(sum / prices.length);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    
    // Simple standard deviation / volatility estimation
    const variance = prices.reduce((acc, p) => acc + Math.pow(p - avg, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    const volatilityPct = ((stdDev / avg) * 100).toFixed(1);

    return {
      average: avg,
      volatility: volatilityPct,
      range: `₹${min.toLocaleString('en-IN')} - ₹${max.toLocaleString('en-IN')}`,
    };
  }, [historyData]);

  return (
    <div className="bg-white rounded-3xl border border-gray-150/60 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] w-full">
      {/* Header section with Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-text-dark">Historical Price Analytics</h2>
          <p className="text-xs text-gray-400 mt-1">
            Access longitudinal APMC transactional historical records.
          </p>
        </div>

        {/* Custom Timeline Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-50/80 p-1.5 rounded-2xl border border-gray-150/40">
          {(['7D', '30D', '90D', '1Y'] as TimeFrame[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white text-primary-green shadow-sm border border-gray-150/10'
                  : 'text-gray-400 hover:text-text-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Volatility & Running Indexes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-50 text-primary-green rounded-xl flex items-center justify-center border border-emerald-100">
            <BarChart2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Average Mandi Rate</span>
            <span className="text-lg font-black text-text-dark">₹{metrics.average.toLocaleString('en-IN')}<span className="text-xs font-semibold text-gray-400">/Qtl</span></span>
          </div>
        </div>

        <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Estimated Volatility</span>
            <span className="text-lg font-black text-text-dark">{metrics.volatility}% <span className="text-xs font-semibold text-gray-400">Std Dev</span></span>
          </div>
        </div>

        <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Market Price Boundary</span>
            <span className="text-sm font-black text-text-dark">{metrics.range}</span>
          </div>
        </div>
      </div>

      {/* Recharts line chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={historyData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F9FAFB" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              domain={['dataMin - 300', 'dataMax + 300']}
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#122214] text-white p-3 rounded-xl border border-green-900 text-xs shadow-md">
                      <p className="font-bold text-gray-400">{payload[0].payload.date}</p>
                      <p className="text-sm font-black mt-1 text-white">₹{payload[0].value?.toLocaleString('en-IN')}/Qtl</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2E7D32"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: '#2E7D32', stroke: '#FFF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoricalPriceAnalytics;
