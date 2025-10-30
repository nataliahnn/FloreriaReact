//revisar funcionamiento del carrito
describe('Carrito de Compras', () => {
  let carrito;
//se ejecuta antes de cada prueba individual
  beforeEach(() => {
    //crea un objeto nuevo antes de cada test
    carrito = {
      items: [],
      agregar(producto) { this.items.push(producto); },
      //elimina producto por nombre
      eliminar(nombre) { this.items = this.items.filter(p => p.nombre !== nombre); },
      //calcula el total sumando precios
      total() { return this.items.reduce((s, p) => s + p.precio, 0); }
    };
  });
//prueba que verifica que los productos se agreguen de manera correcta
  it('agrega productos correctamente', () => {
    carrito.agregar({ nombre: 'Flor', precio: 2000 });//agrega producto
    expect(carrito.items.length).toBe(1);//lo esperable es que haya 1 producto en el carrito
  });
//prueba que verifica que los productos se eliminen correctamente
  it('elimina productos correctamente', () => {
    carrito.agregar({ nombre: 'Flor', precio: 2000 });
    carrito.eliminar('Flor');//elimina por nombre
    expect(carrito.items.length).toBe(0);//lo esperable es que no queden productos
  });
//prueba que verifica que el total del carrito se calcule correctamente
  it('calcula el total correctamente', () => {
    carrito.agregar({ nombre: 'Flor', precio: 2000 });
    carrito.agregar({ nombre: 'Maceta', precio: 3000 });
    expect(carrito.total()).toBe(5000);//se espera que el total sea la suma de los pruoductos puestos anteriormente
  });
});
