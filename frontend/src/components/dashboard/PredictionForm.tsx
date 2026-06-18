import React, { useState, useEffect } from 'react';
import { getStates, getDistricts, getMarkets, getCommodities } from '../../services/api';
import { VARIETY_OPTIONS_BY_STATE } from '../../utils/data';
import { MapPin, Sprout, ShoppingBag, Layers, Calendar, Sparkles } from 'lucide-react';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface PredictionFormProps {
  isLoading: boolean;
  onGenerate: (data: {
    state: string;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    forecastPeriod: 7 | 15 | 30;
  }) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ isLoading, onGenerate }) => {
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);
  const [commodities, setCommodities] = useState<string[]>([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<7 | 15 | 30>(30);

  const [varieties, setVarieties] = useState<string[]>([]);

  // Load initial data
  useEffect(() => {
    const init = async () => {
      const stateList = await getStates();
      setStates(stateList);
      if (stateList.length > 0) {
        setSelectedState(stateList[0]);
      }

      const commodityList = await getCommodities();
      setCommodities(commodityList);
      if (commodityList.length > 0) {
        setSelectedCommodity(commodityList[0]);
      }
    };
    init();
  }, []);

  // Update districts when state changes
  useEffect(() => {
    if (!selectedState) return;
    const loadDistricts = async () => {
      const districtList = await getDistricts(selectedState);
      setDistricts(districtList);
      if (districtList.length > 0) {
        setSelectedDistrict(districtList[0]);
      } else {
        setSelectedDistrict('');
      }

      // Update varieties
      const stateVars = VARIETY_OPTIONS_BY_STATE[selectedState as keyof typeof VARIETY_OPTIONS_BY_STATE] || ['FAQ', 'Local'];
      setVarieties(stateVars);
      if (stateVars.length > 0) {
        setSelectedVariety(stateVars[0]);
      }
    };
    loadDistricts();
  }, [selectedState]);

  // Update markets when district changes
  useEffect(() => {
    if (!selectedState || !selectedDistrict) {
      setMarkets([]);
      setSelectedMarket('');
      return;
    }
    const loadMarkets = async () => {
      const marketList = await getMarkets(selectedState, selectedDistrict);
      setMarkets(marketList);
      if (marketList.length > 0) {
        setSelectedMarket(marketList[0]);
      } else {
        setSelectedMarket('');
      }
    };
    loadMarkets();
  }, [selectedState, selectedDistrict]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState || !selectedDistrict || !selectedMarket || !selectedCommodity) {
      return;
    }
    onGenerate({
      state: selectedState,
      district: selectedDistrict,
      market: selectedMarket,
      commodity: selectedCommodity,
      variety: selectedVariety,
      forecastPeriod: selectedPeriod,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* State */}
        <Select
          label="State"
          placeholder="Select State"
          options={states}
          value={selectedState}
          onChange={(val) => setSelectedState(val)}
          icon={<MapPin className="h-5 w-5 text-primary" />}
        />

        {/* District */}
        <Select
          label="District"
          placeholder="Select District"
          options={districts}
          value={selectedDistrict}
          onChange={(val) => setSelectedDistrict(val)}
          disabled={!selectedState}
          icon={<MapPin className="h-5 w-5 text-emerald-500" />}
        />

        {/* Market */}
        <Select
          label="Mandi Market"
          placeholder="Select APMC Market"
          options={markets}
          value={selectedMarket}
          onChange={(val) => setSelectedMarket(val)}
          disabled={!selectedDistrict}
          icon={<ShoppingBag className="h-5 w-5 text-amber-500" />}
        />

        {/* Commodity */}
        <Select
          label="Commodity"
          placeholder="Select Crop"
          options={commodities}
          value={selectedCommodity}
          onChange={(val) => setSelectedCommodity(val)}
          icon={<Sprout className="h-5 w-5 text-lime-500" />}
        />

        {/* Variety */}
        <Select
          label="Variety"
          placeholder="Select Crop Variety"
          options={varieties}
          value={selectedVariety}
          onChange={(val) => setSelectedVariety(val)}
          disabled={varieties.length === 0}
          icon={<Layers className="h-5 w-5 text-teal-500" />}
        />

        {/* Forecast Period */}
        <Select
          label="Forecast Period"
          options={[
            { value: '7', label: '7 Days Forecast' },
            { value: '15', label: '15 Days Forecast' },
            { value: '30', label: '30 Days Forecast' },
          ]}
          value={String(selectedPeriod)}
          onChange={(val) => setSelectedPeriod(Number(val) as 7 | 15 | 30)}
          icon={<Calendar className="h-5 w-5 text-purple-500" />}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full py-4 text-base font-bold shadow-lg shadow-green-900/10 cursor-pointer"
        disabled={isLoading || !selectedState || !selectedDistrict || !selectedMarket || !selectedCommodity}
        icon={isLoading ? (
          <span className="relative flex h-5 w-5 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 border-2 border-t-transparent border-white animate-spin"></span>
          </span>
        ) : <Sparkles className="h-5 w-5" />}
      >
        {isLoading ? 'Processing Neural Networks...' : 'Generate AI Forecast'}
      </Button>
    </form>
  );
};

export default PredictionForm;
