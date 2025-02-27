import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { UserProfile, fetchUserProfile, Role } from '../lib/auth';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isRole: (role: Role) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  const fetchProfile = async (userId: string) => {
    try {
      const profile = await fetchUserProfile(userId);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Refresh user profile data
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    const setData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
        }
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (err) {
        console.error("Unexpected error during session retrieval:", err);
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    setData();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }
    } catch (err) {
      console.error("Unexpected error during sign in:", err);
      throw err;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) {
        console.error("Sign up error:", error);
        throw error;
      }
      
      if (data.user) {
        try {
          // Create profile with RPC call to bypass RLS
          const { error: profileError } = await supabase.rpc('create_user_profile', {
            user_id: data.user.id,
            user_email: email,
            user_full_name: fullName,
            user_role: 'standard_user'
          });
          
          if (profileError) {
            console.error("Error creating profile:", profileError);
            throw profileError;
          }
        } catch (err) {
          console.error("Unexpected error creating profile:", err);
          throw err;
        }
      }
    } catch (err) {
      console.error("Unexpected error during sign up:", err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      // First clear any local state
      setUser(null);
      setSession(null);
      setUserProfile(null);
      
      // Then sign out from Supabase which destroys the session
      const { error } = await supabase.auth.signOut({
        scope: 'global' // This ensures all devices are signed out
      });
      
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
    } catch (err) {
      console.error("Unexpected error during sign out:", err);
      throw err;
    }
  };

  // Check if user has a specific role
  const isRole = (role: Role): boolean => {
    if (!userProfile) return false;
    return userProfile.role === role;
  };

  const value = {
    session,
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    isRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};