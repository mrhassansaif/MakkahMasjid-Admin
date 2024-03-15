import React, { useState, useEffect } from "react";
import "./News.css";
import { ListGroup, Button, Modal, Form } from "react-bootstrap";
import {
  db,
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../Firebase/FirebaseConfig";
import Spinner from "react-bootstrap/Spinner";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

function Loader() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Spinner animation="grow" />
    </div>
  );
}

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  // Initialize storage
  const storage = getStorage();

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
    if (!newNews.title || !newNews.content || !newNews.image) {
      alert("Title, content, and image cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      // Generate a unique name for the image file
      const imageName = `${Date.now()}-${newNews.image.name}`;
      const imageRef = ref(storage, imageName);

      // Upload the image file to Firebase Storage
      await uploadBytes(imageRef, newNews.image);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Create a new object without the image property
      const newsDataWithoutImage = { ...newNews };
      delete newsDataWithoutImage.image;

      // Add news data with image URL to Firestore
      await setDoc(doc(collection(db, "News")), {
        ...newsDataWithoutImage,
        imageUrl,
      });

      // Reset newNews state
      setNewNews({ title: "", content: "", image: null });

      handleCloseModal();
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    } finally {
      setLoading(false);
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
          <Button variant="primary" onClick={handleShowModal}>
            Add News
          </Button>
          <ListGroup>
            {newsList.map((news) => (
              <ListGroup.Item key={news.id}>
                <img className="news-image" src={news.imageUrl} alt="News" />
                <h4>{news.title}</h4>
                <p>{news.content}</p>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteNews(news.id)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {loading && <Loader />}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={(e) =>
                  setNewNews({ ...newNews, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Content"
                onChange={(e) =>
                  setNewNews({ ...newNews, content: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setNewNews({ ...newNews, image: e.target.files[0] })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            disabled={loading}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAddNews} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Add News"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
