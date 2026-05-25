import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';

const CTASection: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cta" className="py-20 md:py-24 bg-[#122214] text-white relative overflow-hidden">
      {/* Decorative Top/Bottom Borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-800 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-800 to-transparent" />

      {/* Background Graphic Blurs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 w-[450px] h-[450px] rounded-full bg-radial from-green-800/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 -z-10 w-[350px] h-[350px] rounded-full bg-radial from-yellow-700/10 to-transparent blur-2xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Decorative Badge Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-green to-emerald-600 border border-green-800 flex items-center justify-center text-white mb-8 shadow-xl shadow-green-950/50"
        >
          <Sprout className="h-7 w-7" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 max-w-3xl leading-tight"
        >
          Empowering Farmers with <br className="hidden sm:inline" />
          <span className="text-secondary-yellow">Data-Driven Decisions</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl"
        >
          Join thousands of progressive farmers and agricultural traders leveraging MandiVision AI to predict rates, plan storage windows, and protect operational margins.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full sm:w-auto"
        >
          <PrimaryButton
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto shadow-xl shadow-yellow-950/20 text-gray-900 font-extrabold"
            onClick={() => handleScrollTo('market-trends')}
            icon={<ArrowRight className="h-5 w-5 text-gray-900" />}
          >
            Start Predicting Now
          </PrimaryButton>
        </motion.div>

        {/* Small trust factors */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs font-semibold text-gray-400"
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4.5 w-4.5 text-secondary-yellow" />
            <span>Zero configuration required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-secondary-yellow fill-current" />
            <span>Instant reports on WhatsApp & Mobile</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
