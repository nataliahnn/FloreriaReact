import React, { useEffect, useState } from 'react';
import '../css/Perfil.css';
import { getCurrentUser, clearCurrentUser } from '../utils/auth';
import { obtenerFormularios } from '../api/formularioAPI';
import { obtenerBoletas } from '../api/boletaAPI';
import { obtenerProductos } from '../api/inventarioAPI';
import { useNavigate } from 'react-router-dom';
import { formatoCLP } from '../utils/formatoCLP';

function Perfil() {
  const [user, setUser] = useState(null);
  const [formularios, setFormularios] = useState([]);
  const [boletas, setBoletas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const navigate = useNavigate();

  const cargarProductos = async () => {
    try {
      setCargandoProductos(true);
      const prods = await obtenerProductos();
      setProductos(prods);
    } catch (e) {
      console.error('Error cargando productos', e);
      setProductos([]);
    } finally {
      setCargandoProductos(false);
    }
  };

  const cargarFormularios = async (ids) => {
    try {
      const todos = await obtenerFormularios();
      setFormularios(todos.filter(f => ids.includes(f.id)));
    } catch (e) {
      console.error('Error cargando formularios', e);
      setFormularios([]);
    }
  };

  const cargarBoletas = async (usuarioId) => {
    try {
      const todas = await obtenerBoletas();
      // Filtrar boletas que pertenecen al usuario actual
      const boletasDelUsuario = todas.filter(b => b.usuario_id === usuarioId);
      // Ordenar por fecha_compra descendente (más reciente primero)
      boletasDelUsuario.sort((a, b) => (b.fecha_compra || 0) - (a.fecha_compra || 0));
      setBoletas(boletasDelUsuario);
    } catch (e) {
      console.error('Error cargando boletas', e);
      setBoletas([]);
    }
  };

  useEffect(() => {
    const inicializar = async () => {
      const u = getCurrentUser();
      setUser(u);
      
      // Cargar productos primero
      await cargarProductos();
      
      // Luego cargar formularios y boletas
      if (u && Array.isArray(u.formulario_id) && u.formulario_id.length > 0) {
        cargarFormularios(u.formulario_id);
      }
      if (u) {
        cargarBoletas(u.id);
      }
    };
    
    inicializar();
  }, []);

  const formatDate = (value) => {
    if (!value) return '-';
    // aceptar timestamps en ms o strings
    const n = Number(value);
    const d = !Number.isNaN(n) ? new Date(n) : new Date(String(value));
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
  };


  const obtenerNombreProducto = (id) => {
    const producto = productos.find(p => p.id === id);
    return producto ? producto.nombre : `Producto #${id}`;
  };

  const handleLogout = () => {
    clearCurrentUser();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="perfil-container">
        <h2>No hay sesión iniciada</h2>
        <p>Por favor <a href="/login">inicia sesión</a>.</p>
      </div>
    );
  }

  // Campos a mostrar: excluimos password, role, id
  const visibleFields = {
    username: 'Usuario',
    correo: 'Email',
    nombres: 'Nombres',
    apellido_pat: 'Apellido Paterno',
    apellido_mat: 'Apellido Materno',
    rut: 'RUT',
    telefono: 'Teléfono',
    direccion: 'Dirección',
    fecha_nac: 'Fecha de Nacimiento',
  };

  return (
    <div className="perfil-container">
      <h2>Perfil de Usuario</h2>
      <div className="perfil-card">
        {Object.keys(visibleFields).map((k) => (
          <div key={k} className="perfil-row">
            <strong>{visibleFields[k]}:</strong>
            <span>{k === 'fecha_nac' ? formatDate(user[k]) : (user[k] || '-')}</span>
          </div>
        ))}

        <div className="perfil-actions">
          <button onClick={handleLogout} className="btn-cerrar">Cerrar sesión</button>
        </div>
      </div>

      <div className="perfil-formularios">
        <h3>Historial de Formularios</h3>
        {formularios.length > 0 ? (
          <ul className="perfil-form-list">
            {formularios.map(f => (
              <li key={f.id} className="perfil-form-item">
                <div className="form-header">
                  <strong className="form-title">{f.titulo || `Formulario #${f.id}`}</strong>
                  <span className="form-meta">
                    {f.nombre ? f.nombre : ''}{f.correo ? ` • ${f.correo}` : ''}{f.fecha ? ` • ${formatDate(f.fecha)}` : ''}
                  </span>
                </div>
                <p className="form-message">{f.mensaje ? (f.mensaje.length > 240 ? f.mensaje.substring(0, 240) + '...' : f.mensaje) : '-'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay formularios asociados.</p>
        )}
      </div>

      <div className="perfil-boletas">
        <h3>Historial de Compras</h3>
        {boletas.length > 0 ? (
          <ul className="perfil-boletas-list">
            {boletas.map(b => (
              <li key={b.id} className="perfil-boleta-item">
                <div className="boleta-header">
                  <strong className="boleta-title">Boleta #{b.id}</strong>
                  <span className="boleta-meta">
                    {formatDate(b.fecha_compra)} • {formatoCLP(b.total)}
                  </span>
                </div>
                <p className="boleta-info">
                  Método de pago: {b.metodo_pago} • Dirección: {b.direccion_envio || '-'}
                </p>
                <div className="boleta-items">
                  <strong>Productos: </strong>
                  {Array.isArray(b.productos_id) && b.productos_id.length > 0 ? (
                    b.productos_id.map((prodId, idx) => (
                      <span key={idx} className="boleta-item-tag">
                        {obtenerNombreProducto(prodId)} x{b.cantidades && b.cantidades[idx] ? b.cantidades[idx] : 1}{idx < b.productos_id.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay compras registradas.</p>
        )}
      </div>
    </div>
  );
}

export default Perfil;
