import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


function Login() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false); // Indicador de carga
    const navigate = useNavigate(); // Hook para la redirección
    const { login } = useContext(AuthContext); // Obtiene la función login del contexto

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!correo || !password) {
            setMensaje('Completa todos los campos.');
        } else {
            setCargando(true);  // Empieza la carga
            try {
                const response = await axios.post('http://localhost:9090/loginUsuario', {
                    correo,
                    password
                }, {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
    
                setCargando(false);
    
                // Si el login es exitoso (código de estado 2xx)
                if (response.status >= 200 && response.status < 300) {
                   
                    if (response.data.message === 'Login successful' && response.data.role) {
                        login({role: response.data.role,
                            token: response.data.token,
                            nombre: response.data.nombre,
                            id: response.data.id});
                        
                        // Redirección basada en el rol
                      
                        console.log("tokenenLogin: "+response.data.token);
                        switch (response.data.role.trim()) {
                            case 'ROLE_ADMINISTRADOR': // Con el prefijo "ROLE_"
                                navigate('/admin/dashboard');
                                break;
                            case 'ROLE_EVALUADOR':   // Con el prefijo "ROLE_"
                                navigate('/evaluador/dashboard');
                                break;
                            case 'ROLE_EVALUADO':   // Con el prefijo "ROLE_"
                                navigate('/evaluado/dashboard');
                                break;
                            default:
                                navigate('/home');
                                break;
                        }
                    } else {
                        setMensaje(response.data.error || 'Error inesperado en el login.'); // Muestra el error del backend
                    }
                } else {
                    // Si el código de estado no es exitoso (por ejemplo, 401 Unauthorized)
                    navigate('/unauthorized'); 
                }
    
            } catch (error) {
                setCargando(false);
                setMensaje('Error al conectar con el servidor.'); // Error de conexión
                console.error("Error en la petición de login:", error);
            }
        }
    };

    return (
      
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            
            <h2 className="text-center mb-4"
            style={{ color: '#0288d1' }}>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo electrónico"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                        
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={cargando} 
                    style={{ backgroundColor: '#81d4fa', borderColor: '#81d4fa' }}
                >
                    {cargando ? 'Cargando...' : 'Ingresar'}
                </button>
                {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
            </form>
            
        </div>
       
        
    );
}

export default Login;
