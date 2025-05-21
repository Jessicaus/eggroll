import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient.js';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("You must be logged in to create an event.");
      return;
    }
    const user = JSON.parse(storedUser);
    const userID = user.id;

    const response = await fetch('http://localhost:3000/api/events/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: eventName,
        start_time: startTime,
        description: description,
        scheduler: userID
      })      
    });

    if (response.ok) {
      alert("Event created!");
      navigate("/home");
    } 
    else {
      const result = await response.json();
      alert("Error creating event: " + result.error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fffbe6'
    }}>
      <form
        onSubmit={handleCreateEvent}
        style={{
          backgroundColor: '#ffe0b2',
          padding: '2rem',
          borderRadius: '16px',
          border: '2px solid #ffa94d',
          width: '400px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <h1 style={{
          color: '#ff7300',
          fontSize: '1.8rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>Create an Event</h1>

        {/* Event Name */}
        <label style={{ color: '#ff7300', fontWeight: 'bold' }}>Event Name</label>
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
            border: '2px solid #ffc078',
            outline: 'none',
            backgroundColor: '#fff'
          }}
        />

        {/* Start Time */}
        <label style={{ color: '#ff7300', fontWeight: 'bold' }}>Start Time</label>
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
            border: '2px solid #ffc078',
            outline: 'none',
            backgroundColor: '#fff'
          }}
        />

        {/* Description */}
        <label style={{ color: '#ff7300', fontWeight: 'bold' }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter event description"
          rows={4}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '2px solid #ffc078',
            outline: 'none',
            resize: 'vertical',
            backgroundColor: '#fff'
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#ff7300',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#e65c00')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#ff7300')}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

