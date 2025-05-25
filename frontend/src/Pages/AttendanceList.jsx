import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext.jsx';
import{ useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient.js';
import './AttendanceList.css';

const AttendanceList = ( ) => {
  const { userId } = useAuth();
  const [isLive, setIsLive] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [userAttending, setUserAttending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [event, setEvent] = useState(null);
  //const [eventName, setEventName] = useState('');
  const [loading, setLoading] = useState(true);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get('eventId');


  useEffect(() => {
    const fetchAttendance = async () => {
      if (!eventId) return;

      const id = eventId;
      setLoading(true);

      // Fetch event details for the title
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      if (eventError) console.error('Error fetching event:', eventError);
      else {//setEventName(eventData.event_name); 
        setIsLive(eventData.is_live); 
        setEvent(eventData);
        console.log('is eventData.scheduler == useriD?: ', eventData.scheduler === userId);
        if (eventData.scheduler === userId) {
          setIsHost(true);
        }
      }
      

      // Fetch attendance records joined with user info
     
      
      const { data, error } = await supabase
      .from('attendance')
      .select(`
        checked_in_at,
        users (
        user_id,
        user_name,
        user_email
        )
        `)
        .eq('event_id', eventId)
        .order('checked_in_at', { ascending: true });
      if (error) {
        console.error('Error fetching attendance:', error);
        setAttendees([]);
      } else {
        // Map to flat structure
        const formatted = data.map(item => ({
          id: item.users.user_id,
          name:  item.users.user_name,
          email: item.users.user_email,
          checkInTime: item.checked_in_at,
        }));
        setAttendees(formatted);

        //console.log('useriD:', userId);
        //console.log('formatted:', formatted);
        const isUserAttending = formatted.some(item => item.id === userId);
        //console.log('User attending:', isUserAttending);
        setUserAttending(isUserAttending);
      }

      setLoading(false);
    };

    fetchAttendance();
  }, [eventId, userId]);

  const handleToggle = async (e) => {
    const newValue = e.target.checked;
    console.log('Toggle clicked, new value:', newValue);
    setIsLive(newValue);
  
    const { error } = await supabase
      .from('events')
      .update({ is_live: newValue })
      .eq('id', event.id);
  
    if (error) {
      console.error('Error updating is_live:', error);
    }
  };

  /*const isCurrentUserScheduler = (event) => {
    return event && event.scheduler === userId;
  };*/

  // Filter and sort attendees for display
  const filteredAttendees = attendees
    .filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(a.checkInTime) - new Date(b.checkInTime));

  if (loading) {
    return <div className="attendance-container"><p>Loading attendance...</p></div>;
  }

  return (
    <>
      <div className="go-back-wrapper">
        <a href="/home" className="go-back-link">← Go Back</a>
      </div>
  
      <div className="attendance-page two-column-layout">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="left-content">
            <h2 className="attendance-title"><strong>{event.event_name}</strong></h2>
            <p className="attendance-count">Total Attendees: {attendees.length}</p>
            {event.details && (
              <p className="event-description">{event.details}</p>
            )}
            {userAttending && (
              <div className="attended-banner">
                You attended this event!
              </div>
            )}
          </div>

          <div className="bottom-controls">
            {isHost && (
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="liveToggle"
                  checked={isLive}
                  onChange={handleToggle}
                />
                <span className="slider"></span>
                <span className="label-text label-text2">Live</span>
              </label>
            )}
             
            {!userAttending && isLive && ( 
              <Link to={`/checkin?eventId=${event.id}`}>
                <button className="checkin-btn">Check In</button>
              </Link>
            )}
          </div>
        </div>
  
        {/* Right Panel */}
        <div className="right-panel">
          <div className="attendance-table-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Check-In Time</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, index) => (
                  <tr key={index}>
                    <td>{attendee.name}</td>
                    <td>{attendee.email}</td>
                    <td>
                      {attendee.checkInTime
                        ? new Date(attendee.checkInTime).toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short' // excludes seconds
                          })
                        : "Not checked in"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}  

export default AttendanceList;
