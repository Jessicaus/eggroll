import React, { useState } from 'react';
import './AttendanceList.css';

const AttendanceList = ({ eventName = "Sample Event", attendees = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttendees = attendees
    .filter(attendee => attendee.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(a.checkInTime) - new Date(b.checkInTime));

  return (
    <div className="attendance-container">
      <div className="attendance-card">
        <h1 className="event-title">{eventName}</h1>
        <p className="total-attendees">Total Attendees: {attendees.length}</p>

        <input
          type="text"
          className="search-bar"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
                filteredAttendees.map((attendee, index) => (
                  <tr key={index}>
                    <td>{attendee.name}</td>
                    <td>{attendee.email}</td>
                    <td>{new Date(attendee.checkInTime).toLocaleString()}</td>
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