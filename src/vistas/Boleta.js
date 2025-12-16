import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/Boleta.css';
import { obtenerBoletaPorId } from '../api/boletaAPI';
import { formatoCLP } from '../utils/formatoCLP';

function Boleta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boleta, setBoleta] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarBoleta();
  }, [id]);

  const cargarBoleta = async () => {
    setCargando(true);
    try {
      const datos = await obtenerBoletaPorId(id);
      setBoleta(datos);
    } catch (e) {
      console.error('Error cargando boleta', e);
    } finally {
      setCargando(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return '-';
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (cargando) {
    return <div className="boleta-container"><p>Cargando boleta...</p></div>;
  }

  if (!boleta) {
    return (
      <div className="boleta-container">
        <h2>Boleta no encontrada</h2>
        <button onClick={() => navigate('/perfil')}>Volver al Perfil</button>
      </div>
    );
  }

  return (
    <div className="boleta-container">
      <div className="boleta-card">
        <h1>Boleta de Compra</h1>
        <div className="boleta-header">
          <p><strong>Número de Boleta:</strong> #{boleta.id}</p>
          <p><strong>Fecha de Compra:</strong> {formatDate(boleta.fecha_compra)}</p>
          <p><strong>Método de Pago:</strong> {boleta.metodo_pago || '-'}</p>
        </div>

        <div className="boleta-section">
          <h3>Dirección de Envío</h3>
          <p>{boleta.direccion_envio || '-'}</p>
        </div>

        <div className="boleta-section">
          <h3>Detalle de Productos</h3>
          <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>
            IDs de productos: {Array.isArray(boleta.productos_id) ? boleta.productos_id.join(', ') : '-'}
          </p>
          <table className="boleta-productos">
            <thead>
              <tr>
                <th>Producto ID</th>
                <th>Información</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(boleta.productos_id) && boleta.productos_id.length > 0 ? (
                boleta.productos_id.map((prodId, idx) => (
                  <tr key={idx}>
                    <td>#{prodId}</td>
                    <td>Producto en el carrito</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No hay productos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="boleta-total">
          <h2>Total: {formatoCLP(boleta.total || 0)}</h2>
        </div>

        <div className="boleta-actions">
          <button onClick={() => navigate('/perfil')}>Volver al Perfil</button>
          <button onClick={() => window.print()}>Imprimir</button>
        </div>
      </div>
    </div>
  );
}

export default Boleta;
