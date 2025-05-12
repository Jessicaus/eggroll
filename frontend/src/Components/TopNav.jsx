import React, { useState } from "react";

import './TopNav.css';
const TopNav = () => {

  return (
    <nav className="topnav">
      <div className="brand">Event Tracker</div>
      <div className="toggle-pill-container">
        <input type="radio" id="toggle1" name="toggle" className="toggle-radio" />
        <label htmlFor="toggle1" className="pill-label">Today</label>

        <input type="radio" id="toggle2" name="toggle" className="toggle-radio" />
        <label htmlFor="toggle2" className="pill-label">This Week</label>
      </div>
    </nav>
  );
};

export default TopNav;