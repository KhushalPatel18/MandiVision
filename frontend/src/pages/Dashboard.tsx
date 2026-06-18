import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PredictionForm from '../components/dashboard/PredictionForm';
import MarketSummary from '../components/dashboard/MarketSummary';
import RecentTrends from '../components/dashboard/RecentTrends';
import QuickInsights from '../components/dashboard/QuickInsights';
import Card from '../components/ui/Card';
import { Cpu } from 'lucide-react';
import { predictPrice } from '../services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (formData: {
    state: string;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    forecastPeriod: 7 | 15 | 30;
  }) => {
    setIsLoading(true);
    try {
      // Fetch predictions using our services api
      const prediction = await predictPrice(formData);
      // Navigate to /forecast and pass both the request variables and response data!
      navigate('/forecast', {
        state: {
          formData,
          prediction,
        },
      });
    } catch (err) {
      console.error('Failed to generate forecast:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50/55 border border-green-200/50 text-primary mb-3">
              <Cpu className="h-3 w-3" />
              <span>Agri-intelligence Neural Net</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-dark tracking-tight">
              AI Price Forecasting Console
            </h1>
            <p className="text-muted mt-2 text-sm sm:text-base max-w-xl">
              Specify your region, crop, and variety to compile neural network price predictions and risk advisory summaries.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <Card className="border border-gray-100 shadow-xl shadow-green-950/[0.01]">
                <div className="border-b border-gray-100 pb-5 mb-6">
                  <h2 className="text-xl font-bold text-text-dark">Forecast Parameters</h2>
                  <p className="text-xs text-muted mt-1">Fill in the fields below to run deep forecasting iterations.</p>
                </div>
                <PredictionForm isLoading={isLoading} onGenerate={handleGenerate} />
              </Card>
            </div>

            {/* Quick Widgets Column */}
            <div className="lg:col-span-4 space-y-8">
              <RecentTrends />
              <QuickInsights />
              <MarketSummary />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
