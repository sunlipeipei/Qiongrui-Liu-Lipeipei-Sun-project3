/**
 * Navigation bar component
 * Displays "Log In" and "Sign Up" when the user is logged out.
 * Displays the username and a "Log Out" button when the user is logged in.
 */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // redirect to login page after logging out
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="homePage-button">Home</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-username">
                Welcome, <strong>{user.username}</strong>
            </span>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/signup" className="navbar-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
