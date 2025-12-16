// URL base de la API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:dg7GmmRW';

// Cache simple en memoria (TTL 60s)
let __usuariosCache = { data: null, ts: 0 };
const USUARIOS_CACHE_TTL_MS = 60 * 1000;

// Obtiene todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const now = Date.now();
    if (__usuariosCache.data && (now - __usuariosCache.ts) < USUARIOS_CACHE_TTL_MS) {
      return __usuariosCache.data;
    }
    const response = await fetch(`${API_BASE_URL}/usuario`);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    // Manejar estructuras devueltas por diferentes backends (array directo, { data: [...] }, { items: [...] })
    if (Array.isArray(datos)) return datos;
    if (datos == null) return [];
    if (Array.isArray(datos.data)) return datos.data;
    if (Array.isArray(datos.items)) return datos.items;
    if (Array.isArray(datos.records)) return datos.records;
    // Si viene un objeto que mapea IDs a objetos, convertirlo a array
    if (typeof datos === 'object') {
      const values = Object.values(datos).filter(v => typeof v === 'object');
      if (values.length > 0) return values;
    }
    console.warn('Respuesta inesperada al obtener usuarios:', datos);
    return [];
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Obtiene un usuario por ID
export const obtenerUsuarioPorId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuario/${id}`);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error(`Error al obtener usuario ${id}:`, error);
    throw error;
  }
};

// Crea un usuario
export const crearUsuario = async (usuario) => {
  try {
    // Asegurar formato correcto para formulario_id
    const payload = { ...usuario };
    if (payload.formulario_id && !Array.isArray(payload.formulario_id)) {
      // aceptar string separado por comas o números
      if (typeof payload.formulario_id === 'string') {
        payload.formulario_id = payload.formulario_id.split(',').map(s => parseInt(s.trim()) || 0);
      } else {
        payload.formulario_id = [payload.formulario_id];
      }
    }

    const response = await fetch(`${API_BASE_URL}/usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      // Leer body de error si está disponible
      let text = '';
      try { text = await response.text(); } catch (e) {}
      throw new Error(`Error en la API: ${response.status} ${text}`);
    }
    const datos = await response.json();
    // Si la API devuelve { data: {...} } o similar
    if (datos && typeof datos === 'object' && datos.data) return datos.data;
    // invalidar cache
    __usuariosCache = { data: null, ts: 0 };
    return datos;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Actualiza un usuario por ID
export const actualizarUsuario = async (id, usuario) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    __usuariosCache = { data: null, ts: 0 };
    return datos;
  } catch (error) {
    console.error(`Error al actualizar usuario ${id}:`, error);
    throw error;
  }
};

// Elimina un usuario por ID
export const eliminarUsuario = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    __usuariosCache = { data: null, ts: 0 };
    return true;
  } catch (error) {
    console.error(`Error al eliminar usuario ${id}:`, error);
    throw error;
  }
};
