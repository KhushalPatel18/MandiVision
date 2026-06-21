import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Network } from 'lucide-react';
import { STATES_DATA } from '../../utils/data';

const StateMarketOverview: React.FC = () => {
  // Add regional volume stats to mock data
  const extraStats = {
    GJ: { volume: '4.8M Metric Tons', activity: 'High', avgPrice: '₹4,750/Qtl' },
    UP: { volume: '8.2M Metric Tons', activity: 'Very High', avgPrice: '₹3,200/Qtl' },
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-150/60 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] w-full">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-5">
        <Network className="h-5 w-5 text-primary-green" />
        <div>
          <h2 className="text-xl font-extrabold text-text-dark">State Market Overview</h2>
          <p className="text-xs text-gray-400 mt-0.5">Comparative analytics across primary monitored state APMC corridors.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {STATES_DATA.map((state, idx) => {
          const stats = extraStats[state.code as keyof typeof extraStats] || { volume: 'N/A', activity: 'Medium', avgPrice: 'N/A' };

          return (
            <motion.div
              key={state.code}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50/20 rounded-3xl border border-gray-100 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-primary-green">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-text-dark text-lg leading-tight">{state.name}</h3>
                      <span className="text-[10px] font-bold text-accent-brown uppercase">{state.mandiCount} Mandis Connected</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary-green bg-green-50 border border-green-100 px-2 py-1 rounded-lg">
                    {state.code} Network
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                  {state.description}
                </p>

                {/* Grid stats */}
                <div className="grid grid-cols-3 gap-3 border-y border-gray-100/60 py-4 mb-6">
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold block uppercase">Trade Volume</span>
                    <span className="text-xs font-extrabold text-text-dark block mt-0.5">{stats.volume}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold block uppercase">Market Index</span>
                    <span className="text-xs font-extrabold text-text-dark block mt-0.5">{stats.avgPrice}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold block uppercase">Activity Scale</span>
                    <span className="text-xs font-extrabold text-emerald-600 block mt-0.5">{stats.activity}</span>
                  </div>
                </div>

                {/* Primary crops list */}
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block uppercase mb-2">Monitored Commodities</span>
                  <div className="flex flex-wrap gap-1.5">
                    {state.commodities.slice(0, 5).map((crop) => (
                      <span 
                        key={crop}
                        className="text-[10px] font-bold text-gray-600 bg-white border border-gray-100 px-2 py-1 rounded-lg"
                      >
                        {crop}
                      </span>
                    ))}
                    {state.commodities.length > 5 && (
                      <span className="text-[9px] font-extrabold text-primary-green bg-green-50 px-2 py-1 rounded-lg">
                        +{state.commodities.length - 5} More
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StateMarketOverview;
