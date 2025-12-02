// URL base de la API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:Vwjp7Cza';

// Obtiene todos los formularios
export const obtenerFormularios = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/formulario`);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    // Asegurar que cada formulario tenga un ID
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error('Error al obtener formularios:', error);
    return [];
  }
};

// Obtiene un formulario específico por ID
export const obtenerFormularioPorId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/formulario/${id}`);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error(`Error al obtener formulario ${id}:`, error);
    throw error;
  }
};

// Envía un nuevo formulario
export const enviarFormulario = async (formulario) => {
  try {
    const response = await fetch(`${API_BASE_URL}/formulario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    });
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    // El ID debe ser asignado por el backend
    return datos;
  } catch (error) {
    console.error('Error al enviar formulario:', error);
    throw error;
  }
};

// Actualiza un formulario por ID
export const actualizarFormulario = async (id, formulario) => {
  try {
    const response = await fetch(`${API_BASE_URL}/formulario/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    });
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error(`Error al actualizar formulario ${id}:`, error);
    throw error;
  }
};

// Elimina un formulario por ID
export const eliminarFormulario = async (id) => {
  try {
    if (!id) {
      throw new Error('ID del formulario no válido');
    }
    const response = await fetch(`${API_BASE_URL}/formulario/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Error al eliminar formulario ${id}:`, error);
    throw error;
  }
};
