import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="container mt-5">
      <div className="alert alert-warning" role="alert">
        <h1>¡Página no encontrada!</h1>
        <p className="mb-0">La página a la que intentas acceder no existe.</p>
      </div>
      <button className="btn btn-secondary" onClick={goBack}>
        Volver
      </button>
    </div>
  );
}

export default NotFound;