import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import TopNav from "../Components/TopNav";
import EventCard from "../Components/EventCard";
import './Home.css';

export default function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      };

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
    )
}