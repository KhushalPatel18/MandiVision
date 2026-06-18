import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Info } from 'lucide-react';

const MarketSummary: React.FC = () => {
  return (
    <Card hoverable className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-dark">Market Integration Summary</h3>
        <Badge variant="success">e-NAM Connected</Badge>
      </div>

      <div className="space-y-4 text-sm text-gray-500">
        <p className="leading-relaxed">
          MandiVision is integrated directly with the National Agriculture Market (e-NAM) and state-specific APMC portals to pull pricing index reports daily.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1">Server Status</span>
            <div className="flex items-center gap-1.5 font-bold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1">Sync Frequency</span>
            <div className="font-bold text-text-dark">Daily (4:00 PM)</div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1">Active Mandis</span>
            <div className="font-bold text-text-dark">600+ Mandis</div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1">Coverage</span>
            <div className="font-bold text-text-dark">Vegetables & Grains</div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-2.5 mt-6">
          <Info className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
          <span className="text-xs text-gray-500 leading-normal">
            Weather factors like temperature anomalies and cumulative precipitation indexes are incorporated into our regression models.
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MarketSummary;
