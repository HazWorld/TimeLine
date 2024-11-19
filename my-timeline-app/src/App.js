import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventForm from './components/EventForm';
import Timeline from './components/Timeline';
import SignUp from './components/Signup';
import Login from './components/Login';
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';

function App() {
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchEvents = async () => {
    if (!userId) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5001/events/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok) {
        setEvents(data);
      } else {
        console.error("Failed to fetch events:", data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchEvents();
    }
  }, [userId, isLoggedIn]);

  const addEvent = async (text, date) => {
    if (!userId) {
      console.error("No user ID set. Cannot add event.");
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5001/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, text, date }),
      });

      if (response.ok) {
        fetchEvents();
      } else {
        console.error("Failed to add event.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const deleteEvent = async (eventId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5001/events/${eventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        fetchEvents(); // Refresh the events list after deletion
      } else {
        console.error("Failed to delete event.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleLogin = (id) => {
    setUserId(id);
    setIsLoggedIn(true);
    fetchEvents();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserId(null);
    setIsLoggedIn(false);
    setEvents([]);
  };

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">My Timeline App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#timeline">Timeline</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
            <Nav>
              {!isLoggedIn ? (
                <Button variant="outline-light" className="me-2" href="#sign-in">Sign In</Button>
              ) : (
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {!isLoggedIn ? (
          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <SignUp />
              <Login onLogin={handleLogin} />
            </Col>
          </Row>
        ) : (
          <>
            <h2 className="text-center mb-4">Welcome to your Timeline</h2>
            <EventForm addEvent={addEvent} />
            <Timeline events={events} onDeleteEvent={deleteEvent} />
          </>
        )}
      </Container>
    </div>
  );
}

export default App;