import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, ArrowUpRight, ArrowDownRight, Minus, TrendingUp, Info, CheckCircle } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { COMMODITIES_DATA, STATE_LOCATION_DATA } from '../../utils/data';
import type { SupportedStateName } from '../../types';

const MarketTrends: React.FC = () => {
  const [selectedState, setSelectedState] = useState<SupportedStateName>('Gujarat');
  const [selectedCrop, setSelectedCrop] = useState<string>('Cotton (Kapas)');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [selectedVariety, setSelectedVariety] = useState<string>('Local');
  

  const getCommoditiesByState = (state: 'Gujarat' | 'Uttar Pradesh') => {
    if (state === 'Gujarat') {
      return COMMODITIES_DATA.filter(c => ['Cotton (Kapas)', 'Groundnut', 'Wheat (Gehun)'].includes(c.name));
    }

    return COMMODITIES_DATA.filter(c => ['Wheat (Gehun)', 'Potato (Aloo)', 'Onion (Pyaz)', 'Soybean'].includes(c.name));
  };

  const handleStateSelect = (state: SupportedStateName) => {
    if (state === selectedState) {
      return;
    }

    const stateCommodities = getCommoditiesByState(state);

    setSelectedState(state);
    
    setSelectedDistrict('');
    setSelectedMarket('');
    setSelectedVariety('');

    if (!stateCommodities.some((c) => c.name === selectedCrop) && stateCommodities.length > 0) {
      setSelectedCrop(stateCommodities[0].name);
    }
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setSelectedMarket('');
  };

  // Commodities mapped based on state
  const commoditiesByState = useMemo(() => {
    return getCommoditiesByState(selectedState);
  }, [selectedState]);

  const districtsByState = useMemo(() => {
    const location = STATE_LOCATION_DATA.find((item) => item.state === selectedState);
    return location ? location.districts : [];
  }, [selectedState]);

  const marketsByDistrict = useMemo(() => {
    const district = districtsByState.find((item) => item.name === selectedDistrict);
    return district ? district.markets : [];
  }, [districtsByState, selectedDistrict]);

  const varietyOptions = useMemo(() => {
    return selectedState === 'Uttar Pradesh'
      ? ['Common', 'Desi', 'Hybrid', 'FAQ', 'Local', 'Malanad']
      : ['Local', 'Bold', 'Desi', 'Hybrid', 'FAQ'];
  }, [selectedState]);

  useEffect(() => {
    if (selectedState === 'Uttar Pradesh') {
      setSelectedVariety((current) => (varietyOptions.includes(current) ? current : (varietyOptions[0] ?? '')));
    } else {
      setSelectedVariety('');
    }
  }, [selectedState, varietyOptions]);

  const activeCropDetails = useMemo(() => {
    // If exact name is found
    let details = COMMODITIES_DATA.find(c => c.name === selectedCrop);
    
    // Fallback if not found
    if (!details && commoditiesByState.length > 0) {
      details = commoditiesByState[0];
    }
    
    return details || COMMODITIES_DATA[0];
  }, [selectedCrop, commoditiesByState]);

  // Sell storage advisory
  const advisory = useMemo(() => {
    const change = activeCropDetails.change;
    if (change > 5) {
      return {
        badge: 'Strong Hold Advisory',
        text: 'Prices are projected to rally in the next 15-20 days due to delayed supply arrivals. We strongly advise storing your crop in cold storage or warehousing to liquidate at higher target rates.',
        color: 'border-green-200 bg-green-50/50 text-green-800',
      };
    } else if (change < -5) {
      return {
        badge: 'Immediate Liquidation Advisory',
        text: 'A steep downward correction is expected as bumper harvests enter neighboring APMC nodes. We advise selling your arrivals immediately to secure current rates before prices descend.',
        color: 'border-red-200 bg-red-50/50 text-red-800',
      };
    } else {
      return {
        badge: 'Stable Pricing Advisory',
        text: 'Market rates are projected to remain relatively flat. Proceed with regular transactions. Consider selling incrementally over the coming week to balance transportation costs.',
        color: 'border-amber-200 bg-amber-50/50 text-amber-800',
      };
    }
  }, [activeCropDetails]);

  return (
    <section id="market-trends" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 left-0 -z-10 w-[600px] h-[600px] rounded-full border border-green-500/[0.02] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 left-0 -z-10 w-[400px] h-[400px] rounded-full border border-green-500/[0.03] -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionTitle
          badge="Live Forecasting Simulator"
          title="AI APMC Price Prediction Console"
          subtitle="Select your region and crop to test MandiVision's forecasting capabilities. View pricing forecasts, model accuracy logs, and agricultural selling advisories."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {/* Left panel: Selector controls */}
          <div className="lg:col-span-5 bg-background-off-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
            <div>
              {/* Step 1: Select State */}
              <div className="mb-6">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  Step 1: Select State APMC Region
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Gujarat', 'Uttar Pradesh'] as const).map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => handleStateSelect(state)}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-bold transition-all duration-200 cursor-pointer ${
                        selectedState === state
                          ? 'bg-primary-green text-white border-primary-green shadow-sm'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-primary-green/30'
                      }`}
                    >
                      <MapPin className="h-4.5 w-4.5 shrink-0" />
                      <span>{state}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Crop */}
              <div className="mb-6">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  Step 2: Choose Monitored Commodity
                </label>
                
                <div className="mb-3">
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-primary-green"
                  >
                    {commoditiesByState.map((commodity) => (
                      <option key={commodity.name} value={commodity.name}>
                        {commodity.name} — {commodity.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Select District (Optional) */}
              <div className="mb-6">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  Step 3: Select District (Optional)
                </label>

                <div className="mb-3">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => { handleDistrictSelect(e.target.value); }}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-primary-green"
                  >
                    <option value="">Any District</option>
                    {districtsByState.map((district) => (
                      <option key={district.name} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 4: Select Market (Optional) */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  Step 4: Select Market (Optional)
                </label>

                {/* Toggleable market panel (slide-down) */}
                <div className="mb-3">
                  <select
                    value={selectedMarket}
                    onChange={(e) => { setSelectedMarket(e.target.value); }}
                    disabled={selectedDistrict === ''}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-primary-green disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">Any Market</option>
                    {marketsByDistrict.map((market) => (
                      <option key={market} value={market}>
                        {market}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 5: Additional Inputs */}
              <div className="mt-6 pt-6 border-t border-gray-100/80">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  Step 5: Additional Inputs
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 block mb-2">
                      Price Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-primary-green transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 block mb-2">
                      Variety
                    </label>
                    <select
                      value={selectedVariety}
                      onChange={(e) => setSelectedVariety(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-primary-green transition-all"
                      disabled={selectedState !== 'Uttar Pradesh'}
                    >
                      {selectedState === 'Uttar Pradesh' ? (
                        varietyOptions.map((variety) => (
                          <option key={variety} value={variety}>
                            {variety}
                          </option>
                        ))
                      ) : (
                        <option value="">Variety is not required for Gujarat</option>
                      )}
                    </select>
                  </div>

                  <div className="sm:col-span-2 rounded-2xl border border-green-100 bg-green-50/50 p-4 text-sm text-green-800 leading-relaxed">
                    Date, district, market, and variety are captured here.
                  </div>
                </div>
              </div>
            </div>

            {/* Hint Box at bottom */}
            <div className="mt-8 p-4 bg-white rounded-2xl border border-gray-150/40 flex items-start gap-3">
              <Info className="h-5 w-5 text-accent-brown shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-normal">
                Don't see your regional commodity? MandiVision integrates with local APMC market databases, and new data profiles compile every Tuesday.
              </p>
            </div>
          </div>

          {/* Right panel: Live simulated results */}
          <div className="lg:col-span-7 bg-gradient-to-br from-green-950 to-[#0e1d10] border border-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-green-950/20 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Backlight */}
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-primary-green/10 to-transparent blur-3xl rounded-full" />

            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-green-900/50 pb-5 mb-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-secondary-yellow uppercase">
                    Forecasting Console
                  </span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {selectedState}
                    {selectedDistrict ? ` • ${selectedDistrict}` : ' • Any District'}
                    {selectedMarket ? ` • ${selectedMarket}` : ' • Any Market'}
                  </p>
                  <h3 className="text-2xl font-extrabold text-white mt-1">
                    {activeCropDetails.name} <span className="text-xs font-medium text-gray-400">({activeCropDetails.category})</span>
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-900/40 border border-green-800 rounded-xl text-xs font-semibold">
                  <CheckCircle className="h-3.5 w-3.5 text-primary-green" />
                  <span>Model Confidence: {activeCropDetails.accuracy}%</span>
                </div>
              </div>

              {/* Price analytics cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Current Price */}
                <div className="bg-green-900/20 border border-green-900/40 p-5 rounded-2xl">
                  <span className="text-xs font-semibold text-gray-400 block mb-1">Current Price (Average APMC)</span>
                  <span className="text-3xl font-extrabold text-white">₹{activeCropDetails.currentPrice.toLocaleString('en-IN')}<span className="text-xs font-semibold text-gray-500">/Qtl</span></span>
                  <span className="block text-[10px] text-gray-500 mt-1">Updated 10h ago</span>
                </div>

                {/* Predicted Price */}
                <div className="bg-green-900/30 border border-green-900/60 p-5 rounded-2xl relative overflow-hidden">
                  {/* Decorative tag */}
                  <div className="absolute top-0 right-0 bg-primary-green text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-xl uppercase tracking-wider">
                    AI Forecast
                  </div>
                  <span className="text-xs font-semibold text-gray-300 block mb-1">AI-Predicted Price (30 Days)</span>
                  <span className="text-3xl font-extrabold text-secondary-yellow">₹{activeCropDetails.predictedPrice.toLocaleString('en-IN')}<span className="text-xs font-semibold text-green-600">/Qtl</span></span>
                  
                  {/* Trend Indicator */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {activeCropDetails.trend === 'up' && (
                      <span className="inline-flex items-center text-xs font-bold text-primary-green">
                        <ArrowUpRight className="h-4.5 w-4.5 mr-0.5 shrink-0" />
                        {activeCropDetails.change}% Upward Trend
                      </span>
                    )}
                    {activeCropDetails.trend === 'down' && (
                      <span className="inline-flex items-center text-xs font-bold text-red-400">
                        <ArrowDownRight className="h-4.5 w-4.5 mr-0.5 shrink-0" />
                        {activeCropDetails.change}% Downward Trend
                      </span>
                    )}
                    {activeCropDetails.trend === 'stable' && (
                      <span className="inline-flex items-center text-xs font-bold text-gray-300">
                        <Minus className="h-4.5 w-4.5 mr-0.5 shrink-0" />
                        Stable Pricing
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Advisory Card */}
              <div className={`border rounded-2xl p-5 ${advisory.color}`}>
                <div className="text-xs font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  <span>{advisory.badge}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {advisory.text}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap gap-4 items-center justify-between border-t border-green-900/30 pt-6">
              <span className="text-[11px] text-gray-500 leading-normal max-w-sm">
                *Predictions use seasonal decomposition and LSTM neural networks built on 7 years of market volume indices.
              </span>
              <Link to="/dashboard">
                <Button
                  variant="accent"
                  size="sm"
                  className="font-bold text-white shadow-lg shadow-yellow-950/20 py-2.5 px-5 shrink-0 cursor-pointer"
                >
                  Start Smart Forecasting
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketTrends;
