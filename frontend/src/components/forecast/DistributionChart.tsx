import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '../ui/Card';
import { PieChart as PieIcon, BarChart3 } from 'lucide-react';

const COLORS = ['#16A34A', '#22C55E', '#84CC16', '#A3E635'];

export const DistributionChart: React.FC = () => {
  // Mock data representing crop quality grades in arrival shares
  const data = [
    { name: 'FAQ (Fair Average Quality)', value: 50 },
    { name: 'Bold/Super Grade', value: 30 },
    { name: 'Local/Medium Grade', value: 20 },
  ];

  return (
    <Card className="h-[380px]">
      <div className="flex items-center gap-2 mb-6">
        <PieIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold text-text-dark">Quality Grade Distribution</h3>
      </div>
      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#0F172A', borderRadius: '12px', border: 'none', color: '#FFF', fontSize: '12px' }}
              formatter={(value: any) => [`${value}%`, 'Arrival Share']}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', color: '#64748B' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

interface MonthlyComparisonProps {
  currentPrice: number;
}

export const MonthlyComparison: React.FC<MonthlyComparisonProps> = ({ currentPrice }) => {
  // Generate comparison data based on current price
  const data = [
    { month: 'Feb Averages', price: Math.round(currentPrice * 0.92) },
    { month: 'Mar Averages', price: Math.round(currentPrice * 0.95) },
    { month: 'Apr Averages', price: Math.round(currentPrice * 0.98) },
    { month: 'May Averages', price: currentPrice },
  ];

  return (
    <Card className="h-[380px]">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-5 w-5 text-secondary" />
        <h3 className="text-lg font-bold text-text-dark">Monthly Average Rates</h3>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 10, fill: '#64748B' }} domain={['dataMin - 300', 'dataMax + 100']} />
            <Tooltip
              contentStyle={{ background: '#0F172A', borderRadius: '12px', border: 'none', color: '#FFF', fontSize: '12px' }}
              formatter={(value: any) => [`₹${value}/Qtl`, 'Avg Rate']}
            />
            <Bar dataKey="price" fill="#22C55E" radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === data.length - 1 ? '#16A34A' : '#22C55E'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
