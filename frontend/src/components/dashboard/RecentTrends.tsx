import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { TrendingUp } from 'lucide-react';

const mockTrendData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 2550 },
  { name: 'Mar', value: 2700 },
  { name: 'Apr', value: 2600 },
  { name: 'May', value: 2850 },
  { name: 'Jun', value: 2980 },
];

const RecentTrends: React.FC = () => {
  return (
    <Card hoverable className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-text-dark">Recent Market Trends</h3>
          <Badge variant="info">Aggregated Index</Badge>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-extrabold text-text-dark">₹2,980/Qtl</span>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="h-3.5 w-3.5" /> +4.5% MoM
          </span>
        </div>
      </div>

      <div className="h-36 w-full -mx-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockTrendData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
            <Tooltip
              contentStyle={{ background: '#0F172A', borderRadius: '12px', border: 'none', color: '#FFF' }}
              labelStyle={{ display: 'none' }}
              formatter={(value: any) => [`₹${value}/Qtl`, 'Index Price']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#16A34A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RecentTrends;
