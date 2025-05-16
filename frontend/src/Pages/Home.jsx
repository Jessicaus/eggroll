import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import TopNav from "../Components/TopNav";
import EventCard from "../Components/EventCard";
import supabase from "../../supabaseSetup.js"
import './Home.css';

export default function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userId, setUserID] = useState(null);
    const [events, setEvents] = useState([]);
    const [viewType, setViewType] = useState("general");

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser){
            const user = JSON.parse(storedUser);
            setUserID(user.user_id)
        }


        
    }, []);

    useEffect(() => {
        if (!userId) return;

        
        
        async function fetchGeneralEvents() {
            const { data, error } = await supabase
                .from('events')
                .select('*')

            if (error) console.error(error);
            else setEvents(data);
        }

        async function fetchHostedEvents() {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('scheduler', userId);

            if (error) console.error(error);
            else setEvents(data);
        }

        async function fetchAttendedEvents() {
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
                console.error(eventsEerror);
            }    
            else {
                setEvents(eventsData);
            }    
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
                <TopNav toggleSidebar={toggleSidebar}/>
            </div>
            <div className="content">
                    <Sidebar />
                <div className="events">
                    <div className="upcoming">Upcoming Events</div>
                    <EventCard />
                    <EventCard />
                </div>
            </div>
        </div>
    );
}