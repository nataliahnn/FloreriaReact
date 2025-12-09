import React from 'react';
import '../css/SobreNosotros.css';

function SobreNosotros() {
  return (
    <div className="sobrenosotros-container">
      <div className="sobrenosotros-content">
        <h1 className="sobrenosotros-titulo">Sobre Nosotros</h1>
        
        <div className="sobrenosotros-intro">
          <p className="sobrenosotros-parrafo">
            Bienvenido a <span className="highlight">Rayitos de Sol</span> 🌸. Somos una florería online con pasión por traerte los mejores ramos y flores frescas del mercado. Cada flor en nuestro catálogo es cuidadosamente seleccionada para asegurar que recibas solo lo mejor.
          </p>
        </div>

        <div className="sobrenosotros-equipo">
          <h2 className="sobrenosotros-subtitulo">Nuestro Equipo</h2>
          <p className="sobrenosotros-descripcion">
            Rayitos de Sol es el resultado de la dedicación y pasión de tres profesionales comprometidos con la excelencia:
          </p>
          
          <div className="equipo-grid">
            <div className="miembro-equipo">
              <h3 className="miembro-nombre">Lucas Concha</h3>
              <p className="miembro-rol">Florerista</p>
              <p className="miembro-descripcion">Experto en el arte de la florería. Lucas asegura que cada arreglo sea una obra maestra.</p>
            </div>

            <div className="miembro-equipo">
              <h3 className="miembro-nombre">Martín Villarroel</h3>
              <p className="miembro-rol">Comprador de Productos</p>
              <p className="miembro-descripcion">Responsable de seleccionar las flores más frescas y de mejor calidad en el mercado.</p>
            </div>

            <div className="miembro-equipo">
              <h3 className="miembro-nombre">Natalia Hormazábal</h3>
              <p className="miembro-rol">Fundadora & Directora</p>
              <p className="miembro-descripcion">La visión y mente maestra detrás de Rayitos de Sol. Lidera con pasión y dedicación.</p>
            </div>
          </div>
        </div>

        <div className="sobrenosotros-mision">
          <p className="sobrenosotros-parrafo-final">
            Nuestro compromiso es sencillo: brindar las flores más hermosas, frescas y de calidad superior, garantizando que cada ramo llegue a sus manos en perfecto estado para hacer especial cualquier ocasión.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SobreNosotros;
