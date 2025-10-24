import React from 'react';
import '../css/Compra.css';

function Compra({ compra, setCompra }) {

  const eliminarProducto = (id) => {
    const nuevaCompra = compra.filter(producto => producto.id !== id);
    setCompra(nuevaCompra);
  }

  const total = compra.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

  return (
    <div className="compra" style={{ textAlign: 'center', backgroundColor: '#fef3f3', padding: '20px', minHeight: '100vh' }}>
      <h2>Tu Compra</h2>

      {compra.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        compra.map((producto) => (
          <div className="compra-item" key={producto.id} style={{ marginBottom: '15px' }}>
            <span>{producto.nombre} ({producto.cantidad}) - ${producto.precio}</span>
            <button className="btn-borrar" onClick={() => eliminarProducto(producto.id)} style={{ marginLeft: '10px' }}>
              Borrar
            </button>
          </div>
        ))
      )}

      {compra.length > 0 && <h3>Total: ${total}</h3>}
    </div>
  );
}

export default Compra;
