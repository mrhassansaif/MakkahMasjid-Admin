import React from 'react'
import './Dashboard.css'; // Import the CSS file


export default function Dashboard() {
  return (
    <>
    <div id="viewport">
      {/* Sidebar */}
      <div id="sidebar">
        <header>
          <a href="#">Makkah MAsjid Admin</a>
        </header>
        <div className="nav">
          <a href="#">
            <i className="zmdi zmdi-view-dashboard"></i> Dashboard
          </a>
          <a href="#">
            <i className="zmdi zmdi-link"></i> Shortcuts
          </a>
          <a href="#">
            <i className="zmdi zmdi-widgets"></i> Overview
          </a>
          <a href="#">
            <i className="zmdi zmdi-calendar"></i> Events
          </a>
          <a href="#">
            <i className="zmdi zmdi-info-outline"></i> About
          </a>
          <a href="#">
            <i className="zmdi zmdi-settings"></i> Services
          </a>
          <a href="#">
            <i className="zmdi zmdi-comment-more"></i> Contact
          </a>
        </div>
      </div>
      {/* Content */}
      <div id="content">
        <div className="container-fluid">
          <h1>Simple Sidebar</h1>
          <p>
            Make sure to keep all page content within the <code>#content</code>.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
