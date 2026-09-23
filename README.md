# README — Evaluación 1

> **Curso:** PROGRAMACION WEB - II
> **Código:** 30690
> **Evaluación:** PA1
> **Equipo:** Plataforma de Gestión de Solicitudes Académicas

## 1. Integrantes

| Integrante                       | Rol                  | Aporte principal                                                                                                                                                               |
| -------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **CLAUDIA BEATRIZ GUILLEN BACA** | Desarrollo Angular   | Desarrollo de la estructura base de la aplicación, componentes Angular, navegación entre vistas, servicio para la gestión de solicitudes y consumo de la API.                  |
| **DIEGO FERNANDO SALVA PUERTA**  | Desarrollo y pruebas | Mejora de las validaciones del formulario de registro, implementación de mensajes de validación, pruebas funcionales y verificación del flujo de registro y consumo de la API. |

## 2. Descripción y objetivo

**Problema:**
Los estudiantes necesitan una forma organizada de registrar y consultar solicitudes académicas. La gestión manual de estos registros puede dificultar su seguimiento y validación.

**Objetivo:**
Desarrollar una aplicación web que permita registrar y consultar solicitudes académicas mediante una interfaz sencilla, incorporando validaciones de datos, navegación entre vistas y consumo de información mediante una API.

**Solución desarrollada:**
Se desarrolló una aplicación web utilizando **Angular y TypeScript**, basada en componentes independientes y navegación mediante rutas.

La aplicación cuenta con una pantalla de inicio, un formulario para registrar solicitudes y una vista para consultar los registros almacenados.

El formulario utiliza **Reactive Forms** para controlar y validar los datos ingresados. Se implementaron validaciones para campos obligatorios y para el número de celular, además de mensajes informativos cuando los datos ingresados no cumplen las condiciones establecidas.

La comunicación con la API se realiza mediante un servicio Angular utilizando `HttpClient`. Para las pruebas y almacenamiento de datos se utiliza `json-server`.

## 3. Cómo ejecutar o revisar

### Requisitos

* Node.js
* npm
* Angular CLI
* Navegador web

### Instalación

Desde la carpeta del proyecto Angular:

```bash
cd plataforma-gestion
npm install
```

### Ejecutar la aplicación Angular

```bash
npm start
```

La aplicación estará disponible en:

```text
http://localhost:4200/
```

### Ejecutar la API de prueba

En otra terminal, dentro de la carpeta `plataforma-gestion`:

```bash
npx json-server db.json
```

La API estará disponible en:

```text
http://localhost:3000/datos
```

### Pasos de revisión

1. Ejecutar `npm start` para iniciar la aplicación Angular.
2. Ejecutar `npx json-server db.json` en otra terminal para iniciar la API.
3. Ingresar a `http://localhost:4200/`.
4. Desde la pantalla de inicio, seleccionar **Registrar solicitud**.
5. Intentar enviar el formulario vacío para comprobar las validaciones.
6. Ingresar un número de celular incorrecto para comprobar la validación de formato.
7. Completar correctamente el formulario y registrar la solicitud.
8. Seleccionar **Ver registros** para comprobar que el nuevo registro fue almacenado y recuperado mediante la API.

> No publicar contraseñas, tokens, credenciales ni datos sensibles.

## 4. Evidencias

Las evidencias del proyecto pueden incluir:

* Captura de la pantalla principal de la aplicación.
* Captura del formulario de registro.
* Evidencia de las validaciones de campos obligatorios.
* Evidencia de la validación del número de celular.
* Evidencia de un registro realizado correctamente.
* Evidencia de los datos recuperados desde la API.
* Evidencia de los commits realizados por los integrantes en GitHub.

## 5. Matriz de participación

| Integrante                       | Desarrollo | Pruebas | Documentación | Exposición | Evidencia de participación                                                                                                       |
| -------------------------------- | ---------- | ------- | ------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **CLAUDIA BEATRIZ GUILLEN BACA** | Alta       | Media   | Pendiente     | Pendiente  | Desarrollo de la estructura base, componentes, navegación, servicio y consumo de API.                                            |
| **DIEGO FERNANDO SALVA PUERTA**  | Alta       | Alta    | Media         | Pendiente  | Commit `94c652d`: mejora de validaciones del formulario de registro, mensajes de validación y pruebas del flujo de registro/API. |

> La matriz deberá actualizarse si durante el desarrollo se realizan nuevas actividades de documentación o exposición.

## 6. Video de exposición

**Video público de YouTube:** [PEGAR AQUÍ EL ENLACE]

Todos los integrantes deben participar en la exposición con sus cámaras prendidas y explicar el procedimiento, la solución desarrollada y las decisiones tomadas.

## 7. Conclusiones

* Se desarrolló una aplicación web utilizando Angular y TypeScript para gestionar solicitudes académicas mediante una estructura basada en componentes.
* Se implementó un formulario reactivo con validaciones para mejorar la calidad de los datos ingresados y proporcionar retroalimentación al usuario.
* Se implementó un servicio Angular utilizando `HttpClient` para realizar operaciones de comunicación con una API basada en `json-server`.
* El proyecto permitió aplicar conceptos de componentes, navegación, servicios, inyección de dependencias, formularios reactivos, validaciones y consumo de API REST.

---

**Última actualización:** 22/09/2026

# Plataforma-de-Gestion-de-Solicitudes-Academicas
