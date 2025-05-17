import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../pages/Home';
import NotFound from '../components/NotFound';
import RequireAuth from '../components/auth/RequireAuth'; 
import AdminDashboard from '../pages/AdminDashboard';
import EvaluadorDashboard from '../pages/EvaluadorDashboard';
import EvaluadoDashboard from '../pages/EvaluadoDashboard';
import GestionUsuarios from '../pages/admin/GestionUsuarios';
import CrearTest from '../pages/admin/CrearTest';
import AsignarTest from '../pages/evaluador/AsignarTest';
import VerResultados from '../pages/evaluador/VerResultados';
import RealizarTest from '../pages/evaluado/RealizarTest';
import VerMiResultado from '../pages/evaluado/VerMiResultado';
import Unauthorized from '../components/auth/Unauthorized'; 

function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />

        {/* Rutas para Administrador */}
        <Route path="/admin/dashboard" element={<RequireAuth allowedRoles={['ROLE_ADMINISTRADOR']}><AdminDashboard /></RequireAuth>} />
        <Route path="/admin/gestion-usuarios" element={<RequireAuth allowedRoles={['ROLE_ADMINISTRADOR']}><GestionUsuarios /></RequireAuth>} />
        <Route path="/admin/crear-test" element={<RequireAuth allowedRoles={['ROLE_ADMINISTRADOR']}><CrearTest /></RequireAuth>} />

        {/* Rutas para Evaluador */}
        <Route path="/evaluador/dashboard" element={<RequireAuth allowedRoles={['ROLE_EVALUADOR']}><EvaluadorDashboard /></RequireAuth>} />
        <Route path="/evaluador/asignar-test" element={<RequireAuth allowedRoles={['ROLE_EVALUADOR']}><AsignarTest /></RequireAuth>} />
        <Route path="/evaluador/resultados" element={<RequireAuth allowedRoles={['ROLE_EVALUADOR']}><VerResultados /></RequireAuth>} />

        {/* Rutas para Evaluado */}
        <Route path="/evaluado/dashboard" element={<RequireAuth allowedRoles={['ROLE_EVALUADO']}><EvaluadoDashboard /></RequireAuth>} />
        <Route path="/evaluado/realizar-test/:testId" element={<RequireAuth allowedRoles={['ROLE_EVALUADO']}><RealizarTest /></RequireAuth>} />
        <Route path="/evaluado/mi-resultado" element={<RequireAuth allowedRoles={['ROLE_EVALUADO']}><VerMiResultado /></RequireAuth>} />
      </Routes>
  
  );
}

export default AppRoutes;