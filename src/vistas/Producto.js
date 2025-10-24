import React, { useState } from 'react';
import '../css/Producto.css';

function Producto({ producto, agregarAlCompra }) { // prop corregida
  const [cantidad, setCantidad] = useState(1);

  return (
    <div className="producto">
      <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
      <h3>{producto.nombre}</h3>
      {producto.descripcion && <p className="descripcion">{producto.descripcion}</p>}
      <p>Precio: ${producto.precio}</p>

      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
      />

      <button onClick={() => agregarAlCompra({ ...producto, cantidad })}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default Producto;
