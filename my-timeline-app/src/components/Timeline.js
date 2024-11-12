import React from 'react';
import TimelineEvent from './TimelineEvent';

function Timeline({ events }) {
  return (
    <div className="timeline">
      <h2>Timeline</h2>
      <ul>
        {events.map((event, index) => (
          <TimelineEvent key={index} event={event} />
        ))}
      </ul>
    </div>
  );
}

export default Timeline;