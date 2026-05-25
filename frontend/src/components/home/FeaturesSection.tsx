import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import FeatureCard from '../ui/FeatureCard';
import { FEATURES_DATA } from '../../utils/data';

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-background-off-white relative">
      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-0 -z-10 w-[400px] h-[400px] rounded-full bg-radial from-green-100/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionTitle
          badge="Core Capabilities"
          title="Predictive Market Intelligence Designed for Farmers"
          subtitle="Explore the advanced analytical suite constructed to eliminate market uncertainty, provide price transparency, and maximize APMC trade valuation."
        />

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {FEATURES_DATA.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              iconName={feature.iconName}
              colorClass={feature.colorClass}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
