import React from 'react';
import '../css/Compra.css';
import { formatoCLP } from '../utils/formatoCLP';

function Compra({ compra, setCompra }) {

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

  const comprar = () => {
    alert("Compra realizada correctamente.\nGracias por su compra ❤️");
    setCompra([]);
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

            <button className="btn-comprar" onClick={comprar}>
              ✓ Completar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compra;