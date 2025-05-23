// import React, { useState } from 'react';
// import './AttendanceList.css';

// const AttendanceList = ({ eventName = "Sample Event", attendees = [] }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredAttendees = attendees
//     .filter(attendee => attendee.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     .sort((a, b) => new Date(a.checkInTime) - new Date(b.checkInTime));

//   return (
//     <div className="attendance-container">
//       <div className="attendance-card">
//         <h1 className="event-title">{eventName}</h1>
//         <p className="total-attendees">Total Attendees: {attendees.length}</p>

//         <input
//           type="text"
//           className="search-bar"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <div className="table-container">
//           <table className="attendance-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Check-In Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAttendees.length > 0 ? (
//                 filteredAttendees.map((attendee, index) => (
//                   <tr key={index}>
//                     <td>{attendee.name}</td>
//                     <td>{attendee.email}</td>
//                     <td>{new Date(attendee.checkInTime).toLocaleString()}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="no-results">No matching attendees found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceList;


import React, { useState, useEffect } from 'react';
import{ useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient.js';
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
    <div className="attendance-container">
      <div className="attendance-card">
        <h1 className="event-title">{eventName || 'Event Attendance'}</h1>
        <p className="total-attendees">Total Attendees: {attendees.length}</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Check-In Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.length > 0 ? (
                filteredAttendees.map((att, idx) => (
                  <tr key={idx}>
                    <td>{att.name}</td>
                    <td>{att.email}</td>
                    <td>{new Date(att.checkInTime).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-results">No matching attendees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;