import React from 'react';
import TestInfoSection from '../components/TestInfoSection';
import TestAdviceSection from '../components/TestAdviceSection';


function EvaluadoDashboard() {
  return (
    <div style={{ padding: '2rem', background: '#f0f4f8', minHeight: '100vh' }}>
    <h1>Bienvenid@</h1>
    <TestInfoSection />
    <TestAdviceSection />
  </div>
  );
}


export default EvaluadoDashboard;