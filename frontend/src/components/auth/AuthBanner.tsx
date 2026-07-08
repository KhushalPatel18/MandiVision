import React from 'react';
import { CheckCircle2, TrendingUp, BarChart2, Globe, Sparkles } from 'lucide-react';
import logo from '../../assets/logo.png';

interface AuthBannerProps {
  mode: 'login' | 'signup';
}

const AuthBanner: React.FC<AuthBannerProps> = ({ mode }) => {
  const features = [
    { title: 'Crop Price Forecasting', desc: 'Predict rates 7, 15, 30, and 90 days in advance.' },
    { title: 'Historical Market Analysis', desc: 'Deep dive into 7+ years of APMC price variations.' },
    { title: 'Real-time Market Trends', desc: 'Instant arrival indices synced from e-NAM portals.' },
    { title: 'AI-powered Recommendations', desc: 'Attribution logs providing hold/sell advises.' },
  ];

  const stats = [
    { value: '94.2%', label: 'Prediction Accuracy' },
    { value: '30+', label: 'Commodities' },
    { value: '500+', label: 'Markets' },
    { value: '15,000+', label: 'Daily Forecasts' },
  ];

  return (
    <div className="relative w-full h-full min-h-[inherit] bg-gradient-to-br from-green-950 via-[#0a1e0d] to-[#040e05] p-10 lg:p-16 flex flex-col justify-between overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(22,163,74,0.1),transparent_40%)] pointer-events-none" />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary-green/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Branding Section */}
      <div className="relative z-10 flex flex-col items-start gap-6">
        <a href="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="MandiVision Logo"
            className="h-12 w-12 object-contain group-hover:scale-105 transition-transform duration-200"
          />
          <div className="flex flex-col text-left">
            <span className="text-xl font-extrabold tracking-tight text-white leading-none">
              Mandi<span className="text-primary-green">Vision</span>
            </span>
            <span className="text-[10px] font-semibold text-secondary-yellow tracking-widest uppercase mt-0.5">
              AI Agri-Tech
            </span>
          </div>
        </a>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Sparkles className="h-3 w-3 text-secondary-yellow animate-pulse" />
          <span>AI-Powered Agricultural Intelligence</span>
        </div>
      </div>

      {/* Center Branding message */}
      <div className="relative z-10 my-auto text-left py-12">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Predict Smarter. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">
            Sell Better.
          </span>
        </h1>
        <p className="text-gray-300 font-medium text-sm sm:text-base mt-4 max-w-md leading-relaxed">
          Use AI-driven crop forecasting and real-time mandi insights to maximize agricultural profits, reduce volatility, and plan harvesting logistics.
        </p>

        {/* Feature points or Stats Grid depending on page Mode */}
        {mode === 'login' ? (
          <div className="mt-8 space-y-4 max-w-sm">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-3 items-start bg-white/5 border border-white/5 p-3 rounded-2xl backdrop-blur-md">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{feature.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md flex flex-col justify-center"
              >
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wide mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating glassmorphic preview cards at the bottom */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/10 pt-6">
        <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl backdrop-blur-md text-xs text-gray-400">
          <Globe className="h-4.5 w-4.5 text-emerald-400" />
          <span>Real-time Sync Active</span>
        </div>
        <div className="text-[10px] text-gray-500 font-bold uppercase">
          © {new Date().getFullYear()} MandiVision Inc.
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;
export { AuthBanner };
