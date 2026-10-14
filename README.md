# README — Plataforma de Gestión de Solicitudes Académicas

> **Curso:** PROGRAMACION WEB - II  
> **Código:** 30690  
> **Evaluación:** PA2 — Proceso de Aprendizaje 2 (Sesión 7)  
> **Equipo:** Plataforma de Gestión de Solicitudes Académicas  

## 1. Integrantes y Roles

| Integrante | Rol en PA2 | Aporte Principal |
|---|---|---|
| **CLAUDIA BEATRIZ GUILLEN BACA** | Frontend Angular | Desarrollo de interfaz cliente, componentes reactivos, formularios y consumo de API. |
| **DIEGO FERNANDO SALVA PUERTA** | Integrante 1 — Backend & CRUD Inicial | Configuración inicial del servidor Node.js/Express, conexión base a MongoDB y definición de endpoints CRUD iniciales. |
| **ANGEL (angel_ali2005@hotmail.com)** | Integrante 2 — Modelos y Persistencia | Implementación y completitud de modelos Mongoose (`Solicitud`, `Usuario`), esquemas con tipado estricto, campos obligatorios, validaciones (`minlength`, `maxlength`, `enum`, `trim`), capa de persistencia desacoplada (`SolicitudService`), formateo de errores en controlador, script de datos semilla y suite de pruebas unitarias. |
| **ISAAC CLAUDIO SALDAÑA** | Integrante 3 — Validaciones y Notificaciones | Implementación de validaciones con mensajes de aviso para orientar al usuario, notificaciones al eliminar registros y desarrollo conjunto de la funcionalidad para reactivar registros desactivados. |
| **FABIÁN MARCELO DÁVILA HERRERA** | Integrante 4 — Interfaz y Reactivación de Registros | Desarrollo conjunto de mejoras en la interfaz, incorporación de avisos de validación, mensajes de confirmación al eliminar registros, implementación del botón de reactivación y pruebas funcionales de las mejoras realizadas. |

---

## 2. Descripción y Objetivo

### Problema
La gestión académica requiere que las solicitudes realizadas por estudiantes y docentes sean almacenadas de manera persistente, íntegra y validada en una base de datos segura y escalable, evitando inconsistencias en los datos ingresados y permitiendo un ciclo de vida completo (creación, consulta, actualización y eliminación).

### Objetivo
Desarrollar una API REST robusta en **Node.js, Express y MongoDB (Mongoose)** para la gestión de solicitudes académicas y usuarios, implementando esquemas de datos estructurados, validaciones estrictas a nivel de base de datos y de controlador, persistencia real sobre MongoDB, y endpoints preparados para la integración con autenticación y frontend.

### Solución Propuesta
La arquitectura de la solución se estructura en capas dentro de la carpeta `backend`:
- **Modelos (`src/models/`):**
  - **`Solicitud.js`**: Entidad principal que modela las solicitudes de los estudiantes. Incluye tipado estricto, campos obligatorios, limpieza de cadenas (`trim`), límites de longitud y restricción de dominio para estados (`['Pendiente', 'En revision', 'Aprobada', 'Rechazada']`), persistiendo en la colección `solicituds`.
  - **`Usuario.js`**: Modelo para gestión de usuarios del sistema con validación de correo por expresión regular, contraseña mínima de 6 caracteres y control de roles (`admin`, `docente`, `estudiante`).
- **Servicio de Persistencia (`src/services/solicitud.service.js`):** Desacopla las consultas y operaciones Mongoose (`find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`, `countDocuments`), validando identificadores `ObjectId` antes de ejecutar consultas.
- **Controlador (`src/controllers/solicitud.controller.js`):** Maneja el flujo HTTP, captura errores de validación de Mongoose (`ValidationError`), errores de casteo (`CastError`) y emite códigos de estado REST adecuados (200, 201, 400, 404, 500).
- **Rutas (`src/routes/solicitudes.routes.js`):** Endpoints REST limpios expuestos bajo `/api/solicitudes`.
- **Datos Semilla (`src/scripts/seed.js` y `src/data/seed-solicitudes.json`):** Carga idempotente de los 6 documentos de referencia del corte sin duplicar registros.

---

## 3. Especificación de la API (Endpoints CRUD)

Base URL: `http://localhost:3000/api/solicitudes`

| Método | Endpoint | Descripción | Respuestas |
|---|---|---|---|
| **GET** | `/api/solicitudes` | Lista todas las solicitudes. Soporta filtros opcionales por query (`?estado=`, `?curso=`, `?estudiante=`). | `200 OK` (Array de solicitudes ordenadas por fecha) |
| **GET** | `/api/solicitudes/:id` | Obtiene una solicitud específica por su `ObjectId`. | `200 OK`, `404 Not Found`, `400 Bad Request` |
| **POST** | `/api/solicitudes` | Registra una nueva solicitud persistente. | `201 Created`, `400 Bad Request` (errores de validación) |
| **PUT** | `/api/solicitudes/:id` | Actualización completa (requiere `estudiante`, `curso`, `descripcion`, `estado`). | `200 OK`, `404 Not Found`, `400 Bad Request` |
| **PATCH** | `/api/solicitudes/:id` | Actualización parcial de uno o más campos. | `200 OK`, `404 Not Found`, `400 Bad Request` |
| **DELETE** | `/api/solicitudes/:id` | Elimina una solicitud por su `ObjectId`. | `200 OK`, `404 Not Found`, `400 Bad Request` |

---

## 4. Estructura de la Base de Datos y Materiales de Referencia

En la carpeta de contexto `solicitudes_academicas` se proporcionan los archivos generados por `mongodump`:
- **`prelude.json`**: Metadatos de la herramienta de volcado (MongoDB Server 9.0.2 / ToolVersion 100.19.1).
- **`solicituds.metadata.json`**: Metadatos de la colección `solicituds`, incluyendo el índice primario `_id_`.
- **`solicituds.bson`**: Volcado binario con los 6 registros de solicitudes académicas de prueba.

### Restauración / Carga de Datos Semilla
Para poblar la base de datos con los 6 registros sin duplicar información existen dos alternativas:

1. **Mediante MongoDB Database Tools (`mongorestore`):**
   ```bash
   mongorestore --db solicitudes_academicas "ruta/a/PA2-contexto/solicitudes_academicas"
   ```
2. **Mediante el script Node.js idempotente (recomendado si no se tiene `mongorestore` instalado):**
   ```bash
   cd backend
   npm run seed
   ```
   *(Este script utiliza `findByIdAndUpdate` con `upsert: true`, asegurando que no se dupliquen registros aunque se ejecute múltiples veces).*

---

## 5. Cómo Ejecutar o Revisar el Proyecto

### Requisitos Previos
* Node.js (v18 o superior)
* npm
* MongoDB en ejecución local en el puerto `27017` (o configurar `MONGODB_URI` en entorno)

### 1. Instalación de Dependencias del Backend
```bash
cd backend
npm install
```

### 2. Ejecutar Pruebas Automatizadas
Se incluye una suite de pruebas unitarias que valida los esquemas, validaciones, restricciones y los 6 registros semilla:
```bash
npm test
```
*Salida esperada: 23 pruebas aprobadas (0 fallidas).*

Para ejecutar la prueba de flujo en vivo de todos los endpoints HTTP (con el servidor y MongoDB activos):
```bash
npm run test:live
```

### 3. Cargar Datos Semilla (Opcional)
```bash
npm run seed
```

### 4. Iniciar el Servidor de la API
```bash
npm start
```
*Salida en consola:*
```text
MongoDB conectado correctamente
Servidor ejecutandose en http://localhost:3000
```

### 5. Pasos de Verificación de Persistencia y CRUD
1. **Comprobar API Activa:** Realizar `GET http://localhost:3000/` -> `{ "mensaje": "API de Gestion de Solicitudes Academicas", "estado": "OK" }`.
2. **Consultar Solicitudes:** Realizar `GET http://localhost:3000/api/solicitudes`.
3. **Crear Solicitud:** Enviar `POST http://localhost:3000/api/solicitudes` con body:
   ```json
   {
     "estudiante": "Carlos Alarcon",
     "curso": "Programacion Web II",
     "descripcion": "Solicitud de rectificacion de matricula"
   }
   ```
4. **Verificar Validaciones:** Enviar un `POST` con `estudiante: "Al"` (menor a 3 caracteres) o `estado: "Cancelado"` para comprobar que responde `400 Bad Request` con mensaje de error claro.
5. **Actualizar Solicitud:** Enviar `PUT` o `PATCH` con el nuevo estado `"En revision"` o `"Aprobada"`.
6. **Eliminar Solicitud:** Enviar `DELETE http://localhost:3000/api/solicitudes/:id`.

---

## 6. Evidencias

* **Suite de Pruebas Unitarias:** 23 tests automatizados sobre esquemas Mongoose, validaciones, servicios y controladores ejecutados con el runner nativo de Node.js (`node --test`).
* **Validación de Datos Semilla:** Los 6 documentos del dump BSON original fueron verificados exitosamente contra el esquema Mongoose sin errores.
* **Manejo de Errores y HTTP:** Retorno de códigos de estado normalizados (200, 201, 400, 404, 500) ante datos incompletos o IDs inválidos.
* **Control de Versiones:** Commits estructurados en la rama `feat/modelos-persistencia` respetando el trabajo previo del equipo.

---
equipo.

---

## 7. Matriz de Participación

| Integrante | Desarrollo | Pruebas | Documentación | Exposición | Evidencia de Participación |
|---|---|---|---|---|---|
| **CLAUDIA BEATRIZ GUILLEN BACA** | Alta | Media | Media | Pendiente | Desarrollo inicial del frontend Angular, componentes y servicios de consumo de datos. |
| **DIEGO FERNANDO SALVA PUERTA** | Alta | Alta | Media | Pendiente | Configuración base del backend Express, primer CRUD y conexión inicial con MongoDB. |
| **ANGEL** | Alta | Alta | Alta | Pendiente | Completitud de modelos Mongoose (`Solicitud`, `Usuario`), validaciones estrictas, capa `SolicitudService` y `SolicitudController`, script de datos semilla, tests unitarios automatizados y actualización de documentación PA2. |
| **ISAAC CLAUDIO SALDAÑA** | Media | Baja | Baja | Pendiente | Participación en la implementación de validaciones con avisos, notificaciones de registros eliminados y botón para reactivar registros desactivados. |
| **FABIÁN MARCELO DÁVILA HERRERA** | Media | Baja | Baja | Pendiente | Colaboración en las mejoras de interfaz, incorporación de avisos de validación, mensajes de eliminación y funcionalidad de reactivación de registros. |

---

## 8. Video de Exposición

**Video público de YouTube:** https://youtu.be/T5fSM89rWvk

*Todos los integrantes participarán en la exposición con sus cámaras prendidas, explicando el procedimiento, la arquitectura de la solución, los modelos de Mongoose, la persistencia en MongoDB, las validaciones implementadas, las notificaciones de eliminación, la funcionalidad de reactivación de registros y las decisiones técnicas adoptadas.*


---

## 9. Conclusiones

* **Modelado Robusto con Mongoose:** La implementación de esquemas con validaciones de tipos, obligatoriedad, longitud y valores enumerados asegura la integridad de los datos antes de que sean persistidos en MongoDB.
* **Arquitectura Desacoplada:** La separación entre rutas (`routes`), lógica HTTP (`controllers`) y persistencia (`services`) permite un código mantenible, reutilizable y fácilmente testeable.
* **Compatibilidad e Idempotencia:** El esquema conserva compatibilidad directa con la colección `solicituds` y con el conjunto de 6 registros provisto en `solicitudes.bson`, evitando duplicación de información o pérdidas de datos mediante operaciones idempotentes.
* **Evolución Progresiva:** Se continuó y potenció el trabajo del Integrante 1 sin alterar negativamente funcionalidades previas, dejando las bases preparadas para los módulos de autenticación (JWT/bcrypt) del corte.

---

**Última actualización:** 13/10/2026
