import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { STEPS_DATA } from '../../utils/data';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-0 -z-10 w-[500px] h-[500px] rounded-full bg-radial from-amber-100/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionTitle
          badge="Prediction Process"
          title="How MandiVision Works"
          subtitle="Get localized agricultural price intelligence in three straightforward steps, backed by millions of crop transaction data points."
        />

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-green-500/20 via-amber-500/10 to-green-500/20 -translate-y-8 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {STEPS_DATA.map((step, index) => {
              const IconComponent = (Icons as any)[step.iconName] || Icons.CheckSquare;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center px-4"
                >
                  {/* Icon & Number Circle */}
                  <div className="relative mb-6">
                    {/* Number Badge */}
                    <span className="absolute -top-2 -right-2 bg-gradient-to-br from-secondary-yellow to-amber-500 text-text-dark font-extrabold text-sm h-6 w-6 rounded-full flex items-center justify-center border border-white shadow-md">
                      {step.number}
                    </span>
                    {/* Icon container */}
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-green-50/50 to-white border border-gray-100 shadow-[0_10px_25px_-5px_rgba(46,125,50,0.06)] hover:shadow-[0_15px_30px_-5px_rgba(46,125,50,0.12)] flex items-center justify-center text-primary-green hover:scale-105 transition-all duration-300">
                      <IconComponent className="h-8 w-8 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Text Details */}
                  <h3 className="text-xl font-bold text-text-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
