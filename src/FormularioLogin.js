// src/FormularioLogin.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormularioLogin() {
    const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!correo || !password) {
      setMensaje('Completa todos los campos.');
    } else {
      setMensaje('¡Login simulado exitoso!');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email" className="form-control" placeholder="Correo electrónico" value={correo} 
            onChange={(e) => setCorreo(e.target.value)} required
          />
        </div>
        <div className="mb-3">
          <input
            type="password" className="form-control" placeholder="Contraseña" value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </form>
    </div>
  );
}
export default FormularioLogin;
