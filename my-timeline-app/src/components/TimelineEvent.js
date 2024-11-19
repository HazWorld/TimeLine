import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function TimelineEvent({ event, onDelete }) {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
        <strong>{event.text}</strong>
        <br />
        <small>{event.date}</small>
      </div>
      <Button variant="danger" onClick={onDelete} size="sm">
        Delete
      </Button>
    </ListGroup.Item>
  );
}

export default TimelineEvent;