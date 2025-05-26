import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext.jsx';
import logo from '../../../assets/egg.png';

const CheckIn = () => {
  const [enteredCode, setEnteredCode] = useState('');
  const { userId, loading } = useAuth();
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get('eventId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to check in.");
      return;
    }

    const response = await fetch('http://localhost:3000/api/attendance/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId,
        code: enteredCode,
        userId,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      setMessage(result.message);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } else {
      const text = await response.text();
      console.error("Check-in failed:", text);
      setMessage("Check-in failed: " + text);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff9db',
        fontFamily: 'Avenir, sans-serif',
        paddingTop: '225px',
      }}
    >
      {/* Logo on top */}
      <img
        src={logo}
        alt="EggRoll Logo"
        style={{
          width: '100px',
          marginBottom: '1rem',
        }}
      />

      {/* Go Back button */}
      <button
        onClick={() => navigate('/home')}
        style={{
          marginBottom: '1rem',
          backgroundColor: 'transparent',
          color: '#5c3b00',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: 'bold',
          textDecoration: 'underline',
        }}
      >
        ← Go Back
      </button>

      {/* Orange check-in box */}
      <div
        style={{
          backgroundColor: '#ffb357',
          borderRadius: '18px',
          padding: '2.5rem',
          width: '360px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '2px solid #ffb357',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: '#5c3b00',
            marginBottom: '1.5rem',
            fontSize: '2rem',
            fontWeight: '800',
          }}
        >
          Check In
        </h1>

        <input
          type="text"
          placeholder="Enter event code"
          value={enteredCode}
          onChange={(e) => setEnteredCode(e.target.value)}
          style={{
            width: '100%',
            padding: '0.85rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1.5px solid #e6a04e',
            marginBottom: '1.5rem',
            backgroundColor: '#fffef4',
            color: '#000',
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#b3e5b0',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            padding: '0.9rem 1.8rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#93d496')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#b3e5b0')}
        >
          Submit
        </button>

        {message && (
          <p style={{ marginTop: '1rem', color: '#5c3b00' }}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
