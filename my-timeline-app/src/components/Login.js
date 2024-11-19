import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLogin(data.userId);
        setMessage("Logged in successfully!");
      } else {
        setMessage("Invalid login.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Container className="p-4 rounded shadow-sm bg-white" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Log In</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="loginEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="loginPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Log In
        </Button>
      </Form>
      {message && (
        <Alert variant={message.includes("successfully") ? "success" : "danger"} className="mt-3">
          {message}
        </Alert>
      )}
    </Container>
  );
}

export default Login;