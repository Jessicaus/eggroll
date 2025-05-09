import React, { useState, useEffect } from 'react';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [attendanceCode, setAttendanceCode] = useState('');

  useEffect(() => {
    // Auto-generate a 6-digit event code when the page loads
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setAttendanceCode(code);
  }, []); // empty dependency array ensures it only runs once

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#fff9f0'
        }}>
            <div style={{
            border: '2px solid #ffa94d',
            padding: '3rem',
            borderRadius: '16px',
            backgroundColor: '#fff3e0',
            width: '400px',
            boxShadow: '0 8px 16px rgba(255, 165, 0, 0.3)',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center'
            }}>
            <h1 style={{
                marginBottom: '2rem',
                color: '#ff7300',
                fontSize: '2rem'
            }}>Create an Event</h1>

            <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontSize: '1.1rem',
                color: '#ff7300'
                }}>Event Name</label>
                <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name"
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #ffc078',
                    outline: 'none',
                    backgroundColor: '#fff'
                }}
                />
            </div>

            <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontSize: '1.1rem',
                color: '#ff7300'
                }}>Start Time and Date</label>
                <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #ffc078',
                    outline: 'none',
                    backgroundColor: '#fff'
                }}
                />
            </div>

            <p style={{
                marginTop: '2rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#d9480f'
            }}>
                Attendance Code: <span style={{ color: '#212529' }}>{attendanceCode}</span>
            </p>

            <button
            onClick={() => console.log({ eventName, startTime, attendanceCode })}
            style={{
                marginTop: '2rem',
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

export default CreateEvent;
