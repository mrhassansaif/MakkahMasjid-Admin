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
  const [showModal, setShowModal] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState({});
  const [namazTimings, setNamazTimings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'NamazTimings', '2024'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.timings) {
            setNamazTimings(data.timings);
          }
        }
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
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
                    <td>{dummyNamazTimings.find(item => item.namazName === timing.namazName)?.azanTime}</td>
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
