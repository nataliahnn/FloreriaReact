// URL base de la API de formularios (instancia: ghT0o9fV)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:ghT0o9fV';

// Obtiene todos los formularios
export const obtenerFormularios = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/formulario`);
    if (!response.ok) {
      // Si el endpoint no existe o está vacío, devolver lista vacía sin romper la app
      if (response.status === 404) {
        console.warn('formularioAPI: endpoint /formulario no encontrado (404). Devolviendo []');
        return [];
      }
      // Controlar rate limiting de Xano (429) devolviendo [] para no bloquear UI
      if (response.status === 429) {
        console.warn('formularioAPI: límite de peticiones alcanzado (429). Devolviendo [] temporalmente');
        return [];
      }
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    // Aceptar distintos formatos y devolver array
    if (Array.isArray(datos)) return datos;
    if (datos == null) return [];
    if (Array.isArray(datos.data)) return datos.data;
    if (Array.isArray(datos.items)) return datos.items;
    if (Array.isArray(datos.records)) return datos.records;
    if (typeof datos === 'object') {
      const values = Object.values(datos).filter(v => typeof v === 'object' && v.id);
      if (values.length) return values;
    }
    console.warn('Respuesta inesperada al obtener formularios:', datos);
    return [];
  } catch (error) {
    console.error('Error al obtener formularios:', error);
    return [];
  }
};

// Obtiene un formulario específico por ID
export const obtenerFormularioPorId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/formulario/${id}`);
    if (response.status === 404) {
      // No existe el formulario con ese id
      console.warn(`Formulario ${id} no encontrado (404)`);
      return null;
    }
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    // Aceptar que la API devuelva { data: {...} }
    if (datos && typeof datos === 'object' && datos.data) return datos.data;
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
