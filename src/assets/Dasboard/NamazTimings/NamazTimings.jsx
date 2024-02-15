import React, { useState, useEffect } from 'react';
import "./NamazTimings.css";
import { Table, Modal, Button, Form } from 'react-bootstrap';
import { db, doc, setDoc } from '../../Firebase/FirebaseConfig'; // Import Firestore functions

// Dummy Namaz timings data
const dummyNamazTimings = [
  { namazName: 'Fajr', azanTime: '5:30 AM', timing: '5:30 AM' },
  { namazName: 'Dhuhr', azanTime: '5:30 AM', timing: '12:30 PM' },
  { namazName: 'Asr', azanTime: '5:30 AM', timing: '4:00 PM' },
  { namazName: 'Maghrib', azanTime: '5:30 AM', timing: '6:45 PM' },
  { namazName: 'Isha', azanTime: '5:30 AM',timing: '8:30 PM' },
  { namazName: 'Jummah', azanTime: '5:30 AM',timing: '8:30 PM' },
];

export default function NamazTiming() {
  const [namazTimings, setNamazTimings] = useState(dummyNamazTimings);
  const [showModal, setShowModal] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState({});

  useEffect(() => {
    // For testing purposes, using dummy data instead of API call
    setNamazTimings(dummyNamazTimings);
  }, []);

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
      // Prepare data to be saved in Firestore
      const namazTimingsData = namazTimings.map(({ namazName, timing }) => ({
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {namazTimings.map((timing, index) => (
                <tr key={index}>
                  <td>{timing.namazName}</td>
                  <td>{timing.azanTime}</td>
                  <td>{timing.timing}</td>
                  <td>
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
            <Form.Group controlId="formNamazName">
              <Form.Label>Adhaan Time</Form.Label>
              <Form.Control type="text" placeholder="Azan Timing Live Updated" value={selectedTiming.azanTime || ''} readOnly />
            </Form.Group>
            <Form.Group controlId="formNamazName">
              <Form.Label>Iqamah Time</Form.Label>
              <Form.Control type="text" placeholder="Current Iqamah Timings" value={selectedTiming.timing || ''} readOnly />
            </Form.Group>
            <Form.Group controlId="formTiming">
              <Form.Label>New Iqamah Timing</Form.Label>
              <Form.Control type="text" placeholder="Enter New Timing (12:40 PM)" onChange={(e) => setSelectedTiming({ ...selectedTiming, timing: e.target.value })} />
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
    </div>
    </>
  );
}
