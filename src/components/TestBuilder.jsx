// src/components/TestBuilder.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';

const TestBuilder = ({ initialData, onGuardar, onCancelar }) => {
  const [test, setTest] = useState({ titulo: '', descripcion: '', tipo: '' });
  const [subescalas, setSubescalas] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    if (initialData) {
      setTest(initialData.test || {});
      setSubescalas(initialData.subescalas || []);
      setPreguntas(initialData.preguntas || []);
      setOpciones(initialData.opciones || []);
    }
  }, [initialData]);

  const handleGuardar = () => {
    onGuardar({
      id: initialData?.id || Date.now(),
      test,
      subescalas,
      preguntas,
      opciones
    });
  };

  const addSubescala = () => {
    const nombre = prompt('Nombre de la subescala:');
    if (nombre) {
      setSubescalas([...subescalas, { id: Date.now(), nombre }]);
    }
  };

  const addPregunta = () => {
    const texto = prompt('Texto de la pregunta:');
    if (texto) {
      setPreguntas([...preguntas, { id: Date.now(), texto }]);
    }
  };

  const addOpcion = () => {
    const texto = prompt('Texto de la opción:');
    const valor = prompt('Valor (0-6):');
    if (texto && valor) {
      setOpciones([...opciones, { texto, valor: parseInt(valor, 10) }]);
    }
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="titulo">
            <Form.Label >Título del Test</Form.Label>
            <Form.Control
              type="text"
              value={test.titulo}
              onChange={(e) => setTest({ ...test, titulo: e.target.value })}
              placeholder="Ej. IDARE, Bournout"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="tipo">
            <Form.Label >Tipo de Test</Form.Label>
            <Form.Control
              type="text"
              value={test.tipo}
              onChange={(e) => setTest({ ...test, tipo: e.target.value })}
              placeholder="Tipo identificador (IDARE, Bournout)"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="descripcion">
        <Form.Label >Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={test.descripcion}
          onChange={(e) => setTest({ ...test, descripcion: e.target.value })}
          placeholder="Breve descripción del test"
        />
      </Form.Group>

      <Row className="mb-4">
        <Col md={4}>
          <h5 >Subescalas</h5>
          <Button size="sm" onClick={addSubescala} className="mb-2" style={{border:'#89CFF0', background: '#89CFF0'}}>
            + Agregar Subescala
          </Button>
          <ListGroup>
            {subescalas.map((s, i) => (
              <ListGroup.Item key={i}>{s.nombre}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={4}>
          <h5 >Preguntas</h5>
          <Button size="sm" onClick={addPregunta} className="mb-2" style={{border:'#89CFF0', background: '#89CFF0'}}>
            + Agregar Pregunta
          </Button>
          <ListGroup>
            {preguntas.map((p, i) => (
              <ListGroup.Item key={i}>{p.texto}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={4}>
          <h5 >Opciones</h5>
          <Button  size="sm" onClick={addOpcion} className="mb-2" style={{border:'#89CFF0', background: '#89CFF0'}}>
            + Agregar Opción
          </Button>
          <ListGroup>
            {opciones.map((o, i) => (
              <ListGroup.Item key={i}>
                {o.texto} (Valor: {o.valor})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <div className="mt-3 d-flex gap-2">
        <Button onClick={handleGuardar}
        style={{ padding: '0.5rem 1rem', background: '#89CFF0', border: 'none', borderRadius: '6px', color:'#000' }}>
          {initialData ? 'Guardar Cambios' : 'Guardar Test'}
        </Button>
        <Button variant="secondary" onClick={onCancelar}
        >
          Cancelar
        </Button>
      </div>
    </Form>
  );
};

export default TestBuilder;
