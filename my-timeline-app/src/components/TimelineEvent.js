import React from 'react';

function TimelineEvent({ event, onDelete }) {
  return (
    <li className="timeline-event">
      <p>{event.text}</p>
      <small>{event.date}</small>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default TimelineEvent;