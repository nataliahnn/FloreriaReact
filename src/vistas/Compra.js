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
        Tu carrito ({compra.reduce((acc, p) => acc + p.cantidad, 0)} items)
      </h2>

      {compra.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        compra.map((producto) => (
          <div className="compra-item" key={producto.id}>
            {producto.imagen && (
              <img src={producto.imagen} alt={producto.nombre} className="compra-img" />
            )}

            <div className="compra-detalle">
              <span><strong>{producto.nombre}</strong></span>

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
              Borrar
            </button>
          </div>
        ))
      )}

      {compra.length > 0 && (
        <>
          <h3>
            Total: {formatoCLP(
              compra.reduce((total, p) => total + p.precio * p.cantidad, 0)
            )}
          </h3>

          <button className="btn-comprar" onClick={comprar}>
            Comprar
          </button>
        </>
      )}
    </div>
  );
}

export default Compra;
