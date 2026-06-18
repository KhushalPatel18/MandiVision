import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PriceCards from '../components/forecast/PriceCards';
import HistoricalChart from '../components/forecast/HistoricalChart';
import ForecastChart from '../components/forecast/ForecastChart';
import { DistributionChart, MonthlyComparison } from '../components/forecast/DistributionChart';
import MarketInsights from '../components/forecast/MarketInsights';
import RecommendationPanel from '../components/forecast/RecommendationPanel';
import CommodityOverview from '../components/forecast/CommodityOverview';
import AIInsights from '../components/forecast/AIInsights';
import Button from '../components/ui/Button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { predictPrice } from '../services/api';
import type { PredictionResponse } from '../types/prediction';

const Forecast: React.FC = () => {
  const location = useLocation();
  
  const [formData] = useState(location.state?.formData || {
    state: 'Gujarat',
    district: 'Rajkot',
    market: 'Rajkot APMC',
    commodity: 'Cotton (Kapas)',
    variety: 'FAQ',
    forecastPeriod: 30,
  });

  const [prediction, setPrediction] = useState<PredictionResponse | null>(location.state?.prediction || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If we don't have prediction in router state, fetch it on mount using fallback form data
    if (!prediction) {
      const fetchForecast = async () => {
        setLoading(true);
        try {
          const res = await predictPrice(formData);
          setPrediction(res);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchForecast();
    }
  }, [prediction, formData]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await predictPrice(formData);
      setPrediction(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top navigation row */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />} iconPosition="left">
                Back to Dashboard
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              icon={<RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />}
              iconPosition="left"
            >
              {loading ? 'Re-running Neural Net...' : 'Re-calculate Forecast'}
            </Button>
          </div>

          {loading || !prediction ? (
            <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
              <span className="relative flex h-12 w-12">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-12 w-12 border-4 border-t-transparent border-primary animate-spin"></span>
              </span>
              <p className="text-muted text-sm font-semibold animate-pulse">
                Running LSTM predictions & computing market indices...
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Commodity Title Block */}
              <CommodityOverview
                commodity={formData.commodity}
                market={formData.market}
                variety={formData.variety}
                currentPrice={prediction.currentPrice}
                growth={prediction.growth}
              />

              {/* KPI Cards Row */}
              <PriceCards
                currentPrice={prediction.currentPrice}
                forecastPrice={prediction.forecastPrice}
                growth={prediction.growth}
                confidence={prediction.confidence}
              />

              {/* Line Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <HistoricalChart data={prediction.historicalPrices} />
                <ForecastChart data={prediction.forecastPrices} />
              </div>

              {/* Secondary Charts & Insights Block */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <DistributionChart />
                <MonthlyComparison currentPrice={prediction.currentPrice} />
                <AIInsights commodity={formData.commodity} growth={prediction.growth} />
              </div>

              {/* Advisories Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <MarketInsights growth={prediction.growth} />
                </div>
                <div className="lg:col-span-2">
                  <RecommendationPanel growth={prediction.growth} />
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Forecast;
