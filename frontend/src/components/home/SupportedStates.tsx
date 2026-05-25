import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sprout, Network } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { STATES_DATA } from '../../utils/data';

const SupportedStates: React.FC = () => {
  return (
    <section id="supported-states" className="py-20 md:py-28 bg-background-off-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionTitle
          badge="Market Scope"
          title="Supported States & Regional Mandis"
          subtitle="Currently analyzing major trading corridors in Gujarat and Uttar Pradesh. Expanding soon to Madhya Pradesh, Rajasthan, and Punjab."
        />

        {/* States Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {STATES_DATA.map((state, index) => {
            return (
              <motion.div
                key={state.code}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(46,125,50,0.06)] hover:border-green-100 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-green to-emerald-600 flex items-center justify-center text-white shadow-md shadow-green-900/10">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-text-dark">{state.name}</h3>
                        <span className="text-xs font-bold text-accent-brown tracking-wider uppercase">{state.mandiCount} Active APMC Mandis</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-primary-green bg-green-50 px-3 py-1.5 rounded-xl border border-green-100">
                      {state.code} Network
                    </span>
                  </div>

                  <p className="text-gray-500 leading-relaxed mb-6 text-sm sm:text-base">
                    {state.description}
                  </p>

                  {/* Main Crops Section */}
                  <div className="border-t border-gray-50 pt-6 mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3.5">
                      <Sprout className="h-4 w-4 text-primary-green" />
                      <span>Primary Monitored Commodities</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {state.commodities.map((crop) => (
                        <span
                          key={crop}
                          className="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-100 hover:border-primary-green/30 hover:bg-green-50/20 px-3 py-1.5 rounded-xl transition-all duration-200"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Integration Details Footer inside Card */}
                <div className="bg-gradient-to-r from-green-50/20 to-emerald-50/10 rounded-2xl p-4 flex items-center gap-3 border border-green-100/10 mt-2">
                  <Network className="h-5 w-5 text-primary-green flex-shrink-0" />
                  <span className="text-xs text-gray-500 font-semibold leading-relaxed">
                    100% daily price volume synced directly from National Agriculture Market (e-NAM) & State APMC portals.
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SupportedStates;
