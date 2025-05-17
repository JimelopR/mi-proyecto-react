import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function RequireAuth({ children, allowedRoles }) {
  const { authInfo } = useContext(AuthContext);
  const location = useLocation();

  if (!authInfo) {
    // Usuario no autenticado, redirige a la página de login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authInfo.role)) {
    // Usuario autenticado pero sin el rol necesario
    return <Navigate to="/unauthorized" replace />;
  }

  // Usuario autenticado y (si se especifica) tiene el rol necesario
  return children;
}

export default RequireAuth;