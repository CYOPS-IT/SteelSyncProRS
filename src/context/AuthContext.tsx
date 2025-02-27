import React, { createContext, useContext } from 'react';

// Simple context with no actual authentication
interface AuthContextType {
  user: null;
  userProfile: null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: null, userProfile: null }}>
      {children}
    </AuthContext.Provider>
  );
};