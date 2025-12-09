import React, { useState } from 'react';
import '../css/Contacto.css';
import { enviarFormulario } from '../api/formularioAPI';

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  const [enviando, setEnviando] = useState(false);

  // Actualiza los valores del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Borra el error del campo cuando la persona escribe
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let erroresTemp = {};
    let hayError = false;

    // Validaciones por campo
    if (!form.nombre.trim()) {
      erroresTemp.nombre = "Este campo es obligatorio";
      hayError = true;
    }

    if (!form.email.trim()) {
      erroresTemp.email = "Este campo es obligatorio";
      hayError = true;
    }

    if (!form.mensaje.trim()) {
      erroresTemp.mensaje = "Este campo es obligatorio";
      hayError = true;
    }

    if (hayError) {
      setErrores(erroresTemp);
      return;
    }

    // Si no hay errores, se envía a la API
    setEnviando(true);
    try {
      await enviarFormulario(form);
      alert("Formulario enviado correctamente.");

      // Resetear formulario
      setForm({
        nombre: "",
        email: "",
        mensaje: ""
      });

      // Limpiar errores
      setErrores({
        nombre: "",
        email: "",
        mensaje: ""
      });
    } catch (error) {
      alert("Error al enviar el formulario. Por favor, intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="contacto-container">
      <form className="contacto-form" onSubmit={handleSubmit}>
        <h2>Contáctanos</h2>

        {/* Nombre */}
        <label htmlFor="nombre">Nombre:</label>
        <input 
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        {errores.nombre && <p className="error-campo">{errores.nombre}</p>}

        {/* Email */}
        <label htmlFor="email">Email:</label>
        <input 
          type="email"
          id="email"
          name="email"
          placeholder="Tu correo"
          value={form.email}
          onChange={handleChange}
        />
        {errores.email && <p className="error-campo">{errores.email}</p>}

        {/* Mensaje */}
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Escribe tu mensaje aquí"
          value={form.mensaje}
          onChange={handleChange}
        ></textarea>
        {errores.mensaje && <p className="error-campo">{errores.mensaje}</p>}

        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default Contacto;
