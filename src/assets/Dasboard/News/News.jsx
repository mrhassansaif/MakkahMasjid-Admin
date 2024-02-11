import React, { useState, useEffect } from 'react';
import "./News.css";
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { db, collection, doc, setDoc, onSnapshot, deleteDoc } from "../../Firebase/FirebaseConfig";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Spinner animation="grow" />
    </div>
  );
}

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);

  // Fetch news list from Firestore on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "News"), (snapshot) => {
      const newsData = [];
      snapshot.forEach((doc) => {
        newsData.push({ id: doc.id, ...doc.data() });
      });
      setNewsList(newsData);
    });

    return () => unsubscribe();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddNews = async () => {
    if (!newNews.title || !newNews.content) {
      alert("Title and content cannot be empty!");
      return;
    }

    setLoading(true); // Show loading spinner while adding news

    try {
      await setDoc(doc(collection(db, "News")), newNews);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    } finally {
      setLoading(false); // Turn off loading spinner
    }
  };

  const handleDeleteNews = async (newsId) => {
    try {
      await deleteDoc(doc(db, "News", newsId));
    } catch (error) {
      console.error("Error deleting data from Firestore:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Button variant="primary" onClick={handleShowModal}>Add News</Button>
          <ListGroup>
            {newsList.map((news) => (
              <ListGroup.Item key={news.id}>
                <h4>{news.title}</h4>
                <p>{news.content}</p>
                <Button variant="danger" onClick={() => handleDeleteNews(news.id)}>Delete</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {loading && <Loader />} {/* Show loader if loading */}
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
