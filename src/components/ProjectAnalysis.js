import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { RxValue } from 'react-icons/rx';

const ProjectAnalysis = () => {

  return (
    <div>
      <h3>Analyse du Projet</h3>
      <Card>
        <Card.Body>
          <Card.Title>Temps passé</Card.Title>
          <Card.Text>50 heures</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Completion</Card.Title>
          <Card.Text>
            <ProgressBar>
            </ProgressBar>
            75%</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Activité Hebdomadaire</Card.Title>
          <Card.Text>10 heures cette semaine</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectAnalysis;
