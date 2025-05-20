import React, { useState, useEffect, useContext  } from 'react';
import StatsCard from '../components/StatsCard';
import ChartComponent from '../components/ChartComponent';
import { mockGenero, mockEdad, mockTrabajo, resultados } from '../data/mockData';
import { exportToCSV } from '../utils/exportToCSV';
import { AuthContext } from '../contexts/AuthContext'; 
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ResultadoTest from '../components/ResultadoTest';


const AdminDashboard = () => {
  const tests = ['Todos', 'IDARE', 'BURNOUT'];
  const evaluadores = ['Todos', 'Laura Méndez', 'Carlos Peña'];

  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [testSeleccionado, setTestSeleccionado] = useState('Todos');
  const [evaluadorSeleccionado, setEvaluadorSeleccionado] = useState('Todos');
  const [testAsigandos, setTestAsigandos] = useState([]);
  const { getToken } = useContext(AuthContext);
  const [error, setError] = useState('');

  const resultadosFiltrados = testAsigandos.filter(r =>
    (testSeleccionado === 'Todos' || r.tipo === testSeleccionado) &&
    (evaluadorSeleccionado === 'Todos' || r.evaluador === evaluadorSeleccionado) 
  );

  const actividadReciente = [
    'Juan Pérez completó el test (Burnout)',
    'Nuevo evaluador agregado: Laura Méndez',
    'Cambios en la interpretación de IDARE'
  ];

  const notificaciones = [
    '⚠️ 2 personas con alto IDARE esta semana',
    '🔔 Revisión pendiente de 1 test de Burnout',
  ];

  useEffect(() => {
    fetchTestExistentes();
  }, []);

  const fetchTestExistentes = async () => {
    try {
     
      const token = getToken();
      console.log("Token a mandar: "+token);
      const response = await axios.get('http://localhost:9090/api/admin/test-existentes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTestAsigandos(response.data);
    } catch (error) {
      setError('Error al cargar los test.');
      console.error('Error fetching test:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#f0f4f8', minHeight: '100vh' }}>
      <h1>Panel de Administración - Clínica Equilibrio Mental</h1>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label>Tipo de Test:</label><br />
          <select value={testSeleccionado} onChange={e => setTestSeleccionado(e.target.value)}>
            {tests.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ alignSelf: 'end' }}>
          <button onClick={() => exportToCSV(resultadosFiltrados)}
            style={{ padding: '0.5rem 1rem', background: '#89CFF0', border: 'none', borderRadius: '6px' }}>
            Exportar CSV
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <StatsCard title="Tests Completados" value={resultadosFiltrados.length} />
        <StatsCard title="Evaluados Únicos" value={new Set(resultadosFiltrados.map(r => r.nombreCompleto)).size} />
      </div>

      <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
        <ChartComponent title="Distribución por Género" type="pie" data={mockGenero} />
        <ChartComponent title="Distribución por Edad" type="bar" data={mockEdad} />
        <ChartComponent title="Situación Laboral" type="pie" data={mockTrabajo} />
      </div>

      <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
        <h2>Resultados de Test</h2>
        <table style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha Asignación</th>
              <th>Estado</th>
              <th>Fecha Realización</th>              
              <th>Evaluador</th>
              <th>Test</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
          {resultadosFiltrados.map((row, i) => (
            <tr key={i}>
            <td>{row.evaluado?.nombreCompleto}</td>
            <td>{new Date(row.fechaAsignacion).toLocaleDateString()}</td>
            <td>{row.estado}</td>
            <td>{new Date(row.fechaRealizacion).toLocaleDateString()}</td>
            <td>{row.evaluador?.nombreCompleto}</td>
            <td>{row.tipo}</td>
            <td>
              {row.estado ==='REALIZADO' && ( // Solo si está completado
                      <Button
                        size="sm"
                        className="me-2"
                        style={{backgroundColor: '#aec2ab',borderColor: '#aec2ab',color: '#000',
                        }}
                        onClick={() => {
                          setMostrarResultado(true);
                          setRegistroSeleccionado(row.id);
                         
                        }}
                      >
                        Ver Resultado
                      </Button>
                    )}
            </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {mostrarResultado && <ResultadoTest idAsignacion={registroSeleccionado} />}
      {/* Notificaciones */}
      <div style={{
        background: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h2>Notificaciones</h2>
        <ul>
          {notificaciones.map((notif, i) => (
            <li key={i} style={{ padding: '0.3rem 0', color: '#D9534F' }}>{notif}</li>
          ))}
        </ul>
      </div>

      {/* Actividad Reciente */}
      <div style={{
        background: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h2>Actividad Reciente</h2>
        <ul>
          {actividadReciente.map((evento, i) => (
            <li key={i} style={{ padding: '0.5rem 0' }}>🕒 {evento}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default AdminDashboard;

