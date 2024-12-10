import '../styles/LoginPage.css';
import React from 'react';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const handleLoginSuccess = (token) => {
    console.log('Token received:', token);
    // Set token in global state, cookies, or localStorage
  };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;