import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './vistas/Inicio';
import Flores from './vistas/Flores';
import Compra from './vistas/Compra';
import SobreNosotros from './vistas/SobreNosotros';
import Contacto from './vistas/Contacto';
import './css/App.css';

function App() {
  const [compra, setCompra] = useState([
    { id: 1, nombre: "Rosas", precio: 5000, cantidad: 1 },
    { id: 2, nombre: "Tulipanes", precio: 3000, cantidad: 1 },
  ]);

  const agregarAlCompra = (producto) => {
    const productoExistente = compra.find(item => item.id === producto.id);
    if (productoExistente) {
      setCompra(
        compra.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        )
      );
    } else {
      setCompra([...compra, producto]);
    }
  };

  return (
    <Router>
      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/flores">Productos</Link>
        <Link to="/compra">Carrito ({compra.reduce((acc, p) => acc + p.cantidad, 0)})</Link>
        <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/flores" element={<Flores agregarAlCompra={agregarAlCompra} />} />
        <Route path="/compra" element={<Compra compra={compra} setCompra={setCompra} />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}

export default App;

