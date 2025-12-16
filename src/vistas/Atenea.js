import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Atenea.css';
import { obtenerProductos, actualizarProducto, crearProducto as crearProductoAPI, eliminarProducto as eliminarProductoAPI } from '../api/inventarioAPI';
import { obtenerFormularios, eliminarFormulario } from '../api/formularioAPI';
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../api/usuarioAPI';
import { obtenerBoletas, crearBoleta, actualizarBoleta, eliminarBoleta } from '../api/boletaAPI';

function Atenea() {
  // Estados para inventario
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoCreando, setProductoCreando] = useState(false);
  const [productoActualizado, setProductoActualizado] = useState({});

  // Estados para formularios
  const [formularios, setFormularios] = useState([]);

  // Estados para usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuarioCreando, setUsuarioCreando] = useState(false);
  const [usuarioActualizado, setUsuarioActualizado] = useState({});

  // Estados para boletas
  const [boletas, setBoletas] = useState([]);
  const [boletaEditando, setBoletaEditando] = useState(null);
  const [boletaCreando, setBoletaCreando] = useState(false);
  const [boletaActualizada, setBoletaActualizada] = useState({});

  // Estados generales
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.style.display = 'none';
    }
    return () => {
      if (nav) {
        nav.style.display = 'flex';
      }
    };
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [productosData, formulariosData, usuariosData, boletasData] = await Promise.all([
        obtenerProductos(),
        obtenerFormularios(),
        obtenerUsuarios(),
        obtenerBoletas(),
      ]);
      const productosOrdenados = (productosData || []).sort((a, b) => a.id - b.id);
      const formulariosOrdenados = (formulariosData || []).sort((a, b) => a.id - b.id);
      const usuariosOrdenados = (usuariosData || []).sort((a, b) => a.id - b.id);
      const boletasOrdenadas = (boletasData || []).sort((a, b) => a.id - b.id);
      setProductos(productosOrdenados);
      setFormularios(formulariosOrdenados);
      setUsuarios(usuariosOrdenados);
      setBoletas(boletasOrdenadas);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setCargando(false);
    }
  };

  // Funciones para editar productos
  const iniciarEdicion = (producto) => {
    setProductoEditando(producto.id);
    setProductoActualizado({ ...producto });
  };

  const cancelarEdicion = () => {
    setProductoEditando(null);
    setProductoActualizado({});
  };

  const iniciarCreacion = () => {
    setProductoCreando(true);
    setProductoActualizado({
      nombre: '',
      precio: 0,
      descripcion: '',
      imagen: '',
    });
  };

  const cancelarCreacion = () => {
    setProductoCreando(false);
    setProductoActualizado({});
  };

  const guardarProducto = async () => {
    try {
      await actualizarProducto(productoActualizado.id, productoActualizado);
      setProductos(
        productos.map((p) =>
          p.id === productoActualizado.id ? productoActualizado : p
        )
      );
      setProductoEditando(null);
      setProductoActualizado({});
      alert('Producto actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      alert('Error al actualizar el producto');
    }
  };

  const crearProducto = async () => {
    if (!productoActualizado.nombre || !productoActualizado.descripcion || !productoActualizado.imagen) {
      alert('Por favor completa todos los campos');
      return;
    }
    try {
      const nuevoProducto = await crearProductoAPI(productoActualizado);
      setProductos([...productos, nuevoProducto]);
      setProductoCreando(false);
      setProductoActualizado({});
      alert('Producto creado correctamente.');
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('Error al crear el producto');
    }
  };

  const cambiarCampoProducto = (campo, valor) => {
    setProductoActualizado({
      ...productoActualizado,
      [campo]: campo === 'precio' ? parseFloat(valor) || 0 : valor,
    });
  };

  const iniciarEdicionUsuario = (usuario) => {
    setUsuarioEditando(usuario.id);
    setUsuarioActualizado({ ...usuario });
  };

  const cancelarEdicionUsuario = () => {
    setUsuarioEditando(null);
    setUsuarioActualizado({});
  };

  const iniciarCreacionUsuario = () => {
    setUsuarioCreando(true);
    setUsuarioActualizado({ username: '', password: '', correo: '', nombres: '', apellido_pat: '', apellido_mat: '', role: 'user', rut: '', telefono: '', direccion: '', fecha_nac: '', formulario_id: [] });
  };

  const cancelarCreacionUsuario = () => {
    setUsuarioCreando(false);
    setUsuarioActualizado({});
  };

  const guardarUsuario = async () => {
    try {
      await actualizarUsuario(usuarioActualizado.id, usuarioActualizado);
      setUsuarios(usuarios.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u));
      setUsuarioEditando(null);
      setUsuarioActualizado({});
      alert('Usuario actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar el usuario: ' + (error.message || error));
    }
  };

  const crearUsuarioFn = async () => {
    // Validación mínima
    if (!usuarioActualizado.username || !usuarioActualizado.password) {
      alert('Usuario y contraseña son requeridos');
      return;
    }
    try {
      const nuevo = await crearUsuario(usuarioActualizado);
      setUsuarios([...usuarios, nuevo]);
      setUsuarioCreando(false);
      setUsuarioActualizado({});
      alert('Usuario creado correctamente.');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear el usuario: ' + (error.message || error));
    }
  };

  const cambiarCampoUsuario = (campo, valor) => {
    setUsuarioActualizado({
      ...usuarioActualizado,
      [campo]: campo === 'formulario_id' ? (valor ? valor.split(',').map(v => parseInt(v.trim()) || 0) : []) : valor,
    });
  };

  const eliminarUsuarioFn = async (id) => {
    if (window.confirm('¿Eliminar usuario?')) {
      try {
        await eliminarUsuario(id);
        setUsuarios(usuarios.filter(u => u.id !== id));
        alert('Usuario eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario');
      }
    }
  };

  // Funciones para editar boletas
  const iniciarEdicionBoleta = (boleta) => {
    setBoletaEditando(boleta.id);
    setBoletaActualizada({ ...boleta });
  };

  const cancelarEdicionBoleta = () => {
    setBoletaEditando(null);
    setBoletaActualizada({});
  };

  const iniciarCreacionBoleta = () => {
    setBoletaCreando(true);
    setBoletaActualizada({
      usuario_id: 0,
      productos_id: [],
      total: 0,
      metodo_pago: 'efectivo',
      direccion_envio: '',
      fecha_compra: new Date().toISOString(),
    });
  };

  const cancelarCreacionBoleta = () => {
    setBoletaCreando(false);
    setBoletaActualizada({});
  };

  const guardarBoleta = async () => {
    try {
      await actualizarBoleta(boletaActualizada.id, boletaActualizada);
      setBoletas(boletas.map(b => b.id === boletaActualizada.id ? boletaActualizada : b));
      setBoletaEditando(null);
      setBoletaActualizada({});
      alert('Boleta actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar boleta:', error);
      alert('Error al actualizar la boleta: ' + (error.message || error));
    }
  };

  const crearBoletaFn = async () => {
    if (!boletaActualizada.usuario_id) {
      alert('Usuario ID es requerido');
      return;
    }
    try {
      const nueva = await crearBoleta(boletaActualizada);
      setBoletas([...boletas, nueva]);
      setBoletaCreando(false);
      setBoletaActualizada({});
      alert('Boleta creada correctamente.');
    } catch (error) {
      console.error('Error al crear boleta:', error);
      alert('Error al crear la boleta: ' + (error.message || error));
    }
  };

  const cambiarCampoBoleta = (campo, valor) => {
    setBoletaActualizada({
      ...boletaActualizada,
      [campo]: campo === 'productos_id' ? (valor ? valor.split(',').map(v => parseInt(v.trim()) || 0) : []) : 
               campo === 'usuario_id' ? parseInt(valor) || 0 :
               campo === 'total' ? parseFloat(valor) || 0 : valor,
    });
  };

  const eliminarBoletaFn = async (id) => {
    if (window.confirm('¿Eliminar boleta?')) {
      try {
        await eliminarBoleta(id);
        setBoletas(boletas.filter(b => b.id !== id));
        alert('Boleta eliminada correctamente.');
      } catch (error) {
        console.error('Error al eliminar boleta:', error);
        alert('Error al eliminar boleta');
      }
    }
  };

  // Función para eliminar producto
  const eliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await eliminarProductoAPI(id);
        setProductos(productos.filter((p) => p.id !== id));
        alert('Producto eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  // Función para eliminar formulario
  const eliminarFormularioFn = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este formulario?')) {
      try {
        await eliminarFormulario(id);
        setFormularios(formularios.filter((f) => f.id !== id));
        alert('Formulario eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar formulario:', error);
        alert('Error al eliminar el formulario');
      }
    }
  };

  if (cargando) {
    return <div className="atenea-container"><h1>Cargando...</h1></div>;
  }

  return (
    <div className="atenea-container">
      <h1>Panel Administrativo - Atenea</h1>

      <div className="atenea-sections">
        {/* Sección de Inventario */}
        <div className="atenea-section">
          <h2>Gestión de Inventario</h2>

          {productoEditando || productoCreando ? (
            <div>
              <div className="editar-producto">
                <div>
                  <label>Nombre:</label>
                  <input
                    type="text"
                    value={productoActualizado.nombre || ''}
                    onChange={(e) => cambiarCampoProducto('nombre', e.target.value)}
                  />
                </div>
                <div>
                  <label>Precio (CLP):</label>
                  <input
                    type="number"
                    value={productoActualizado.precio || 0}
                    onChange={(e) => cambiarCampoProducto('precio', e.target.value)}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Descripción:</label>
                  <input
                    type="text"
                    value={productoActualizado.descripcion || ''}
                    onChange={(e) => cambiarCampoProducto('descripcion', e.target.value)}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Ruta de Imagen:</label>
                  <input
                    type="text"
                    value={productoActualizado.imagen || ''}
                    onChange={(e) => cambiarCampoProducto('imagen', e.target.value)}
                  />
                </div>
              </div>
              <div className="acciones-botones">
                <button 
                  className="btn-guardar" 
                  onClick={productoCreando ? crearProducto : guardarProducto}
                >
                  {productoCreando ? 'Crear Producto' : 'Guardar'}
                </button>
                <button 
                  className="btn-cancelar" 
                  onClick={productoCreando ? cancelarCreacion : cancelarEdicion}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <table className="tabla-inventario">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.length > 0 ? (
                    productos.map((producto) => (
                      <tr key={producto.id}>
                        <td>{producto.id}</td>
                        <td>{producto.nombre}</td>
                        <td>${producto.precio.toLocaleString('es-CL')}</td>
                        <td>{producto.descripcion}</td>
                        <td>
                          <div className="acciones-botones">
                            <button
                              className="btn-editar"
                              onClick={() => iniciarEdicion(producto)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn-eliminar"
                              onClick={() => eliminarProducto(producto.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="sin-datos">
                        No hay productos en el inventario
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button className="btn-agregar" onClick={iniciarCreacion} style={{ marginBottom: '20px' }}>
                Crear Nuevo Producto
              </button>
            </div>
          )}
        </div>

        {/* Sección de Formularios */}
        <div className="atenea-section">
          <h2>Formularios de Contacto</h2>
          <table className="tabla-formularios">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Mensaje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {formularios.length > 0 ? (
                formularios.map((formulario) => (
                  <tr key={formulario.id}>
                    <td>{formulario.id}</td>
                    <td>{formulario.nombre}</td>
                    <td>{formulario.email}</td>
                    <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>
                      {formulario.mensaje.substring(0, 50)}
                      {formulario.mensaje.length > 50 ? '...' : ''}
                    </td>
                    <td>
                      <div className="acciones-formularios">
                            <button
                              className="btn-Leer"
                              onClick={() => alert(`Mensaje completo:\n${formulario.mensaje}`)}
                              title="Click para Leer."
                              style={{ marginBottom: '10px' }}
                            >
                              Leer
                            </button>
                            <button
                              className="btn-eliminar"
                              onClick={() => eliminarFormularioFn(formulario.id)}
                              title="Click para eliminar"
                            >
                              Eliminar
                            </button>
                          </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="sin-datos">
                    No hay formularios
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Sección de Usuarios */}
        <div className="atenea-section">
          <h2>Usuarios</h2>

          {usuarioEditando || usuarioCreando ? (
            <div>
              <div className="editar-usuario">
                <div>
                  <label>Usuario:</label>
                  <input type="text" value={usuarioActualizado.username || ''} onChange={(e) => cambiarCampoUsuario('username', e.target.value)} />
                </div>
                <div>
                  <label>Contraseña:</label>
                  <input type="text" value={usuarioActualizado.password || ''} onChange={(e) => cambiarCampoUsuario('password', e.target.value)} />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" value={usuarioActualizado.correo || ''} onChange={(e) => cambiarCampoUsuario('correo', e.target.value)} />
                </div>
                <div>
                  <label>Nombres:</label>
                  <input type="text" value={usuarioActualizado.nombres || ''} onChange={(e) => cambiarCampoUsuario('nombres', e.target.value)} />
                </div>
                <div>
                  <label>Apellido Paterno:</label>
                  <input type="text" value={usuarioActualizado.apellido_pat || ''} onChange={(e) => cambiarCampoUsuario('apellido_pat', e.target.value)} />
                </div>
                <div>
                  <label>Apellido Materno:</label>
                  <input type="text" value={usuarioActualizado.apellido_mat || ''} onChange={(e) => cambiarCampoUsuario('apellido_mat', e.target.value)} />
                </div>
                <div>
                  <label>Role:</label>
                  <select value={usuarioActualizado.role || 'user'} onChange={(e) => cambiarCampoUsuario('role', e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div>
                  <label>RUT:</label>
                  <input type="text" value={usuarioActualizado.rut || ''} onChange={(e) => cambiarCampoUsuario('rut', e.target.value)} />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input type="text" value={usuarioActualizado.telefono || ''} onChange={(e) => cambiarCampoUsuario('telefono', e.target.value)} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Dirección:</label>
                  <input type="text" value={usuarioActualizado.direccion || ''} onChange={(e) => cambiarCampoUsuario('direccion', e.target.value)} />
                </div>
                <div>
                  <label>Fecha Nac:</label>
                  <input type="date" value={usuarioActualizado.fecha_nac || ''} onChange={(e) => cambiarCampoUsuario('fecha_nac', e.target.value)} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Formulario IDs (separados por coma):</label>
                  <input type="text" value={(usuarioActualizado.formulario_id || []).join(', ')} onChange={(e) => cambiarCampoUsuario('formulario_id', e.target.value)} />
                </div>
              </div>
              <div className="acciones-botones">
                <button className="btn-guardar" onClick={usuarioCreando ? crearUsuarioFn : guardarUsuario}>{usuarioCreando ? 'Crear Usuario' : 'Guardar'}</button>
                <button className="btn-cancelar" onClick={usuarioCreando ? cancelarCreacionUsuario : cancelarEdicionUsuario}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div>
              <table className="tabla-usuarios">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Nombres</th>
                    <th>Role</th>
                    <th>Formularios</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length > 0 ? (
                    usuarios.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username || '-'}</td>
                        <td>{u.correo || '-'}</td>
                        <td>{((u.nombres || '') + ' ' + (u.apellido_pat || '')).trim() || '-'}</td>
                        <td>{u.role || '-'}</td>
                        <td>{Array.isArray(u.formulario_id) && u.formulario_id.length > 0 ? u.formulario_id.join(', ') : '-'}</td>
                        <td>
                          <div className="acciones-botones">
                            <button className="btn-editar" onClick={() => iniciarEdicionUsuario(u)}>Editar</button>
                            <button className="btn-eliminar" onClick={() => eliminarUsuarioFn(u.id)}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="sin-datos">No hay usuarios</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button className="btn-agregar" onClick={iniciarCreacionUsuario} style={{ marginTop: '12px' }}>Crear Nuevo Usuario</button>
            </div>
          )}
        </div>

        {/* Sección de Boletas */}
        <div className="atenea-section">
          <h2>Gestión de Boletas</h2>

          {boletaEditando || boletaCreando ? (
            <div>
              <div className="editar-usuario">
                <div>
                  <label>Usuario ID:</label>
                  <input type="number" value={boletaActualizada.usuario_id || 0} onChange={(e) => cambiarCampoBoleta('usuario_id', e.target.value)} />
                </div>
                <div>
                  <label>Total:</label>
                  <input type="number" step="0.01" value={boletaActualizada.total || 0} onChange={(e) => cambiarCampoBoleta('total', e.target.value)} />
                </div>
                <div>
                  <label>Método de Pago:</label>
                  <select value={boletaActualizada.metodo_pago || 'efectivo'} onChange={(e) => cambiarCampoBoleta('metodo_pago', e.target.value)}>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">Transferencia</option>
                  </select>
                </div>
                <div>
                  <label>Fecha Compra:</label>
                  <input
                    type="datetime-local"
                    value={
                      boletaActualizada.fecha_compra
                        ? (typeof boletaActualizada.fecha_compra === 'number'
                            ? new Date(boletaActualizada.fecha_compra).toISOString().slice(0,16)
                            : String(boletaActualizada.fecha_compra).slice(0,16))
                        : ''
                    }
                    onChange={(e) => cambiarCampoBoleta('fecha_compra', new Date(e.target.value).getTime())}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Dirección de Envío:</label>
                  <input type="text" value={boletaActualizada.direccion_envio || ''} onChange={(e) => cambiarCampoBoleta('direccion_envio', e.target.value)} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Producto IDs (separados por coma):</label>
                  <input type="text" value={(boletaActualizada.productos_id || []).join(', ')} onChange={(e) => cambiarCampoBoleta('productos_id', e.target.value)} />
                </div>
              </div>
              <div className="acciones-botones">
                <button className="btn-guardar" onClick={boletaCreando ? crearBoletaFn : guardarBoleta}>{boletaCreando ? 'Crear Boleta' : 'Guardar'}</button>
                <button className="btn-cancelar" onClick={boletaCreando ? cancelarCreacionBoleta : cancelarEdicionBoleta}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div>
              <table className="tabla-usuarios">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuario ID</th>
                    <th>Total</th>
                    <th>Método Pago</th>
                    <th>Fecha Compra</th>
                    <th>Dirección</th>
                    <th>Productos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {boletas.length > 0 ? (
                    boletas.map(b => (
                      <tr key={b.id}>
                        <td>{b.id}</td>
                        <td>{b.usuario_id || '-'}</td>
                        <td>${(b.total || 0).toLocaleString('es-CL')}</td>
                        <td>{b.metodo_pago || '-'}</td>
                        <td>{b.fecha_compra ? new Date(b.fecha_compra).toLocaleString('es-CL') : '-'}</td>
                        <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.direccion_envio || '-'}</td>
                        <td>{Array.isArray(b.productos_id) && b.productos_id.length > 0 ? b.productos_id.join(', ') : '-'}</td>
                        <td>
                          <div className="acciones-botones">
                            <button className="btn-editar" onClick={() => iniciarEdicionBoleta(b)}>Editar</button>
                            <button className="btn-eliminar" onClick={() => eliminarBoletaFn(b.id)}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="sin-datos">No hay boletas</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button className="btn-agregar" onClick={iniciarCreacionBoleta} style={{ marginTop: '12px' }}>Crear Nueva Boleta</button>
            </div>
          )}
        </div>
      </div>

      {/* Botón para refrescar datos */}
      <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-agregar" onClick={cargarDatos}>
          Actualizar Tablas
        </button>
        <Link to="/">
          <button className="btn-agregar" style={{ backgroundColor: '#666' }}>
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Atenea;
