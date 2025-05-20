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
      <h2 className="mb-4">Gestión de Usuarios</h2>
      <Card style={{ backgroundColor: '#e3f2fd', borderColor: '#c2e0f4' }}>
        <Card.Header style={{ backgroundColor: '#6BAED6', color: '#fff' }}>
        </Card.Header>
        <Card.Body>
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <Button className="mb-3" onClick={handleAgregarModal} style={{ padding: '0.5rem 1rem', background: '#89CFF0', border: 'none', borderRadius: '6px', color:'#000' }}>
           + Agregar Nuevo Usuario
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
                  <td>{usuario.rol === 1 ? 'Administrador': 
                        usuario.rol === 2 ? 'Evaluador': 
                        usuario.rol === 3 ? 'Evaluado': 'Desconocido'}
                  </td>
                  <td>
                    <Button variant="info" size="sm" className="me-2" onClick={() => handleEditarModal(usuario)} style={{ backgroundColor: '#aec2ab', borderColor: '#aec2ab' }}>
                      Editar
                    </Button>
                    <Button size="sm" onClick={() => desactivarUsuario(usuario.id)} style={{ backgroundColor: '#cd6155', borderColor: '#cd6155' }}>
                      Desactivar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal para Agregar Nuevo Usuario */}
          <Modal show={showAgregarModal} onHide={handleCerrarAgregarModal}>
            <Modal.Header closeButton style={{ padding: '0.5rem 1rem', background: '#c2e0f4', border: 'none', borderRadius: '6px', color:'#000'}}>
              <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formNuevoNombre">
                  <Form.Label >Nombre</Form.Label>
                  <Form.Control type="text" name="nombre" value={nuevoUsuario.nombre} onChange={handleInputChangeNuevoUsuario} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNuevoNombre">
                  <Form.Label >Apellido Paterno</Form.Label>
                  <Form.Control type="text" name="apellidoPaterno" value={nuevoUsuario.apellidoPaterno} onChange={handleInputChangeNuevoUsuario} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNuevoNombre">
                  <Form.Label >Apellido Materno</Form.Label>
                  <Form.Control type="text" name="apellidoMaterno" value={nuevoUsuario.apellidoMaterno} onChange={handleInputChangeNuevoUsuario} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNuevoCorreo">
                  <Form.Label >Correo Electrónico</Form.Label>
                  <Form.Control type="email" name="correo" value={nuevoUsuario.correo} onChange={handleInputChangeNuevoUsuario} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNuevoRol">
                  <Form.Label >Rol</Form.Label>
                  <Form.Control as="select" name="idTipoUsuario" value={nuevoUsuario.idTipoUsuario} onChange={handleInputChangeNuevoUsuario}>
                    <option value="3">Evaluado</option>
                    <option value="2">Evaluador</option>
                    <option value="1">Administrador</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#e0f2f7' }}>
              <Button variant="secondary" onClick={handleCerrarAgregarModal}>
                Cancelar
              </Button>
              <Button onClick={agregarNuevoUsuario} style={{ padding: '0.5rem 1rem', background: '#89CFF0', border: 'none', borderRadius: '6px', color:'#000'}}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal para Editar Usuario (Rol y Contraseña) */}
          <Modal show={showEditarModal} onHide={handleCerrarEditarModal}>
            <Modal.Header closeButton style={{ padding: '0.5rem 1rem', background: '#c2e0f4', border: 'none', borderRadius: '6px', color:'#000'}}>
              <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {usuarioSeleccionado && (
                <Form>
                  <Form.Group className="mb-3" controlId="formEditarRol">
                    <Form.Label>Rol</Form.Label>
                    <Form.Control as="select" name="rol" value={editarUsuario.rol} onChange={handleInputChangeEditarUsuario}>
                      <option value="EVALUADO">Evaluado</option>
                      <option value="EVALUADOR">Evaluador</option>
                      <option value="ADMINISTRADOR">Administrador</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEditarPassword">
                    <Form.Label>Nueva Contraseña (opcional)</Form.Label>
                    <Form.Control type="password" name="nuevaContraseña" value={editarUsuario.nuevaContraseña} onChange={handleInputChangeEditarUsuario} />
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#e0f2f7' }}>
              <Button variant="secondary" onClick={handleCerrarEditarModal}>
                Cancelar
              </Button>
              <Button variant="warning" onClick={cambiarRolUsuario} style={{ backgroundColor: '#aec2ab', borderColor: '#aec2ab' }}>
                Cambiar Rol
              </Button>
              <Button variant="warning" onClick={cambiarContraseñaUsuario} style={{ backgroundColor: '#89CFF0', borderColor: '#89CFF0' }}>
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