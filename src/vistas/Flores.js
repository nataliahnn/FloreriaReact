import React from 'react';
import Producto from './Producto'; // ruta corregida

function Flores({ agregarAlCompra }) { 
  const productos = [
    { id: 1, nombre: 'Ramo de rosas', precio: 12000, descripcion: 'Rosas frescas', imagen: '/imagenes/rosas.jpg' },
    { id: 2, nombre: 'Tulipanes', precio: 8000, descripcion: 'Tulipanes coloridos', imagen: '/imagenes/tulipanes.jpg' },
    { id: 3, nombre: 'Lirios', precio: 10000, descripcion: 'Lirios elegantes', imagen: '/imagenes/lirios.jpg' },
    { id: 4, nombre: 'Girasoles', precio: 9000, descripcion: 'Girasoles alegres', imagen: '/imagenes/girasoles.jpg' }
  ];

  return (
    <div className="flores">
      <h2>🌸 Nuestros productos 🌸</h2>
      <div className="productos-grid">
        {productos.map(p => (
          <Producto key={p.id} producto={p} agregarAlCompra={agregarAlCompra} />
        ))}
      </div>
    </div>
  );
}

export default Flores;
