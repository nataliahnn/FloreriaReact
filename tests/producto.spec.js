describe('Arreglo de productos de Flores', () => {
  let productos;

  beforeEach(() => {
    // Simula los productos que están en Flores.js
    productos = [
      { id: 1, nombre: 'Bouquet de Novia', precio: 30800, descripcion: 'Bouquet de novia primaveral' },
      { id: 2, nombre: 'Rosas Azules', precio: 18000, descripcion: 'Rosas teñidas' },
      { id: 3, nombre: 'Arreglo rosa', precio: 10800, descripcion: 'Arreglos alegres' },
      { id: 4, nombre: 'Girasoles', precio: 38500, descripcion: 'Girasoles alegres' }
    ];
  });

  it('debería tener 4 productos', () => {
    expect(productos.length).toBe(4);
  });

  it('cada producto debe tener id, nombre, precio y descripción', () => {
    productos.forEach(p => {
      expect(p.id).toBeDefined();
      expect(p.nombre).toBeDefined();
      expect(p.precio).toBeDefined();
      expect(p.descripcion).toBeDefined();
    });
  });

  it('debería tener nombres y precios correctos', () => {
    expect(productos[0].nombre).toBe('Bouquet de Novia');
    expect(productos[0].precio).toBe(30800);
    expect(productos[1].nombre).toBe('Rosas Azules');
    expect(productos[1].precio).toBe(18000);
  });
});
