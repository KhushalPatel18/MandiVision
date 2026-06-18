import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Forecast from '../pages/Forecast';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Path */}
        <Route path="/" element={<Home />} />

        {/* Forecast Dashboard Input Collection */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Detailed Price Forecast & AI Analytics View */}
        <Route path="/forecast" element={<Forecast />} />

        {/* Catch-all Wildcard Route pointing back to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
