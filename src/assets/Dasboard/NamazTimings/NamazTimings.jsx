import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import { db, doc, setDoc, getDoc } from '../../Firebase/FirebaseConfig'; // Import Firestore functions
import './NamazTimings.css';

// Dummy Namaz timings data
const dummyNamazTimings = [
  { namazName: 'Fajr', azanTime: '5:30 AM', timing: '5:30 AM' },
  { namazName: 'Dhuhr', azanTime: '5:30 AM', timing: '12:30 PM' },
  { namazName: 'Asr', azanTime: '5:30 AM', timing: '4:00 PM' },
  { namazName: 'Maghrib', azanTime: '5:30 AM', timing: '6:45 PM' },
  { namazName: 'Isha', azanTime: '5:30 AM', timing: '8:30 PM' },
  { namazName: 'Jummah', azanTime: '5:30 AM', timing: '8:30 PM' },
];

export default function NamazTiming() {
  // const [namazTimings, setNamazTimings] = useState(dummyNamazTimings);
  const [showModal, setShowModal] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState({});

  const [namazTimings, setNamazTimings] = useState([]); // Initialize namazTimings state as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'NamazTimings', '2024')); // Fetch document from Firestore
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.timings) {
            setNamazTimings(data.timings); // Update namazTimings state with data fetched from Firestore
          }
        }
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData(); // Call the fetchData function when component mounts
  }, []); // Add empty dependency array to ensure useEffect only runs once on mount


  const handleShowModal = () => {
    setSelectedTiming(namazTimings[0]); // Initialize selectedTiming with the first item from the array
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateTiming = async () => {
    try {
      // Update the main table with the edited timing
      const updatedTimings = namazTimings.map(timing =>
        timing.namazName === selectedTiming.namazName ? selectedTiming : timing
      );
      setNamazTimings(updatedTimings);

      // Prepare data to be saved in Firestore
      const namazTimingsData = updatedTimings.map(({ namazName, timing }) => ({
        namazName,
        timing
      }));
  
      // Add a new document in collection "NamazTimings" with a specific document ID "2024"
      await setDoc(doc(db, "NamazTimings", "2024"), {
        timings: namazTimingsData // Store namazName and timing data
      });
      console.log("Data added to Firestore:", namazTimingsData);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }
  };

  const handleTimingChange = (e, namazName) => {
    const updatedTiming = e.target.value;
    setSelectedTiming({ ...selectedTiming, namazName, timing: updatedTiming });
  };

  return (
    <>
      <h1>Update Iqamah Timing</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Namaz</th>
                  <th>Adhaan Timings</th>
                  <th>Iqamah Timing</th>
                </tr>
              </thead>
              <tbody>
                {namazTimings.map((timing, index) => (
                  <tr key={index}>
                    <td>{timing.namazName}</td>
                    <td>{dummyNamazTimings.find(item => item.namazName === timing.namazName)?.azanTime}</td>
                    <td>
                      <input
                        type="text"
                        value={timing.timing}
                        onChange={(e) => handleTimingChange(e, timing.namazName)}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2"></td>
                  <td>
                    <Button variant="primary" onClick={handleShowModal}>
                      Update
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal for updating Namaz timing */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Iqamah Timing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Namaz</th>
                <th>Iqamah Timing</th>
              </tr>
            </thead>
            <tbody>
              {namazTimings.map((timing, index) => (
                <tr key={index}>
                  <td>{timing.namazName}</td>
                  <td>
                    <input
                      type="text"
                      value={selectedTiming.timing}
                      onChange={(e) => handleTimingChange(e, timing.namazName)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTiming}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
