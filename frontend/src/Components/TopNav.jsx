import React, { useState } from "react";
import './TopNav.css';
const TopNav = ({toggleSidebar}) => {

  return (
    <nav className="topnav">
      <div className="topnav-header">
        <button className="menu-logo" onClick={toggleSidebar}>
            <img src="/menu.svg" alt="Logo" className="menu-logo-image" />
        </button>
        <div className="brand">Event Tracker</div>
      </div>

      

      {/*<div className="toggle-pill-container">
        <input type="radio" id="toggle1" name="toggle" className="toggle-radio" />
        <label htmlFor="toggle1" className="pill-label">Today</label>

        <input type="radio" id="toggle2" name="toggle" className="toggle-radio" />
        <label htmlFor="toggle2" className="pill-label">This Week</label>
      </div>*/}
      {/* Search input instead of radio buttons */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search events..."
          className="search-input"
        />
        {/*<img src="/search.svg" alt="Search" className="search-icon menu-logo-image" />*/}
      </div>
    </nav>
  );
};

export default TopNav;