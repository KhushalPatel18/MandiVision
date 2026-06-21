import React, { useState, useRef, useMemo } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import OverviewStats from '../components/dashboard/OverviewStats';
import ForecastConsole from '../components/dashboard/ForecastConsole';
import PredictionResultHero, { PredictionHeroData } from '../components/dashboard/PredictionResultHero';
import ForecastOutlookChart from '../components/charts/ForecastOutlookChart';
import ModelExplanation from '../components/dashboard/ModelExplanation';
import HistoricalPriceAnalytics from '../components/charts/HistoricalPriceAnalytics';
import MarketIntelligence from '../components/dashboard/MarketIntelligence';
import TopCommodities from '../components/dashboard/TopCommodities';
import AIInsightsCenter from '../components/insights/AIInsightsCenter';
import StateMarketOverview from '../components/dashboard/StateMarketOverview';
import RiskAssessment from '../components/analytics/RiskAssessment';
import RecentForecastsTable from '../components/tables/RecentForecastsTable';
import CTASectionDashboard from '../components/dashboard/CTASectionDashboard';
import { Cpu } from 'lucide-react';
import type { SupportedStateName } from '../types';

// Price forecast generator helper
const generateForecastData = (commodity: string, market: string, horizon: number) => {
  let basePrice = 4500;
  let change = 4.2;
  let status: 'Strong Buy' | 'Neutral' | 'Watch Market' | 'Hold' = 'Strong Buy';
  let trend: 'up' | 'down' | 'stable' = 'up';
  
  if (commodity.includes('Cotton')) {
    basePrice = 7200;
    change = 6.25;
    status = 'Strong Buy';
    trend = 'up';
  } else if (commodity.includes('Onion')) {
    basePrice = 1850;
    change = -13.51;
    status = 'Watch Market';
    trend = 'down';
  } else if (commodity.includes('Soybean')) {
    basePrice = 4600;
    change = 1.74;
    status = 'Neutral';
    trend = 'stable';
  } else if (commodity.includes('Groundnut')) {
    basePrice = 6800;
    change = 5.15;
    status = 'Strong Buy';
    trend = 'up';
  } else if (commodity.includes('Wheat')) {
    basePrice = 2450;
    change = 2.86;
    status = 'Hold';
    trend = 'up';
  } else if (commodity.includes('Potato')) {
    basePrice = 1450;
    change = 18.62;
    status = 'Strong Buy';
    trend = 'up';
  } else if (commodity.includes('Mustard')) {
    basePrice = 5700;
    change = 3.12;
    status = 'Hold';
    trend = 'up';
  } else if (commodity.includes('Sugarcane')) {
    basePrice = 350;
    change = 0.5;
    status = 'Neutral';
    trend = 'stable';
  } else if (commodity.includes('Rice')) {
    basePrice = 3200;
    change = 4.8;
    status = 'Strong Buy';
    trend = 'up';
  }

  const predictedPrice = Math.round(basePrice * (1 + change / 100));
  const confidence = 91 + Math.random() * 7;
  const rangeLow = Math.round(predictedPrice * 0.97);
  const rangeHigh = Math.round(predictedPrice * 1.03);

  const targetDateObj = new Date();
  targetDateObj.setDate(targetDateObj.getDate() + horizon);
  const targetDateStr = targetDateObj.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const points = [];
  const start = new Date();
  start.setDate(start.getDate() - 30);

  let currentWalker = basePrice * 0.94;
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    currentWalker += (Math.random() - 0.45) * (basePrice * 0.012);
    points.push({
      date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      price: Math.round(currentWalker),
      type: 'actual' as const,
    });
  }

  points.push({
    date: 'Today',
    price: basePrice,
    type: 'actual' as const,
  });

  const stepCount = 5;
  const stepDays = Math.ceil(horizon / stepCount);
  let predictedWalker = basePrice;
  const priceDelta = (predictedPrice - basePrice) / stepCount;

  for (let i = 1; i <= stepCount; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i * stepDays);
    predictedWalker += priceDelta + (Math.random() - 0.5) * (basePrice * 0.005);
    points.push({
      date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      price: Math.round(i === stepCount ? predictedPrice : predictedWalker),
      type: 'predicted' as const,
    });
  }

  return {
    hero: {
      commodity,
      market,
      predictedPrice,
      currentPrice: basePrice,
      confidence,
      rangeLow,
      rangeHigh,
      targetDate: targetDateStr,
      status,
      trend,
      change,
    } as PredictionHeroData,
    chartPoints: points
  };
};

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedParams, setSelectedParams] = useState({
    commodity: 'Cotton (Kapas)',
    market: 'Rajkot APMC',
    horizon: 30
  });

  // Scroll targets references
  const consoleRef = useRef<HTMLDivElement>(null);
  const trendsRef = useRef<HTMLDivElement>(null);

  const forecastData = useMemo(() => {
    return generateForecastData(
      selectedParams.commodity,
      selectedParams.market,
      selectedParams.horizon
    );
  }, [selectedParams]);

  const handleGenerateForecast = (data: {
    state: SupportedStateName;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    horizon: number;
  }) => {
    setIsLoading(true);
    // Simulate complex model inference computation
    setTimeout(() => {
      setSelectedParams({
        commodity: data.commodity,
        market: data.market,
        horizon: data.horizon
      });
      setIsLoading(false);
      // Smooth scroll down to view prediction result cards
      const el = document.getElementById('prediction-results-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1200);
  };

  const handleScrollToConsole = () => {
    consoleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScrollToTrends = () => {
    trendsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background-off-white flex flex-col scroll-smooth">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section 1: Page Header & Stats Dashboard Overview */}
          <div ref={trendsRef} className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50/55 border border-green-200/50 text-primary-green mb-3">
              <Cpu className="h-3.5 w-3.5 animate-pulse" />
              <span>Live Market Intelligence Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-dark tracking-tight">
              AI Crop Price Forecasting Console
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              Generate accurate commodity price forecasts powered by machine learning, multi-year seasonality trends, and historical APMC mandi transactional records.
            </p>
          </div>

          {/* Quick Metrics Stats Card Section */}
          <OverviewStats />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Panel - Inputs Console */}
            <div ref={consoleRef} className="lg:col-span-4 space-y-8">
              <ForecastConsole onGenerate={handleGenerateForecast} isLoading={isLoading} />
              <RiskAssessment />
            </div>

            {/* Right Panel - Analytics Results */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Anchor scroll point */}
              <div id="prediction-results-anchor" className="scroll-mt-28" />

              {/* Section 3: Hero Prediction Result Card */}
              <PredictionResultHero data={forecastData.hero} />

              {/* Section 4: Forecast Outlook Recharts Graph */}
              <ForecastOutlookChart 
                data={forecastData.chartPoints} 
                commodity={selectedParams.commodity} 
              />

              {/* Section 5: Why The Model Predicted This Explanation */}
              <ModelExplanation />

            </div>
          </div>

          {/* Full-width sections below */}
          
          {/* Section 6: Historical Price Trends Analytics */}
          <HistoricalPriceAnalytics basePrice={forecastData.hero.currentPrice} />

          {/* Section 7: Market Intelligence Spot Indexes */}
          <MarketIntelligence />

          {/* Section 8: Commodity Performance Grid */}
          <TopCommodities />

          {/* Section 9: AI Insights Center Recommendations */}
          <AIInsightsCenter />

          {/* Section 10: State Market Coverage Overview */}
          <StateMarketOverview />

          {/* Section 12: Paginated Recent Forecasts Tables Logs */}
          <RecentForecastsTable />

          {/* Section 13: Call to Action Banner */}
          <CTASectionDashboard 
            onScrollToConsole={handleScrollToConsole}
            onScrollToTrends={handleScrollToTrends}
          />

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
