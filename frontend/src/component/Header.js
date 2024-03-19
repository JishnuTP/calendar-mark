import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '@mui/icons-material/Logout';

function Header() {
  const [user, setUser] = useState(null);


    const fetchUserDetails = async () => {
      
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
            console.error('No authentication token found');
            return;
        }
        try {
        
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("cc",response);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    useEffect(() => {

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    // Perform logout logic 
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/'; 
    
  
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,backgroundColor:"lightgray", height:"50px"}}>
      <div className="logo">
      <Link to="/calendar"> 
        <IconButton>
        <FactCheckIcon/>

        </IconButton>
        </Link>
        
        </div>
      {user ? (
        <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
            
          <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{user.username}</span>
         
          
        <Logout onClick={handleLogout} />

        
       
        </div>
      ) : (
        <div className="login-links">
          
        </div>
      )}
    </header>
  );
}

export default Header;
