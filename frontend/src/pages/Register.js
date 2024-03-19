// RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import "./register.css"

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (event) => {

    console.log(username,password,role);
    event.preventDefault();
    try {
      await axios.post('http://calendar-mark.onrender.com/api/register', { username, password, role });
      alert('Registration successful');
      // Redirect to login page after successful registration
      window.location.href = '/';
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      
      <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
