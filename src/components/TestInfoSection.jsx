import React, { useState } from 'react';
import { Tabs, Tab, Accordion, Card } from 'react-bootstrap';
import '../acordeon.css';
import '../App.css';

const TestInfoSection = () => {
  const [key, setKey] = useState('IDARE');

  const contenido = {
    IDARE: {
      titulo: 'IDARE - Inventario de Autovaloración de Ansiedad',
      descripcion: 'El test IDARE evalúa la ansiedad desde dos dimensiones: como un estado momentáneo (ansiedad situacional) y como un rasgo permanente de la personalidad (ansiedad generalizada).',
      utilidad: 'Es útil para psicólogos, empresas y evaluadores en general que desean identificar niveles de ansiedad en los individuos, ya sea con fines terapéuticos, diagnósticos o preventivos.',
      faqs: [
        {
          pregunta: '¿Qué evalúa el test IDARE?',
          respuesta: 'Evalúa la ansiedad en dos dimensiones: estado (cómo se siente la persona ahora) y rasgo (cómo se siente usualmente).'
        },
        {
          pregunta: '¿A quién está dirigido este test?',
          respuesta: 'A cualquier persona que quiera entender mejor su nivel de ansiedad o profesionales que evalúan este estado en otros.'
        },
        {
          pregunta: '¿Qué hago con el resultado?',
          respuesta: 'Los resultados pueden ayudar a detectar estados de ansiedad elevados y tomar decisiones sobre tratamiento o apoyo psicológico.'
        }
      ]
    },
    BURNOUT: {
      titulo: 'Burnout - Inventario de Agotamiento Laboral',
      descripcion: 'Este test mide los niveles de agotamiento emocional, despersonalización y falta de realización personal relacionados con el trabajo. Este cuestionario Maslach Burnout Inventory (MBI) está constituido por 22 ítems en forma de afirmaciones, sobre los sentimientos y actitudes del profesional en su trabajo.',
      utilidad: 'Ayuda a identificar signos de estrés crónico en el ambiente laboral y facilita intervenciones tempranas para evitar consecuencias emocionales o físicas.',
      faqs: [
        {
          pregunta: '¿Qué es el burnout?',
          respuesta: 'Es un estado de agotamiento físico y emocional causado por el estrés laboral crónico. Afecta la motivación, salud mental y desempeño.'
        },
        {
          pregunta: '¿Qué mide este test?',
          respuesta: 'Evalúa niveles de agotamiento personal, relacionado con el cliente (en caso de atención directa) y laboral en general.'
        },
        {
          pregunta: '¿Qué hago si obtengo un resultado alto?',
          respuesta: 'Es recomendable hablar con un profesional de la salud mental para tomar medidas de prevención o intervención.'
        }
      ]
    }
  };

  return (
    <Card style={{ backgroundColor: '#e3f2fd', borderColor: '#c2e0f4' }}>
    <Card.Header style={{ backgroundColor: '#6BAED6', color: '#fff' }}></Card.Header>
    <Card.Body>
    <div style={{ backgroundColor: '#f8fbfe', padding: '2rem', borderRadius: '10px', marginTop: '2rem' }}>
      <h2 className="mb-4">Información sobre los Tests</h2>
      <p>Esta plataforma esta diseñada para la aplicación de tipos algunos Test psicólogos, tales como, IDARE y Burnout, según lo que te asigne un evaluador.</p>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 nav-tabs ">
        <Tab eventKey="IDARE" title="Test IDARE">
          <h4>{contenido.IDARE.titulo}</h4>
          <p><strong>¿Qué es?</strong> {contenido.IDARE.descripcion}</p>
          <p><strong>¿Para qué sirve?</strong> {contenido.IDARE.utilidad}</p>

          <h5 className="mt-4">Preguntas Frecuentes</h5>
          <Accordion defaultActiveKey="0">
  {contenido.IDARE.faqs.map((faq, idx) => (
    <Accordion.Item eventKey={idx.toString()} key={idx} className="item-acordeon">
      <Accordion.Header>
        <div className="header-acordeon">
          <span className="pregunta-acordeon">{faq.pregunta}</span>
          <span className="icono-acordeon">▶</span>
        </div>
      </Accordion.Header>
      <Accordion.Body className="body-acordeon">
        {faq.respuesta}
      </Accordion.Body>
    </Accordion.Item>
  ))}
</Accordion>

        </Tab>

        <Tab eventKey="BURNOUT" title="Test Burnout">
          <h4>{contenido.BURNOUT.titulo}</h4>
          <p><strong>¿Qué es?</strong> {contenido.BURNOUT.descripcion}</p>
          <p><strong>¿Para qué sirve?</strong> {contenido.BURNOUT.utilidad}</p>

          <h5 className="mt-4">Preguntas Frecuentes</h5>
          <Accordion>
            {contenido.BURNOUT.faqs.map((faq, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header className="mi-estilo-header">{faq.pregunta}</Accordion.Header>
                <Accordion.Body>{faq.respuesta}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Tab>
      </Tabs>
    </div>
    </Card.Body>
      </Card>

  );
};

export default TestInfoSection;
