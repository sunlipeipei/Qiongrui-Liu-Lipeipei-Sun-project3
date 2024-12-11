import React, { createContext, useState, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user information
    const [loading, setLoading] = useState(true); // For async operations like token verification

    useEffect(() => {
      // check if the user is logged in
      const checkLoginStatus = async () => {
          try {
              const response = await axios.get('/api/user/isLoggedIn', {
                  withCredentials: true, // include cookies in the request
              });
              setUser({
                  username: response.data.username,
                  isAdmin: response.data.isAdmin,
              });
          } catch (error) {
              console.error('User is not logged in:', error);
              setUser(null);
          } finally {
              setLoading(false);
          }
      };

      checkLoginStatus();
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
