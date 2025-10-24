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
    { id: 1, nombre: "Bouquet de novia", precio: 30800, cantidad: 1 },
    { id: 2, nombre: "Rosas Azules", precio: 18000, cantidad: 1 },
    { id: 3, nombre: "Arreglo Rosa", precio: 10800, cantidad: 1},
    { id: 4, nombre: "Girasoles", precio: 38500, cantidad: 1 },
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
      <div className="App">
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

        
        <footer className="footer">
          <p>© 2025 Rayitos de Sol. Todos los derechos reservados.</p>
          <p>
            <a href="/contacto">Contacto</a>  
            
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

