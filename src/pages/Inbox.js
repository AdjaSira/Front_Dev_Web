import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ReminderCard from '../components/ReminderCard';
import { Container, Row, Col } from 'react-bootstrap';

const reminders = [
  { title: 'Rappel 1', description: 'Description du rappel 1', status: 'en retard', dueDate: '2024-06-20' },
  { title: 'Rappel 2', description: 'Description du rappel 2', status: 'terminé', dueDate: '2024-06-18' },
];

const Inbox = () => {
  return (
    <>
      <Navbar title="Boîte de Réception" />
      <Container fluid>
        <Row>
          <Col xs={2} className="p-0">
            <Sidebar />
          </Col>
          <Col>
            {reminders.map(reminder => (
              <ReminderCard key={reminder.title} reminder={reminder} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inbox;
