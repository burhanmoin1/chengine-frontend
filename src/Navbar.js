import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // You can create and import your CSS file for additional styling

const CustomNavbar = () => {
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('sessionToken');

    // Refresh the page
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">ChordEngine</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#music-player">Music Player</Nav.Link>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
