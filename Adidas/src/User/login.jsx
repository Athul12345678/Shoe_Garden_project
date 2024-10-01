import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import authen from '../context/authen';

export default function Login() {
    const login = useContext(authen);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const nav = useNavigate();

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        const url = 'http://localhost:9000/userreg/login';
        axios.post(url, user)
            .then((res) => {
                const { message, userid, username, isAdmin,token } = res.data;
                alert(message);
                sessionStorage.setItem('userid', userid);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('isAdmin', isAdmin);
                sessionStorage.setItem('token', token);

                login.setLogin(true);
                if (isAdmin) {
                    nav('/admin-dashboard');  // Redirect to admin dashboard
                } else {
                    nav('/');  // Redirect to user home
                }
            })
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data);
                } else if (error.request) {
                    setError('No response received from server');
                } else {
                    setError('Error: ' + error.message);
                }
            });
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your Email" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your Password" 
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Log In</button>
                <div className="login-link">
                    <a href="/userregistration">Don't have an account? Register here</a>
                </div>
            </form>
        </div>
    );
}
