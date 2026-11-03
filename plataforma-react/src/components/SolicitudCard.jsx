function SolicitudCard({ solicitud }) {
  const claseEstado = solicitud.estado.toLowerCase().replace(' ', '-').replace('ó', 'o');

  return (
    <article className="solicitud-card">
      <div className="solicitud-card__encabezado">
        <h3>{solicitud.tipo}</h3>
        <span className={`estado estado--${claseEstado}`}>{solicitud.estado}</span>
      </div>

      <p className="solicitud-card__estudiante">{solicitud.estudiante}</p>
      <p>{solicitud.descripcion}</p>
    </article>
  );
}

export default SolicitudCard;
