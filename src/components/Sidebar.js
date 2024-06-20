import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInbox, FaCalendarAlt } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-dark text-white p-3">
      <div className="mb-4">
        <h3>Logo</h3>
      </div>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/home" className="text-white">
            <FaHome /> Accueil
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/inbox" className="text-white">
            <FaInbox /> Boîte de Réception
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/calendar" className="text-white">
            <FaCalendarAlt /> Calendrier
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
