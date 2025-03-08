import React, { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  joinDate: string;
  profileImage?: string;
  user_metadata?: {
    company?: string;
  };
};

type SignInCredentials = {
  email: string;
  password: string;
};

type SignUpCredentials = {
  email: string;
  password: string;
  fullName: string;
  company?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<{ data: any; error: any }>;
  signUp: (credentials: SignUpCredentials) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  isAuthenticated: boolean;
};

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'demo@steelsyncpro.com',
    password: 'Demo123!',
    title: 'Production Manager',
    department: 'Manufacturing',
    joinDate: '2023-01-15',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=200&h=200',
    user_metadata: {
      company: 'Demo Company'
    }
  }
];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (credentials: SignInCredentials) => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Find user
      const mockUser = MOCK_USERS.find(u => u.email === credentials.email && u.password === credentials.password);
      
      if (!mockUser) {
        throw new Error('Invalid credentials. Try demo@steelsyncpro.com / Demo123!');
      }
      
      // Store user in localStorage with language preference
      const userToStore = { ...mockUser };
      localStorage.setItem('user', JSON.stringify(userToStore));
      
      // Create session user without password
      const { password: _, ...sessionUser } = userToStore;
      setUser(sessionUser);
      
      return { data: { user: sessionUser }, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      if (MOCK_USERS.some(u => u.email === credentials.email)) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        email: credentials.email,
        password: credentials.password,
        user_metadata: {
          full_name: credentials.fullName,
          company: credentials.company
        }
      };
      
      MOCK_USERS.push(newUser);
      
      // Create session user without password
      const { password: _, ...sessionUser } = newUser;
      setUser(sessionUser);
      
      return { data: { user: sessionUser }, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(null);
      
      // Force reload the page to clear any state
      window.location.href = '/';
      
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth }