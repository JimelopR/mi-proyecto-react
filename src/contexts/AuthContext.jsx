import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear contexto
export const AuthContext = createContext(null);

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

// Proveedor
function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState(() => {
    const storedAuth = sessionStorage.getItem('authInfo');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  // Guardar o eliminar en sessionStorage al cambiar authInfo
  useEffect(() => {
    if (authInfo) {
      sessionStorage.setItem('authInfo', JSON.stringify(authInfo));
    } else {
      sessionStorage.removeItem('authInfo');
    }
  }, [authInfo]);

  // Login
  const login = (authData) => {
    setAuthInfo(authData);
    console.log("tokenContext (en login):", authData.token);
  };

  // Logout
  const logout = () => {
    setAuthInfo(null);
  };

  // Métodos de acceso (opcional si usas directamente authInfo)
  const getRole = () => authInfo?.role || null;
  const getNombre = () => authInfo?.nombre || null;
  const getToken = () => authInfo?.token || null;

  return (
    <AuthContext.Provider value={{ authInfo, login, logout, getRole, getNombre, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;