
import { Container, Card, Form, Button} from 'react-bootstrap';
import React, { useState, useEffect, useContext  } from 'react';
import { AuthContext } from '../contexts/AuthContext'; 

import axios from 'axios';



const ResponderTest = ({ idAsignacion , testArealizar}) => {

    const [formato, setFormato] = useState([null]);
    const id = testArealizar;
    const { getToken } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [respuestas, setRespuestas] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
      };
      const handleChange = (questionId, answer) => {
        setRespuestas(prev => ({ ...prev, [questionId]: answer }));
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
              <Button style={{ padding: '0.5rem 1rem', background: '#89CFF0', border: 'none', borderRadius: '6px', color:'#000' }}>
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
