import React, { useState } from 'react';
import axios from 'axios';
import './User_reg.css';
import UserHome from './userhome';

export default function User_reg() {
  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (user.password !== user.confirmpassword) {
      setAlertMessage("Passwords do not match");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return; // Stop the form submission
    }

    const url = 'http://localhost:9000/userreg/user_reg';
    axios.post(url, user)
      .then((res) => {
        alert(res.data); // Temporary alert, consider replacing with a better UX pattern
      })
      .catch((err) => {
        console.error('Error:', err.response.data);
        setAlertMessage(err.response.data); // Display backend error message
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
    console.log(user);
  };

  return (<>
    <UserHome />

    <div className="container">
      <h1>User Registration</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>User Name</label>
          <input type="text" name="username" placeholder="Enter Your Name" onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter Your Email" onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter Your Password" onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmpassword" placeholder="Confirm Your Password" onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile Number</label>
          <input type="tel" name="mobilenumber" placeholder="Enter Your Mobile Number" onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
        <div className={`alert ${showAlert ? 'show' : ''}`}>{alertMessage}</div>
      </form>
      <br />
      <div className="login-link">
        <a href="/login">Already have an account? Log in here</a>
      </div>
    </div>
    </>
  );
}
