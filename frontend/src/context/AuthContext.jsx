import React, { useCallback, useState, useEffect, createContext, useContext } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from stored token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authApi.getMe()
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authApi.login(email, password);
    const { token, user: userData } = res.data;
    localStorage.setItem('token', token);
    setUser(userData);
    return true;
  }, []);

  const adminLogin = useCallback(async (email, password) => {
    const res = await authApi.adminLogin(email, password);
    const { token, user: userData } = res.data;
    localStorage.setItem('token', token);
    setUser(userData);
    return true;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const res = await authApi.register(name, email, password);
    const { token, user: userData } = res.data;
    localStorage.setItem('token', token);
    setUser(userData);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      const res = await authApi.updateProfile(updates);
      setUser(res.data);
    } catch {
      // Fallback to local update if API fails
      setUser(prev => prev ? { ...prev, ...updates } : null);
    }
  }, []);

  if (loading) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          loading: true,
          login: async () => {},
          adminLogin: async () => {},
          signup: async () => {},
          logout: () => {},
          updateProfile: async () => {},
        }}
      >
        <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🥭</span>
            <p className="text-[#AAAAAA]">Initializing Ceylon Mango...</p>
          </div>
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        adminLogin,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}