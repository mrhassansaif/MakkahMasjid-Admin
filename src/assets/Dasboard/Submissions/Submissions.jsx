import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

// Assume contact form submissions data structure
const mockSubmissions = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    email: 'alice@example.com', 
    number: '555 123 4567', 
    message: 'Thank you for your wonderful service. I appreciate the efforts of the mosque community.',
    date: '2024-02-10' 
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    email: 'bob@example.com', 
    number: '555 987 6543', 
    message: 'I would like to inquire about volunteering opportunities at the mosque. Can someone contact me?',
    date: '2024-02-09' 
  },
  { 
    id: 3, 
    name: 'Emma Davis', 
    email: 'emma@example.com', 
    number: '555 234 5678', 
    message: 'Hello, I have a suggestion for the upcoming event. Could you please get in touch?',
    date: '2024-02-08' 
  },
  { 
    id: 4, 
    name: 'David Wilson', 
    email: 'david@example.com', 
    number: '555 876 5432', 
    message: 'I attended the last event and wanted to express my gratitude. It was a memorable experience.',
    date: '2024-02-07' 
  },
  { 
    id: 5, 
    name: 'Sophia Miller', 
    email: 'sophia@example.com', 
    number: '555 345 6789', 
    message: 'I have a question about the mosque\'s community programs. Can someone provide more information?',
    date: '2024-02-06' 
  },
  // Add more submissions as needed
];



const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch submissions from your database and update the state
    // Replace this with your actual API or database call
    setSubmissions(mockSubmissions);
  }, []);

  const handleSubmissionClick = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSubmission(null);
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>Submission Inbox</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.id}</td>
              <td>{submission.date}</td>
              <td>{submission.name}</td>
              <td>{submission.email}</td>
              <td>{submission.number}</td>
              <td>
                <Button variant="info" onClick={() => handleSubmissionClick(submission)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Submission Details Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Submission Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission && (
            <>
              <p><strong>Date:</strong> {selectedSubmission.date}</p>
              <p><strong>Name:</strong> {selectedSubmission.name}</p>
              <p><strong>Email:</strong> {selectedSubmission.email}</p>
              <p><strong>Contact Number:</strong> {selectedSubmission.number}</p>
              <p><strong>Message:</strong> {selectedSubmission.message}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Submissions;

