import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Inicio.css';

function Inicio() {
  return (
    <div className="inicio">
      <div className="banner">
        <img src="/productos/banner4.jpg" alt="Banner Flores" className="banner-img" />
      </div>

      <div className="inicio-contenido">
        <h1 className="inicio-titulo">🌸 Rayitos de Sol 🌸</h1>
        <p className="inicio-subtitulo">Las flores más frescas y coloridas para alegrar tu día</p>
      </div>

      <div className="inicio-seccion">
        <img src='/productos/p4 (5).jpg' alt="Regalar flores" className="inicio-img" />
        <div className="inicio-texto-container">
          <p className="inicio-texto">
            En <strong>Rayitos de Sol</strong>, creemos que cada flor cuenta una historia. Con más de años de experiencia, nos dedicamos a traerte las flores más hermosas y frescas, seleccionadas cuidadosamente para cada ocasión especial.
          </p>
          <p className="inicio-texto">
            Ya sea para celebrar un momento importante, expresar tus sentimientos o simplemente alegrar el día de alguien especial, nuestras flores son el regalo perfecto.
          </p>
          <div className="inicio-botones">
            <Link to="/flores" className="boton-inicio primario">
              Explorar Productos
            </Link>
            <Link to="/sobre-nosotros" className="boton-inicio secundario">
              Conoce Nuestra Historia
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
