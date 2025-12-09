import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Atenea.css';
import { obtenerProductos, actualizarProducto, crearProducto as crearProductoAPI, eliminarProducto as eliminarProductoAPI } from '../api/inventarioAPI';
import { obtenerFormularios, eliminarFormulario } from '../api/formularioAPI';

function Atenea() {
  // Estados para inventario
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoCreando, setProductoCreando] = useState(false);
  const [productoActualizado, setProductoActualizado] = useState({});

  // Estados para formularios
  const [formularios, setFormularios] = useState([]);

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
      const [productosData, formulariosData] = await Promise.all([
        obtenerProductos(),
        obtenerFormularios(),
      ]);
      const productosOrdenados = productosData.sort((a, b) => a.id - b.id);
      const formulariosOrdenados = formulariosData.sort((a, b) => a.id - b.id);
      setProductos(productosOrdenados);
      setFormularios(formulariosOrdenados);
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
