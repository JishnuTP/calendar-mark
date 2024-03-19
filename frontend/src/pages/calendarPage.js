import axios from 'axios';
import React from 'react';
import Calendar from 'react-calendar';
import { Link, Route } from 'react-router-dom';
import Header from '../component/Header';
import "./calendar.css"
import { Checkbox, IconButton } from '@mui/material';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

function CalendarPage() {

    const markAttendance = async (date) => {
        // Retrieve authentication token from local storage
        const token = localStorage.getItem('token');
    
        
        if (!token) {
          console.error('No authentication token found');
          return;
        }
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit format with leading zero
        
        // Construct the ISO-like date string (YYYY-MM-DD)
        const isoDateString = `${year}-${month}-${day}`;
        console.log(isoDateString);

        try {
          await axios.post('http://localhost:5000/api/attendance/mark', { date: isoDateString, status: 'present' }, {
            headers: {
              'Authorization': `Bearer ${token}` // Include the authentication token in the headers
            }
          });
          window.location.href = '/attendance';
          alert('Attendance marked successfully');
        } catch (error) {
          console.error('Error marking attendance:', error);
          alert('Failed to mark attendance');
        }
      };
    
  return (
    <>
    <Header />
    <div className="attendance-container">
    
    <h2>Attendance Calendar</h2>
    <div className="calendar-container">
      <Calendar
        className="custom-calendar"
        onClickDay={markAttendance}
      />
    </div>
    <Link to="/attendance">
    <IconButton>
        <h6>Attendance Records</h6>
       <ChecklistRtlIcon/>
    </IconButton>
    </Link>
  </div>
  </>
  );
}

export default CalendarPage;