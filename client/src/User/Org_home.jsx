import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Userhome.css';
import authen from '../context/authen';
import { useContext,useEffect } from 'react';

export default function Org_Home() {
    const username = sessionStorage.getItem('username');
    const navigate = useNavigate();
    const login=useContext(authen)
    useEffect(()=>{
       (!login.status)?navigate("/login"):" "
    })


    const handleLogout = () => {
        // Clear session storage
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userid'); // If you are storing user ID
        login.setLogin(false);//after logout set the status into  false

        
        // Redirect to login page or another page
        navigate('/login');
    };

    return (
        <>
        
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <a href="#" className="logo">Logo</a>
                    </div>
                    <div className="navbar-middle">
                        <div className="search-container">
                            <i className="fas fa-search search-icon"></i>
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div>
                    <div className="navbar-right">
                        <a href="#">Home</a>
                        <a href="#">Collections</a>
                        <a href="#">Cart</a>
                        <a href="#">About Us</a>
                        <a href="#" onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            </nav>
            <h1>Welcome, {username}</h1>
        </>
    );
}
