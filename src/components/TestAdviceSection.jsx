import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const listItemStyle = {
  border: 'none',
  backgroundColor: 'transparent',
  padding: '0.75rem',
  fontSize: '1rem'
};


const TestAdviceSection = () => {
  return (
    
  
    <div style={{ backgroundColor: '#f8fbfe', padding: '2rem', borderRadius: '10px', marginTop: '2rem' }}>
      <h2 className="mb-4">Consejos Útiles para tu Bienestar</h2>
      <p>
        Los siguientes consejos pueden ayudarte a manejar mejor el estrés, la ansiedad y el agotamiento emocional.
        Recuerda que estas recomendaciones son generales y <strong>no reemplazan una evaluación o tratamiento profesional</strong>.
        Si sientes que tus síntomas interfieren significativamente en tu vida diaria, consulta con un especialista en salud mental.
      </p>

    
      <div style={{ display: 'flex', justifyContent:'center', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
  <Card style={{
    width: '100%',
    maxWidth: '400px',
    borderRadius: '20px',
    backgroundColor: '#e8f4fd',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: 'none',
    flex: 1
  }}>
    <Card.Body>
      <Card.Title style={{ fontWeight: 'bold', color: '#1d70b8' }}>Para la Ansiedad (IDARE)</Card.Title>
      <ListGroup variant="flush">
        <ListGroup.Item style={listItemStyle}>🧘 Practica respiración profunda o meditación guiada.</ListGroup.Item>
        <ListGroup.Item style={listItemStyle}>📅 Establece rutinas y horarios de descanso.</ListGroup.Item>
        <ListGroup.Item style={listItemStyle}>🎨 Dedica tiempo a actividades creativas o relajantes.</ListGroup.Item>
        <ListGroup.Item style={listItemStyle}>🤝 Habla con alguien de confianza sobre lo que sientes.</ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>

  <Card style={{
    width: '100%',
    maxWidth: '400px',
    borderRadius: '20px',
    backgroundColor: '#e8f4fd',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: 'none',
    flex: 1
  }}>
    <Card.Body>
      <Card.Title style={{ fontWeight: 'bold', color: '#1d70b8' }}>Para el Burnout Laboral</Card.Title>
      <ListGroup variant="flush">
        <ListGroup.Item style={listItemStyle}>⏳ Toma descansos regulares durante tu jornada laboral.</ListGroup.Item>
        <ListGroup.Item style={listItemStyle}>📵 Intenta desconectarte del trabajo fuera del horario laboral.</ListGroup.Item>
        <ListGroup.Item style={listItemStyle}>🚶 Realiza actividad física moderada varias veces por semana.</ListGroup.Item>
        <ListGroup.Item style={listItemStyle}>📈 Evalúa la carga laboral y aprende a delegar cuando sea posible.</ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
</div>


      <div className="mt-4 text-danger">
        <strong>⚠️ Aviso:</strong> Estos consejos son de carácter general. Si experimentas síntomas intensos o persistentes, acude a un profesional de la salud mental.
      </div>
    </div>

  );
};

export default TestAdviceSection;
