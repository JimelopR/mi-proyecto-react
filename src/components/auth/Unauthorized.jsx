import React from 'react';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h1>¡Acceso Denegado!</h1>
        <p className="mb-0">No tienes los permisos necesarios para acceder a esta página.</p>
      </div>
      <button className="btn btn-secondary" onClick={goBack}>
        Volver
      </button>
    </div>
  );
}

export default Unauthorized;