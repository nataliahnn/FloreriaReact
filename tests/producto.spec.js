describe('Arreglo de productos de Flores (con API)', () => {
  let productos;
  let obtenerNombreArchivo;
  let normalizarProductos;

  beforeEach(() => {
    // Helper: extrae el nombre de archivo desde una ruta
    obtenerNombreArchivo = (ruta) => {
      if (!ruta || typeof ruta !== 'string') return '';
      const partes = ruta.split('/');
      return partes.pop();
    };

    // Normaliza productos: asegura que imagen tenga formato '/productos/nombre.jpg' y agrega imagenArchivo
    normalizarProductos = (lista) => {
      if (!Array.isArray(lista)) return [];
      return lista.map((p) => {
        let imagenNormalizada = p.imagen;
        if (imagenNormalizada && !imagenNormalizada.startsWith('/productos/')) {
          imagenNormalizada = `/productos/${imagenNormalizada}`;
        }
        return {
          ...p,
          imagen: imagenNormalizada,
          imagenArchivo: obtenerNombreArchivo(imagenNormalizada),
        };
      });
    };

    // Simula los productos que vienen de la API
    const productosAPI = [
      { id: 1, nombre: 'Bouquet de Novia', precio: 30800, descripcion: 'Bouquet de novia primaveral', imagen: '/productos/pro1 (1).jpg' },
      { id: 2, nombre: 'Rosas Azules', precio: 18000, descripcion: 'Rosas teñidas', imagen: '/productos/producto3.jpg' },
      { id: 3, nombre: 'Arreglo rosa', precio: 10800, descripcion: 'Arreglos alegres', imagen: '/productos/producto1.jpg' },
      { id: 4, nombre: 'Girasoles', precio: 38500, descripcion: 'Girasoles alegres', imagen: '/productos/pro3.jpg' }
    ];

    productos = normalizarProductos(productosAPI);
  });

  it('debería tener 4 productos', () => {
    expect(productos.length).toBe(4);
  });

  it('cada producto debe tener id, nombre, precio, descripción, imagen e imagenArchivo', () => {
    productos.forEach(p => {
      expect(p.id).toBeDefined();
      expect(p.nombre).toBeDefined();
      expect(p.precio).toBeDefined();
      expect(p.descripcion).toBeDefined();
      expect(p.imagen).toBeDefined();
      expect(p.imagenArchivo).toBeDefined();
    });
  });

  it('debería tener nombres y precios correctos', () => {
    expect(productos[0].nombre).toBe('Bouquet de Novia');
    expect(productos[0].precio).toBe(30800);
    expect(productos[1].nombre).toBe('Rosas Azules');
    expect(productos[1].precio).toBe(18000);
  });

  it('debería normalizar correctamente las rutas de imágenes con formato /productos/nombre.jpg', () => {
    expect(productos[0].imagen).toBe('/productos/pro1 (1).jpg');
    expect(productos[1].imagen).toBe('/productos/producto3.jpg');
  });

  it('debería extraer correctamente el nombre del archivo de la imagen', () => {
    expect(productos[0].imagenArchivo).toBe('pro1 (1).jpg');
    expect(productos[1].imagenArchivo).toBe('producto3.jpg');
    expect(productos[2].imagenArchivo).toBe('producto1.jpg');
    expect(productos[3].imagenArchivo).toBe('pro3.jpg');
  });

  it('debería normalizar imágenes sin ruta /productos/', () => {
    const productossinRuta = [
      { id: 1, nombre: 'Test', precio: 1000, descripcion: 'Test', imagen: 'imagen.jpg' }
    ];
    const normalizados = normalizarProductos(productossinRuta);
    expect(normalizados[0].imagen).toBe('/productos/imagen.jpg');
    expect(normalizados[0].imagenArchivo).toBe('imagen.jpg');
  });
});
