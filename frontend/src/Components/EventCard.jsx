import React from 'react';
import './EventCard.css'; // if you're using one

const EventCard = ({ title, startTime }) => {
  return (
    <main>
      <div className="card">
        <div className="card-form clickable-area">
          <div className="title">{title}</div>
          <p>
            {new Date(startTime).toLocaleString()}<br />
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti"
          </p>
        </div>
        <div className="card-footer">
          <button className="checkin-btn">Check In</button>
        </div>
      </div>
    </main>
  );
};

export default EventCard;