import React, { useState, useEffect } from "react";
import './TopNav.css';
const TopNav = ({toggleSidebar}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /*const handleSearch = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await fetch(`http://localhost:3000/api/events/search?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results:", data);
      setSearchResults(data); // Update state with search results
    } catch (error) {
      console.error("Search failed:", error);
    }
  };*/

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/events/search?q=${encodeURIComponent(searchTerm)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(delayDebounce); // Cancel previous request on each key press
  }, [searchTerm]);

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
        {/*<form className="search-container" onSubmit={handleSearch}>*/}
        <form className="search-container" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}            
          />
          {/*<img src="/search.svg" alt="Search" className="search-icon menu-logo-image" />*/}
          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((event) => (
                <li key={event.id}>{event.event_name}</li>
              ))}
            </ul>
          )}
      </form>
    </nav>
  );
};

export default TopNav;