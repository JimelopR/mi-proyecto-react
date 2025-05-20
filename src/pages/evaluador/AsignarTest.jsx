import React, { useState, useEffect, useContext  } from 'react';
import { Card, Button, Container, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

function AsignarTest() {
  const [tests, setTests] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [testSeleccionado, setTestSeleccionado] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const { getToken } = useContext(AuthContext);
  const { getId } = useContext(AuthContext);
  const testsD = [
    { name: 'IDARE', value: 2 },
    { name: 'BURNOUT', value: 1 },
  ];
  const token = getToken();

  useEffect(() => {

    // Obtener usuarios tipo 2 (evaluados)
    axios
      .get('http://localhost:9090/api/evaluador/obtenerEvaluados', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error('Error al obtener usuarios evaluados:', err));
  }, [token]);

  const handleAsignar = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    
    const id = getId();

    try {
      const response = await axios.post(
        'http://localhost:9090/api/evaluador/asignarTest',
        {
          evaluadorId: id,
          evaluadoId: usuarioSeleccionado,
          testId: testSeleccionado,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMensaje('Test asignado correctamente.');
        setUsuarioSeleccionado('');
        setTestSeleccionado('');
      }
    } catch (err) {
      setError('Error al asignar el test. Intenta más tarde.');
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Asignar Test a Usuario</h1>
      <Card className="p-4">
        <Form onSubmit={handleAsignar}>
          <Form.Group controlId="formUsuario">
            <Form.Label>Selecciona al usuario evaluado</Form.Label>
            <Form.Select
              value={usuarioSeleccionado}
              onChange={(e) => setUsuarioSeleccionado(e.target.value)}
              required
            >
              <option value="">-- Selecciona un usuario --</option>
              {usuarios.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nombre} - Correo: {user.correo}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formTest" className="mt-3">
            <Form.Label>Selecciona el Test</Form.Label>
            <Form.Select
              value={testSeleccionado}
              onChange={(e) => setTestSeleccionado(e.target.value)}
              required
            >
              <option value="">-- Selecciona un test --</option>
              {testsD.map((test) => (
                <option key={test.value} value={test.value}>
                  {test.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="mt-4"style={{backgroundColor: '#aec2ab',borderColor: '#aec2ab',color: '#000',
          }}>
            Asignar Test
          </Button>
        </Form>

        {mensaje && <Alert variant="success" className="mt-3">{mensaje}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card>
    </Container>
  );
}

export default AsignarTest;
