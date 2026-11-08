Plataforma de Gestión de Solicitudes Académicas — PA3
Curso: Programación Web II · Código: 30690 · Institución: ISIL
Evaluación: PA3 — Periodo 202620
Repositorio: https://github.com/Toriewe/Plataforma-de-Gestion-de-Solicitudes-Academicas
1. Integrantes y participación
Integrante	Participación documentada anteriormente (PA2)	Participación específica en PA3
Claudia Beatriz Guillen Baca	Desarrollo frontend Angular, componentes y formularios	Por confirmar con el equipo
Diego Fernando Salva Puerta	Configuración inicial del backend Node.js/Express y CRUD	Desarrollo e integración de la SPA React, React Router, Context API, Redux y pruebas funcionales, según el trabajo realizado en esta etapa
Ángel — apellido completo por confirmar	Modelos Mongoose, persistencia y pruebas	Por confirmar con el equipo
Isaac Claudio Saldaña	Validaciones, notificaciones y reactivación de registros	Por confirmar con el equipo
Fabián Marcelo Dávila Herrera	Mejoras de interfaz, avisos y reactivación de registros	Por confirmar con el equipo


Antes de entregar: completar nombre y apellido de Ángel, verificar los aportes concretos de cada integrante en PA3 y actualizar la columna de participación. Los aportes históricos de PA2 no se presentan como trabajos realizados en PA3.

2. Descripción del proyecto
La Plataforma de Gestión de Solicitudes Académicas permite registrar, consultar y organizar solicitudes de estudiantes desde una aplicación de página única (SPA). Para la PA3 se implementó una nueva interfaz en React, independiente de las etapas previas realizadas con Angular y Node.js/MongoDB.

Esta entrega emplea datos locales y simulados. No necesita iniciar el backend ni conectarse a MongoDB para demostrar los requisitos evaluados.
3. Objetivo
Construir una SPA funcional con JSX, componentes reutilizables, Hooks (useState y useEffect), navegación con React Router, estado compartido mediante Context API y un flujo básico con Redux Toolkit; además, comparar ambas estrategias de gestión del estado.
4. Desarrollo y solución propuesta
Actividad 1 — SPA en React, JSX, componentes y Hooks
- Interfaz con secciones de Inicio, Registro y Solicitudes.
- Formulario controlado de registro de solicitudes y listado con tarjetas.
- Uso de useState para el estado de la interfaz y useEffect para efectos y mensajes temporales.
- Carga inicial de tres solicitudes de ejemplo desde src/data/solicitudes.js.
Archivos de referencia: src/App.jsx, src/components/SolicitudForm.jsx, src/components/SolicitudList.jsx, src/components/SolicitudCard.jsx y src/data/solicitudes.js.
Actividad 2 — Navegación con React Router
Se implementó BrowserRouter y las rutas siguientes, que permiten cambiar de sección sin recargar completamente el navegador:
Ruta	Vista
/	Inicio y resumen general
/registro	Formulario de nueva solicitud
/solicitudes	Consulta y filtrado de solicitudes
Otras rutas	Mensaje de página no encontrada


Archivos de referencia: src/main.jsx y src/App.jsx (Routes, Route, NavLink).
Actividad 3 — Estado global con Context API
SolicitudesProvider comparte el arreglo de solicitudes y la función agregarSolicitud. El hook personalizado useSolicitudes() permite acceder a esos datos desde la aplicación y desde el componente ResumenSolicitudes.

Prueba funcional: registrar una cuarta solicitud en /registro, visitar /solicitudes y después volver a /: la nueva solicitud aparece en el listado y el contador aumenta de tres a cuatro sin recargar.

Justificación: las solicitudes pertenecen al estado compartido porque múltiples vistas deben consultar sus datos actualizados.

Archivos de referencia: src/context/SolicitudesContext.jsx y src/components/ResumenSolicitudes.jsx.
Actividad 4 — Redux Toolkit
Se creó un Slice para administrar el filtro seleccionado de las solicitudes. El flujo implementado es:
1. El usuario cambia el filtro en la vista de Solicitudes.
2. dispatch(cambiarFiltro(valor)) envía una acción.
3. El reducer del Slice actualiza estadoSeleccionado en el Store.
4. useSelector() obtiene el estado actualizado y la lista se vuelve a filtrar.
5. Tras registrar una solicitud, dispatch(restablecerFiltro()) restablece el filtro a Todas.
Justificación: se utiliza Redux para una necesidad acotada, con el fin de demostrar el flujo Store → acción → reducer → actualización de vista sin duplicar el estado de las solicitudes.

Archivos de referencia: src/redux/filtroSlice.js, src/redux/store.js, src/main.jsx y src/App.jsx.
5. Comparación técnica: Context API y Redux
Criterio	Context API	Redux Toolkit
Dato administrado en PA3	Solicitudes académicas	Filtro seleccionado
Punto central	SolicitudesProvider	store.js
Lectura	useSolicitudes() / useContext()	useSelector()
Actualización	agregarSolicitud()	dispatch(cambiarFiltro())
Ventaja en este caso	Comparte solicitudes con pocos elementos adicionales	Acciones y cambios de estado explícitos y trazables
Costo	Menor configuración inicial	Requiere Store, Slice y Provider


Conclusión de la comparación: para una aplicación pequeña, Context API es suficiente para compartir las solicitudes. Redux ofrece una estructura más explícita cuando existen múltiples acciones y reglas de actualización; en esta PA3 se implementó deliberadamente un ejemplo sencillo de Redux para cumplir el objetivo académico.
6. Estructura relevante del proyecto
Plataforma-de-Gestion-de-Solicitudes-Academicas/
├── plataforma-gestion/        # Etapa anterior: Angular
├── backend/                  # Etapa anterior: Node.js / MongoDB
├── plataforma-react/         # Aplicación evaluada en PA3
│   ├── src/
│   │   ├── components/
│   │   │   ├── FiltroSolicitudes.jsx
│   │   │   ├── ResumenSolicitudes.jsx
│   │   │   ├── SolicitudCard.jsx
│   │   │   ├── SolicitudForm.jsx
│   │   │   └── SolicitudList.jsx
│   │   ├── context/SolicitudesContext.jsx
│   │   ├── data/solicitudes.js
│   │   ├── redux/filtroSlice.js
│   │   ├── redux/store.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
7. Cómo ejecutar y revisar la PA3
Requisitos: Node.js y npm instalados.

Desde la carpeta raíz del repositorio:
cd plataforma-react
npm install
npm run dev
Abrir en el navegador la dirección indicada por Vite, habitualmente http://localhost:5173/.

Para validar la compilación de producción:
npm run build
Para previsualizar la versión compilada:
npm run preview
Importante: esta SPA trabaja con estado en memoria. Las solicitudes nuevas se mantienen al navegar dentro de la aplicación, pero se restablecen a los datos iniciales al recargar la página. No se implementó persistencia permanente ni integración con una API en este corte.
8. Pruebas realizadas y evidencias
Pruebas funcionales realizadas durante el desarrollo local:
Verificación	Resultado comunicado
Navegar entre Inicio, Registro y Solicitudes sin recargar	Correcto
Registrar una solicitud y verla en el listado	Correcto
Actualizar el resumen mediante Context API	Correcto
Filtrar por Todas y Pendiente mediante Redux	Correcto
Restablecer el filtro tras registrar	Correcto
Conservar el registro al cambiar de vista sin recargar	Correcto
Ejecutar npm run build	Correcto: Vite transformó 40 módulos y compiló sin errores


Evidencias visuales: incorporar en la carpeta evidencias/pa3/ capturas reales de la pantalla Inicio, formulario Registro, listado con filtros, resumen actualizado, consola con npm run build y, si es útil, los archivos de Context API y Redux. Reemplazar esta indicación por enlaces a las capturas una vez subidas al repositorio.
Las pruebas anteriores son verificaciones funcionales manuales, no una suite automatizada de tests.

9. Procedimiento seguido y decisiones técnicas
1. Se verificó el funcionamiento de la base React existente y se instalaron las dependencias necesarias.
2. Se configuró React Router con tres vistas principales.
3. Se creó y conectó SolicitudesProvider para compartir el estado de las solicitudes.
4. Se implementó ResumenSolicitudes como consumidor directo del Context.
5. Se configuraron Redux Toolkit, filtroSlice.js, store.js y el Provider de React Redux.
6. Se conectó el filtro mediante useSelector y useDispatch.
7. Se realizaron pruebas funcionales de registro, navegación y filtrado, y se ejecutó la compilación de producción.
8. Se mejoraron los estilos de navegación, resumen y estados de solicitudes.
Se mantuvieron los módulos Angular y backend anteriores para conservar la evolución del proyecto. Para PA3 se prefirieron datos locales, según el alcance de la evaluación, sin adelantar Axios ni JWT en React.
10. Video de exposición
Video público de YouTube: [PEGAR AQUÍ EL ENLACE]
Sustituir el marcador por el enlace del video público de PA3 con participación de todos los integrantes antes de la entrega.

11. Conclusiones
- React, JSX y los Hooks permiten desarrollar una interfaz dinámica y basada en componentes reutilizables.
- React Router organiza la navegación de la SPA sin recargar la página completa.
- Context API facilitó compartir las solicitudes entre el registro, el listado y el resumen.
- Redux Toolkit permitió implementar y explicar un flujo básico de acciones, reducer y Store para el filtro.
- La separación de responsabilidades facilita mantener el proyecto y justificar las decisiones técnicas de la evaluación.
12. Pendientes de entrega
- Confirmar los nombres completos, roles y evidencias individuales de participación PA3.
- Incorporar capturas reales en evidencias/pa3/ y sus enlaces en este README.
- Reemplazar el marcador del video por el enlace público.
- Subir y verificar en GitHub la rama de PA3 y, si corresponde a la entrega del equipo, integrarla en main.
Fecha de preparación de esta documentación: 3 de noviembre de 2026.