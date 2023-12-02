// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedAuth = JSON.parse(localStorage.getItem('auth')) || null;
  const [auth, setAuth] = useState(storedAuth);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await axios.get(
          'http://localhost/akesseh/backend/api/auth.php/check-session',
          { withCredentials: true }
        );
        setAuth(response.data);
        localStorage.setItem('auth', JSON.stringify(response.data)); // Store in localStorage
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuth();

    // periodically check every 5 minutes
    const interval = setInterval(() => {
      fetchAuth();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const clearAuth = () => {
    setAuth(null);
    localStorage.removeItem('auth'); // Remove from localStorage
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
