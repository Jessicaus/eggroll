import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({event, viewType}) => {

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
          <Link to={`/checkin?eventId=${event.id}`}>
            <button className="checkin-btn">Check In</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default EventCard;

