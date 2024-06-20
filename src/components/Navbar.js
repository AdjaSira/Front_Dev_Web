import React from 'react';
import { Navbar as BootstrapNavbar, Form, FormControl, NavDropdown, Nav } from 'react-bootstrap';

const Navbar = ({ title }) => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <BootstrapNavbar.Brand>{title}</BootstrapNavbar.Brand>
      <Form className="d-flex ms-auto">
        <FormControl type="search" placeholder="Recherche" className="me-2" />
      </Form>
      <Nav>
        <NavDropdown title="Zeynabou B." id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Déconnexion</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </BootstrapNavbar>
  );
};

export default Navbar;
