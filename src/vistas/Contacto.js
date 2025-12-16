import{ useState, useEffect } from 'react';
import '../css/Contacto.css';
import { enviarFormulario } from '../api/formularioAPI';
import { getCurrentUser, setCurrentUser } from '../utils/auth';
import { actualizarUsuario, obtenerUsuarioPorId } from '../api/usuarioAPI';

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    titulo: "",
    mensaje: ""
  });

  useEffect(() => {
    const usuario = getCurrentUser();
    if (usuario) {
      const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellido_pat || ''} ${usuario.apellido_mat || ''}`.trim();
      setForm(prevForm => ({
        ...prevForm,
        nombre: nombreCompleto,
        email: usuario.email
      }));
    }
  }, []);

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
    const usuario = getCurrentUser();

    if (!usuario) {
      if (!form.nombre.trim()) {
        erroresTemp.nombre = "Este campo es obligatorio";
        hayError = true;
      }

      if (!form.email.trim()) {
        erroresTemp.email = "Este campo es obligatorio";
        hayError = true;
      }
    }

    if (!form.titulo.trim()) {
      erroresTemp.titulo = "Este campo es obligatorio";
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
      const dataToSend = { ...form };
      const usuario = getCurrentUser();

      if (usuario) {
        // Concatenar nombres y apellidos, y usar el campo 'email'
        const nombreCompleto = `${usuario.nombres || ''} ${usuario.apellido_pat || ''} ${usuario.apellido_mat || ''}`.trim();
        dataToSend.nombre = nombreCompleto;
        dataToSend.email = usuario.correo;
      }

      const creado = await enviarFormulario(dataToSend);
      alert("Formulario enviado correctamente.");
      
      // Si hay sesión, agregar referencia del formulario al usuario
      if (usuario && creado && creado.id) {
        try {
          const nuevosIds = Array.isArray(usuario.formulario_id) ? [...usuario.formulario_id, creado.id] : [creado.id];
          const usuarioActualizado = { ...usuario, formulario_id: nuevosIds };
          await actualizarUsuario(usuario.id, usuarioActualizado);
          setCurrentUser(usuarioActualizado);
        } catch (e) {
          console.error('Error vinculando formulario a usuario:', e);
        }
      }
      
      // Resetear formulario
      setForm({
        nombre: "",
        email: "",
        titulo: "",
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

        {/* Comprobación de sesión: si hay sesión no pedimos nombre/email */}
        {!getCurrentUser() && (
          <>
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
          </>
        )}

        {/* Título del formulario - siempre visible */}
        <label htmlFor="titulo">Título del Formulario:</label>
        <input
          id="titulo"
          name="titulo"
          placeholder="Asunto"
          value={form.titulo}
          onChange={handleChange}
        />
        {errores.titulo && <p className="error-campo">{errores.titulo}</p>}

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
