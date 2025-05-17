import React, { useState, useEffect, useContext  } from 'react';
import { Container, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext'; 

const GestionUsuarios = () => {
  const { getToken } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    correo: '',
    idTipoUsuario: '1', // Rol por defecto
    apellidoPaterno: '',
    apellidoMaterno: ''
  });
  const [editarUsuario, setEditarUsuario] = useState({
    id: null,
    rol: '',
    nuevaContraseña: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
     
      const token = getToken();
      console.log("Token a mandar: "+token);
      const response = await axios.get('http://localhost:9090/api/admin/consultarUsuarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios(response.data);
    } catch (error) {
      setError('Error al cargar los usuarios.');
      console.error('Error fetching usuarios:', error);
    }
  };

  const handleAgregarModal = () => setShowAgregarModal(true);
  const handleCerrarAgregarModal = () => setShowAgregarModal(false);
  const handleEditarModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setEditarUsuario({ id: usuario.id, rol: usuario.rol, nuevaContraseña: '' });
    setShowEditarModal(true);
  };
  const handleCerrarEditarModal = () => {
    setShowEditarModal(false);
    setUsuarioSeleccionado(null);
  };

  const handleInputChangeNuevoUsuario = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const handleInputChangeEditarUsuario = (e) => {
    const { name, value } = e.target;
    setEditarUsuario({ ...editarUsuario, [name]: value });
  };

  const agregarNuevoUsuario = async () => {
    try {
      const token = getToken();
      console.log("Token a mandar: "+token);
      const response = await axios.post('http://localhost:9090/api/admin/registrarUsuario', nuevoUsuario,
        {
          headers: {
            'Authorization': `Bearer ${token}`,  // Token en el header 'Authorization'
            'Content-Type': 'application/json'   // Enviar como JSON
          }
        }
      ); 
      if (response.status === 200) {
        setMensaje('Usuario agregado exitosamente.');
        fetchUsuarios();
        handleCerrarAgregarModal();
        setNuevoUsuario({ nombre: '', correo: '', password: '', rol: 'EVALUADO' });
      } else {
        setError('Error al agregar el usuario.');
      }
    } catch (error) {
      setError('Error al conectar con el servidor al agregar usuario.');
      console.error('Error adding usuario:', error);
    }
  };

  const desactivarUsuario = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas desactivar este usuario?')) {
      try {
        const response = await axios.delete(`http://localhost:9090/usuarios/${id}`); // Reemplaza con tu endpoint
        if (response.status === 200) {
          setMensaje('Usuario desactivado exitosamente.');
          fetchUsuarios();
        } else {
          setError('Error al desactivar el usuario.');
        }
      } catch (error) {
        setError('Error al conectar con el servidor al desactivar usuario.');
        console.error('Error deleting usuario:', error);
      }
    }
  };

  const cambiarRolUsuario = async () => {
    try {
      const response = await axios.put(`http://localhost:9090/usuarios/${editarUsuario.id}/rol`, { rol: editarUsuario.rol }); // Reemplaza con tu endpoint
      if (response.status === 200) {
        setMensaje('Rol de usuario actualizado exitosamente.');
        fetchUsuarios();
        handleCerrarEditarModal();
      } else {
        setError('Error al actualizar el rol del usuario.');
      }
    } catch (error) {
      setError('Error al conectar con el servidor al actualizar el rol.');
      console.error('Error updating rol:', error);
    }
  };

  const cambiarContraseñaUsuario = async () => {
    if (!editarUsuario.nuevaContraseña) {
      setError('Por favor, ingresa la nueva contraseña.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:9090/usuarios/${editarUsuario.id}/password`, { password: editarUsuario.nuevaContraseña }); // Reemplaza con tu endpoint
      if (response.status === 200) {
        setMensaje('Contraseña de usuario actualizada exitosamente.');
        fetchUsuarios();
        handleCerrarEditarModal();
      } else {
        setError('Error al actualizar la contraseña del usuario.');
      }
    } catch (error) {
      setError('Error al conectar con el servidor al actualizar la contraseña.');
      console.error('Error updating password:', error);
    }
  };

  return (
    <Container className="my-5">
      <Card style={{ backgroundColor: '#e3f2fd', borderColor: '#90caf9' }}>
        <Card.Header style={{ backgroundColor: '#bbdefb', color: '#1e88e5' }}>
          <h3>Gestión de Usuarios</h3>
        </Card.Header>
        <Card.Body>
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <Button variant="primary" className="mb-3" onClick={handleAgregarModal} style={{ backgroundColor: '#90caf9', borderColor: '#90caf9' }}>
            Agregar Nuevo Usuario
          </Button>

          <Table striped bordered hover responsive>
            <thead>
              <tr style={{ backgroundColor: '#e0f7fa', color: '#0288d1' }}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    <Button variant="info" size="sm" className="me-2" onClick={() => handleEditarModal(usuario)} style={{ backgroundColor: '#81d4fa', borderColor: '#81d4fa' }}>
                      Editar
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => desactivarUsuario(usuario.id)} style={{ backgroundColor: '#f44336', borderColor: '#f44336' }}>
                      Desactivar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal para Agregar Nuevo Usuario */}
          <Modal show={showAgregarModal} onHide={handleCerrarAgregarModal}>
            <Modal.Header closeButton style={{ backgroundColor: '#e0f7fa', color: '#0288d1' }}>
              <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formNuevoNombre">
                  <Form.Label style={{ color: '#4dd0e1' }}>Nombre</Form.Label>
                  <Form.Control type="text" name="nombre" value={nuevoUsuario.nombre} onChange={handleInputChangeNuevoUsuario} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNuevoNombre">
                  <Form.Label style={{ color: '#4dd0e1' }}>Apellido Paterno</Form.Label>
                  <Form.Control type="text" name="apellidoPaterno" value={nuevoUsuario.apellidoPaterno} onChange={handleInputChangeNuevoUsuario} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNuevoNombre">
                  <Form.Label style={{ color: '#4dd0e1' }}>Apellido Materno</Form.Label>
                  <Form.Control type="text" name="apellidoMaterno" value={nuevoUsuario.apellidoMaterno} onChange={handleInputChangeNuevoUsuario} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNuevoCorreo">
                  <Form.Label style={{ color: '#4dd0e1' }}>Correo Electrónico</Form.Label>
                  <Form.Control type="email" name="correo" value={nuevoUsuario.correo} onChange={handleInputChangeNuevoUsuario} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNuevoRol">
                  <Form.Label style={{ color: '#4dd0e1' }}>Rol</Form.Label>
                  <Form.Control as="select" name="idTipoUsuario" value={nuevoUsuario.idTipoUsuario} onChange={handleInputChangeNuevoUsuario}>
                    <option value="3">Evaluado</option>
                    <option value="2">Evaluador</option>
                    <option value="1">Administrador</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#e0f7fa' }}>
              <Button variant="secondary" onClick={handleCerrarAgregarModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={agregarNuevoUsuario} style={{ backgroundColor: '#81d4fa', borderColor: '#81d4fa' }}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal para Editar Usuario (Rol y Contraseña) */}
          <Modal show={showEditarModal} onHide={handleCerrarEditarModal}>
            <Modal.Header closeButton style={{ backgroundColor: '#e0f2f7', color: '#00acc1' }}>
              <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {usuarioSeleccionado && (
                <Form>
                  <Form.Group className="mb-3" controlId="formEditarRol">
                    <Form.Label style={{ color: '#4dd0e1' }}>Rol</Form.Label>
                    <Form.Control as="select" name="rol" value={editarUsuario.rol} onChange={handleInputChangeEditarUsuario}>
                      <option value="EVALUADO">Evaluado</option>
                      <option value="EVALUADOR">Evaluador</option>
                      <option value="ADMINISTRADOR">Administrador</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEditarPassword">
                    <Form.Label style={{ color: '#4dd0e1' }}>Nueva Contraseña (opcional)</Form.Label>
                    <Form.Control type="password" name="nuevaContraseña" value={editarUsuario.nuevaContraseña} onChange={handleInputChangeEditarUsuario} />
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#e0f2f7' }}>
              <Button variant="secondary" onClick={handleCerrarEditarModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={cambiarRolUsuario} style={{ backgroundColor: '#80deea', borderColor: '#80deea' }}>
                Cambiar Rol
              </Button>
              <Button variant="warning" onClick={cambiarContraseñaUsuario} style={{ backgroundColor: '#ffb74d', borderColor: '#ffb74d' }}>
                Cambiar Contraseña
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GestionUsuarios;