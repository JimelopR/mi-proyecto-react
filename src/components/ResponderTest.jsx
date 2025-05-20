
import { Container, Card, Form, Button, Alert} from 'react-bootstrap';
import React, { useState, useEffect, useContext  } from 'react';
import { AuthContext } from '../contexts/AuthContext'; 

import axios from 'axios';



const ResponderTest = ({ idAsignacion , testArealizar}) => {

    const [formato, setFormato] = useState([null]);
    const id = testArealizar;
    const { getToken } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [respuestas, setRespuestas] = useState({});
   const testAsignadoId = idAsignacion;

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Convertir "trabaja" de texto a booleano
          const trabajaBoolean = respuestas.trabaja === 'Sí';
      
          //  Extraer edad y género
          const edadEvaluado = parseInt(respuestas.edad, 10);
          const genero = respuestas.genero;
      
          //  Filtrar solo las respuestas a preguntas 
          const respuestasFormateadas = Object.entries(respuestas)
            .filter(([key, value]) => !isNaN(Number(key))) // solo claves numéricas (preguntaId)
            .map(([preguntaId, valor]) => ({
              preguntaId: parseInt(preguntaId, 10),
              valor: parseInt(valor, 10),
            }));
      
          //  Armar el JSON completo
          const payload = {
            testAsignadoId: testAsignadoId, 
            edadEvaluado: edadEvaluado,
            genero: genero,
            trabaja: trabajaBoolean,
            respuestas: respuestasFormateadas
          };
      
          //  Enviar al backend
          const token = getToken();
          console.log("Request payload:", payload);
          const response = await axios.post('http://localhost:9090/api/evaluado/responder', payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
      
         
          alert('Respuestas enviadas correctamente');
          window.location.reload();
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
          alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
        }
      };
      
      const handleChange = (id, value) => {
        setRespuestas(prev => ({ ...prev, [id]: value }));
      };

    useEffect(() => {
        fetchFormato();
      }, []);
    
      const fetchFormato = async () => {
        try {
         
          const token = getToken();
          console.log("Token a mandar: "+token);
          const response = await axios.get(`http://localhost:9090/api/evaluado/${id}/formato`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFormato(response.data);
        } catch (error) {
          setError('Error al cargar el formato.');
          console.error('Error fetching formato:', error);
        }
      };



  return (
    formato === null ? (
        <p>Loading test...</p>
      ) : (
    <Container className="my-5">
      <Card>
        <Card.Header style={{ backgroundColor: '#699cbd', color: 'white' }}>
          <h3 style={{ margin: 0 }}>{formato.titulo}</h3>
        </Card.Header>
        <Card.Body>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          <p className="mb-4">{formato.descripcion}</p>

          <Form onSubmit={handleSubmit}>
            <div className="mb-4 p-3 bg-light rounded">
              <p><strong>Escala de frecuencia:</strong></p>
              <ul>
                {formato.opcionesRespuesta?.map((opcion) => (
                  <li key={opcion.id}>
                     {opcion.texto}
                  </li>
                ))}
              </ul>
            </div>
            
            <Form.Group className="mb-3">
                <Form.Label>Género</Form.Label>
                <Form.Select
                    value={respuestas.genero ?? ''}
                    onChange={(e) => handleChange('genero', e.target.value)}
                    required
                >
                    <option value="" disabled>Seleccione su género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                    type="number"
                    value={respuestas.edad ?? ''}
                    onChange={(e) => handleChange('edad', e.target.value)}
                    min="0"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>¿Actualmente trabaja?</Form.Label>
                <Form.Select
                    value={respuestas.trabaja ?? ''}
                    onChange={(e) => handleChange('trabaja', e.target.value)}
                    required
                >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                    </Form.Select>
            </Form.Group>

            {formato.preguntas?.map((pregunta, index) => (
              <Form.Group key={pregunta.id} className="mb-4">
                <Form.Label>
                  <strong>{index + 1}.</strong> {pregunta.texto}
                </Form.Label>
                <Form.Control
                  as="select"
                  value={respuestas[pregunta.id] ?? ''}
                  onChange={(e) => handleChange(pregunta.id, e.target.value)}
                  required
                >
                  <option value="" disabled>Seleccione una opción</option>
                  {formato.opcionesRespuesta?.map((opcion) => (
                    <option key={opcion.id} value={opcion.valor}>
                      {opcion.texto}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            ))}

            <div className="d-flex justify-content-end mt-4">
              <Button type="submit"
              style={{ padding: '0.5rem 1rem', background: '#89CFF0', border: 'none', borderRadius: '6px', color:'#000' }}>
                Enviar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
      )
);
  
};

export default ResponderTest;
