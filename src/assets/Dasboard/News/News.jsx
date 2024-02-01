import React, { useState, useEffect } from 'react';
import "./News.css";
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';

// Dummy news data
const dummyNewsList = [
  { id: 1, title: 'Breaking News 1', content: 'This is the content of Breaking News 1.' },
  { id: 2, title: 'Local News 1', content: 'This is the content of Local News 1.' },
  { id: 3, title: 'Technology News 1', content: 'This is the content of Technology News 1.' },
];

export default function News() {
  const [newsList, setNewsList] = useState(dummyNewsList);
  const [showModal, setShowModal] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', content: '' });

  // Fetch news list from your backend (replace 'your-api-endpoint' with the actual endpoint)
  useEffect(() => {
    // For testing purposes, using dummy data instead of API call
    setNewsList(dummyNewsList);
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddNews = () => {
    // Implement the logic to add news to the backend
    // After successful addition, close the modal and refresh the news list
    // Example: axios.post('your-add-endpoint', newNews).then(...)
    const newNewsWithId = { ...newNews, id: newsList.length + 1 };
    setNewsList([...newsList, newNewsWithId]);
    handleCloseModal();
  };

  const handleDeleteNews = (newsId) => {
    // Implement the logic to delete news from the backend
    // After successful deletion, refresh the news list
    // Example: axios.delete(`your-delete-endpoint/${newsId}`).then(...)
    setNewsList(newsList.filter(news => news.id !== newsId));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Button variant="primary" onClick={handleShowModal}>Add News</Button>
          <ListGroup>
            {newsList.map((news, index) => (
              <ListGroup.Item key={index}>
                <h4>{news.title}</h4>
                <p>{news.content}</p>
                <Button variant="danger" onClick={() => handleDeleteNews(news.id)}>Delete</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>

      {/* Modal for adding news */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title" onChange={(e) => setNewNews({ ...newNews, title: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Content" onChange={(e) => setNewNews({ ...newNews, content: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddNews}>
            Add News
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
