import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

function EventForm({ addEvent }) {
  const [newEvent, setNewEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newEvent.trim() && eventDate.trim()) {
      setLoading(true);
      setMessage(""); // Clear any previous message
      try {
        await addEvent(newEvent, eventDate); // Assuming addEvent is async
        setNewEvent("");
        setEventDate("");
        setMessage("Event added successfully!");
      } catch (error) {
        console.error("Error adding event:", error);
        setMessage("Failed to add event. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="event-form p-3 rounded shadow-sm bg-white">
      <Form.Group controlId="eventDetails" className="mb-3">
        <Form.Label>Event Details</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event details"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          disabled={loading}
        />
      </Form.Group>
      <Form.Group controlId="eventDate" className="mb-3">
        <Form.Label>Event Date</Form.Label>
        <Form.Control
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          disabled={loading}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading} className="w-100">
        {loading ? (
          <>
            <Spinner animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
            Adding...
          </>
        ) : (
          "Add Event"
        )}
      </Button>
      {message && <Alert className="mt-3" variant={message.includes("success") ? "success" : "danger"}>{message}</Alert>}
    </Form>
  );
}

export default EventForm;