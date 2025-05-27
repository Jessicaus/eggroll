import React, { useState, useEffect } from "react";
import { useAuth } from '../authContext.jsx';
import { supabase } from '../../supabaseClient.js';
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

  /*useEffect(() => {
    const initializeAuthSession = async () => {
      const token = localStorage.getItem('access_token');
      const refresh = localStorage.getItem('refresh_token');
      if (token && refresh) {
        await supabase.auth.setSession({
          access_token: token,
          refresh_token: refresh
        });
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserID(user.id);
        console.log("user_id successfully fetched from supabase. User ID:", user.id);
      } else {
        console.log("No active session in Home.jsx");
      }
    };

    initializeAuthSession();
  }, []);*/

  useEffect(() => {
    if (!userId) return;

    async function fetchGeneralEvents() {
      setLoading(true);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isoToday = today.toISOString();

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_start_time', isoToday)
        .order('event_start_time', { ascending: true });

      if (error) console.error(error);
      else setEvents(data);
      setLoading(false);
    }

    async function fetchHostedEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('scheduler', userId);

      if (error) console.error(error);
      else setEvents(data);
      setLoading(false);
    }

    async function fetchAttendedEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const eventIds = data.map(a => a.event_id);

      if (eventIds.length === 0) {
        setEvents([]);
        setLoading(false);
        return;
      }

      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .in('id', eventIds);

      if (eventsError) {
        console.error(eventsError);
      } else {
        setEvents(eventsData);
      }
      setLoading(false);
    }

    switch (viewType) {
      case "general":
        fetchGeneralEvents();
        break;
      case "hosted":
        fetchHostedEvents();
        break;
      case "attended":
        fetchAttendedEvents();
        break;
      default:
        fetchGeneralEvents();
    }
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
