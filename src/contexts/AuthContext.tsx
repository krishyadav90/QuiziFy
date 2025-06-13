import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification('Quiz App', { 
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Quiz App', { 
            body: message,
            icon: '/favicon.ico',
            badge: '/favicon.ico'
          });
        }
      });
    }
  }
};

export type UserRole = 'teacher' | 'student' | 'personal';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  joinedAt?: string;
  profilePicture?: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      // Check for locally saved profile data (like profile picture)
      const localUserData = localStorage.getItem('user');
      const localProfile = localUserData ? JSON.parse(localUserData) : null;

      return {
        id: data.user_id,
        email: data.email,
        name: data.name,
        role: data.role as UserRole,
        joinedAt: data.created_at,
        profilePicture: localProfile?.profilePicture || data.avatar_url
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Request notification permission on app load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setLoading(false);
        
        if (session?.user) {
          // Defer the profile fetch with setTimeout to prevent deadlock
          setTimeout(async () => {
            const userProfile = await fetchUserProfile(session.user.id);
            setUser(userProfile);
            
            // Show welcome notification only, let React Router handle navigation
            if (userProfile && window.location.pathname === '/auth') {
              showNotification(`Welcome ${userProfile.name}! You're now signed in.`, 'success');
            }
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      
      if (session?.user) {
        setTimeout(async () => {
          const userProfile = await fetchUserProfile(session.user.id);
          setUser(userProfile);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      if (data.user) {
        showNotification('Successfully signed in!', 'success');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name,
            role,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        return false;
      }

      if (data.user) {
        showNotification('Account created! Please check your email to confirm your account.', 'success');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};