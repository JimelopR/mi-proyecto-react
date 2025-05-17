import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function EvaluadoDashboard() {
  return (
    <div>
      <Header />
      <Container className="my-3">
  
        <Card style={{ backgroundColor: '#ffe0b2', borderColor: '#ffb74d' }}>
          <Card.Header style={{ backgroundColor: '#ffcc80', color: '#fb8c00' }}>
            <h3>Panel de Evaluado</h3>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ backgroundColor: '#ffe0b2' }}>
              <Link to="/evaluado/realizar-test" style={{ color: '#fb8c00', textDecoration: 'none' }}>
                Realizar Test
              </Link>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: '#ffe0b2' }}>
              <Link to="/evaluado/ver-mi-resultado" style={{ color: '#fb8c00', textDecoration: 'none' }}>
                Ver Mi Resultado
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}


export default EvaluadoDashboard;