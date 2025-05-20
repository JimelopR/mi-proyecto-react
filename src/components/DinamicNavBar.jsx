import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const DynamicNavbar = () => {
  const { authInfo, logout } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  // Determina las rutas basadas en el rol (asumiendo que authInfo siempre estará presente aquí)
  let rutas = [];
  let usuarioNombre = ""; // Nombre por defecto
  let usuarioNombreCompleto = "";
  if (authInfo && authInfo.role) {
    usuarioNombreCompleto = authInfo.nombre; 
    switch (authInfo.role) {
      case 'ROLE_ADMINISTRADOR':
        rutas = [
          { path: '/admin/dashboard', label: 'Dashboard' },
          { path: '/admin/gestion-usuarios', label: 'Usuarios' },
          { path: '/admin/gestion-test', label: 'Tests' },
        ];
        usuarioNombre = "Administrador";
        break;
      case 'ROLE_EVALUADOR':
        rutas = [
          { path: '/evaluador/dashboard', label: 'Información de Interés' },
          { path: '/evaluador/asignar-test', label: 'Asignar Test' },
          { path: '/evaluador/resultados', label: 'Ver Resultados' },
        ];
        usuarioNombre = "Evaluador";
        break;
      case 'ROLE_EVALUADO':
        rutas = [
          { path: '/evaluado/dashboard', label: 'Información de Interés' },
          { path: '/evaluado/realizar-test', label: 'Realizar Test' },
          { path: '/evaluado/mi-resultado', label: 'Resultados' },
        ];
        usuarioNombre = "Evaluado";
        break;
      default:
        rutas = [{ path: '/home', label: 'Inicio' }];
    }
  } else {
    // Esto no debería alcanzarse si el componente solo se renderiza después del login
    rutas = [{ path: '/home', label: 'Inicio' }];
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          Sistema de Evaluación
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {rutas.map((ruta) => (
              <Nav.Link key={ruta.path} as={Link} to={ruta.path}>
                {ruta.label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            {authInfo && ( // Renderiza el NavDropdown solo si authInfo existe
              <NavDropdown title={usuarioNombre +" - "+usuarioNombreCompleto  } id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DynamicNavbar;