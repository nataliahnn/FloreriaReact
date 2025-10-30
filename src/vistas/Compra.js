import React from 'react';
import '../css/Compra.css';
//compra con lista de productos y funcion actualiza el carrito
function Compra({ compra, setCompra }) {
//elimina producto por id
  const eliminarProducto = (id) => {
    const nuevaCompra = compra.filter(producto => producto.id !== id);
    setCompra(nuevaCompra);
  }

  return (
    <div className="compra">
      <h2>Tu carrito ({compra.reduce((acc, p) => acc + (p.cantidad || 1), 0)} items)</h2>
{/*si el carrito esta vacio entones muestra comentario*/}
      {compra.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        /*map recorre los productos y muestra cada uno*/
        compra.map((producto) => (
          <div className="compra-item" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} className="compra-img" />
            <div className="compra-detalle">
              <span><strong>{producto.nombre}</strong></span>
              <div><span>Cantidad: {producto.cantidad || 1}</span></div>
              
            </div>
            {/*boton para eliminar carrito */}
            <button className="btn-borrar" onClick={() => eliminarProducto(producto.id)}>
              Borrar
            </button>
          </div>
        ))
      )}
{/*calculos y muestra de la flor */}
      {compra.length > 0 && (
        <h3>Total: ${compra.reduce((total, p) => total + p.precio * (p.cantidad || 1), 0)}</h3>
      )}
    </div>
  );
}
//exporta componente para usar en otros js
export default Compra;
