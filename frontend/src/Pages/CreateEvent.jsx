import React, { useState } from 'react';
import './CreateEvent.css';
import { useAuth } from '../authContext.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/egg.png'; // Adjust path if needed

const CreateEvent = () => {
  const { userId } = useAuth();
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to create an event.");
      return;
    }

    const response = await fetch('http://localhost:3000/api/events/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: eventName,
        start_time: startTime,
        description: description,
        scheduler: userId,
      }),
    });

    if (response.ok) {
      alert("Event created!");
      navigate("/home");
    } else {
      const result = await response.json();
      alert("Error creating event: " + result.error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', // Raise everything up
      alignItems: 'center',
      paddingTop: '60px',
      height: '100vh',
      backgroundColor: '#fff8c9',
      fontFamily: 'Avenir, sans-serif',
    }}>
      {/* Logo */}
      <img
        src={logo}
        alt="EggRoll Logo"
        style={{
          width: '120px',
          marginBottom: '1rem',
        }}
      />

      {/* Go Back Button */}
      <button
        onClick={() => navigate('/home')}
        style={{
          marginBottom: '1rem',
          backgroundColor: 'transparent',
          color: '#a3684a',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: 'bold',
          textDecoration: 'underline'
        }}
      >
        ← Go Back
      </button>

      {/* Form */}
      <form
        onSubmit={handleCreateEvent}
        style={{
          backgroundColor: '#FFC97C',
          padding: '2.5rem',
          borderRadius: '18px',
          width: '400px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{
          color: '#a3684a',
          fontSize: '1.9rem',
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: 800
        }}>
          Create an Event
        </h1>

        <label style={{ color: '#a3684a', fontWeight: 'bold' }}>Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
          placeholder="Enter event name"
          style={{
            width: '100%',
            padding: '0.75rem',
            margin: '0.5rem 0 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1.5px solid #e6a04e',
            backgroundColor: '#fffef4',
            color: '#000',
          }}
        />

        <label style={{ color: '#a3684a', fontWeight: 'bold' }}>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            margin: '0.5rem 0 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1.5px solid #e6a04e',
            backgroundColor: '#fffef4',
            color: '#000',
          }}
        />

        <label style={{ color: '#a3684a', fontWeight: 'bold' }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter event description"
          rows={4}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '2rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1.5px solid #e6a04e',
            resize: 'vertical',
            backgroundColor: '#fffef4',
            color: '#000',
          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.9rem',
            backgroundColor: '#b3e5b0',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#93d496')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#b3e5b0')}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
