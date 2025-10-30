//revisa el funcionamiento del formulario
describe('Formulario de Contacto', () => {
    let nombre, email, mensaje;

    beforeEach(() => {
        //simula un formulario
    document.body.innerHTML = `
        <form id="contacto">
        <input id="nombre" value="Natalia" required />
        <input id="email" value="natalia@mail.com" required />
        <textarea id="mensaje">Hola!</textarea>
        <button id="enviar">Enviar</button>
        </form>
    `;
    //obtiene elementos referenciados en el formulario 
    nombre = document.getElementById('nombre');
    email = document.getElementById('email');
    mensaje = document.getElementById('mensaje');
    });
//prueba que verifica los campos obligatorios que tenga el atributo obligarorio
    it('debería tener todos los campos obligatorios', () => {
    expect(nombre.hasAttribute('required')).toBeTrue();
    expect(email.hasAttribute('required')).toBeTrue();
    });
//prueba que valida que el formato del email sea el correcto
    it('debería validar formato de email', () => {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    expect(regex.test(email.value)).toBeTrue();
    });
});
