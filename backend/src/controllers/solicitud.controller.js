const solicitudService = require("../services/solicitud.service");

class SolicitudController {
  /**
   * GET /api/solicitudes
   * Consulta todos los datos
   */
  async obtenerTodas(req, res) {
    try {
      const { estado, nombre, apellido } = req.query;
      const solicitudes = await solicitudService.listarSolicitudes({
        estado,
        nombre,
        apellido,
        celular,
      });
      return res.json(solicitudes);
    } catch (error) {
      console.error("Error al consultar datos:", error);
      return res
        .status(500)
        .json({ mensaje: "Error al consultar datos" });
    }
  }

  /**
   * GET /api/solicitudes/:id
   * Consulta un dato por ID
   */
  async obtenerPorId(req, res) {
    try {
      const solicitud = await solicitudService.obtenerSolicitudPorId(
        req.params.id,
      );

      if (!solicitud) {
        return res.status(404).json({ mensaje: "Dato no encontrado" });
      }

      return res.json(solicitud);
    } catch (error) {
      if (error.statusCode === 400 || error.name === "CastError") {
        return res.status(400).json({ mensaje: "ID de dato no valido" });
      }
      console.error("Error al obtener dato por ID:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  /**
   * POST /api/solicitudes
   * Registra un nuevo dato
   */
  async crear(req, res) {
    try {
      const { nombre, apellido, celular, estado } = req.body;

      if (!nombre || !apellido || !celular) {
        return res.status(400).json({
          mensaje: "Nombre, apellido y celular son obligatorios",
        });
      }

      const nuevaSolicitud = await solicitudService.crearSolicitud({
        nombre,
        apellido,
        celular,
        estado,
      });

      return res.status(201).json(nuevaSolicitud);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errores = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
          mensaje: "Error de validacion en los datos del dato",
          detalles: errores,
        });
      }
      console.error("Error al crear el dato:", error);
      return res.status(500).json({ mensaje: "Error al crear el dato" });
    }
  }

  /**
   * PUT /api/solicitudes/:id
   * Actualiza un dato por ID
   */
  async actualizar(req, res) {
    try {
      const { nombre, apellido, celular, estado } = req.body;

      if (!nombre || !apellido || !celular || typeof estado !== "boolean") {
        return res.status(400).json({
          mensaje: "Todos los campos son obligatorios para actualizar",
        });
      }

      const solicitud = await solicitudService.actualizarSolicitud(
        req.params.id,
        { nombre, apellido, celular, estado },
        true,
      );

      if (!solicitud) {
        return res.status(404).json({ mensaje: "Dato no encontrado" });
      }

      return res.json(solicitud);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errores = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
          mensaje: "Error de validacion al actualizar el dato",
          detalles: errores,
        });
      }
      if (error.statusCode === 400 || error.name === "CastError") {
        return res.status(400).json({
          mensaje:
            "No se pudo actualizar el dato. Verifica el ID y los datos.",
        });
      }
      console.error("Error al actualizar el dato:", error);
      return res
        .status(500)
        .json({ mensaje: "Error al actualizar el dato" });
    }
  }

  /**
   * PATCH /api/solicitudes/:id
   * Actualizacion parcial de un dato
   */
  async actualizarParcial(req, res) {
    try {
      const camposPermitidos = ["nombre", "apellido", "celular", "estado"];
      const datosActualizar = {};

      for (const campo of camposPermitidos) {
        if (req.body[campo] !== undefined) {
          datosActualizar[campo] = req.body[campo];
        }
      }

      if (Object.keys(datosActualizar).length === 0) {
        return res.status(400).json({
          mensaje: "Debe enviar al menos un campo para actualizar",
        });
      }

      const solicitud = await solicitudService.actualizarSolicitud(
        req.params.id,
        datosActualizar,
        false,
      );

      if (!solicitud) {
        return res.status(404).json({ mensaje: "Dato no encontrado" });
      }

      return res.json(solicitud);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errores = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
          mensaje: "Error de validacion al actualizar el dato",
          detalles: errores,
        });
      }
      if (error.statusCode === 400 || error.name === "CastError") {
        return res.status(400).json({
          mensaje:
            "No se pudo actualizar el dato. Verifica el ID y los datos.",
        });
      }
      console.error("Error al actualizar parcialmente el dato:", error);
      return res
        .status(500)
        .json({ mensaje: "Error interno al actualizar el dato" });
    }
  }

  /**
   * DELETE /api/solicitudes/:id
   * Elimina un dato por su ID
   */

  async eliminar(req, res) {
    try {
      const solicitud = await solicitudService.eliminarSolicitud(req.params.id);

      if (!solicitud) {
        return res.status(404).json({
          mensaje: "Dato no encontrado",
        });
      }

      return res.json({
        mensaje: "Dato desactivado correctamente",
        solicitud,
      });
    } catch (error) {
      if (error.statusCode === 400 || error.name === "CastError") {
        return res.status(400).json({
          mensaje: "ID de dato no válido",
        });
      }

      console.error("Error al desactivar dato:", error);

      return res.status(500).json({
        mensaje: "Error al desactivar dato",
      });
    }
  }
}

module.exports = new SolicitudController();
