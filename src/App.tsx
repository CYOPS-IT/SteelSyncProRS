import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Capabilities from './pages/Capabilities';
import Documentation from './pages/Documentation';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProviders } from './providers/AppProviders';

// Main app routes component
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="capabilities" element={<Capabilities />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppProviders>
        <AppRoutes />
        </AppProviders>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;