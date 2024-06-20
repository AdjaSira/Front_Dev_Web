import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

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
          <Card.Text>
            <ProgressBar now={analysis.completion} label={`${analysis.completion}%`} />
          </Card.Text>
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
