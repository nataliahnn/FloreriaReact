describe('Carrito de Compras', () => {
  let carrito;

  beforeEach(() => {
    carrito = {
      items: [],
      agregar(producto) { this.items.push(producto); },
      eliminar(nombre) { this.items = this.items.filter(p => p.nombre !== nombre); },
      total() { return this.items.reduce((s, p) => s + p.precio, 0); }
    };
  });

  it('agrega productos correctamente', () => {
    carrito.agregar({ nombre: 'Flor', precio: 2000 });
    expect(carrito.items.length).toBe(1);
  });

  it('elimina productos correctamente', () => {
    carrito.agregar({ nombre: 'Flor', precio: 2000 });
    carrito.eliminar('Flor');
    expect(carrito.items.length).toBe(0);
  });

  it('calcula el total correctamente', () => {
    carrito.agregar({ nombre: 'Flor', precio: 2000 });
    carrito.agregar({ nombre: 'Maceta', precio: 3000 });
    expect(carrito.total()).toBe(5000);
  });
});
