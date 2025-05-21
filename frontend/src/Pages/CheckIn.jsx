import React, { useState } from 'react';

const CheckIn = () => {
const [enteredCode, setEnteredCode] = useState('');   // store the code entered by the user
const [message, setMessage] = useState('');   // store any feedback message (success or error)

const handleSubmit = () => {
    // const result = await addAttendance(eventId, enteredCode, userId);
    // setMessage(result.success ? '✅ Checked in!' : '❌ ' + result.message);
    // Will later connect this to a backend API call
};

// JSX frontend layout
return (
    <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    height: '100vh',
    backgroundColor: '#fff9f0'
    }}>
    {/* Inner container with styling */}
    <div style={{
        border: '2px solid #ffa94d',
        padding: '2rem',
        borderRadius: '16px',
        backgroundColor: '#fff3e0',
        width: '350px',
        boxShadow: '0 8px 16px rgba(255, 165, 0, 0.3)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
    }}>
        {/* Page heading */}
        <h2 style={{ color: '#ff7300' }}>Check In</h2>

        {/* Input box for the event code */}
        <input
        type="text"
        placeholder="Enter event code"
        value={enteredCode}
        onChange={(e) => setEnteredCode(e.target.value)}
        style={{
            width: '100%',
            padding: '0.75rem',
            marginTop: '1rem',
            marginBottom: '1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '2px solid #ffc078',
            outline: 'none',
            backgroundColor: '#fff'
        }}
        />

        {/* Submit button to trigger check-in */}
        <button
        onClick={handleSubmit}
        style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#ff7300',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#e65c00')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#ff7300')}
        >
        Submit
        </button>
    </div>
    </div>
   );
};

export default CheckIn;
