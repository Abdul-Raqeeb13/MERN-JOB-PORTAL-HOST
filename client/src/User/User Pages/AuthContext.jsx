// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    // Check local storage for user data
    const userData = localStorage.getItem('Token');
    if (userData) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify({ loggedIn: true }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    
  };

  const adminLogin = () => {
    localStorage.setItem('admin', JSON.stringify({ loggedIn: true }));

  }

  const isprofileComplete = () => {
    setProfileComplete(true)
  }
  
  const ChangeIsProfileComplete = () => {
    setProfileComplete(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, adminLogin, profileComplete, isprofileComplete, ChangeIsProfileComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
