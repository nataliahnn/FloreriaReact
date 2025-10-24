function Contacto() {
  return (
    <div>
      <h1>Contacto</h1>
      <form>
        <input type="text" placeholder="Nombre" /><br/>
        <input type="email" placeholder="Email" /><br/>
        <textarea placeholder="Mensaje"></textarea><br/>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
export default Contacto;
