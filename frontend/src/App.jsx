import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import UserPage from './pages/UserPage.jsx';
import SearchResultPage from './pages/SearchResultPage.jsx';

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      path: '/user/:userId', 
      element: <UserPage />,
    },
    {
      path: '/search',
      element: <SearchResultPage />, 
  },
  ]);
  
  const App = () => {
    return <RouterProvider router={router} />;
  };
  
  export default App;