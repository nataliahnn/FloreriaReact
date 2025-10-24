describe('Componente Reutilizable', () => {
  let componente;

  beforeEach(() => {
    componente = (function() {
      let estado = 0;
      return {
        get: () => estado,
        set: (nuevo) => estado = nuevo
      };
    })();
  });

  it('inicia con estado 0', () => {
    expect(componente.get()).toBe(0);
  });

  it('actualiza el estado correctamente', () => {
    componente.set(5);
    expect(componente.get()).toBe(5);
  });
});
