import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import DinamicNavbar from './components/DinamicNavBar';

const AppLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <DinamicNavbar /> {/* Barra de navegación para usuarios autenticados */}
      <div className="flex-grow-1">
        <AppRoutes /> {/* Las rutas protegidas se renderizarán aquí */}
      </div>
    </div>
  );
};

function App() {
  const { authInfo } = useContext(AuthContext);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header /> {/* El Header se renderiza siempre */}
      <div className="flex-grow-1">
        {authInfo ? (
          <AppLayout />
        ) : (
          <AppRoutes /> 
        )}
      </div>
      <Footer /> {/* El Footer se renderiza siempre */}
    </div>
  );
}

export default App;