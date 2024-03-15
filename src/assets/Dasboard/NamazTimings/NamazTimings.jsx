import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Import Axios for HTTP requests
import { db, doc, setDoc, getDoc } from '../../Firebase/FirebaseConfig'; // Import Firestore functions
import './NamazTimings.css'; 

export default function NamazTiming() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState({});
  const [namazTimings, setNamazTimings] = useState([]);
  const [azanTimings, setAzanTimings] = useState({}); // State to hold fetched Azan timings

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Azan timings from the AlAdhan API
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        // const apiURL = 'https://api.aladhan.com/v1/timings/2024-02-24?latitude=32.931764267092596&longitude=-96.67948816258345&method=1&school=1'
        const response = await axios.get('https://api.aladhan.com/v1/timings/' + formattedDate + '?latitude=32.931764267092596&longitude=-96.67948816258345&method=1&school=1');
        const { data } = response.data;
        const formattedAzanTimings = formatAzanTimings(data.timings);
        setAzanTimings(formattedAzanTimings);
        console.log(formattedAzanTimings);
        
        // Fetch Namaz timings from Firestore
        const docSnap = await getDoc(doc(db, 'NamazTimings', '2024'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.timings) {
            setNamazTimings(data.timings);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatAzanTimings = (azanTimings) => {
    const formattedTimings = {};
    for (const [key, value] of Object.entries(azanTimings)) {
      formattedTimings[key] = convertTo12HourFormat(value);
    }
    return formattedTimings;
  };

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = (hours % 12) || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const handleShowModal = (timing) => {
    setSelectedTiming(timing);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTiming({});
    setShowModal(false);
  };

  const handleUpdateTiming = async () => {
    try {
      const updatedTimings = namazTimings.map(timing =>
        timing.namazName === selectedTiming.namazName ? selectedTiming : timing
      );
      setNamazTimings(updatedTimings);

      const namazTimingsData = updatedTimings.map(({ namazName, timing }) => ({
        namazName,
        timing
      }));
  
      await setDoc(doc(db, "NamazTimings", "2024"), {
        timings: namazTimingsData
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
                  <th>Action</th> {/* New column for action buttons */}
                </tr>
              </thead>
              <tbody>
                {namazTimings.map((timing, index) => (
                  <tr key={index}>
                    <td>{timing.namazName}</td>
                    <td>{azanTimings[timing.namazName]}</td> {/* Display Azan timing fetched from API */}
                    <td>
                      <input
                        type="text"
                        value={timing.timing}
                        onChange={(e) => handleTimingChange(e, timing.namazName)}
                      />
                    </td>
                    <td> {/* Action button for each namaz timing */}
                      <Button variant="primary" onClick={() => handleShowModal(timing)}>
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
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
          <Form>
            <Form.Group controlId="formNamazName">
              <Form.Label>Namaz Name</Form.Label>
              <Form.Control type="text" placeholder="Namaz Name" value={selectedTiming.namazName || ''} readOnly />
            </Form.Group>
            <Form.Group controlId="formTiming">
              <Form.Label>New Iqamah Timing</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter New Timing (12:40 PM)"
                value={selectedTiming.timing || ''}
                onChange={(e) => setSelectedTiming({ ...selectedTiming, timing: e.target.value })}
              />
            </Form.Group>
          </Form>
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
