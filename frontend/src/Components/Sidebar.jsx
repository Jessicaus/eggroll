import React, { useState } from "react";
import './Sidebar.css';

const Sidebar = ({ viewType = "general", setViewType }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="view-pill-container">
          <input type="radio" id="option1" name="toggle-view" className="toggle-radio-view" checked={viewType === "general"} onChange={() => setViewType("general")}/>
          <label htmlFor="option1" className="view-pill-label">General</label>

          <input type="radio" id="option2" name="toggle-view" className="toggle-radio-view" checked={viewType === "hosted"} onChange={() => setViewType("hosted")}/>
          <label htmlFor="option2" className="view-pill-label">Events Hosted</label>
    
          <input type="radio" id="option3" name="toggle-view" className="toggle-radio-view" checked={viewType === "attended"} onChange={() => setViewType("attended")}/>
          <label htmlFor="option3" className="view-pill-label">Events Attended</label>
        </div>
    
        <div className="button-section">
          <a href="/create" className="create-event-link">
          <button className="new-event-btn">+ New Event</button>
          </a>
        </div>
        
      </div>
    </aside>
  )
}

export default Sidebar;