describe('Formulario de Contacto', () => {
    let nombre, email, mensaje;

    beforeEach(() => {
    document.body.innerHTML = `
        <form id="contacto">
        <input id="nombre" value="Natalia" required />
        <input id="email" value="natalia@mail.com" required />
        <textarea id="mensaje">Hola!</textarea>
        <button id="enviar">Enviar</button>
        </form>
    `;
    nombre = document.getElementById('nombre');
    email = document.getElementById('email');
    mensaje = document.getElementById('mensaje');
    });

    it('debería tener todos los campos obligatorios', () => {
    expect(nombre.hasAttribute('required')).toBeTrue();
    expect(email.hasAttribute('required')).toBeTrue();
    });

    it('debería validar formato de email', () => {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    expect(regex.test(email.value)).toBeTrue();
    });
});
