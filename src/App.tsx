import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Capabilities from './pages/Capabilities';
import Documentation from './pages/Documentation';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import { AppProviders } from './providers/AppProviders';

// Redirect component to handle authenticated users
const AuthRedirectWrapper = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (isAuthenticated && 
        (location.pathname === '/' || 
         location.pathname === '/portal' || 
         location.pathname === '/signin' || 
         location.pathname === '/signup')) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, location.pathname]);
  
  return null;
};

// Main app routes component
const AppRoutes = () => {
  return (
    <>
      <AuthRedirectWrapper />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="capabilities" element={<Capabilities />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portal" element={<Portal />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute redirectPath="/" />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* Redirect old routes to new portal page */}
          <Route path="signin" element={<Portal />} />
          <Route path="signup" element={<Portal />} />
          
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
};

export default App;