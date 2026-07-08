import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus, AlertCircle, Calendar } from 'lucide-react';

export interface PredictionHeroData {
  commodity: string;
  market: string;
  predictedPrice: number;
  currentPrice: number;
  confidence: number;
  rangeLow: number;
  rangeHigh: number;
  targetDate: string;
  status: 'Strong Buy' | 'Neutral' | 'Watch Market' | 'Strong Sell' | 'Hold';
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface PredictionResultHeroProps {
  data: PredictionHeroData;
}

const PredictionResultHero: React.FC<PredictionResultHeroProps> = ({ data }) => {
  const isUp = data.trend === 'up';
  const isDown = data.trend === 'down';

  const statusColors = {
    'Strong Buy': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Neutral': 'bg-gray-50 text-gray-700 border-gray-200',
    'Watch Market': 'bg-amber-50 text-amber-700 border-amber-200',
    'Strong Sell': 'bg-red-50 text-red-700 border-red-200',
    'Hold': 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const statusLabel = data.status;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-green-950 to-[#0c180e] border border-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-green-950/20 w-full"
    >
      {/* Backlight Glow Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-green-900/40 pb-5 mb-6">
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-secondary-yellow uppercase">
            PRIMARY AI OUTLOOK
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            {data.commodity} Price Prediction
          </h3>
          <span className="text-xs text-gray-400 font-medium">
            For {data.market} APMC Corridor
          </span>
        </div>
        <div className={`px-4 py-1.5 rounded-xl border text-xs font-bold ${statusColors[statusLabel] || 'bg-gray-50'}`}>
          {statusLabel}
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Main Predicted Price */}
        <div className="md:col-span-2 bg-green-900/10 border border-green-900/30 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider mb-2">
              AI-Predicted Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ₹{data.predictedPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-semibold text-gray-400">/ Quintal</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-400">Current Rate:</span>
              <span className="text-xs font-extrabold text-gray-200">₹{data.currentPrice.toLocaleString('en-IN')}</span>
            </div>
            
            {/* Price change percentage */}
            <div className="flex items-center gap-1.5">
              {isUp && (
                <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2.5 py-1 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 mr-0.5" />
                  +{data.change.toFixed(1)}% Trend Up
                </span>
              )}
              {isDown && (
                <span className="inline-flex items-center text-xs font-bold text-red-400 bg-red-950/40 border border-red-900 px-2.5 py-1 rounded-lg">
                  <ArrowDownRight className="h-4 w-4 mr-0.5" />
                  {data.change.toFixed(1)}% Trend Down
                </span>
              )}
              {data.trend === 'stable' && (
                <span className="inline-flex items-center text-xs font-bold text-gray-300 bg-green-900/10 border border-green-900/20 px-2.5 py-1 rounded-lg">
                  <Minus className="h-4 w-4 mr-0.5" />
                  Stable Corridor
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Confidence Gauge */}
        <div className="bg-green-900/20 border border-green-900/40 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider mb-2">
              Prediction Confidence
            </span>
            <span className="text-4xl font-extrabold tracking-tight text-secondary-yellow">
              {data.confidence.toFixed(1)}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2 w-full bg-green-950 rounded-full overflow-hidden border border-green-900/40">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.confidence}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-yellow-400 to-green-500 rounded-full"
              />
            </div>
            <span className="text-[10px] text-gray-500 mt-2 block">
              Confidence level calculated from dataset parameters.
            </span>
          </div>
        </div>
      </div>

      {/* Expected Ranges & Target Date info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-green-900/30 pt-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-green-900/30 flex items-center justify-center text-emerald-400 border border-green-800/40 shrink-0">
            <AlertCircle className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">Expected Trading Range</span>
            <span className="text-sm font-extrabold text-white">
              ₹{data.rangeLow.toLocaleString('en-IN')} - ₹{data.rangeHigh.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-green-900/30 flex items-center justify-center text-emerald-400 border border-green-800/40 shrink-0">
            <Calendar className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">Target Forecast Date</span>
            <span className="text-sm font-extrabold text-white">
              {data.targetDate}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionResultHero;
