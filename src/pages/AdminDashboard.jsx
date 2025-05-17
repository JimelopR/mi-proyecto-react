import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function AdminDashboard() {
  return (
    <div>
      
      <Container className="my-3">
        
        <Card style={{ backgroundColor: '#e3f2fd', borderColor: '#90caf9' }}>
          <Card.Header style={{ backgroundColor: '#bbdefb', color: '#1e88e5' }}>
            <h3>Panel de Administración</h3>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ backgroundColor: '#e3f2fd' }}>
              <Link to="/admin/gestion-usuarios" style={{ color: '#1e88e5', textDecoration: 'none' }}>
                Gestión de Usuarios
              </Link>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: '#e3f2fd' }}>
              <Link to="/admin/crear-test" style={{ color: '#1e88e5', textDecoration: 'none' }}>
                Crear Test
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
      
    </div>
  );
}


export default AdminDashboard;