import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const ReminderCard = ({ reminder }) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>
          {reminder.title} <Badge bg={reminder.status === 'en retard' ? 'danger' : 'success'}>{reminder.status}</Badge>
        </Card.Title>
        <Card.Text>
          {reminder.description}
        </Card.Text>
        <Card.Text>
          <small className="text-muted">Date limite : {reminder.dueDate}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReminderCard;
