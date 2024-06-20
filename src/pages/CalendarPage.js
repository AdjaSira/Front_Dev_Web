import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import { Container, Row, Col } from 'react-bootstrap';

const CalendarPage = () => {
  return (
    <>
      <Navbar title="Calendrier" />
      <Container fluid>
        <Row>
          <Col xs={2} className="p-0">
            <Sidebar />
          </Col>
          <Col>
            <Calendar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CalendarPage;
