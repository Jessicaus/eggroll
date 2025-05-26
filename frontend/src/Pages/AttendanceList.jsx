import React, { useState, useEffect } from 'react';
import{ useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient.js';
import logo from '../../../assets/egg.png';
import './AttendanceList.css';

const AttendanceList = ( ) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [eventName, setEventName] = useState('');
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
        .select('event_name')
        .eq('id', id)
        .single();
      if (eventError) console.error('Error fetching event:', eventError);
      else setEventName(eventData.event_name);

      // Fetch attendance records joined with user info
     
      const { data, error } = await supabase
      .from('attendance')
      .select(`
        checked_in_at,
        users (
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
          name:  item.users.user_name,
          email: item.users.user_email,
          checkInTime: item.checked_in_at,
        }));
        setAttendees(formatted);
      }

      setLoading(false);
    };

    fetchAttendance();
  }, [eventId]);

  // Filter and sort attendees for display
  const filteredAttendees = attendees
    .filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(a.checkInTime) - new Date(b.checkInTime));

  if (loading) {
    return <div className="attendance-container"><p>Loading attendance...</p></div>;
  }

  return (
    <div
      style={{
        paddingTop: '80px', // adjust as needed
        backgroundColor: '#fff9db',
        minHeight: '100vh',
      }}
    >
      {/* Logo on top */}
      <img
        src={logo}
        alt="EggRoll Logo"
        style={{
          width: '100px',
          marginBottom: '1rem',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      
      <div className="go-back-wrapper">
        <a href="/home" className="go-back-link">← Go Back</a>
      </div>
  
      <div className="attendance-page">
        <h2 className="attendance-title"><strong>{eventName}</strong></h2>
        <p className="attendance-count">Total Attendees: {attendees.length}</p>
  
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
                          timeStyle: 'short'
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
  );
}

export default AttendanceList;