import React, { useState, useEffect } from 'react';
import "./NamazTimings.css";
import { Table, Modal, Button, Form } from 'react-bootstrap';

// Dummy Namaz timings data
const dummyNamazTimings = [
  { namazName: 'Fajr', timing: '5:30 AM' },
  { namazName: 'Dhuhr', timing: '12:30 PM' },
  { namazName: 'Asr', timing: '4:00 PM' },
  { namazName: 'Maghrib', timing: '6:45 PM' },
  { namazName: 'Isha', timing: '8:30 PM' },
];

export default function NamazTiming() {
  const [namazTimings, setNamazTimings] = useState(dummyNamazTimings);
  const [showModal, setShowModal] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState({});

  // Fetch Namaz timings from your backend (replace 'your-api-endpoint' with the actual endpoint)
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

  const handleUpdateTiming = () => {
    // Implement the logic to update Namaz timing in the backend
    // After successful update, close the modal and refresh the timings
    // Example: axios.put('your-update-endpoint', selectedTiming).then(...)
    handleCloseModal();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Namaz</th>
                <th>Timing</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {namazTimings.map((timing, index) => (
                <tr key={index}>
                  <td>{timing.namazName}</td>
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
          <Modal.Title>Update Namaz Timing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNamazName">
              <Form.Label>Namaz</Form.Label>
              <Form.Control type="text" placeholder="Enter Namaz Name" value={selectedTiming.namazName || ''} readOnly />
            </Form.Group>
            <Form.Group controlId="formTiming">
              <Form.Label>New Timing</Form.Label>
              <Form.Control type="text" placeholder="Enter New Timing" onChange={(e) => setSelectedTiming({ ...selectedTiming, timing: e.target.value })} />
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
  );
}
