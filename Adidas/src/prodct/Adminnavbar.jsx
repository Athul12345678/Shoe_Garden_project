import React from 'react'
import { Link } from 'react-router-dom'
import './Adminnavbar.css'  // Import the CSS file

export default function Adminnavbar() {
  return (
    <nav className="admin-navbar">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="nav-links">
        <Link to="#" className="nav-link">Home</Link>
        <Link to="/add-product" className="nav-link">Add Product</Link>
        <Link to="/product-list" className="nav-link">View Product</Link>
        <Link to="/userview" className="nav-link">View Users</Link>

      </div>
    </nav>
  )
}