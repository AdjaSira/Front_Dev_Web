import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const Tache = ({ task, onDelete }) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title className="task-card-title">{task.content}</Card.Title>
        <Card.Text className="task-card-text">{task.description}</Card.Text>
        <Badge pill bg={
          task.priority === "Urgent" ? "danger" :
          task.priority === "Important" ? "warning" :
          task.priority === "Normal" ? "primary" :
          "secondary"
        }>
          {task.priority}
        </Badge>
        <Button variant="outline-danger" size="sm" style={{ float: "right", border: 'none' }} onClick={onDelete}>
          <FaTrash />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Tache;
