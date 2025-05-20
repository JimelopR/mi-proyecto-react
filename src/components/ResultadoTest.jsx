import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const ResultadoTest = ({ idAsignacion }) => {
  console.log("idAsignaciond: "+ idAsignacion)
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchResultado = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`http://localhost:9090/obtenerResultado/${idAsignacion}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setResultado(response.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del resultado.');
      } finally {
        setLoading(false);
      }
    };

    fetchResultado();
  }, [idAsignacion]);

  if (loading) return <p>Cargando resultado...</p>;
  if (error) return <p>{error}</p>;
  if (!resultado) return <p>No se encontró el resultado.</p>;

  const {
    titulo,
    tipo,
    fechaAsignacion,
    fechaRespuesta,
    evaluadoNombreCompleto,
    evaluadorNombreCompleto,
    edadEvaluado,
    genero,
    trabaja,
    respuestas,
    resultadosSubescala
  } = resultado;

  const respuestasPorSubescala = respuestas.reduce((acc, r) => {
    if (!acc[r.subescalaNombre]) acc[r.subescalaNombre] = [];
    acc[r.subescalaNombre].push(r);
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px' }}>
      <h2>Resultado del Test #{idAsignacion}</h2>
      <h3>{titulo}</h3>
      <p><strong>Tipo:</strong> {tipo}</p>
      <p><strong>Evaluado:</strong> {evaluadoNombreCompleto} ({edadEvaluado} años, {genero})</p>
      <p><strong>Evaluador:</strong> {evaluadorNombreCompleto}</p>
      <p><strong>Trabaja:</strong> {trabaja ? 'Sí' : 'No'}</p>
      <p><strong>Fecha Asignación:</strong> {new Date(fechaAsignacion).toLocaleString()}</p>
      <p><strong>Fecha Respuesta:</strong> {new Date(fechaRespuesta).toLocaleString()}</p>

      <hr />

      <h4>Resultados por Subescala</h4>
      <ul>
        {resultadosSubescala.map((sub) => (
          <li key={sub.idSubescala}>
            <strong>{sub.nombre}</strong>: Puntuación {sub.puntuacion} - Interpretación: <strong>{sub.interpretacion}</strong>
          </li>
        ))}
      </ul>

      <hr />

      <h4>Respuestas por Subescala</h4>
      {Object.entries(respuestasPorSubescala).map(([subescala, items]) => (
        <div key={subescala} style={{ marginBottom: '20px' }}>
          <h5>{subescala}</h5>
          <ul>
            {items.map((item) => (
              <li key={item.preguntaId}>
                <strong>{item.pregunta}</strong>: {item.textoOpcion} (Valor: {item.valor})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResultadoTest;
