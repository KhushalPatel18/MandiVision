import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { STATS_DATA } from '../../utils/data';

const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="py-12 md:py-16 bg-white border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS_DATA.map((stat, index) => {
            // Dynamic Lucide icon mapping
            const IconComponent = (Icons as any)[stat.iconName] || Icons.TrendingUp;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-5 p-6 rounded-2xl bg-gradient-to-r from-gray-50/50 to-white border border-gray-100 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.02)]"
              >
                {/* Icon wrapper */}
                <div className="h-12 w-12 rounded-xl bg-green-50/80 border border-green-100/30 flex items-center justify-center text-primary-green shrink-0">
                  <IconComponent className="h-6 w-6 stroke-[1.75]" />
                </div>
                {/* Meta details */}
                <div className="flex flex-col">
                  <span className="text-3xl font-extrabold text-text-dark leading-tight tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm font-bold text-gray-700 mt-0.5">
                    {stat.label}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5 leading-normal">
                    {stat.description}
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

export default StatsSection;
