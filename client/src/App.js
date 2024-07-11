// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Tickets from './pages/Tickets';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tickets" element={<Tickets />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
