// src/pages/admin/GestionarTests.jsx
import React, { useState } from 'react';
import { Container,Button, Table, Card } from 'react-bootstrap';
import TestBuilder from '../../components/TestBuilder';

const GestionarTests = () => {
  const [tests, setTests] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [testActivo, setTestActivo] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleGuardarTest = (nuevoTest) => {
    if (modoEdicion) {
      setTests(tests.map(t => t.id === nuevoTest.id ? nuevoTest : t));
      setModoEdicion(false);
      setTestActivo(null);
    } else {
      setTests([...tests, { ...nuevoTest, id: Date.now() }]);
    }
  };

  const handleEditar = (test) => {
    setTestActivo(test);
    setModoEdicion(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar este test?')) {
      setTests(tests.filter(t => t.id !== id));
    }
  };

  const handleExportar = (test) => {
    const blob = new Blob([JSON.stringify(test, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${test.titulo || 'test'}.pdf`;
    a.click();
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Gestión de Tests</h2>

      <Card className="mb-4  shadow-sm"  style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
     
  
        <Card.Header  style={{ backgroundColor: '#6BAED6', color: '#fff' }}>
          {modoEdicion ? ' Editar Test' : 'Crear Nuevo Test'}
        </Card.Header>
        
        <Card.Body >
          <TestBuilder
            key={testActivo?.id || 'nuevo'}
            initialData={testActivo}
            onGuardar={handleGuardarTest}
            onCancelar={() => {
              setModoEdicion(false);
              setTestActivo(null);
            }}
          />
        </Card.Body>
      </Card>

      <h4 className="mb-3">Tests Creados</h4>
      <Card style={{ backgroundColor: '#e3f2fd', borderColor: '#c2e0f4' }}>
        <Card.Header style={{ backgroundColor: '#6BAED6', color: '#fff' }}></Card.Header>
        <Card.Body>
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {tests.length === 0 ? (
            <p className="text-muted">No hay tests guardados aún.</p>
          ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr style={{backgroundColor: '#e0f7fa', color: '#0288d1'}}>
                <th>Título</th>
                <th>Tipo</th>
                <th>Preguntas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tests.map(test => (
                <tr key={test.id}>
                  <td>{test.titulo}</td>
                  <td>{test.tipo}</td>
                  <td>{test.preguntas.length}</td>
                  <td>
                    <Button                 
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditar(test)}
                      style={{ backgroundColor: '#aec2ab', borderColor: '#aec2ab' , color:'#000' }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEliminar(test.id)}
                      style={{ backgroundColor: '#cd6155', borderColor: '#cd6155', color:'#fff'}}
                    >
                      Eliminar
                    </Button>
                    <Button
                      size="sm"
                      className="me-2"
                      onClick={() => handleExportar(test)}
                      style={{ backgroundColor: '#89CFF0', borderColor: '#89CFF0', color:'#000' }}                    
                    >
                      Exportar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GestionarTests;
