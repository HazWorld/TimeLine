import React from 'react';
import TimelineEvent from './TimelineEvent';

function Timeline({ events, onDeleteEvent }) {
  return (
    <div className="timeline">
      <h2>Timeline</h2>
      <ul>
        {events.map((event, index) => (
          <TimelineEvent key={index} event={event} onDelete={() => onDeleteEvent(event._id)} />
        ))}
      </ul>
    </div>
  );
}

export default Timeline;