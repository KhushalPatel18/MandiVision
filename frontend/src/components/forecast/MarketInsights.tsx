import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Eye, Calendar } from 'lucide-react';

interface MarketInsightsProps {
  growth: number;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ growth }) => {
  // Determine indicators based on forecast growth rate
  const isBullish = growth >= 0;
  const vol = Math.abs(growth) > 10 ? 'High' : Math.abs(growth) > 4 ? 'Medium' : 'Low';
  
  let rec: 'Buy' | 'Sell' | 'Hold' = 'Hold';
  let bestWindow = 'Next 7-14 days';
  
  if (growth > 5) {
    rec = 'Hold';
    bestWindow = 'Next 15-20 days (Wait for peak)';
  } else if (growth < -5) {
    rec = 'Sell';
    bestWindow = 'Immediately (Avoid upcoming dip)';
  } else {
    rec = 'Buy';
    bestWindow = 'Next 7-10 days (Stable market)';
  }

  const volBadgeVariant = vol === 'High' ? 'danger' : vol === 'Medium' ? 'warning' : 'success';
  const recBadgeVariant = rec === 'Hold' ? 'warning' : rec === 'Sell' ? 'danger' : 'success';

  return (
    <Card hoverable className="h-full">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
        <Eye className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold text-text-dark">Market Indicators</h3>
      </div>

      <div className="space-y-5">
        {/* Market Trend */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-muted">Market Trend</span>
          <Badge variant={isBullish ? 'success' : 'danger'} className="font-bold">
            {isBullish ? 'BULLISH' : 'BEARISH'}
          </Badge>
        </div>

        {/* Volatility */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-muted">Volatility Profile</span>
          <Badge variant={volBadgeVariant} className="font-bold">
            {vol} Volatility
          </Badge>
        </div>

        {/* Recommendation */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-muted">Trading Recommendation</span>
          <Badge variant={recBadgeVariant} className="font-bold">
            {rec.toUpperCase()}
          </Badge>
        </div>

        {/* Best Selling Window */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted uppercase tracking-wider mb-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Optimal Liquidating Window</span>
          </div>
          <p className="text-sm font-extrabold text-text-dark">{bestWindow}</p>
          <p className="text-xs text-muted mt-1 leading-normal">
            Calculated by minimizing historical transportation spikes and seasonal local supply arrivals.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MarketInsights;
