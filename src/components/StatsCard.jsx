import React from 'react';

const StatsCard = ({ title, value }) => (
  <div style={{
    background: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    flex: 1
  }}>
    <h3>{title}</h3>
    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
  </div>
);

export default StatsCard;
