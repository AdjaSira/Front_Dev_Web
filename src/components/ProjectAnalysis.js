import React from 'react';
import { Card } from 'react-bootstrap';
import '../App.css'; // Importe le fichier CSS avec les styles

const ProjectAnalysis = ({ analysis }) => {
  return (
    <div>
      <h3>Analyse du Projet</h3>
      <Card>
        <Card.Body>
          <Card.Title>Temps passé</Card.Title>
          <Card.Text>{analysis.timeSpent}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Title>Completion</Card.Title>
          <div className="progress-circle">
            <div className="progress-circle-inner" style={{ '--percent': analysis.completion }}>
              <span>{`${analysis.completion}%`}</span>
            </div>
          </div>
        </Card.Body>
        <Card.Body>
          <Card.Title>Activité Hebdomadaire</Card.Title>
          <Card.Text>{analysis.weeklyActivity}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectAnalysis;
