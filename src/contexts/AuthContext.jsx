import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto de autenticación
export const AuthContext = createContext(null);

// Creamos el proveedor del contexto
function AuthProvider({ children }) {
  // Estado para almacenar la información de autenticación (rol)
  const [authInfo, setAuthInfo] = useState(() => {
    // Intentamos obtener la información de autenticación del localStorage al cargar la aplicación
    const storedAuth = localStorage.getItem('authInfo');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  // Efecto para guardar o eliminar la información de autenticación del localStorage
  useEffect(() => {
    if (authInfo) {
      localStorage.setItem('authInfo', JSON.stringify(authInfo));
    } else {
      localStorage.removeItem('authInfo');
    }
  }, [authInfo]);

  // Función para iniciar sesión (actualiza el estado authInfo)
  const login = (role) => {
    setAuthInfo({ role });
  };

  // Función para cerrar sesión (limpia el estado authInfo)
  const logout = () => {
    setAuthInfo(null);
  };

  // El proveedor hace que el valor del contexto esté disponible para los componentes hijos
  return (
    <AuthContext.Provider value={{ authInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;