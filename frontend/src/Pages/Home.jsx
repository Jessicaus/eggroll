import React, { useState, useEffect} from "react";
import { supabase } from './supabaseClient.js';
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


    console.log("fetching user_id")
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser){
            const user = JSON.parse(storedUser);
            setUserID(user.user_id)
            console.log("user_id_successfully fetched")
        }

      
  }, []);

  useEffect(() => {

    async function fetchGeneralEvents() {
      setLoading(true);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isoToday = today.toISOString();

      const { data, error } = await supabase
          .from('events')
          .select('*')
          .gte('event_start_time', isoToday)
          .order('event_start_time', {ascending: true});

          

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
          return;
      
      }

      const eventIds = data.map( a => a.event_id);
           

      if (eventIds.length === 0) {
          setEvents([]); // no events attended
          return;
      }

      const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .in('id', eventIds);

      if (eventsError){
          console.error(eventsError);
      }    
      else {
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



  

  return (
    <div className="container">
      <div className="nav">
        <TopNav toggleSidebar={toggleSidebar} />
      </div>
      <div className="content">
        <Sidebar />
        <div className="events">
        <EventCard title="Test Event" startTime={new Date().toISOString()} />
          <div className="upcoming">Upcoming Events</div>

          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No upcoming events found.</p>
          ) : (
            events.map(event => (
              <EventCard
                key={event.id}
                title={event.event_name}
                startTime={event.event_start_time}
                {...event} // optional: pass all fields if EventCard uses them
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
