
import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import FiltroSolicitudes from './components/FiltroSolicitudes.jsx';
import SolicitudForm from './components/SolicitudForm.jsx';
import SolicitudList from './components/SolicitudList.jsx';
import { useSolicitudes } from './context/SolicitudesContext.jsx';
import ResumenSolicitudes from './components/ResumenSolicitudes.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  cambiarFiltro,
  restablecerFiltro,
} from './redux/filtroSlice.js';

function App() {
  // Estado global proporcionado por Context API
  const { solicitudes, agregarSolicitud } = useSolicitudes();
  const [mensaje, setMensaje] = useState('');

// Consultamos el filtro almacenado en Redux
const filtro = useSelector(
  (state) => state.filtro.estadoSeleccionado
);

// Permite enviar acciones a Redux
const dispatch = useDispatch();
  // Filtrar solicitudes
  const solicitudesFiltradas = useMemo(() => {
    if (filtro === 'Todas') return solicitudes;

    return solicitudes.filter(
      (solicitud) => solicitud.estado === filtro
    );
  }, [filtro, solicitudes]);

  // Registrar utilizando Context API
  function registrarSolicitud(nuevaSolicitud) {
    agregarSolicitud(nuevaSolicitud);
    dispatch(restablecerFiltro());
    setMensaje('La solicitud se registró correctamente.');
  }

  // Ocultar mensaje después de 3 segundos
  useEffect(() => {
    if (!mensaje) return;

    const temporizador = setTimeout(() => {
      setMensaje('');
    }, 3000);

    return () => clearTimeout(temporizador);
  }, [mensaje]);

  return (
    <div className="aplicacion">
      <header className="encabezado">
        <div className="contenedor encabezado__contenido">
          <div>
            <strong>Gestión Académica</strong>
            <p>Plataforma de solicitudes</p>
          </div>

          <nav className="menu-navegacion" aria-label="Navegación principal">
  <NavLink to="/" end>Inicio</NavLink>
  <NavLink to="/registro">Registro</NavLink>
  <NavLink to="/solicitudes">Solicitudes</NavLink>
</nav>
        </div>
      </header>

      <main className="contenedor contenido-principal">
        {mensaje && (
          <div className="mensaje-exito" role="status">
            {mensaje}
          </div>
        )}

        <Routes>
          <Route
  path="/"
  element={
    <>
      <section className="presentacion">
        <p className="etiqueta">Portal del estudiante</p>
        <h1>Gestiona tus solicitudes académicas</h1>
        <p>
          Registra solicitudes y consulta su estado
          desde un solo lugar.
        </p>
      </section>

      <ResumenSolicitudes />
    </>
  }
/>

          <Route
            path="/registro"
            element={
              <section className="panel">
                <div className="panel__titulo">
                  <p className="paso">Nueva solicitud</p>
                  <h2>Registra un trámite</h2>
                </div>

                <SolicitudForm onAgregar={registrarSolicitud} />
              </section>
            }
          />

          <Route
            path="/solicitudes"
            element={
              <section className="seccion-solicitudes">
                <FiltroSolicitudes
                  filtro={filtro}
                  onCambiarFiltro={(nuevoFiltro) =>
                  dispatch(cambiarFiltro(nuevoFiltro))}
                  total={solicitudesFiltradas.length}
                />

                <SolicitudList
                  solicitudes={solicitudesFiltradas}
                />
              </section>
            }
          />

          <Route
            path="*"
            element={<h2>Página no encontrada</h2>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
