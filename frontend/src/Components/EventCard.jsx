import React from "react";
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = () => (
  <main>
    <div className="card">
      <div className="card-form clickable-area">
        <div className="title">Event 1</div>
        <p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti</p>
      </div>
      <div className="card-footer">
        <Link to="/checkin">
          <button className="checkin-btn">Check In</button>
        </Link>
      </div>
    </div>
  </main>
);

export default EventCard;
