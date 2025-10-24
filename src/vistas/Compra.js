import React from 'react';
import '../css/Compra.css';

function Compra({ compra, setCompra }) {

  const eliminarProducto = (id) => {
    const nuevaCompra = compra.filter(producto => producto.id !== id);
    setCompra(nuevaCompra);
  }

  return (
    <div className="compra">
      <h2>Tu carrito ({compra.reduce((acc, p) => acc + (p.cantidad || 1), 0)} items)</h2>

      {compra.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        compra.map((producto) => (
          <div className="compra-item" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} className="compra-img" />
            <div className="compra-detalle">
              <span><strong>{producto.nombre}</strong></span>
              <div><span>Cantidad: {producto.cantidad || 1}</span></div>
              
            </div>
            <button className="btn-borrar" onClick={() => eliminarProducto(producto.id)}>
              Borrar
            </button>
          </div>
        ))
      )}

      {compra.length > 0 && (
        <h3>Total: ${compra.reduce((total, p) => total + p.precio * (p.cantidad || 1), 0)}</h3>
      )}
    </div>
  );
}

export default Compra;
