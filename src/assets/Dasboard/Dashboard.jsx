import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FaPray } from "react-icons/fa";
import { GrSchedules, GrAnnounce } from "react-icons/gr";
import { TbMessageCircleExclamation } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import Submissions from "./Submissions/Submissions";
import NamazTiming from "./NamazTimings/NamazTimings";
import RamadanTiming from "./RamadanTimings/RamadanTimings";
import News from "./News/News";
import { Button, Modal } from "react-bootstrap";
import { Link, Navigate } from 'react-router-dom';

import { auth, onAuthStateChanged, signOut } from "../Firebase/FirebaseConfig";
import Spinner from "react-bootstrap/Spinner";

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState("NamazTiming");
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  function Loader() {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Spinner animation="grow" />
      </div>
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setIsUser(true);
      } else {
        setIsUser(false);
      }

      // Authentication check is complete, stop loading
      setIsLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleMenuItemClick = (component, event) => {
    event.preventDefault();
    setSelectedComponent(component);
  };

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     window.location.href = "/login"; // Redirect to the login screen
  //   } catch (error) {
  //     console.error("Error during logout:", error.message);
  //   }
  // };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login"; // Redirect to the login screen
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const closeModal = () => {
    setShowLogoutModal(false);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isUser ? (
        <>
        <div id="viewport">
          {/* Sidebar */}
          <div id="sidebar">
            <header>
              <div href="#">Makkah Masjid Admin</div>
            </header>
            <div className="nav">
              <div
                onClick={(event) => handleMenuItemClick("NamazTiming", event)}
              >
                <FaPray /> &nbsp;&nbsp;&nbsp;Prayer Timing
              </div>
              <div
                onClick={(event) => handleMenuItemClick("RamadanTiming", event)}
              >
                <GrSchedules /> &nbsp;&nbsp;&nbsp;Ramadan Timing
              </div>
              <div onClick={(event) => handleMenuItemClick("News", event)}>
                <GrAnnounce /> &nbsp;&nbsp;&nbsp;Events
              </div>
              <div
                onClick={(event) => handleMenuItemClick("Submissions", event)}
              >
                <TbMessageCircleExclamation /> &nbsp;&nbsp;&nbsp;Submissions
              </div>
              <div
                style={{ color: "Red" }}
                onClick={handleLogout}
              >
                <CiLogout /> &nbsp;&nbsp;&nbsp;Log Out
              </div>
            </div>
          </div>
          {/* Content */}
          <div id="content">
            <div className="container-fluid">
              {/* Render the selected component based on the state */}
              {selectedComponent === "NamazTiming" && <NamazTiming />}
              {selectedComponent === "RamadanTiming" && <RamadanTiming />}
              {selectedComponent === "News" && <News />}
              {selectedComponent === "Submissions" && <Submissions />}
            </div>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={closeModal}>
        <Modal.Header closeButton style={{ backgroundColor: "Red" }}>
          <Modal.Title >Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
  </>
        
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
}
