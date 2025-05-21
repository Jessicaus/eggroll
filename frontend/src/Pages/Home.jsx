import React, { useState, useEffect} from "react";
import { supabase } from '../../supabaseClient.js';
import Sidebar from "../Components/Sidebar";
import TopNav from "../Components/TopNav";
import EventCard from "../Components/EventCard";
import './Home.css';

export default function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userId, setUserID] = useState(null);
    const [events, setEvents] = useState([]);
    const [viewType, setViewType] = useState("general");
    const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isoToday = today.toISOString();

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_start_time', isoToday)
        .order('event_start_time', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        setEvents(data);
      }
      console.log("Fetched events:", data);

      setLoading(false);
    };

    fetchEvents();
  }, []);
  

  return (
    <div className="container">
      <div className="nav">
        <TopNav toggleSidebar={toggleSidebar} />
      </div>
      <div className="content">
        <Sidebar />
        <div className="events">
          <div className="upcoming">Upcoming Events</div>

          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? ( 
            <p>No upcoming events found.</p>
          ) : (
            events.map(event => (
              <EventCard
                eventID={event.id}
                title={event.event_name}
                startTime={event.event_start_time}
                description={event.details}
                {...event} // optional: pass all fields if EventCard uses them
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
