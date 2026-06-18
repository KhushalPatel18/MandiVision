import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Card from '../ui/Card';
import { Sparkles } from 'lucide-react';

interface ForecastChartProps {
  data: { date: string; price: number }[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  return (
    <Card className="h-[380px]">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-bold text-text-dark">Projected AI Forecast Trend</h3>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="forecastColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#84CC16" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#84CC16" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 10, fill: '#64748B' }} domain={['dataMin - 100', 'dataMax + 100']} />
            <Tooltip
              contentStyle={{ background: '#0F172A', borderRadius: '12px', border: 'none', color: '#FFF', fontSize: '12px' }}
              formatter={(value: any) => [`₹${value}/Qtl`, 'AI Projected']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#84CC16"
              strokeWidth={3}
              strokeDasharray="4 2"
              fillOpacity={1}
              fill="url(#forecastColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ForecastChart;
