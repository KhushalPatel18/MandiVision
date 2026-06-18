import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Sprout, MapPin, Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CommodityOverviewProps {
  commodity: string;
  market: string;
  variety: string;
  currentPrice: number;
  growth: number;
}

const CommodityOverview: React.FC<CommodityOverviewProps> = ({
  commodity,
  market,
  variety,
  currentPrice,
  growth,
}) => {
  const isPositive = growth >= 0;

  return (
    <Card className="border border-green-100 bg-gradient-to-r from-green-50/20 via-white to-white py-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Info Strip */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Sprout Icon */}
          <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <Sprout className="h-7 w-7" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-extrabold text-text-dark">{commodity}</h2>
              <Badge variant="primary">{variety || 'FAQ'}</Badge>
            </div>
            
            {/* Meta tags */}
            <div className="flex items-center gap-4 mt-1.5 text-xs text-muted font-semibold">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-emerald-500" />
                {market}
              </span>
              <span className="flex items-center gap-1">
                <Layers className="h-4 w-4 text-teal-500" />
                A Grade Arrivals
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Price Highlights */}
        <div className="flex items-center gap-8 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
          <div>
            <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Spot Price</span>
            <span className="text-2xl font-extrabold text-text-dark">
              ₹{currentPrice.toLocaleString('en-IN')}
              <span className="text-xs font-semibold text-muted font-normal ml-0.5">/Qtl</span>
            </span>
          </div>

          <div>
            <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Expected Change</span>
            <div className="flex items-center gap-1.5 font-extrabold text-lg">
              {isPositive ? (
                <span className="text-emerald-600 flex items-center gap-0.5">
                  <ArrowUpRight className="h-4.5 w-4.5" /> +{growth}%
                </span>
              ) : (
                <span className="text-red-500 flex items-center gap-0.5">
                  <ArrowDownRight className="h-4.5 w-4.5" /> {growth}%
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </Card>
  );
};

export default CommodityOverview;
