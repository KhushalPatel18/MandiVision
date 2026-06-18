import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Card from '../ui/Card';
import { History } from 'lucide-react';

interface HistoricalChartProps {
  data: { date: string; price: number }[];
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ data }) => {
  return (
    <Card className="h-[380px]">
      <div className="flex items-center gap-2 mb-6">
        <History className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold text-text-dark">Historical Price Trend (Last 30 Days)</h3>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="historyColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 10, fill: '#64748B' }} domain={['dataMin - 100', 'dataMax + 100']} />
            <Tooltip
              contentStyle={{ background: '#0F172A', borderRadius: '12px', border: 'none', color: '#FFF', fontSize: '12px' }}
              formatter={(value: any) => [`₹${value}/Qtl`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#16A34A"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#historyColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HistoricalChart;
