import React, { useState } from 'react';
import '../css/Producto.css';
//recibe producto con flores y funcion que agrega el producto al carrito
function Producto({ producto, agregarAlCompra }) { 
  const [cantidad, setCantidad] = useState(1);

  return (
    <div className="producto">
      <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
      <h3>{producto.nombre}</h3>
      {producto.descripcion && <p className="descripcion">{producto.descripcion}</p>}
      <p>Precio: ${producto.precio}</p>

      <input
        type="number"
        min="1" /*si fuera la cantidad 0 el carrito muestra un mensaje*/
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
      />
{/*boton para agregar el producto con cantidad al carrito*/}
      <button onClick={() => agregarAlCompra({ ...producto, cantidad })}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default Producto;
