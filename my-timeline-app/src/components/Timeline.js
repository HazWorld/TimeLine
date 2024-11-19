import React from 'react';
import TimelineEvent from './TimelineEvent';
import { ListGroup, Container } from 'react-bootstrap';

function Timeline({ events, onDeleteEvent }) {
  return (
    <Container className="mt-4">
      <h2 className="text-center">Timeline</h2>
      <ListGroup variant="flush">
        {events.map((event, index) => (
          <TimelineEvent key={index} event={event} onDelete={() => onDeleteEvent(event._id)} />
        ))}
      </ListGroup>
    </Container>
  );
}

export default Timeline;