import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, MenuItem, Modal, Select } from '@mui/material';
import "./admin.css"
import Logout from '@mui/icons-material/Logout';


const App = () => {
  const [attendance, setAttendance] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('present'); // Default status

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleEdit = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendanceRecord');
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    fetchAttendance();
  }, []);

  const handleSetStatus = async () => {
    try {
      await axios.post(`http://localhost:5000/api/attendance/${selectedId}`, { status });
      // Refresh attendance data after updating status
      setOpen(false);
      window.location.reload();

    } catch (error) {
      console.error('Error updating attendance record status:', error);
    }
  };

  const handleLogout = () => {
    
    window.location.href = '/'; 
    
    
  };

  return (
    <div className='admin-cont'>

        <h1>ADMIN</h1>
        <Logout onClick={handleLogout} />
    <div className="table-container">
    <h1>Attendance Records</h1>
    <table>
      <thead>
        <tr>
           
          <th>User ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map(record => (
          <tr key={record._id}>
            
            <td>{record.userId}</td>
            <td>{formatDate(record.date)}</td>
            <td>{record.status}</td>
            <td>
              <button onClick={() => handleEdit(record._id)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Modal open={open} onClose={handleClose} className="modal-container">
      <div className='modal-content'>
        <h2>Set Attendance Status</h2>
        <div>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </Select>
          <button className='btn' onClick={handleSetStatus}>Save</button>
        </div>
      </div>
    </Modal>
  </div>
  </div>
  
  );
};

export default App;
