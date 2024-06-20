import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProjectList from '../components/ProjectList';
import ProjectAnalysis from '../components/ProjectAnalysis';
import KanbanBoard from '../components/KanbanBoard';
import { Container, Row, Col } from 'react-bootstrap';

const initialProjects = {
  "project-1": {
    id: "project-1",
    name: "Projet 1",
    analysis: {
      timeSpent: "50 heures",
      completion: 75,
      weeklyActivity: "10 heures cette semaine"
    }
  },
  "project-2": {
    id: "project-2",
    name: "Projet 2",
    analysis: {
      timeSpent: "30 heures",
      completion: 50,
      weeklyActivity: "5 heures cette semaine"
    }
  },
 "project-3": {
    id: "project-3",
    name: "Projet 3",
    analysis: {
      timeSpent: "75 heures",
      completion: 98,
      weeklyActivity: "18 heures cette semaine"
    }
  },
  
};

const Home = () => {
  const [projects] = useState(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState('project-1');

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const selectedProject = projects[selectedProjectId];

  return (
    <>
      <Navbar title="Accueil" />
      <Container fluid>
        <Row>
          <Col xs={2} className="p-0">
            <Sidebar />
          </Col>
          <Col xs={3}>
            <ProjectList onSelectProject={handleSelectProject} />
            <ProjectAnalysis analysis={selectedProject.analysis} />
          </Col>
          <Col xs={6}>
            <KanbanBoard selectedProjectId={selectedProjectId} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
