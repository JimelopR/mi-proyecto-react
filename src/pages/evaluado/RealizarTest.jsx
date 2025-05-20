import React, { useState, useEffect, useContext  } from 'react';
import {  Card,  Button} from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import ResponderTest from '../../components/ResponderTest'; 

import axios from 'axios';


function RealizarTest() {

    const [testAsignados, setTestAsignados] = useState([]);
    const { getToken } = useContext(AuthContext);
    const { getId } = useContext(AuthContext);
    const { getNombre } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [testArealizar, setTestArealizar] = useState(null);
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

    useEffect(() => {
      fetchsetTestAsignados();
    }, []);


    const id = getId();
    const nombre = getNombre();
   
    const fetchsetTestAsignados = async () => {
      try {
        console.log("ID recibido:", id);
        const token = getToken();
        
        console.log("Token a mandar: "+token);
        const response = await axios.get(`http://localhost:9090/api/evaluado/${id}/tests-pendientes`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTestAsignados(response.data);
      } catch (error) {
        setError('Error al cargar los test pendientes.');
        console.error('Error fetching test pendientes:', error);
      }
    };

  return (
    
    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
        <h2>Test Pendientes</h2>
        <Card style={{ backgroundColor: '#e3f2fd', borderColor: '#c2e0f4' }}>
        <Card.Header style={{ backgroundColor: '#6BAED6', color: '#fff' }}>
        </Card.Header>
        <Card.Body>
      
        {error && <div className="alert alert-danger">{error}</div>}
        <table style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha Asignación</th>
              <th>Estado</th>
              <th>Fecha Realización</th>              
              <th>Test</th>
              <th>Realizar</th>
            </tr>
          </thead>
          <tbody>
          {testAsignados.length === 0 ? (
    <tr>
      <td >{<div className="alert alert-success">{'No hay test pendientes.'}</div>}</td>
    </tr>
  ) : (
          testAsignados.map((row, i) => (
            <tr key={i}>
            <td>{nombre}</td>
            <td>{new Date(row.fechaAsignacion).toLocaleDateString()}</td>
            <td>
                {row.completado ? 'REALIZADO': 'PENDIENTE'}
            </td>
            <td>
                {row.fechaRealizacion
                  ? new Date(row.fechaRealizacion).toLocaleDateString()
                  : ''}
            </td>
            <td>{row.testId==1 ? 'BURNOUT' : 'IDERE'}</td>           
            <td>
            <Button
              size="sm"
              className="me-2"
              style={{ backgroundColor: '#aec2ab', borderColor: '#aec2ab', color: '#000' }}
              onClick={() => {setMostrarFormulario(true)
                setRegistroSeleccionado(row.idTestAsignado); // ← Esto guarda el ID del registro 
                setTestArealizar(row.testId);//(test a realizar)
              }}
              
            >
              Realizar Test
            </Button>
            </td>
            </tr>
          ))
        )}
          </tbody>
        </table>
        </Card.Body>
        </Card>

        {mostrarFormulario && <ResponderTest idAsignacion={registroSeleccionado}  testArealizar= {testArealizar} />}

      </div>
  );
}


export default RealizarTest;