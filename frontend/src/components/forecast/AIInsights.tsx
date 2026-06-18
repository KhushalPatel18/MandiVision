import React from 'react';
import Card from '../ui/Card';
import { Cpu, Lightbulb, Zap, LineChart } from 'lucide-react';

interface AIInsightsProps {
  commodity: string;
  growth: number;
}

const AIInsights: React.FC<AIInsightsProps> = ({ commodity, growth }) => {
  // Derive insights based on commodity name
  const isPotato = commodity.toLowerCase().includes('potato');
  const isOnion = commodity.toLowerCase().includes('onion');
  const isCotton = commodity.toLowerCase().includes('cotton');
  const isWheat = commodity.toLowerCase().includes('wheat');
  const isRice = commodity.toLowerCase().includes('rice');
  const isTomato = commodity.toLowerCase().includes('tomato');

  let seasonalText = 'Historical patterns indicate a standard seasonal supply peak, matching average harvest volumes for this time of the year.';
  let weeklyText = `Price action is expected to move within a stable range, showing small +/-2% weekly fluctuations.`;
  let stabilityText = 'Mandi volumes remain steady with balanced supply-demand curves in regional nodes.';

  if (isPotato) {
    seasonalText = 'Potatoes show high storage holdings in cold stores in Western UP and Gujarat, capping extreme bullish spikes but maintaining stable index floors.';
    weeklyText = growth >= 0 
      ? 'Prices are projected to tick upward next week as retail demand for processing-grade potatoes increases.'
      : 'Prices are projected to witness minor pressure next week due to high arrivals from neighboring districts.';
    stabilityText = 'High stability. Storage levels are at 68% capacity, guaranteeing stable supply over the next 45 days.';
  } else if (isOnion) {
    seasonalText = 'Onions are undergoing standard summer crop (Rabi) depletion. Prices are highly sensitive to moisture indexes and monsoon timings.';
    weeklyText = 'Weekly prices indicate downward consolidation as fresh early Kharif nursery arrivals enter southern mandis.';
    stabilityText = 'Moderate to high volatility risk. Buffer stock releases by cooperative federations could introduce sudden price caps.';
  } else if (isCotton) {
    seasonalText = 'Cotton fibers are seeing strong global demand indices, aligning with export volumes from Gujarat ports.';
    weeklyText = 'Expect a 1.5% weekly upward rally as yarn manufacturers lock in inventory contracts before monsoon halts.';
    stabilityText = 'Strong stability. Solid support levels identified at ₹7,000/Qtl benchmarks.';
  } else if (isWheat) {
    seasonalText = 'Post-harvest procurement by government agencies under MSP policies maintains a hard floor under wheat pricing.';
    weeklyText = 'Wheat prices will remain flat next week with extremely low trading volatility (+/-0.5%).';
    stabilityText = 'Excellent stability. Low risk profile suitable for conservative selling schedules.';
  } else if (isRice) {
    seasonalText = 'Rice exports restrictions locally continue to create high domestic stockpiles, stabilizing internal market prices.';
    weeklyText = 'Expect marginal price adjustments (+/-1%) as mills process late Rabi paddy harvests.';
    stabilityText = 'Stable. Arrival volumes match the 5-year average index curve with high precision.';
  } else if (isTomato) {
    seasonalText = 'Tomatoes represent a highly volatile crop. Hotter temperatures shorten storage shelf life, forcing quick mandi sell-offs.';
    weeklyText = 'Expect sudden price fluctuations next week (+/-8%) depending on regional daily truck arrivals.';
    stabilityText = 'High volatility risk. Heavy weather-related transit delays may cause temporary price spikes.';
  }

  return (
    <Card hoverable className="h-full bg-gradient-to-br from-gray-900 via-[#101b12] to-slate-900 text-white border-green-950">
      <div className="flex items-center gap-2 mb-6 border-b border-green-900/60 pb-4">
        <Cpu className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-bold text-white">AI Neural Insights</h3>
      </div>

      <div className="space-y-6">
        {/* Weekly Trend */}
        <div className="flex items-start gap-4">
          <div className="h-9 w-9 rounded-xl bg-green-900/40 border border-green-800 flex items-center justify-center text-primary shrink-0">
            <Zap className="h-4.5 w-4.5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-200 mb-1">Weekly Price Action</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{weeklyText}</p>
          </div>
        </div>

        {/* Seasonal Trends */}
        <div className="flex items-start gap-4">
          <div className="h-9 w-9 rounded-xl bg-green-900/40 border border-green-800 flex items-center justify-center text-accent shrink-0">
            <Lightbulb className="h-4.5 w-4.5 text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-200 mb-1">Seasonal Observations</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{seasonalText}</p>
          </div>
        </div>

        {/* Stability index */}
        <div className="flex items-start gap-4">
          <div className="h-9 w-9 rounded-xl bg-green-900/40 border border-green-800 flex items-center justify-center text-blue-400 shrink-0">
            <LineChart className="h-4.5 w-4.5 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-200 mb-1">Market Stability Index</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{stabilityText}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIInsights;
