import React, { useState, useEffect } from "react";
import { useAuth } from '../authContext.jsx';
import Sidebar from "../Components/Sidebar";
import TopNav from "../Components/TopNav";
import EventCard from "../Components/EventCard";
import './Home.css';

export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [shouldRenderSidebar, setShouldRenderSidebar] = useState(false);
  //const [userId, setUserID] = useState(null);
  const { userId } = useAuth();
  const [events, setEvents] = useState([]);
  const [viewType, setViewType] = useState("general");
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    if (sidebarVisible) {
      setShouldRenderSidebar(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRenderSidebar(false);
      }, 300); // match duration of slideOut
      return () => clearTimeout(timer);
    }
  }, [sidebarVisible]);


  useEffect(() => {
    if (!userId) return;

    const fetchEvents = async () => {
      setLoading(true);
      try {
        console.log("userid:", userId);
        console.log("viewType:", viewType);
        const response = await fetch('http://localhost:3000/api/attendance/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            viewType,
            userId,
          }),
        });

        const eventsData = await response.json();
        console.log('Fetched events:', eventsData);
        if (!response.ok) {
          throw new Error(eventsData.error || 'Failed to fetch events');
        }
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();


  }, [userId, viewType]);

  // sort events with live ones first, then by most recent start time
  const sortedEvents = [...events].sort((a, b) => {
    if (a.is_live !== b.is_live) {
      return a.is_live ? -1 : 1; // live events first
    }
    return new Date(b.event_start_time) - new Date(a.event_start_time); // recent first
  });

  return (
    <div className="container">
      <div className="nav">
        <TopNav toggleSidebar={toggleSidebar} />
      </div>
      <div className="content">
        {/*<Sidebar viewType={viewType} setViewType={setViewType} />*/}
        <div className="sidebar-desktop">
          <Sidebar viewType={viewType} setViewType={setViewType} />
        </div>

        {shouldRenderSidebar && (
          <div className="sidebar-overlay" onClick={toggleSidebar}>
            <div className={`sidebar-mobile ${sidebarVisible ? 'slide-in' : 'slide-out'}`} onClick={(e) => e.stopPropagation()}>
              <Sidebar viewType={viewType} setViewType={setViewType} />
            </div>
          </div>
        )}
        <div className="events">
          <div className="upcoming">Events</div>

          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            // use sortedEvents instead of raw events
            sortedEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                viewType={viewType}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
