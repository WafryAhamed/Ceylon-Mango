import React, { useCallback, useState, createContext, useContext } from 'react';
const AuthContext = createContext(undefined);
export function AuthProvider({
  children
}) {
  const [user, setUser] = useState(null);
  const login = useCallback(async (email, _password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({
      id: '1',
      name: 'John Doe',
      email,
      role: 'customer',
      phone: '+94 77 123 4567',
      address: '42 Palm Avenue, Colombo 07, Sri Lanka'
    });
    return true;
  }, []);
  const adminLogin = useCallback(async (email, _password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({
      id: 'admin-1',
      name: 'Sarah Silva',
      email,
      role: 'admin',
      phone: '+94 77 987 6543'
    });
    return true;
  }, []);
  const signup = useCallback(async (name, email, _password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({
      id: '1',
      name,
      email,
      role: 'customer'
    });
    return true;
  }, []);
  const logout = useCallback(() => {
    setUser(null);
  }, []);
  const updateProfile = useCallback(updates => {
    setUser(prev => prev ? {
      ...prev,
      ...updates
    } : null);
  }, []);
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    adminLogin,
    signup,
    logout,
    updateProfile
  }}>
      
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}