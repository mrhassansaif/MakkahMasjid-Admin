import React from 'react'
import './Dashboard.css'; // Import the CSS file
import { FaPray } from "react-icons/fa";
import { GrSchedules, GrAnnounce } from "react-icons/gr";
import { TbMessageCircleExclamation } from "react-icons/tb";
import Submissions from './Submissions';
import NamazTiming from './NamazTimings';
import RamadanTiming from './RamadanTimings';
import News from './News';


export default function Dashboard() {
  return (
    <>
    <div id="viewport">
      {/* Sidebar */}
      <div id="sidebar">
        <header>
          <a href="#">Makkah Masjid Admin</a>
        </header>
        <div className="nav">
          <a href="#">
           <FaPray /> &nbsp;&nbsp;&nbsp;Prayer Timing
          </a>
          <a href="#">
            <GrSchedules /> &nbsp;&nbsp;&nbsp;Ramadan Timing
          </a>
          <a href="#">
            <GrAnnounce /> &nbsp;&nbsp;&nbsp;Events
          </a>
          <a href="#">
          <TbMessageCircleExclamation /> &nbsp;&nbsp;&nbsp;Submissions
          </a>
        </div>
      </div>
      {/* Content */}
      <div id="content">
        <div className="container-fluid">
          {/* <h1>Update Prayer Timings</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium impedit fuga consequuntur earum quo enim alias dolorum nisi magni distinctio pariatur, ducimus excepturi laudantium molestias voluptates. Libero doloremque adipisci odio?.
          </p> */}
          <Submissions />
          {/* <NamazTiming /> */}
          {/* <RamadanTiming /> */}
          {/* <News /> */}
        </div>
      </div>
    </div>
    </>
  )
}
