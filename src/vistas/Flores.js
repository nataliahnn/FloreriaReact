import React, { useState, useEffect } from 'react';
import Producto from './Producto'; 
import '../css/Flores.css';
import { obtenerProductos } from '../api/inventarioAPI';

//Componente para mostrar el catalogo de productos
function Flores({ agregarAlCompra }) {  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde la API al montar el componente
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        setError(null);
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos. Intenta más tarde.');
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);
{/*para crear el producto, id key, producto y agregar al carrito*/}
  if (cargando) {
    return <div className="flores"><h2>⏳ Cargando productos...</h2></div>;
  }

  if (error) {
    return <div className="flores"><h2>❌ {error}</h2></div>;
  }

  if (productos.length === 0) {
    return <div className="flores"><h2>No hay productos disponibles</h2></div>;
  }

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
