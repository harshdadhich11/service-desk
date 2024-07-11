// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/authContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav>
      <h1>Service Desk</h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tickets">Tickets</Link>
            </li>
            <li>
              <a href="#!" onClick={logout}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
