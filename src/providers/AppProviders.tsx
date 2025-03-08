import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { TimezoneProvider } from '../contexts/TimezoneContext';
import { ThemeProvider } from '../contexts/ThemeContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <TimezoneProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
      </TimezoneProvider>
    </AuthProvider>
  );
};