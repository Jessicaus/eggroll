import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import TopNav from "../Components/TopNav";
import EventCard from "../Components/EventCard";
import './Home.css';

export default function Home() {
    return (
        <div className="container">
            <TopNav />
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