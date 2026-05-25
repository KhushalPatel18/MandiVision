import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Path */}
        <Route path="/" element={<Home />} />

        {/* Catch-all Wildcard Route pointing back to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
