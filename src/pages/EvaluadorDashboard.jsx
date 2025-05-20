import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import TestInfoSection from '../components/TestInfoSection';

function EvaluadorDashboard() {
  return (
    <div style={{ padding: '2rem', background: '#f0f4f8', minHeight: '100vh' }}>
    <h1>Panel del Evaluador - Bienvenid@</h1>
    <TestInfoSection />
    <section style={{ background: '#fff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>Interpretación de Resultados</h2>
      <ul>
        <li>Nivel Bajo: 0-10</li>
        <li>Nivel Medio: 11-20</li>
        <li>Nivel Alto: 21+</li>
      </ul>
    </section>
    <section style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
      <h2>Guías y Recursos</h2>
      <a href="/manual.pdf" download>Descargar Manual PDF</a>
    </section>
  </div>
  );
}


export default EvaluadorDashboard;