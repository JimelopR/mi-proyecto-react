import React from 'react';
import { Container, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container className="my-5">
    <Card style={{ backgroundColor: '#e1f5fe', color: '#0288d1', padding: '20px' }}>
      <Card.Body>
        <h1 className="mb-3">Bienvenido al Sistema de Test Idere-Bournout</h1>
        <p className="lead mb-4">Esta plataforma te permitirá realizar y gestionar el test de manera eficiente.</p>
        <hr className="my-4" style={{ borderColor: '#0288d1' }} />
        <p>Por favor, inicia sesión para acceder a las funcionalidades.</p>
      </Card.Body>
    </Card>
  </Container>

  );
}

export default Home;