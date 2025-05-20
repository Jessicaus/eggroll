import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ eventID, title, startTime }) => {
  const formattedStart = new Date(startTime).toLocaleString('en-US', {
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
          <div className="title">{title}</div>
          <p className="event-start-time">Time: {formattedStart}</p>
          <p className="event-description">
            "At vero eos et accusamus et iusto odio dignissimos ducimus..."
          </p>
        </div>
        <div className="card-footer">
          <Link to={`/checkin?eventId=${eventID}`}>
            <button className="checkin-btn">Check In</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default EventCard;

