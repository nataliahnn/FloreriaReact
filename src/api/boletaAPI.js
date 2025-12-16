// URL base de la API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:9hVHF-B8';

// Obtiene todas las boletas
export const obtenerBoletas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/boleta`);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    if (Array.isArray(datos)) return datos;
    if (datos == null) return [];
    if (Array.isArray(datos.data)) return datos.data;
    if (Array.isArray(datos.items)) return datos.items;
    if (Array.isArray(datos.records)) return datos.records;
    if (typeof datos === 'object') {
      const values = Object.values(datos).filter(v => typeof v === 'object' && v.id);
      if (values.length) return values;
    }
    console.warn('Respuesta inesperada al obtener boletas:', datos);
    return [];
  } catch (error) {
    console.error('Error al obtener boletas:', error);
    return [];
  }
};

// Obtiene una boleta específica por ID
export const obtenerBoletaPorId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boleta/${id}`);
    if (response.status === 404) {
      console.warn(`Boleta ${id} no encontrada (404)`);
      return null;
    }
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    if (datos && typeof datos === 'object' && datos.data) return datos.data;
    return datos;
  } catch (error) {
    console.error(`Error al obtener boleta ${id}:`, error);
    throw error;
  }
};

// Crea una nueva boleta
export const crearBoleta = async (boleta) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boleta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boleta),
    });
    if (!response.ok) {
      let text = '';
      try { text = await response.text(); } catch (e) {}
      throw new Error(`Error en la API: ${response.status} ${text}`);
    }
    const datos = await response.json();
    if (datos && typeof datos === 'object' && datos.data) return datos.data;
    return datos;
  } catch (error) {
    console.error('Error al crear boleta:', error);
    throw error;
  }
};

// Actualiza una boleta por ID
export const actualizarBoleta = async (id, boleta) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boleta/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boleta),
    });
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error(`Error al actualizar boleta ${id}:`, error);
    throw error;
  }
};

// Elimina una boleta por ID
export const eliminarBoleta = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boleta/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Error al eliminar boleta ${id}:`, error);
    throw error;
  }
};
