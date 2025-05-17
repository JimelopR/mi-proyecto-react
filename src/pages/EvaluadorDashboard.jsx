import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function EvaluadorDashboard() {
  return (
    <div>
      <Header />
      <Container className="my-3">
       
        <Card style={{ backgroundColor: '#e0f2f7', borderColor: '#80deea' }}>
          <Card.Header style={{ backgroundColor: '#b2ebf2', color: '#00acc1' }}>
            <h3>Panel de Evaluador</h3>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ backgroundColor: '#e0f2f7' }}>
              <Link to="/evaluador/asignar-test" style={{ color: '#00acc1', textDecoration: 'none' }}>
                Asignar Test
              </Link>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: '#e0f2f7' }}>
              <Link to="/evaluador/ver-resultados" style={{ color: '#00acc1', textDecoration: 'none' }}>
                Ver Resultados
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}


export default EvaluadorDashboard;