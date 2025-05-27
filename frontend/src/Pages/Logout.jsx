import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'; // Adjust path if needed
import './Logout.css';

export default function Logout() {
  return (
    <div className="logout-container">
      <img src={logo} alt="EggRoll Logo" className="logout-logo" />
      <p className="logout-message">Logged out successfully!</p>
      <Link to="/" className="back-to-login">Back to Login</Link>
    </div>
  );
}