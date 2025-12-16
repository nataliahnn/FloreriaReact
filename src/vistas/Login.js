import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { login } from '../utils/auth';
import { crearUsuario } from '../api/usuarioAPI';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [formRegistro, setFormRegistro] = useState({
    username: '',
    password: '',
    correo: '',
    nombres: '',
    apellido_pat: '',
    apellido_mat: '',
    role: '',
    rut: '',
    telefono: '',
    direccion: '',
    fecha_nac: '',
  });
  const [errorRegistro, setErrorRegistro] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleChangeRegistro = (e) => setFormRegistro({ ...formRegistro, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) {
      setError('Completa usuario y contraseña');
      return;
    }
    const user = await login(form.username, form.password);
    if (user) {
      navigate('/perfil');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };


  const handleRegistro = async (e) => {
    e.preventDefault();
    setErrorRegistro('');

    if (!formRegistro.username || !formRegistro.password) {
      setErrorRegistro('Usuario y contraseña son obligatorios');
      return;
    }

    const correoTrimmed = (formRegistro.correo || '').trim().toLowerCase();
    if (!correoTrimmed) {
      setErrorRegistro('El correo es obligatorio');
      return;
    }
    try {
      const nuevoUsuario = {
        username: String(formRegistro.username || '').trim(),
        password: String(formRegistro.password || '').trim(),
        correo: correoTrimmed,
        nombres: formRegistro.nombres || '',
        apellido_pat: formRegistro.apellido_pat || '',
        apellido_mat: formRegistro.apellido_mat || '',
        role: formRegistro.role || '',
        direccion: String(formRegistro.direccion || '').trim(),
        formulario_id: [],
      };

      // Solo agregar campos numéricos si tienen valor
      if (formRegistro.rut && formRegistro.rut.trim()) {
        const rutParsed = parseInt(formRegistro.rut);
        if (!isNaN(rutParsed)) {
          nuevoUsuario.rut = rutParsed;
        }
      }

      if (formRegistro.telefono && formRegistro.telefono.trim()) {
        const telefonoParsed = parseInt(formRegistro.telefono);
        if (!isNaN(telefonoParsed)) {
          nuevoUsuario.telefono = telefonoParsed;
        }
      }

      if (formRegistro.fecha_nac && formRegistro.fecha_nac.trim()) {
        nuevoUsuario.fecha_nac = new Date(formRegistro.fecha_nac).getTime();
      }

      console.log('Enviando usuario:', nuevoUsuario);
      await crearUsuario(nuevoUsuario);
      alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
      setMostrarRegistro(false);
      setFormRegistro({
        username: '',
        password: '',
        correo: '',
        nombres: '',
        apellido_pat: '',
        apellido_mat: '',
        role: '',
        rut: '',
        telefono: '',
        direccion: '',
        fecha_nac: '',
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      console.error('Mensaje del error:', error.message);
      setErrorRegistro(`Error al crear la cuenta: ${error.message || 'Verifica los datos ingresados'}`);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="login-error">{error}</p>}
        <label>Usuario</label>
        <input name="username" value={form.username} onChange={handleChange} />
        <label>Contraseña</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        <div className="login-actions">
          <button type="button" className="btn-registrar" onClick={() => setMostrarRegistro(true)}>
            Crear Cuenta
          </button>
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>

      {mostrarRegistro && (
        <div className="modal-overlay" onClick={() => setMostrarRegistro(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setMostrarRegistro(false)}>×</button>
            <h2>Crear Cuenta</h2>
            {errorRegistro && <p className="login-error">{errorRegistro}</p>}
            <form onSubmit={handleRegistro}>
              <div className="registro-grid">
                <div>
                  <label>Usuario *</label>
                  <input name="username" value={formRegistro.username} onChange={handleChangeRegistro} required />
                </div>
                <div>
                  <label>Contraseña *</label>
                  <input type="password" name="password" value={formRegistro.password} onChange={handleChangeRegistro} required />
                </div>
                <div>
                  <label>Correo *</label>
                  <input type="email" name="correo" value={formRegistro.correo} onChange={handleChangeRegistro} required />
                </div>
                <div>
                  <label>Nombres</label>
                  <input name="nombres" value={formRegistro.nombres} onChange={handleChangeRegistro} />
                </div>
                <div>
                  <label>Apellido Paterno</label>
                  <input name="apellido_pat" value={formRegistro.apellido_pat} onChange={handleChangeRegistro} />
                </div>
                <div>
                  <label>Apellido Materno</label>
                  <input name="apellido_mat" value={formRegistro.apellido_mat} onChange={handleChangeRegistro} />
                </div>
                <div>
                  <label>RUT</label>
                  <input name="rut" value={formRegistro.rut} onChange={handleChangeRegistro} />
                </div>
                <div>
                  <label>Teléfono</label>
                  <input name="telefono" value={formRegistro.telefono} onChange={handleChangeRegistro} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Dirección</label>
                  <input name="direccion" value={formRegistro.direccion} onChange={handleChangeRegistro} />
                </div>
                <div>
                  <label>Fecha de Nacimiento</label>
                  <input type="date" name="fecha_nac" value={formRegistro.fecha_nac} onChange={handleChangeRegistro} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={() => setMostrarRegistro(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-crear">
                  Crear Cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

