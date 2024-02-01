import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import BackgroundImage from "../Images/background.png";
import Logo from "../Images/MasjidLogo.png";
import {auth, signInWithEmailAndPassword } from "../Firebase/FirebaseConfig";
import { Link, Navigate } from 'react-router-dom';


const Login = () => {
  const [Validate, setValidate] = useState(false)
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // const auth = getAuth(); // Initialize Firebase Auth

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, inputUsername, inputPassword);
      // If sign-in is successful, you can redirect or perform other actions here
      console.log("User signed in successfully");
      setValidate(true)
    } catch (error) {
      // Handle authentication errors
      console.error("Authentication error:", error);
      setShow(true);
    }

    setLoading(false);
  };

  return (

    <>{Validate ? (<Navigate to='/dashboard' />) : (<div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Makkah Masjid Admin LogIn</div>
        {/* Alert */}
        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        )}
        {/* Form inputs */}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        {/* Submit button */}
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        {/* Forgot password link */}
        <div className="d-grid justify-content-end">
          <Button className="text-muted px-0" variant="link">
            Forgot password? Contact Administrator
          </Button>
        </div>
      </Form>
    </div>)} </>
    
  );
};

export default Login;
