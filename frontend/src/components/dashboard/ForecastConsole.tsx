import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sprout, ShoppingBag, Layers, Calendar, Sparkles } from 'lucide-react';
import Select from '../ui/Select';
import { STATE_LOCATION_DATA, COMMODITIES_DATA, VARIETY_OPTIONS_BY_STATE } from '../../utils/data';
import type { SupportedStateName } from '../../types';

interface ForecastConsoleProps {
  onGenerate: (data: {
    state: SupportedStateName;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    horizon: number;
  }) => void;
  isLoading: boolean;
}

const ForecastConsole: React.FC<ForecastConsoleProps> = ({ onGenerate, isLoading }) => {
  const states: SupportedStateName[] = ['Gujarat', 'Uttar Pradesh'];
  const [selectedState, setSelectedState] = useState<SupportedStateName>('Gujarat');
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [markets, setMarkets] = useState<string[]>([]);
  const [selectedMarket, setSelectedMarket] = useState('');
  const [commodities, setCommodities] = useState<string[]>([]);
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [varieties, setVarieties] = useState<string[]>([]);
  const [selectedVariety, setSelectedVariety] = useState('');
  const [selectedHorizon, setSelectedHorizon] = useState<number>(30);

  // Initialize commodities
  useEffect(() => {
    const list = COMMODITIES_DATA.map(c => c.name);
    setCommodities(list);
    if (list.length > 0) setSelectedCommodity(list[0]);
  }, []);

  // Update districts when state changes
  useEffect(() => {
    const stateData = STATE_LOCATION_DATA.find(s => s.state === selectedState);
    if (stateData) {
      const distNames = stateData.districts.map(d => d.name);
      setDistricts(distNames);
      if (distNames.length > 0) {
        setSelectedDistrict(distNames[0]);
      }
    }
    const stateVars = VARIETY_OPTIONS_BY_STATE[selectedState] || ['FAQ', 'Local'];
    setVarieties(stateVars);
    if (stateVars.length > 0) {
      setSelectedVariety(stateVars[0]);
    }
  }, [selectedState]);

  // Update markets when district changes
  useEffect(() => {
    const stateData = STATE_LOCATION_DATA.find(s => s.state === selectedState);
    if (stateData && selectedDistrict) {
      const distData = stateData.districts.find(d => d.name === selectedDistrict);
      if (distData) {
        setMarkets(distData.markets);
        if (distData.markets.length > 0) {
          setSelectedMarket(distData.markets[0]);
        }
      }
    }
  }, [selectedState, selectedDistrict]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      state: selectedState,
      district: selectedDistrict,
      market: selectedMarket,
      commodity: selectedCommodity,
      variety: selectedVariety,
      horizon: selectedHorizon,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
      <div className="border-b border-slate-100 pb-4 mb-4">
        <h2 className="text-lg font-bold text-text-dark">Generate New Prediction</h2>
        <p className="text-xs text-gray-400 mt-0.5">Select location, commodity, variety, and timeline to run price prediction models.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* State */}
          <Select
            label="State"
            placeholder="Select State"
            options={states}
            value={selectedState}
            onChange={(val) => setSelectedState(val as SupportedStateName)}
            icon={<MapPin className="h-4 w-4 text-primary-green" />}
          />

          {/* District */}
          <Select
            label="District"
            placeholder="Select District"
            options={districts}
            value={selectedDistrict}
            onChange={(val) => setSelectedDistrict(val)}
            icon={<MapPin className="h-4 w-4 text-emerald-500" />}
          />

          {/* Market */}
          <Select
            label="APMC Mandi Market"
            placeholder="Select Market"
            options={markets}
            value={selectedMarket}
            onChange={(val) => setSelectedMarket(val)}
            icon={<ShoppingBag className="h-4 w-4 text-amber-500" />}
          />

          {/* Commodity */}
          <Select
            label="Commodity"
            placeholder="Select Crop"
            options={commodities}
            value={selectedCommodity}
            onChange={(val) => setSelectedCommodity(val)}
            icon={<Sprout className="h-4 w-4 text-lime-600" />}
          />

          {/* Variety */}
          <Select
            label="Variety"
            placeholder="Select Variety"
            options={varieties}
            value={selectedVariety}
            onChange={(val) => setSelectedVariety(val)}
            icon={<Layers className="h-4 w-4 text-teal-500" />}
          />

          {/* Forecast Horizon */}
          <Select
            label="Forecast Period"
            options={[
              { value: '7', label: '7 Days Forecast' },
              { value: '15', label: '15 Days Forecast' },
              { value: '30', label: '30 Days Forecast' },
              { value: '90', label: '90 Days Forecast' },
            ]}
            value={String(selectedHorizon)}
            onChange={(val) => setSelectedHorizon(Number(val))}
            icon={<Calendar className="h-4 w-4 text-purple-500" />}
          />
        </div>

        <div className="flex justify-end pt-2">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl bg-primary-green hover:bg-green-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85 transition-colors duration-200 shadow-sm"
          >
            {isLoading ? (
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                <span>Running Prediction Models...</span>
              </div>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-secondary-yellow" />
                <span>Predict Price</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ForecastConsole;
