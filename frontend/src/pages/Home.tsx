import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import MarketTrends from '../components/home/MarketTrends';
import HowItWorks from '../components/home/HowItWorks';
import SupportedStates from '../components/home/SupportedStates';
import CTASection from '../components/home/CTASection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-off-white flex flex-col scroll-smooth">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Area */}
        <HeroSection />

        {/* Stats Metrics */}
        <StatsSection />

        {/* Core Value Features */}
        <FeaturesSection />

        {/* Live Interactive Pricing Simulation Tool */}
        <MarketTrends />

        {/* Step-by-Step farmer guide */}
        <HowItWorks />

        {/* Regional scope map / APMC indicators */}
        <SupportedStates />

        {/* Call-to-Action banner */}
        <CTASection />
      </main>

      {/* Branding Footer */}
      <Footer />
    </div>
  );
};

export default Home;
