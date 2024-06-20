import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ProjectList = ({ onSelectProject }) => {
  const exampleProjects = [
    { id: 'project-1', name: 'Projet 1' },
    { id: 'project-2', name: 'Projet 2' }
    // Ajoutez plus de projets ici
  ];

  return (
    <div>
      <h3>Projets</h3>
      <ListGroup>
        {exampleProjects.map((project) => (
          <ListGroup.Item 
            key={project.id}
            action
            onClick={() => onSelectProject(project.id)}
          >
            {project.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ProjectList;
