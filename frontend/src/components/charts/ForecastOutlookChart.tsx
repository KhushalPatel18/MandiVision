import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ForecastPoint {
  date: string;
  price: number;
  type: 'actual' | 'predicted';
}

interface ForecastOutlookChartProps {
  data: ForecastPoint[];
  commodity: string;
}

const ForecastOutlookChart: React.FC<ForecastOutlookChartProps> = ({ data, commodity }) => {
  // Add styling wrapper around charts for clean presentation
  return (
    <div className="bg-white rounded-3xl border border-gray-150/60 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-text-dark">Price Forecast Outlook</h2>
          <p className="text-xs text-gray-400 mt-1">
            Analyzing 30 days price history against upcoming machine learning model predictions for {commodity}.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 bg-emerald-600 rounded-full" />
            <span className="text-gray-500">Historical Price</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border-2 border-dashed border-emerald-500 rounded-full" />
            <span className="text-gray-500">AI Forecast Target</span>
          </div>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.00}/>
              </linearGradient>
              <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FBC02D" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#FBC02D" stopOpacity={0.00}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              domain={['dataMin - 500', 'dataMax + 500']}
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload as ForecastPoint;
                  return (
                    <div className="bg-[#122214] border border-green-900 text-white p-4 rounded-xl shadow-lg text-xs leading-relaxed">
                      <p className="font-bold text-gray-300 mb-1">{dataPoint.date}</p>
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${dataPoint.type === 'actual' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <span>Price: <strong className="text-white text-sm">₹{dataPoint.price.toLocaleString('en-IN')}</strong></span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 capitalize font-medium">Status: {dataPoint.type} data point</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#2E7D32"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#actualGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastOutlookChart;
