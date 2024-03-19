// AttendanceRecordsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import "./record.css"

function AttendanceRecordsPage() {
  const [records, setRecords] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const fetchAttendanceRecords = async () => {
     // Retrieve authentication token from local storage
     const token = localStorage.getItem('token');
    
     // Check if token is available
     if (!token) {
       console.error('No authentication token found');
       return;
     }
 
    try {
      const response = await axios.get('http://localhost:5000/api/attendance', {
        headers: {
          'Authorization': `Bearer ${token}` // Include the authentication token in the headers
        }
      });
      console.log(response);
      
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };
  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  return (
    <>
       <Header />
  
    <div className="attendance-records-container">
   
      <div className="table-container">
        <h2>Attendance Records</h2>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Date</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record._id}>
                <td>{record.userId}</td>
                <td>{formatDate(record.date)}</td>
                <td>{record.status}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default AttendanceRecordsPage;
