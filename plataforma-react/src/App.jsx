import { useEffect, useMemo, useState } from 'react';
import FiltroSolicitudes from './components/FiltroSolicitudes.jsx';
import SolicitudForm from './components/SolicitudForm.jsx';
import SolicitudList from './components/SolicitudList.jsx';
import { solicitudesIniciales } from './data/solicitudes.js';

function App() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filtro, setFiltro] = useState('Todas');
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      setSolicitudes(solicitudesIniciales);
      setCargando(false);
    }, 700);

    return () => window.clearTimeout(temporizador);
  }, []);

  const solicitudesFiltradas = useMemo(() => {
    if (filtro === 'Todas') {
      return solicitudes;
    }

    return solicitudes.filter((solicitud) => solicitud.estado === filtro);
  }, [filtro, solicitudes]);

  function agregarSolicitud(nuevaSolicitud) {
    setSolicitudes((solicitudesAnteriores) => [
      nuevaSolicitud,
      ...solicitudesAnteriores,
    ]);
    setFiltro('Todas');
    setMensaje('La solicitud se registró correctamente.');
  }

  useEffect(() => {
    if (!mensaje) {
      return undefined;
    }

    const temporizador = window.setTimeout(() => setMensaje(''), 3000);
    return () => window.clearTimeout(temporizador);
  }, [mensaje]);

  return (
    <div className="aplicacion">
      <header className="encabezado">
        <div className="contenedor encabezado__contenido">
          
          <div>
            <strong>Gestión Académica</strong>
            <p>Plataforma de solicitudes</p>
          </div>
        </div>
      </header>

      <main className="contenedor contenido-principal">
        <section className="presentacion">
          <p className="etiqueta">Portal del estudiante</p>
          <h1>Gestiona tus solicitudes académicas</h1>
          <p>Registra una solicitud y consulta su estado desde un solo lugar.</p>
        </section>

        {mensaje && <div className="mensaje-exito" role="status">{mensaje}</div>}

        <section className="panel">
          <div className="panel__titulo">
            <p className="paso">Nueva solicitud</p>
            <h2>Registra un trámite</h2>
          </div>
          <SolicitudForm onAgregar={agregarSolicitud} />
        </section>

        <section className="seccion-solicitudes">
          <FiltroSolicitudes
            filtro={filtro}
            onCambiarFiltro={setFiltro}
            total={solicitudesFiltradas.length}
          />

          {cargando ? (
            <div className="cargando" role="status">
              <span className="cargando__indicador" />
              Cargando solicitudes...
            </div>
          ) : (
            <SolicitudList solicitudes={solicitudesFiltradas} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
