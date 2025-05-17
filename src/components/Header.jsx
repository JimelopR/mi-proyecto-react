import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar style={{ backgroundColor: '#699cbd' }} variant="dark">
      <Container>
        <Navbar.Brand>
          Test Idere-Bournout
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;