import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext.jsx';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../../assets/egg.png';
import './AttendanceList.css';

const AttendanceList = () => {
  const { userId } = useAuth();
  const [isLive, setIsLive] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [userAttending, setUserAttending] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get('eventId');

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!eventId) return;

      setLoading(true);

      // Fetch event details
      const eventResponse = await fetch('http://localhost:3000/api/events/searchid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: eventId
        }),
      });

      const eventData = await eventResponse.json();
      if (!eventResponse.ok) {
        throw new Error(eventData.error);
      }
      
      setEvent(eventData);
      setIsLive(eventData.is_live);
      if (eventData.scheduler === userId) {
        setIsHost(true);
      }

      // Fetch attendance
      const response = await fetch('http://localhost:3000/api/attendance/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: eventId
        }),
      });
  
      if (response.ok) {
        console.log("attendance fetched successfully")
        const data = await response.json();
        const formatted = data.map(item => ({
          id: item.users.user_id,
          name: item.users.user_name,
          email: item.users.user_email,
          checkInTime: item.checked_in_at,
        }));
        setAttendees(formatted);
        setUserAttending(formatted.some(a => a.id === userId));
      } else {
        const result = await response.json();
        alert("error fetching attendance: " + result.error);
      }

      setLoading(false);
    };

    fetchAttendance();
  }, [eventId, userId]);

  const handleToggle = async (e) => {
    const newValue = e.target.checked;
    setIsLive(newValue);

    const response = await fetch('http://localhost:3000/api/events/live', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: event.id,
        status: newValue
      }),
    });

    if (response.ok) {
      console.log("from frontend: livestatus successfully changed")
    } else {
      console.log("from frontend: livestatus change failed")
      
    }
  };

  if (loading || !event) {
    return <div className="attendance-container"><p>Loading attendance...</p></div>;
  }

  return (
    <div className="attendance-wrapper">
      {/*style={{ paddingTop: '80px', backgroundColor: '#fff9db', minHeight: '100vh' }}>*/}
      <img
        src={logo}
        alt="EggRoll Logo"
        className="attendance-logo"
        /*style={{
          width: '100px',
          marginBottom: '1rem',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}*/
      />

      <div className="go-back-wrapper">
        <a href="/home" className="go-back-link">← Go Back</a>
      </div>

      <div className="attendance-page two-column-layout">
        <div className="left-panel">
          <div className="left-content">
            <h2 className="attendance-title"><strong>{event.event_name}</strong></h2>

            {isHost && (
              <div className="host-banner">
                You are the host of this event! 👑 
              </div>
            )}

            <div className="attendance-meta">
              <p className="attendance-count">Total Attendees: {attendees.length}</p>
              {isHost && event.attendance_code && (
                <p className="attendance-count">
                  Attendance Code: <strong>{event.attendance_code}</strong>
                </p>
              )}
            </div>

            {event.details && (
              <p className="attendance-description">{event.details}</p>
            )}

            {userAttending && (
              <div className="attended-banner">
                You attended this event!
              </div>
            )}
          </div>

          <div
            className="bottom-controls"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2rem',
              width: '100%',
              textAlign: 'center',
            }}
          >
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

            {!userAttending && isLive && !isHost && (
              <Link to={`/checkin?eventId=${event.id}`}>
                <button className="checkin-btn">Check In</button>
              </Link>
            )}
          </div>

        </div>

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
                          timeStyle: 'short',
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
};

export default AttendanceList;
