import React, { useState } from 'react';

function EventForm({ addEvent }) {
  const [newEvent, setNewEvent] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.trim() && eventDate.trim()) {
      addEvent(newEvent, eventDate);
      setNewEvent("");
      setEventDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        placeholder="Enter event details"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
      />
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;