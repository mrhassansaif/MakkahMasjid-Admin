import React, { useState, useEffect } from 'react';
import "./Ramadantimings.css";
import { Table, Modal, Button, Form } from 'react-bootstrap';

// Dummy Ramadan timings data
const dummyRamadanTimings = [
  { date: '2024-04-01', suhurTiming: '5:00 AM', iftarTiming: '7:30 PM' },
  { date: '2024-04-02', suhurTiming: '5:05 AM', iftarTiming: '7:35 PM' },
  { date: '2024-04-03', suhurTiming: '5:10 AM', iftarTiming: '7:40 PM' },
  { date: '2024-04-04', suhurTiming: '5:15 AM', iftarTiming: '7:45 PM' },
  { date: '2024-04-05', suhurTiming: '5:20 AM', iftarTiming: '7:50 PM' },
];

export default function RamadanTiming() {
  const [ramadanTimings, setRamadanTimings] = useState(dummyRamadanTimings);
  const [showModal, setShowModal] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState({});

  // Fetch Ramadan timings from your backend (replace 'your-api-endpoint' with the actual endpoint)
  useEffect(() => {
    // For testing purposes, using dummy data instead of API call
    setRamadanTimings(dummyRamadanTimings);
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
    // Implement the logic to update Ramadan timing in the backend
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
                <th>Date</th>
                <th>Suhur Timing</th>
                <th>Iftar Timing</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ramadanTimings.map((timing, index) => (
                <tr key={index}>
                  <td>{timing.date}</td>
                  <td>{timing.suhurTiming}</td>
                  <td>{timing.iftarTiming}</td>
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

      {/* Modal for updating Ramadan timing */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Ramadan Timing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="text" placeholder="Enter Date" value={selectedTiming.date || ''} readOnly />
            </Form.Group>
            <Form.Group controlId="formSuhurTiming">
              <Form.Label>New Suhur Timing</Form.Label>
              <Form.Control type="text" placeholder="Enter New Suhur Timing" onChange={(e) => setSelectedTiming({ ...selectedTiming, suhurTiming: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formIftarTiming">
              <Form.Label>New Iftar Timing</Form.Label>
              <Form.Control type="text" placeholder="Enter New Iftar Timing" onChange={(e) => setSelectedTiming({ ...selectedTiming, iftarTiming: e.target.value })} />
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
