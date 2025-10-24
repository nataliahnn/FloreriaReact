import React from 'react';
import '../css/App.css';

function Contacto() {
  return (
    <div className="contacto-container">
      <form className="contacto-form">
        <h2>Contáctanos</h2>

        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Tu correo" />

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" placeholder="Escribe tu mensaje aquí"></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;
