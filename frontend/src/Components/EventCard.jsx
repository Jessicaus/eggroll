import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({event, viewType}) => {
  const [isLive, setIsLive] = useState(event.is_live);  // <- track toggle state

  const handleToggle = async (e) => {
    const newValue = e.target.checked;
    console.log('Toggle clicked, new value:', newValue);
    setIsLive(newValue);  // update local toggle state

    
    const response = await fetch('http://localhost:3000/api/events/live', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: event.id,
        status: newValue
      }),
    });

    if (response.ok) {
      console.log("from frontend: livestatus successfully changed")
    } else {
      console.log("from frontend: livestatus change failed")
      
    }
  
  
  };

  const formattedStart = new Date(event.event_start_time).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <main>
      <div className="card">
        <div className="card-form clickable-area">
          <div className="title">{event.event_name}</div>
          <p className="event-start-time">Time: {formattedStart}</p>
          <p className="event-description">{event.details}
          </p>
          {viewType=="hosted" && (
            <p className="event-description">Attendance Code: <strong>{event.attendance_code}</strong></p>
          )}
        </div>
        <div className="card-footer">
        {viewType === "hosted" ? (
          <>
            <label className="toggle-switch">
            <input
                type="checkbox"
                id={`liveToggle-${event.id}`}
                checked={isLive}
                onChange={handleToggle}
              />
              <span className="slider"></span>
              <span className="label-text" style={{ color: 'black' }}>Live</span>
            </label>
          </>
        ) : viewType === "general" ? ((event.is_live &&
          <>
            <Link to={`/checkin?eventId=${event.id}`}>
              <button className="checkin-btn">Check In</button>
            </Link>
            </>) || !event.is_live && (
              <div
                className="view-attendance-text"
                style={{
                  color: 'black', // soft brown or use 'black'
                  fontSize: 15,
                  fontWeight: '600',
                  textDecoration: 'none',
                  cursor: 'default',
                }}
              >
                🚫 Not Live Yet
              </div>
            )
        ) : null }
          <>
            <Link to={`/attendance?eventId=${event.id}`}>
              <div className="view-attendance-text" style={{ color: 'black' }}>≫ View Details</div>
            </Link>
          </>
        </div>
      </div>
    </main>
  );
};

export default EventCard;

