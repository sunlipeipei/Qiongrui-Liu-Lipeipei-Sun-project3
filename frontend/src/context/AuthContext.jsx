import React, { createContext, useState, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';
import * as jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user information
    const [loading, setLoading] = useState(true); // For async operations like token verification

    useEffect(() => {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUser({
            token,
            username: decodedToken.payload.username,
            isAdmin: decodedToken.payload.isAdmin,
          });
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('userToken');
          setUser(null);
        } 
      }
      setLoading(false);
    }, []);

    // Login function
    const login = (token, userInfo) => {
      localStorage.setItem('userToken', token);
      setUser(userInfo);
    };

    // Logout function
    const logout = () => {
      localStorage.removeItem('userToken');
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;
