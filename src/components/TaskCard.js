import React from 'react';
import { Card, Button } from 'react-bootstrap';

const TaskCard = ({ task }) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>
          {task.description}
        </Card.Text>
        <Button variant="outline-primary">Voir Détails</Button>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
