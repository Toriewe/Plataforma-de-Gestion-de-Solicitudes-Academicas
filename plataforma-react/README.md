# Plataforma de Gestión de Solicitudes Académicas — React

SPA desarrollada con React y Vite para la actividad del Participante 1.

## Funcionalidades

- Componentes JSX reutilizables para formulario, lista, tarjeta y filtro.
- Datos locales simulados, sin Axios ni conexión al backend.
- Formulario controlado con `useState`.
- Filtro por estado administrado con `useState`.
- Carga inicial simulada mediante `useEffect`.
- Mensaje temporal de confirmación controlado mediante `useEffect`.
- Diseño adaptable a computadoras, tabletas y celulares.

## Ejecución

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

## Organización

Los datos que solo necesita esta SPA se mantienen localmente en `App.jsx`. En una etapa posterior, el Participante 3 puede trasladar la lista y sus acciones a Context API. El filtro recibe los datos mediante propiedades, por lo que el Participante 4 puede reemplazar su estado local por Redux sin rehacer las tarjetas ni el formulario.
