const solicitudService = require('../services/solicitud.service');

class SolicitudController {
    /**
     * GET /api/solicitudes
     * Consulta todas las solicitudes, con soporte opcional para filtros en query (?estado=, ?curso=, ?estudiante=)
     */
    async obtenerTodas(req, res) {
        try {
            const { estado, curso, estudiante } = req.query;
            const solicitudes = await solicitudService.listarSolicitudes({ estado, curso, estudiante });
            return res.json(solicitudes);
        } catch (error) {
            console.error('Error al consultar solicitudes:', error);
            return res.status(500).json({ mensaje: 'Error al consultar solicitudes' });
        }
    }

    /**
     * GET /api/solicitudes/:id
     * Consulta una solicitud por ID
     */
    async obtenerPorId(req, res) {
        try {
            const solicitud = await solicitudService.obtenerSolicitudPorId(req.params.id);

            if (!solicitud) {
                return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
            }

            return res.json(solicitud);
        } catch (error) {
            if (error.statusCode === 400 || error.name === 'CastError') {
                return res.status(400).json({ mensaje: 'ID de solicitud no valido' });
            }
            console.error('Error al obtener solicitud por ID:', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

    /**
     * POST /api/solicitudes
     * Registra una nueva solicitud con validaciones de esquema
     */
    async crear(req, res) {
        try {
            const { estudiante, curso, descripcion, estado } = req.body;

            if (!estudiante || !curso || !descripcion) {
                return res.status(400).json({
                    mensaje: 'Estudiante, curso y descripcion son obligatorios'
                });
            }

            const nuevaSolicitud = await solicitudService.crearSolicitud({
                estudiante,
                curso,
                descripcion,
                estado
            });

            return res.status(201).json(nuevaSolicitud);
        } catch (error) {
            if (error.name === 'ValidationError') {
                const errores = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({
                    mensaje: 'Error de validacion en los datos de la solicitud',
                    detalles: errores
                });
            }
            console.error('Error al crear la solicitud:', error);
            return res.status(500).json({ mensaje: 'Error al crear la solicitud' });
        }
    }

    /**
     * PUT /api/solicitudes/:id
     * Actualiza una solicitud completa
     */
    async actualizar(req, res) {
        try {
            const { estudiante, curso, descripcion, estado } = req.body;

            if (!estudiante || !curso || !descripcion || !estado) {
                return res.status(400).json({
                    mensaje: 'Todos los campos son obligatorios para actualizar'
                });
            }

            const solicitud = await solicitudService.actualizarSolicitud(
                req.params.id,
                { estudiante, curso, descripcion, estado },
                true
            );

            if (!solicitud) {
                return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
            }

            return res.json(solicitud);
        } catch (error) {
            if (error.name === 'ValidationError') {
                const errores = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({
                    mensaje: 'Error de validacion al actualizar la solicitud',
                    detalles: errores
                });
            }
            if (error.statusCode === 400 || error.name === 'CastError') {
                return res.status(400).json({
                    mensaje: 'No se pudo actualizar la solicitud. Verifica el ID y los datos.'
                });
            }
            console.error('Error al actualizar la solicitud:', error);
            return res.status(500).json({ mensaje: 'Error al actualizar la solicitud' });
        }
    }

    /**
     * PATCH /api/solicitudes/:id
     * Actualizacion parcial de una solicitud
     */
    async actualizarParcial(req, res) {
        try {
            const camposPermitidos = ['estudiante', 'curso', 'descripcion', 'estado'];
            const datosActualizar = {};

            for (const campo of camposPermitidos) {
                if (req.body[campo] !== undefined) {
                    datosActualizar[campo] = req.body[campo];
                }
            }

            if (Object.keys(datosActualizar).length === 0) {
                return res.status(400).json({
                    mensaje: 'Debe enviar al menos un campo para actualizar'
                });
            }

            const solicitud = await solicitudService.actualizarSolicitud(
                req.params.id,
                datosActualizar,
                false
            );

            if (!solicitud) {
                return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
            }

            return res.json(solicitud);
        } catch (error) {
            if (error.name === 'ValidationError') {
                const errores = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({
                    mensaje: 'Error de validacion al actualizar la solicitud',
                    detalles: errores
                });
            }
            if (error.statusCode === 400 || error.name === 'CastError') {
                return res.status(400).json({
                    mensaje: 'No se pudo actualizar la solicitud. Verifica el ID y los datos.'
                });
            }
            console.error('Error al actualizar parcialmente la solicitud:', error);
            return res.status(500).json({ mensaje: 'Error interno al actualizar la solicitud' });
        }
    }

    /**
     * DELETE /api/solicitudes/:id
     * Elimina una solicitud por su ID
     */
    async eliminar(req, res) {
        try {
            const solicitud = await solicitudService.eliminarSolicitud(req.params.id);

            if (!solicitud) {
                return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
            }

            return res.json({ mensaje: 'Solicitud eliminada correctamente' });
        } catch (error) {
            if (error.statusCode === 400 || error.name === 'CastError') {
                return res.status(400).json({ mensaje: 'ID de solicitud no valido' });
            }
            console.error('Error al eliminar la solicitud:', error);
            return res.status(500).json({ mensaje: 'Error al eliminar la solicitud' });
        }
    }
}

module.exports = new SolicitudController();
