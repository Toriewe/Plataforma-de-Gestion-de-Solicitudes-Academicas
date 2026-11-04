
import {
  createContext,
  useContext,
  useState,
} from 'react';

import { solicitudesIniciales } from '../data/solicitudes.js';

// Creamos el contexto global
const SolicitudesContext = createContext(null);

// Provider: almacena y comparte las solicitudes
export function SolicitudesProvider({ children }) {
  const [solicitudes, setSolicitudes] = useState(
    solicitudesIniciales
  );

  // Agregar una nueva solicitud
  function agregarSolicitud(nuevaSolicitud) {
    setSolicitudes((anteriores) => [
      nuevaSolicitud,
      ...anteriores,
    ]);
  }

  // Compartimos datos y funciones
  return (
    <SolicitudesContext.Provider
      value={{
        solicitudes,
        agregarSolicitud,
      }}
    >
      {children}
    </SolicitudesContext.Provider>
  );
}

// Hook para acceder al estado global
export function useSolicitudes() {
  const contexto = useContext(SolicitudesContext);

  if (!contexto) {
    throw new Error(
      'useSolicitudes debe utilizarse dentro de SolicitudesProvider'
    );
  }

  return contexto;
}
