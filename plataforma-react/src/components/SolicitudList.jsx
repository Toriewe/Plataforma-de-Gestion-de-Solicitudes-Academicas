import SolicitudCard from './SolicitudCard.jsx';

function SolicitudList({ solicitudes }) {
  if (solicitudes.length === 0) {
    return (
      <div className="estado-vacio">
        <h3>No hay solicitudes</h3>
        <p>No se encontraron registros con el filtro seleccionado.</p>
      </div>
    );
  }

  return (
    <div className="solicitud-lista">
      {solicitudes.map((solicitud) => (
        <SolicitudCard key={solicitud.id} solicitud={solicitud} />
      ))}
    </div>
  );
}

export default SolicitudList;
