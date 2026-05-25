import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, ShieldCheck, Zap, RefreshCw, BarChart3, ChevronRight } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';

const HeroSection: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<'Cotton' | 'Onion' | 'Wheat'>('Cotton');

  const cropData = {
    Cotton: {
      prices: [6200, 6400, 6800, 7000, 7200, 7650], // predicted is 7650
      predictedPrice: '₹7,650/Qtl',
      growth: '+6.25%',
      trend: 'up',
      points: '10,25 50,55 90,45 130,70 170,80 210,120',
      predPoints: '210,120 250,150',
    },
    Onion: {
      prices: [2400, 2200, 2100, 1950, 1850, 1600], // predicted is 1600
      predictedPrice: '₹1,600/Qtl',
      growth: '-13.51%',
      trend: 'down',
      points: '10,140 50,120 90,110 130,90 170,75 210,50',
      predPoints: '210,50 250,20',
    },
    Wheat: {
      prices: [2250, 2300, 2380, 2400, 2450, 2520], // predicted is 2520
      predictedPrice: '₹2,520/Qtl',
      growth: '+2.86%',
      trend: 'up',
      points: '10,50 50,60 90,75 130,80 170,95 210,110',
      predPoints: '210,110 250,130',
    },
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-green-50/50 via-white to-background-off-white">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] rounded-full bg-radial from-green-200/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-[350px] h-[350px] rounded-full bg-radial from-yellow-200/10 to-transparent blur-2xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 border border-green-200/50 text-primary-green mb-6 shadow-sm"
            >
              <Zap className="h-3 w-3 fill-current" />
              <span>Next-Gen Machine Learning for Agriculture</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-dark leading-tight tracking-tight mb-6"
            >
              Predict Crop Prices <br />
              <span className="bg-gradient-to-r from-primary-green to-emerald-600 bg-clip-text text-transparent">
                Smarter with AI
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed mb-8"
            >
              Harness the power of advanced neural networks and deep-learning cycles to forecast APMC market pricing. Lower your risk, plan storage, and maximize revenues with MandiVision.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <PrimaryButton
                variant="primary"
                size="lg"
                onClick={() => handleScrollTo('market-trends')}
                className="w-full sm:w-auto shadow-md"
                icon={<ChevronRight className="h-5 w-5" />}
              >
                Predict Prices
              </PrimaryButton>
              <PrimaryButton
                variant="outline"
                size="lg"
                onClick={() => handleScrollTo('features')}
                className="w-full sm:w-auto"
                icon={<BarChart3 className="h-4 w-4" />}
                iconPosition="left"
              >
                Explore Trends
              </PrimaryButton>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-6 mt-10 text-xs font-semibold text-gray-400 border-t border-gray-100 pt-6 w-full"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-primary-green" />
                <span>94.2% Backtested Accuracy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4 text-accent-brown animate-spin-[spin_3s_linear_infinite]" />
                <span>Daily APMC Feed Integration</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Mock Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Glow backing */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-yellow-500/5 rounded-3xl blur-2xl -z-10 transform scale-95" />

            {/* Floating Live Badge */}
            <div className="absolute -top-3 -left-3 bg-white border border-gray-100 rounded-xl px-3 py-1.5 shadow-md flex items-center gap-2 z-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Live APMC feed</span>
            </div>

            {/* Floating Accuracy Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-lg flex items-center gap-3 z-10 max-w-[180px]">
              <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-primary-green shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Accuracy</div>
                <div className="text-lg font-extrabold text-primary-green leading-tight">94.2% AI</div>
              </div>
            </div>

            {/* Dashboard Container */}
            <div className="bg-white rounded-3xl border border-gray-100/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">
              {/* Dashboard Top bar */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="text-xs font-semibold text-gray-400 ml-2">MandiVision Forecast Console</span>
                </div>
                <div className="text-xs font-bold text-gray-500 bg-white border border-gray-100 rounded-lg px-2.5 py-1">
                  Active
                </div>
              </div>

              {/* Dashboard Internal Content */}
              <div className="p-6 md:p-8">
                {/* Crop selector tab bar */}
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                  {(['Cotton', 'Onion', 'Wheat'] as const).map((crop) => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => setSelectedCrop(crop)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        selectedCrop === crop
                          ? 'bg-primary-green text-white shadow-sm'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {crop === 'Cotton' ? 'Cotton (Kapas)' : crop === 'Onion' ? 'Onion (Pyaz)' : 'Wheat (Gehun)'}
                    </button>
                  ))}
                </div>

                {/* Main Stats of Dashboard */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50/40 border border-green-100/40 p-4 rounded-2xl">
                    <span className="text-xs text-gray-400 font-semibold block mb-1">Predicted Rate (30 Days)</span>
                    <span className="text-2xl font-extrabold text-primary-green leading-none">
                      {cropData[selectedCrop].predictedPrice}
                    </span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                    <span className="text-xs text-gray-400 font-semibold block mb-1">Forecasted Trend</span>
                    <span
                      className={`text-lg font-bold flex items-center gap-1.5 ${
                        cropData[selectedCrop].trend === 'up' ? 'text-primary-green' : 'text-red-500'
                      }`}
                    >
                      {cropData[selectedCrop].growth}
                      <span className="text-xs font-normal text-gray-400">
                        {cropData[selectedCrop].trend === 'up' ? 'Increase' : 'Decrease'}
                      </span>
                    </span>
                  </div>
                </div>

                {/* SVG Live-rendered Graph Chart */}
                <div className="relative border border-gray-100 rounded-2xl p-4 bg-gray-50/30">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase mb-4 tracking-wider">
                    <span>Price Trend (Historical to Forecast)</span>
                    <span className="text-primary-green flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-primary-green rounded-full" /> Predicted
                    </span>
                  </div>

                  {/* SVG Grid */}
                  <div className="h-40 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 260 170" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" y1="25" x2="260" y2="25" stroke="#f1f1f1" strokeWidth="1" />
                      <line x1="0" y1="70" x2="260" y2="70" stroke="#f1f1f1" strokeWidth="1" />
                      <line x1="0" y1="120" x2="260" y2="120" stroke="#f1f1f1" strokeWidth="1" />

                      {/* Historical Solid Line */}
                      <polyline
                        fill="none"
                        stroke="#2E7D32"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={cropData[selectedCrop].points}
                        className="transition-all duration-500"
                      />

                      {/* Predicted Dashed Line */}
                      <polyline
                        fill="none"
                        stroke="#FBC02D"
                        strokeWidth="3.5"
                        strokeDasharray="4,3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={cropData[selectedCrop].predPoints}
                        className="transition-all duration-500"
                      />

                      {/* Highlight Dot */}
                      <circle
                        cx="210"
                        cy="120"
                        r="5"
                        className="fill-white stroke-primary-green stroke-[3]"
                      />
                      <circle
                        cx="250"
                        cy={selectedCrop === 'Cotton' ? 150 : selectedCrop === 'Onion' ? 20 : 130}
                        r="5"
                        className="fill-white stroke-secondary-yellow stroke-[3]"
                      />
                    </svg>

                    {/* Custom Labels on Chart */}
                    <div className="absolute bottom-1 left-2 text-[8px] text-gray-400 font-semibold">T-30d</div>
                    <div className="absolute bottom-1 left-1/3 text-[8px] text-gray-400 font-semibold">T-15d</div>
                    <div className="absolute bottom-1 left-3/4 text-[8px] text-gray-400 font-semibold">Today</div>
                    <div className="absolute bottom-1 right-2 text-[8px] text-primary-green font-bold">Forecast</div>
                  </div>
                </div>

                {/* Dashboard bottom tag */}
                <p className="text-[11px] text-center text-gray-400 mt-4 leading-normal">
                  *Based on multi-variable regression models mapping weather index & APMC arrivals volumes.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
