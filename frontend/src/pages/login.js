import { useState } from 'react';
import React from 'react'
import axios from 'axios';
import "./login.css"
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const { token, user } = response.data;
      console.log(user.role);
      localStorage.setItem('token', response.data.token);

      if (user.role === 'admin') {
        window.location.href = '/admin'; // Redirect to admin page
      } else {
        window.location.href = '/calendar'; // Redirect to calendar page for non-admin users
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  

    return (
      <div className="login-container">
     
      <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <Link to="/register">
        
        <IconButton>
        <AppRegistrationIcon/>
        </IconButton>
        </Link>

      </form>
    </div>
    
    )
}

export default Login
