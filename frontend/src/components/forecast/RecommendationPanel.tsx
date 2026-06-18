import React from 'react';
import Card from '../ui/Card';
import { ShieldCheck, Truck, BarChart3 } from 'lucide-react';

interface RecommendationPanelProps {
  growth: number;
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ growth }) => {
  const isHold = growth > 5;
  const isSell = growth < -5;

  return (
    <Card hoverable className="h-full">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h3 className="text-lg font-bold text-text-dark">Strategic Selling Advisory</h3>
        <p className="text-xs text-muted mt-1">Actionable recommendations based on neural network outputs.</p>
      </div>

      <div className="space-y-6">
        {/* Storage Advice */}
        <div className="flex gap-4">
          <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-primary shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-dark mb-1">Storage & Warehousing</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {isHold
                ? 'Store harvest in dry ventilated warehouses. Local mandi arrival volumes will bottleneck shortly, allowing you to secure an estimated extra ₹350/Qtl margin.'
                : isSell
                ? 'Avoid storage fees. High local arrivals will likely trigger storage index price corrections. Immediate liquidation recommended.'
                : 'Maintain standard storage cycles. Price is expected to remain stable within a +/-2% margin range.'}
            </p>
          </div>
        </div>

        {/* Logistics and Mandi Advice */}
        <div className="flex gap-4">
          <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-dark mb-1">Logistics & Transportation</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Plan transportation during mid-week windows (Tuesdays or Wednesdays) when transport diesel surcharges are historically lower by 3-5% and mandi queues are shorter.
            </p>
          </div>
        </div>

        {/* Pricing Trigger */}
        <div className="flex gap-4">
          <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-dark mb-1">Price Triggers</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Set sell orders if the mandi spot rate hits target benchmarks. Avoid waiting for late-season peak expectations which introduce heavy weather-delay risk.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationPanel;
