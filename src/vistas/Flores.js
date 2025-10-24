import React from 'react';
import Producto from './Producto'; 
import '../css/Flores.css';

function Flores({ agregarAlCompra }) { 
  const productos = [
    { id: 1, nombre: 'Bouquet de Novia', precio: 30800, descripcion: 'Bouquet de novia primaveral', imagen: '/productos/pro1 (1).jpg' },
    { id: 2, nombre: 'Rosas Azules', precio: 18000, descripcion: 'Rosas teñidas', imagen: '/productos/producto3.jpg' },
    { id: 3, nombre: 'Arreglo rosa', precio: 10800, descripcion: 'Arreglos alegres', imagen: '/productos/producto1.jpg' },
    { id: 4, nombre: 'Girasoles', precio: 38500, descripcion: 'Girasoles alegres', imagen: '/productos/pro3.jpg' }
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
