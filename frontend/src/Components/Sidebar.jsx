import React, { useState } from "react";
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="view-pill-container">
          <input type="radio" id="option1" name="toggle-view" className="toggle-radio-view" />
          <label htmlFor="option1" className="view-pill-label">Option 1</label>
    
          <input type="radio" id="option2" name="toggle-view" className="toggle-radio-view" />
          <label htmlFor="option2" className="view-pill-label">Option 2</label>
        </div>
    
        <div className="button-section">
          <button className="new-event-btn">+ New Event</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;