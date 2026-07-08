import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CTASectionDashboardProps {
  onScrollToConsole: () => void;
  onScrollToTrends: () => void;
}

const CTASectionDashboard: React.FC<CTASectionDashboardProps> = ({ onScrollToConsole, onScrollToTrends }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-950 to-[#0b170c] border border-green-900 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-green-950/35 w-full">
      {/* Decorative ambient backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,125,50,0.15),transparent_60%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-800/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-inner">
          <Sparkles className="h-6 w-6" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4 leading-tight">
          Make Better Selling Decisions With AI
        </h2>
        
        <p className="text-sm sm:text-base text-gray-300 font-medium mb-8 max-w-lg leading-relaxed">
          Leverage predictive market intelligence and deep learning mandi trends to maximize your crop profitability and secure optimal sell timings.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
          <button
            onClick={onScrollToConsole}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-primary-green hover:bg-primary-green-hover text-white font-bold text-sm shadow-lg shadow-green-900/40 cursor-pointer flex items-center justify-center gap-1.5 transition-colors duration-200"
          >
            <span>Generate New Forecast</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={onScrollToTrends}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-bold text-sm cursor-pointer transition-colors duration-200"
          >
            Explore Market Trends
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASectionDashboard;
