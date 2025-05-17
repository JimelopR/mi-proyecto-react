import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="light" variant="light" className="mt-5" style={{ width: '100%' }}>
      <Container className="justify-content-center">
        <Navbar.Text>&copy; 2025 Sistema Test Idere-Bournout</Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;