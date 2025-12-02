// URL base de la API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:Vwjp7Cza';

// Obtiene todos los productos del inventario
export const obtenerProductos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos`);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return obtenerProductosPorDefecto();
  }
};

// Obtiene todos los formularios
export const obtenerFormularios = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/formulario`);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener formularios:', error);
    return [];
  }
};

// Actualiza un producto por ID
export const actualizarProducto = async (id, producto) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error(`Error al actualizar producto ${id}:`, error);
    throw error;
  }
};

// Elimina un producto por ID
export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Error al eliminar producto ${id}:`, error);
    throw error;
  }
};

// Productos por defecto si la API falla
const obtenerProductosPorDefecto = () => {
  return [
    {
      id: 1,
      nombre: 'Bouquet de Novia',
      precio: 30800,
      descripcion: 'Bouquet de novia primaveral',
      imagen: '/productos/pro1 (1).jpg',
    },
    {
      id: 2,
      nombre: 'Rosas Azules',
      precio: 18000,
      descripcion: 'Rosas teñidas',
      imagen: '/productos/producto3.jpg',
    },
    {
      id: 3,
      nombre: 'Arreglo rosa',
      precio: 10800,
      descripcion: 'Arreglos alegres',
      imagen: '/productos/producto1.jpg',
    },
    {
      id: 4,
      nombre: 'Girasoles',
      precio: 38500,
      descripcion: 'Girasoles alegres',
      imagen: '/productos/pro3.jpg',
    },
  ];
};
