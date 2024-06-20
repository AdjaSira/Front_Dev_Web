import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProjectList from '../components/ProjectList';
import ProjectAnalysis from '../components/ProjectAnalysis';
import KanbanBoard from '../components/KanbanBoard';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <Navbar title="Accueil" />
      <Container fluid>
        <Row>
          <Col xs={2} className="p-0">
            <Sidebar />
          </Col>
          <Col xs={3}>
            <ProjectList />
          </Col>
          <Col xs={3}>
            <ProjectAnalysis />
          </Col>
          <Col xs={4}>
            <KanbanBoard />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
