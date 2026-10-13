const mongoose = require('mongoose');
const Solicitud = require('../models/Solicitud');

class SolicitudService {
    /**
     * Consulta todas las solicitudes en MongoDB, permitiendo filtros opcionales.
     * @param {Object} filtros - Filtros opcionales (estado, curso, estudiante)
     * @returns {Promise<Array>} Lista de documentos de solicitudes
     */
    async listarSolicitudes(filtros = {}) {
        const query = {};

        if (filtros.estado) {
            query.estado = filtros.estado;
        }

        if (filtros.curso) {
            query.curso = { $regex: filtros.curso, $options: 'i' };
        }

        if (filtros.estudiante) {
            query.estudiante = { $regex: filtros.estudiante, $options: 'i' };
        }

        return await Solicitud.find(query).sort({ createdAt: -1 });
    }

    /**
     * Consulta una solicitud por su ID de MongoDB.
     * @param {string} id - ObjectId de la solicitud
     * @returns {Promise<Object|null>} Documento de la solicitud o null si no existe
     */
    async obtenerSolicitudPorId(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('ID de solicitud no valido');
            error.statusCode = 400;
            throw error;
        }

        return await Solicitud.findById(id);
    }

    /**
     * Crea una nueva solicitud persistente en MongoDB.
     * Aplica automáticamente las validaciones del esquema de Mongoose.
     * @param {Object} datos - Datos de la solicitud ({ estudiante, curso, descripcion, estado })
     * @returns {Promise<Object>} Documento creado
     */
    async crearSolicitud(datos) {
        const { estudiante, curso, descripcion, estado } = datos;

        const dataToCreate = { estudiante, curso, descripcion };
        if (estado) {
            dataToCreate.estado = estado;
        }

        return await Solicitud.create(dataToCreate);
    }

    /**
     * Actualiza una solicitud existente en MongoDB.
     * @param {string} id - ObjectId de la solicitud
     * @param {Object} datos - Campos a actualizar
     * @param {boolean} validarCompletitud - Si es true, requiere todos los campos (para PUT)
     * @returns {Promise<Object|null>} Documento actualizado o null si no se encuentra
     */
    async actualizarSolicitud(id, datos, validarCompletitud = false) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('ID de solicitud no valido');
            error.statusCode = 400;
            throw error;
        }

        if (validarCompletitud) {
            const { estudiante, curso, descripcion, estado } = datos;
            if (!estudiante || !curso || !descripcion || !estado) {
                const error = new Error('Todos los campos son obligatorios para actualizar (estudiante, curso, descripcion, estado)');
                error.statusCode = 400;
                throw error;
            }
        }

        return await Solicitud.findByIdAndUpdate(
            id,
            datos,
            { new: true, runValidators: true }
        );
    }

    /**
     * Elimina una solicitud existente en MongoDB.
     * @param {string} id - ObjectId de la solicitud
     * @returns {Promise<Object|null>} Documento eliminado o null si no existia
     */
    async eliminarSolicitud(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('ID de solicitud no valido');
            error.statusCode = 400;
            throw error;
        }

        return await Solicitud.findByIdAndDelete(id);
    }

    /**
     * Cuenta el total de solicitudes en la base de datos.
     * @param {Object} filtros - Filtros opcionales
     * @returns {Promise<number>} Conteo de documentos
     */
    async contarSolicitudes(filtros = {}) {
        return await Solicitud.countDocuments(filtros);
    }
}

module.exports = new SolicitudService();
