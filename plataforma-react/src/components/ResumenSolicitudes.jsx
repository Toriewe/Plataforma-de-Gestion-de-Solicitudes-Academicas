
import { useSolicitudes } from '../context/SolicitudesContext.jsx';

function ResumenSolicitudes() {
  const { solicitudes } = useSolicitudes();

  const pendientes = solicitudes.filter(
    (solicitud) => solicitud.estado === 'Pendiente'
  ).length;

  return (
    <section className="resumen-solicitudes">
      <h2>Resumen de solicitudes</h2>

      <p>Total registradas: {solicitudes.length}</p>
      <p>Solicitudes pendientes: {pendientes}</p>
    </section>
  );
}

export default ResumenSolicitudes;
