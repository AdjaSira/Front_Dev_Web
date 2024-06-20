import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ProjectList = () => {
  return (
    <div>
      <h3>Projets</h3>
      <ListGroup>
        {/* Remplacer par des projets réels */}
        <ListGroup.Item>Projet 1</ListGroup.Item>
        <ListGroup.Item>Projet 2</ListGroup.Item>
        <ListGroup.Item>Projet 3</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ProjectList;
