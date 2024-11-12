import React from 'react';

function TimelineEvent({ event }) {
  return (
    <li className="timeline-event">
      <p>{event.text}</p>
      <small>{event.date}</small>
    </li>
  );
}

export default TimelineEvent;