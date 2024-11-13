import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EventForm from './components/EventForm';
import Timeline from './components/Timeline';
import SignUp from './components/Signup';
import Login from './components/Login';

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
      <header className="App-header">
        <h1>My Timeline App</h1>
        {!isLoggedIn ? (
          <>
            <SignUp />
            <Login onLogin={handleLogin} />
          </>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
            <EventForm addEvent={addEvent} />
            <Timeline events={events} onDeleteEvent={deleteEvent} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;