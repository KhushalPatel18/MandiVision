import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Forecast from '../pages/Forecast';
import AuthFormPage from '../pages/AuthFormPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Path */}
        <Route path="/" element={<Home />} />

        {/* Auth Module Path — redirects to dashboard if already logged in */}
        <Route
          path="/authform"
          element={
            <PublicRoute>
              <AuthFormPage />
            </PublicRoute>
          }
        />
        <Route path="/login" element={<Navigate to="/authform?mode=login" replace />} />
        <Route path="/signup" element={<Navigate to="/authform?mode=signup" replace />} />
        <Route path="/auth" element={<Navigate to="/authform?mode=login" replace />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forecast"
          element={
            <ProtectedRoute>
              <Forecast />
            </ProtectedRoute>
          }
        />

        {/* Catch-all Wildcard Route pointing back to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
