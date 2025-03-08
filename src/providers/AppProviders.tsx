import React from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { TimezoneProvider } from '../contexts/TimezoneContext';
import { ThemeProvider } from '../contexts/ThemeContext';

const ProvidersWithAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <TimezoneProvider>
      <ThemeProvider isAuthenticated={isAuthenticated}>
        {children}
      </ThemeProvider>
    </TimezoneProvider>
  );
};

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ProvidersWithAuth>
        {children}
      </ProvidersWithAuth>
    </AuthProvider>
  );
};