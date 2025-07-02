"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { BACKEND_BASE_URL, API_BASE_URL } from "@/config";

// User interface based on the backend response
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
  avatar: string;
  backdrop: string;
  description: string;
  birthday: string;
  allow_adult: boolean;
  is_auto_next: boolean;
  is_auto_play: boolean;
  is_auto_skip_intro: boolean;
  is_private_favorites: boolean;
  is_banned: boolean;
  new_episodes: boolean;
  episode_date_changes: boolean;
  announcement_to_ongoing: boolean;
  comment_replies: boolean;
  comment_likes: boolean;
  review_replies: boolean;
  planned_reminders: boolean;
  new_selections: boolean;
  status_changes: boolean;
  new_seasons: boolean;
  subscription_expiration: boolean;
  subscription_renewal: boolean;
  payment_issues: boolean;
  tariff_changes: boolean;
  site_updates: boolean;
  maintenance: boolean;
  security_changes: boolean;
  new_features: boolean;
  email_verified_at: string | null;
  last_seen_at: string;
  created_at: string;
  updated_at: string;
  age: number;
  is_online: boolean;
  formatted_last_seen: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  USER: 'anime_user',
  TOKEN: 'anime_token',
} as const;

// Helper functions for localStorage
const storage = {
  get: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  set: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAuthenticated = !!(user && token);

  const clearError = () => setError(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = storage.get(STORAGE_KEYS.USER);
      const storedToken = storage.get(STORAGE_KEYS.TOKEN);

      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          setUser(parsedUser);
          setToken(storedToken);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          // Clear corrupted data
          storage.remove(STORAGE_KEYS.USER);
          storage.remove(STORAGE_KEYS.TOKEN);
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  // Save auth data to localStorage
  const saveAuthData = (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    storage.set(STORAGE_KEYS.USER, JSON.stringify(userData));
    storage.set(STORAGE_KEYS.TOKEN, tokenData);
  };

  // Clear auth data from state and localStorage
  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    storage.remove(STORAGE_KEYS.USER);
    storage.remove(STORAGE_KEYS.TOKEN);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // 1. Get CSRF cookie
      await fetch(`${BACKEND_BASE_URL}sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      // 2. Login request
      const response = await fetch(`${API_BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
        throw new Error(errorData.message || `HTTP ${response.status}: Login failed`);
      }

      const data: LoginResponse = await response.json();

      if (!data.user || !data.token) {
        throw new Error('Invalid response: missing user or token');
      }

      saveAuthData(data.user, data.token);
      return true;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Call backend logout endpoint if token exists
      if (token) {
        await fetch(`${API_BASE_URL}auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "X-Requested-With": "XMLHttpRequest",
          },
          credentials: "include",
        }).catch(error => {
          console.warn('Logout API call failed:', error);
          // Continue with local logout even if API call fails
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local auth data
      clearAuthData();
      setLoading(false);
    }
  };

  // Don't render children until auth state is initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        logout, 
        loading, 
        error, 
        isAuthenticated,
        clearError 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Utility function for making authenticated API requests
export const createAuthenticatedFetch = (token: string) => {
  return async (url: string, options: RequestInit = {}) => {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-Requested-With": "XMLHttpRequest",
    };

    return fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: "include",
    });
  };
};

// Export types for use in other components
export type { User, AuthContextType };
