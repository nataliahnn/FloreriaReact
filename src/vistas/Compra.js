import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Compra.css';
import { formatoCLP } from '../utils/formatoCLP';
import { crearBoleta } from '../api/boletaAPI';
import { getCurrentUser } from '../utils/auth';

function Compra({ compra, setCompra }) {
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState(false);
  const [metodoPago, setMetodoPago] = useState('');
  const [direccionEnvio, setDireccionEnvio] = useState('');

  useEffect(() => {
    const usuario = getCurrentUser();
    if (usuario && usuario.direccion) {
      setDireccionEnvio(usuario.direccion);
    }
  }, []);

  const eliminarProducto = (id) => {
    setCompra(compra.filter(producto => producto.id !== id));
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) nuevaCantidad = 1;

    setCompra(
      compra.map(p =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };

  const comprar = async () => {
    if (compra.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    if (!direccionEnvio.trim()) {
      alert('Por favor ingresa una dirección de envío');
      return;
    }

    const usuario = getCurrentUser();
    if (!usuario) {
      alert('Debes iniciar sesión para completar la compra');
      navigate('/login');
      return;
    }

    setProcesando(true);

    try {
      const total = compra.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
      const productosIds = compra.map(p => p.id);

      const boletaData = {
        usuario_id: usuario.id,
        fecha_compra: Date.now(),
        total: total,
        productos_id: productosIds,
        metodo_pago: metodoPago,
        direccion_envio: direccionEnvio.trim(),
      };

      const boletaCreada = await crearBoleta(boletaData);
      
      alert("¡Compra realizada correctamente!\nGracias por su compra ❤️");
      setCompra([]);
      
      // Redirigir a la boleta creada
      if (boletaCreada && boletaCreada.id) {
        navigate(`/boleta/${boletaCreada.id}`);
      } else {
        navigate('/perfil');
      }
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      alert('Hubo un error al procesar tu compra. Por favor intenta de nuevo.');
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="compra">
      <h2>
        🛒 Tu Carrito ({compra.reduce((acc, p) => acc + p.cantidad, 0)} items)
      </h2>

      {compra.length === 0 ? (
        <div className="compra-carrito-vacio">
          <p>Tu carrito está vacío</p>
          <p>¡Explora nuestros productos para empezar a comprar!</p>
        </div>
      ) : (
        <div className="compra-contenedor">
          <div className="compra-items-lista">
            {compra.map((producto) => (
              <div className="compra-item" key={producto.id}>
                {producto.imagen && (
                  <img src={producto.imagen} alt={producto.nombre} className="compra-img" />
                )}

                <div className="compra-detalle">
                  <span><strong>{producto.nombre}</strong></span>
                  <span>{formatoCLP(producto.precio)}</span>

                  <label>Cantidad:</label>
                  <input
                    className="contador-input"
                    type="number"
                    min="1"
                    value={producto.cantidad}
                    onChange={(e) =>
                      cambiarCantidad(producto.id, parseInt(e.target.value))
                    }
                  />
                </div>

                <button className="btn-borrar" onClick={() => eliminarProducto(producto.id)}>
                  🗑️ Borrar
                </button>
              </div>
            ))}
          </div>

          <div className="compra-resumen">
            <h3>
              Total: {formatoCLP(
                compra.reduce((total, p) => total + p.precio * p.cantidad, 0)
              )}
            </h3>

            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Método de Pago:
              </label>
              <select 
                value={metodoPago} 
                onChange={(e) => setMetodoPago(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="Debito">Debito</option>
                <option value="Credito">Credito</option>
                <option value="Paypal">Paypal</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Dirección de Envío:
              </label>
              <textarea 
                value={direccionEnvio} 
                onChange={(e) => setDireccionEnvio(e.target.value)}
                placeholder="Ingresa tu dirección completa"
                rows="3"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
              />
            </div>

            <button 
              className="btn-comprar" 
              onClick={comprar}
              disabled={procesando}
              style={{ opacity: procesando ? 0.6 : 1, cursor: procesando ? 'not-allowed' : 'pointer' }}
            >
              {procesando ? '⏳ Procesando...' : '✓ Completar Compra'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compra;