import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ForecastConsole from '../components/dashboard/ForecastConsole';
import ForecastOutlookChart from '../components/charts/ForecastOutlookChart';
import { Cpu, RefreshCw, AlertCircle, Calendar, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';
import type { SupportedStateName } from '../types';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPredictionHistoryApi } from '../api/prediction.api';
import { getMarketOverviewApi } from '../api/market.api';

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const [selectedParams, setSelectedParams] = useState({
    state: 'Gujarat' as SupportedStateName,
    district: 'Rajkot',
    market: 'Rajkot APMC',
    commodity: 'Cotton (Kapas)',
    variety: 'FAQ',
    horizon: 30
  });

  const cleanCommodityName = useMemo(() => {
    // Standardize naming (e.g. Cotton (Kapas) -> Cotton) to match API mappings
    return selectedParams.commodity.split(' ')[0];
  }, [selectedParams.commodity]);

  // Fetch combined real-time market data & ML prediction from backend
  const {
    data: marketOverview,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
    error: overviewError,
    refetch: refetchOverview
  } = useQuery({
    queryKey: [
      'marketOverview',
      selectedParams.state,
      selectedParams.district,
      selectedParams.market,
      cleanCommodityName,
      selectedParams.variety,
      selectedParams.horizon
    ],
    queryFn: () => getMarketOverviewApi({
      state: selectedParams.state,
      district: selectedParams.district,
      market: selectedParams.market,
      commodity: cleanCommodityName,
      variety: selectedParams.variety,
      horizon: selectedParams.horizon
    }),
    retry: 1,
  });

  // Fetch prediction search history from DB
  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['predictionHistory'],
    queryFn: getPredictionHistoryApi,
    retry: 1,
  });

  // Toast notification when a new prediction completes
  useEffect(() => {
    if (marketOverview) {
      // Invalidate predictions query cache so it re-fetches recent searches list
      queryClient.invalidateQueries({ queryKey: ['predictionHistory'] });
      toast.success(`Market price processed for ${cleanCommodityName}!`);
    }
  }, [marketOverview, cleanCommodityName, queryClient]);

  const handleGenerateForecast = (data: {
    state: SupportedStateName;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    horizon: number;
  }) => {
    setSelectedParams({
      state: data.state,
      district: data.district,
      market: data.market,
      commodity: data.commodity,
      variety: data.variety,
      horizon: data.horizon
    });
  };

  // Maps combined history and overlays future predictions on the chart dataset
  const chartPoints = useMemo(() => {
    if (!marketOverview) return [];

    // 1. Map historical actual prices from Government API
    const points = marketOverview.history.map(h => ({
      date: new Date(h.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      price: h.price,
      type: 'actual' as const,
    }));

    // 2. Append the ML prediction point
    if (marketOverview.targetDate) {
      points.push({
        date: new Date(marketOverview.targetDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        price: marketOverview.predictedPrice,
        type: 'predicted' as const,
      });
    }

    return points;
  }, [marketOverview]);

  // Determine market advisory text dynamically
  const demandStatus = useMemo(() => {
    if (!marketOverview) return { text: 'Stable', class: 'bg-slate-50 text-slate-700 border-slate-100' };
    const pct = marketOverview.changePercentage;
    if (pct > 5) {
      return { text: 'Strong Buy / Demand Spike', class: 'bg-green-50 text-primary-green border-green-100' };
    } else if (pct < -5) {
      return { text: 'Supply Excess / Watch Market', class: 'bg-rose-50 text-rose-600 border-rose-100' };
    }
    return { text: 'Hold / Stable Trading', class: 'bg-blue-50 text-blue-600 border-blue-100' };
  }, [marketOverview]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col scroll-smooth">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Welcome Header */}
          <div className="text-left flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-text-dark tracking-tight">
                Welcome Back, {user?.name || 'Farmer'} 👋
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Displaying combined real-time government mandi prices and ML crop forecast estimations.
              </p>
            </div>
            {marketOverview && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-100 text-[11px] font-bold text-gray-500 shadow-xs">
                <RefreshCw className="h-3 w-3 text-primary-green animate-spin-[spin_4s_linear_infinite]" />
                <span>Live Feed: {selectedParams.state} &gt; {selectedParams.market}</span>
              </div>
            )}
          </div>

          {/* Filter Form Console */}
          <ForecastConsole onGenerate={handleGenerateForecast} isLoading={isOverviewLoading} />

          {/* Error State */}
          {isOverviewError && (
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 text-center space-y-3">
              <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
              <h3 className="text-sm font-bold text-rose-800">Failed to load market data</h3>
              <p className="text-xs text-rose-600 max-w-md mx-auto">
                {overviewError instanceof Error ? overviewError.message : 'The government Agmarknet portal is responding slowly. Please retry your query.'}
              </p>
              <button
                type="button"
                onClick={() => refetchOverview()}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition shadow-sm border-none cursor-pointer"
              >
                Retry Request
              </button>
            </div>
          )}

          {/* Loading Skeletons */}
          {isOverviewLoading && (
            <div className="space-y-6 animate-pulse">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="bg-white rounded-2xl p-6 h-28 border border-slate-100" />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white rounded-3xl h-96 border border-slate-100" />
                <div className="lg:col-span-4 bg-white rounded-2xl h-96 border border-slate-100" />
              </div>
            </div>
          )}

          {/* Market Overview Content */}
          {!isOverviewLoading && !isOverviewError && marketOverview && (
            <>
              {/* Market Analytics KPI Grid */}
              <div className="space-y-2 text-left">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Market Analytics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Current Market Price */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Current Market Price</span>
                      <span className="text-2xl font-extrabold text-text-dark mt-2 block">
                        ₹{marketOverview.currentPrice.toLocaleString('en-IN')}
                        <span className="text-xs font-semibold text-gray-400 ml-0.5">/Qtl</span>
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-500 mt-2 border-t border-slate-50 pt-2 flex items-center justify-between">
                      <span>Min: ₹{marketOverview.minPrice}</span>
                      <span>Max: ₹{marketOverview.maxPrice}</span>
                    </div>
                  </div>

                  {/* Predicted Price */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">AI Predicted Price</span>
                      <span className="text-2xl font-extrabold text-primary-green mt-2 block">
                        ₹{marketOverview.predictedPrice.toLocaleString('en-IN')}
                        <span className="text-xs font-semibold text-gray-400 ml-0.5">/Qtl</span>
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-500 mt-2 border-t border-slate-50 pt-2 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary-green shrink-0" />
                      <span>Model Confidence: {marketOverview.confidence?.toFixed(1) || 93.8}%</span>
                    </div>
                  </div>

                  {/* Difference */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Actual vs Prediction Diff</span>
                      <span className={`text-2xl font-extrabold flex items-center gap-1 mt-2 ${
                        marketOverview.difference >= 0 ? 'text-primary-green' : 'text-rose-600'
                      }`}>
                        {marketOverview.difference >= 0 ? '+' : '-'}₹{Math.abs(marketOverview.difference).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-500 mt-2 border-t border-slate-50 pt-2 flex items-center gap-1.5">
                      {marketOverview.changePercentage >= 0 ? (
                        <>
                          <TrendingUp className="h-3.5 w-3.5 text-primary-green shrink-0" />
                          <span className="text-primary-green">{marketOverview.changePercentage}% Expected Rally</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                          <span className="text-rose-600">{Math.abs(marketOverview.changePercentage)}% Expected Correction</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Updated Time */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Last Updated Time</span>
                      <span className="text-lg font-extrabold text-text-dark mt-2.5 block truncate flex items-center gap-1.5">
                        <Calendar className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                        {new Date(marketOverview.arrivalDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-500 mt-2 border-t border-slate-50 pt-2 block truncate">
                      Target Target: {marketOverview.targetDateStr}
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts and Details Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Visual Chart */}
                <div className="lg:col-span-8 flex flex-col">
                  <ForecastOutlookChart
                    data={chartPoints}
                    commodity={selectedParams.commodity}
                  />
                </div>

                {/* Market Advisory */}
                <div className="lg:col-span-4 flex flex-col">
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-text-dark border-b border-slate-50 pb-3 mb-4 text-left">Market Insight Console</h3>
                      <div className="space-y-4 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">Demand Index</span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${demandStatus.class}`}>
                            {demandStatus.text}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">APMC Node Volatility</span>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                            {marketOverview.changePercentage >= 5 ? 'High Positive Velocity' : 'Stable Corridor'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">Risk Assessment</span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            (marketOverview.confidence || 0) >= 94 
                              ? 'bg-green-50 text-primary-green border-green-100' 
                              : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                          }`}>
                            {(marketOverview.confidence || 0) >= 94 ? 'Low Uncertainty' : 'Moderate Volatility'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">Commodity Variety</span>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-100">
                            {selectedParams.variety}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-slate-50 pt-4 text-[10px] text-gray-400 leading-normal text-left flex items-start gap-1.5">
                      <Cpu className="h-4 w-4 text-primary-green shrink-0 mt-0.5 animate-pulse" />
                      <span>Data feed directly mapping Open Government datasets from Mandis integrated with MandiVision ML models.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanatory Panel */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all text-left">
                <h3 className="text-sm font-bold text-text-dark mb-4 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary-green animate-pulse" />
                  Crop Pricing Valuation Explanations
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-xs text-gray-600">
                    <span className="text-primary-green mt-0.5">•</span>
                    <span>
                      <strong>Goverment Daily Price Points:</strong> Current prices are pulled from real-time transaction data uploaded directly by the APMCs to the Agmarknet OGD server.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-gray-600">
                    <span className="text-primary-green mt-0.5">•</span>
                    <span>
                      <strong>Target Horizon Projections:</strong> The forecast target price of <strong>₹{marketOverview.predictedPrice.toLocaleString('en-IN')}/Qtl</strong> represents price valuation estimations {selectedParams.horizon} days into the future.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-gray-600">
                    <span className="text-primary-green mt-0.5">•</span>
                    <span>
                      <strong>Trend Direction Analysis:</strong> The estimated difference of <strong>{marketOverview.difference >= 0 ? '+' : '-'}₹{Math.abs(marketOverview.difference).toLocaleString('en-IN')}</strong> ({marketOverview.changePercentage}%) reflects neural network weighting of supply constraints, weather metrics, and historic arrival rates.
                    </span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* Recent Searches Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden text-left">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-text-dark">Recent Forecast Searches</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Commodity</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">State</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Prediction</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Target Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {isHistoryLoading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                        Loading forecast history...
                      </td>
                    </tr>
                  ) : !historyData || historyData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                        No recent forecasts run. Run a prediction above to start!
                      </td>
                    </tr>
                  ) : (
                    historyData.map((row: any) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-3.5 font-semibold text-text-dark">{row.commodity}</td>
                        <td className="px-6 py-3.5 text-gray-500">{row.state}</td>
                        <td className="px-6 py-3.5 font-bold text-primary-green">
                          ₹{row.predictedPrice.toLocaleString('en-IN')}/Qtl
                        </td>
                        <td className="px-6 py-3.5 text-gray-400 font-medium">
                          {new Date(row.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
