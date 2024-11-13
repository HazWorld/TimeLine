import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        placeholder="Enter event details"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
        disabled={loading}
      />
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Event"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default EventForm;