import React, { useState, useEffect } from "react";
import "./Ramadantimings.css";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { db, doc, setDoc } from "../../Firebase/FirebaseConfig"; 

// Dummy Ramadan timings data
const dummyRamadanTimings = [
  {
    date: "2024-04-01",
    day: "Monday",
    roza: "01",
    suhurTiming: "5:00 AM",
    iftarTiming: "7:30 PM",
  },
  {
    date: "2024-04-02",
    day: "Tuesday",
    roza: "02",
    suhurTiming: "5:05 AM",
    iftarTiming: "7:35 PM",
  },
  {
    date: "2024-04-03",
    day: "Wednessday",
    roza: "03",
    suhurTiming: "5:10 AM",
    iftarTiming: "7:40 PM",
  },
  {
    date: "2024-04-04",
    day: "Thursday",
    roza: "04",
    suhurTiming: "5:15 AM",
    iftarTiming: "7:45 PM",
  },
  {
    date: "2024-04-05",
    day: "Friday",
    roza: "05",
    suhurTiming: "5:20 AM",
    iftarTiming: "7:50 PM",
  },
];
const RamadanTimings2024 = [
  
  {
    date: "2024-03-11",
    day: "Monday",
    roza: "01",
    suhurTiming: "04:43",
    iftarTiming: "06:20",
},
{
    date: "2024-03-12",
    day: "Tuesday",
    roza: "02",
    suhurTiming: "04:41",
    iftarTiming: "06:18",
},
{
    date: "2024-03-13",
    day: "Wednesday",
    roza: "03",
    suhurTiming: "04:38",
    iftarTiming: "06:15",
},
{
    date: "2024-03-14",
    day: "Thursday",
    roza: "04",
    suhurTiming: "04:36",
    iftarTiming: "06:13",
},
{
    date: "2024-03-15",
    day: "Friday",
    roza: "05",
    suhurTiming: "04:34",
    iftarTiming: "06:11",
},
{
    date: "2024-03-16",
    day: "Saturday",
    roza: "06",
    suhurTiming: "04:32",
    iftarTiming: "06:09",
},
{
    date: "2024-03-17",
    day: "Sunday",
    roza: "07",
    suhurTiming: "04:29",
    iftarTiming: "06:06",
},
{
    date: "2024-03-18",
    day: "Monday",
    roza: "08",
    suhurTiming: "04:27",
    iftarTiming: "06:04",
},
{
    date: "2024-03-19",
    day: "Tuesday",
    roza: "09",
    suhurTiming: "04:25",
    iftarTiming: "06:02",
},
{
    date: "2024-03-20",
    day: "Wednesday",
    roza: "10",
    suhurTiming: "04:23",
    iftarTiming: "05:59",
},
{
    date: "2024-03-21",
    day: "Thursday",
    roza: "11",
    suhurTiming: "04:21",
    iftarTiming: "05:57",
},
{
    date: "2024-03-22",
    day: "Friday",
    roza: "12",
    suhurTiming: "04:20",
    iftarTiming: "05:55",
},
{
    date: "2024-03-23",
    day: "Saturday",
    roza: "13",
    suhurTiming: "04:18",
    iftarTiming: "05:53",
},
{
    date: "2024-03-24",
    day: "Sunday",
    roza: "14",
    suhurTiming: "04:15",
    iftarTiming: "05:50",
},
{
    date: "2024-03-25",
    day: "Monday",
    roza: "15",
    suhurTiming: "04:13",
    iftarTiming: "05:48",
},
{
    date: "2024-03-26",
    day: "Tuesday",
    roza: "16",
    suhurTiming: "04:12",
    iftarTiming: "05:46",
},
{
    date: "2024-03-27",
    day: "Wednesday",
    roza: "17",
    suhurTiming: "04:09",
    iftarTiming: "05:43",
},
{
    date: "2024-03-28",
    day: "Thursday",
    roza: "18",
    suhurTiming: "04:08",
    iftarTiming: "05:41",
},
{
    date: "2024-03-29",
    day: "Friday",
    roza: "19",
    suhurTiming: "04:06",
    iftarTiming: "05:39",
},
{
    date: "2024-03-30",
    day: "Saturday",
    roza: "20",
    suhurTiming: "04:04",
    iftarTiming: "05:37",
},
{
    date: "2024-03-31",
    day: "Sunday",
    roza: "21",
    suhurTiming: "05:02",
    iftarTiming: "06:34",
},
{
    date: "2024-04-01",
    day: "Monday",
    roza: "22",
    suhurTiming: "05:00",
    iftarTiming: "06:32",
},
{
    date: "2024-04-02",
    day: "Tuesday",
    roza: "23",
    suhurTiming: "04:58",
    iftarTiming: "06:30",
},
{
    date: "2024-04-03",
    day: "Wednesday",
    roza: "24",
    suhurTiming: "04:56",
    iftarTiming: "06:28",
},
{
    date: "2024-04-04",
    day: "Thursday",
    roza: "25",
    suhurTiming: "04:53",
    iftarTiming: "06:25",
},
{
    date: "2024-04-05",
    day: "Friday",
    roza: "26",
    suhurTiming: "04:51",
    iftarTiming: "06:23",
},
{
    date: "2024-04-06",
    day: "Saturday",
    roza: "27",
    suhurTiming: "04:49",
    iftarTiming: "06:21",
},
{
    date: "2024-04-07",
    day: "Sunday",
    roza: "28",
    suhurTiming: "04:47",
    iftarTiming: "06:19",
},
{
    date: "2024-04-08",
    day: "Monday",
    roza: "29",
    suhurTiming: "04:44",
    iftarTiming: "06:16",
},
{
    date: "2024-04-09",
    day: "Tuesday",
    roza: "30",
    suhurTiming: "04:42",
    iftarTiming: "06:14",
},
{
    date: "2024-04-10",
    day: "Wednesday",
    roza: "Eid ul-Fitr*",
    suhurTiming: "04:40",
    iftarTiming: "06:12",
}

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

  const handleUpdateTiming = async () => {
    console.log("handleUpdateTiming called");
    try {
      // Add a new document in collection "RamadanTimings" with a specific document ID "2024"
      await setDoc(doc(db, "RamadanTimings", "2024"), {
        timings: dummyRamadanTimings // Store dummyRamadanTimings data under a field named "timings"
      });
      console.log("Data added to Firestore:", dummyRamadanTimings);
      handleCloseModal();
    } catch (error) {
      // Handle errors
      console.error("Error adding data to Firestore:", error);
    }
  };

  return (
    <>
    <h1>Ramadan Timings</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Roza</th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Suhur Timing</th>
                  <th>Iftar Timing</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ramadanTimings.map((timing, index) => (
                  <tr key={index}>
                    <td>{timing.roza}</td>
                    <td>{timing.date}</td>
                    <td>{timing.day}</td>
                    <td>{timing.suhurTiming}</td>
                    <td>{timing.iftarTiming}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowModal(timing)}
                      >
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
                <Form.Label>Roza</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Roza Number"
                  value={selectedTiming.roza || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Date"
                  value={selectedTiming.date || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Day</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Day"
                  value={selectedTiming.day || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formSuhurTiming">
                <Form.Label>New Suhur Timing</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter New Suhur Timing"
                  onChange={(e) =>
                    setSelectedTiming({
                      ...selectedTiming,
                      suhurTiming: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formIftarTiming">
                <Form.Label>New Iftar Timing</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter New Iftar Timing"
                  onChange={(e) =>
                    setSelectedTiming({
                      ...selectedTiming,
                      iftarTiming: e.target.value,
                    })
                  }
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
      </div>
    </>
  );
}
