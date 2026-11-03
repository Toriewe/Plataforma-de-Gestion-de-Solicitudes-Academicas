const ESTADOS = ['Todas', 'Pendiente', 'En revisión', 'Aprobada'];

function FiltroSolicitudes({ filtro, onCambiarFiltro, total }) {
  return (
    <div className="barra-filtros">
      <div>
        <h2>Solicitudes registradas</h2>
        <p>{total} resultado(s)</p>
      </div>

      <label className="filtro" htmlFor="filtro-estado">
        Estado
        <select
          id="filtro-estado"
          value={filtro}
          onChange={(evento) => onCambiarFiltro(evento.target.value)}
        >
          {ESTADOS.map((estado) => (
            <option key={estado}>{estado}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default FiltroSolicitudes;
