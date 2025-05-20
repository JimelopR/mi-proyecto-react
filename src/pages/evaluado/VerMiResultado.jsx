
import React, { useState, useEffect, useContext  } from 'react';
import {  Card,  Button} from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import ResultadoTest from '../../components/ResultadoTest';
import axios from 'axios'

function VerMiResultado() {
  const [testResultados, setTestResultados] = useState([]);
    const { getToken } = useContext(AuthContext);
    const { getId } = useContext(AuthContext);
    const { getNombre } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

    useEffect(() => {
      fetchsetTestResultados();
    }, []);


    const id = getId();
    const nombre = getNombre();

    const fetchsetTestResultados = async () => {
      try {
        console.log("ID recibido:", id);
        const token = getToken();
        
        console.log("Token a mandar: "+token);
        const response = await axios.get(`http://localhost:9090/api/evaluado/test-realizados/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTestResultados(response.data);
      } catch (error) {
        setError('Error al cargar los test.');
        console.error('Error fetching test:', error);
      }
    };

  return (
    
    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
        <h2>Reultados</h2>
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
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
          {testResultados.length === 0 ? (
    <tr>
      <td >{ <div className="alert alert-success">{'No hay test respondidos.'}</div>}</td>
    </tr>
  ) : (
            testResultados.map((row, i) => (
            <tr key={i}>
            <td>{nombre}</td>
            <td>{new Date(row.fechaAsignacion).toLocaleDateString()}</td>
            <td>
                {row.estado}
            </td>
            <td>
                {row.fechaRealizacion
                  ? new Date(row.fechaRealizacion).toLocaleDateString()
                  : ''}
            </td>
            <td>{row.idTestAsignado==1 ? 'BURNOUT' : 'IDERE'}</td>           
            
            <td>
      {row.estado ==='REALIZADO' && ( // Solo si está completado
        <Button
          size="sm"
          className="me-2"
          style={{backgroundColor: '#aec2ab',borderColor: '#aec2ab',color: '#000',
          }}
          onClick={() => {
            setMostrarResultado(true);
            setRegistroSeleccionado(row.idTestAsignado);
          }}
        >
          Ver Resultado
        </Button>
      )}
    </td>
            </tr>
          ))
        )}
          </tbody>
        </table>
        </Card.Body>
        </Card>

        {mostrarResultado && <ResultadoTest idAsignacion={registroSeleccionado} />}

      </div>
  );
}


export default VerMiResultado;