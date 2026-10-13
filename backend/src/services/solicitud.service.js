
const mongoose = require('mongoose');
const Solicitud = require('../models/Solicitud');

class SolicitudService {

    // GET: Listar solicitudes con filtros opcionales
    async listarSolicitudes(filtros = {}) {
        const query = {};

        if (filtros.estado !== undefined &&
            filtros.estado !== '') {
            if (!['true', 'false', true, false].includes(filtros.estado)) {
                const error = new Error('Estado no válido');
                error.statusCode = 400;
                throw error;
            }

            query.estado = filtros.estado === true ||
                           filtros.estado === 'true';
        }

        if (filtros.nombre) {
            query.nombre = {
                $regex: filtros.nombre,
                $options: 'i'
            };
        }

        if (filtros.apellido) {
            query.apellido = {
                $regex: filtros.apellido,
                $options: 'i'
            };
        }

        return await Solicitud.find(query)
            .sort({ createdAt: -1 });
    }

    // GET: Obtener solicitud por ID
    async obtenerSolicitudPorId(id) {
        this.validarId(id);

        return await Solicitud.findById(id);
    }

    // POST: Crear solicitud
    async crearSolicitud(datos) {
        const { nombre, apellido, celular, estado } = datos;

        const nuevaSolicitud = {
            nombre,
            apellido,
            celular
        };

        if (estado !== undefined) {
            nuevaSolicitud.estado = estado;
        }

        return await Solicitud.create(nuevaSolicitud);
    }

    // PUT / PATCH: Actualizar solicitud
    async actualizarSolicitud(id, datos, validarCompletitud = false) {
        this.validarId(id);

        if (validarCompletitud) {
            const { nombre, apellido, celular, estado } = datos;

            if (!nombre || !apellido || !celular ||
                typeof estado !== 'boolean') {
                const error = new Error(
                    'Nombre, apellido, celular y estado son obligatorios'
                );
                error.statusCode = 400;
                throw error;
            }
        }

        return await Solicitud.findByIdAndUpdate(
            id,
            datos,
            {
                new: true,
                runValidators: true
            }
        );
    }

    // DELETE: Eliminación lógica
    async eliminarSolicitud(id) {
        this.validarId(id);

        return await Solicitud.findByIdAndUpdate(
            id,
            { estado: false },
            {
                new: true,
                runValidators: true
            }
        );
    }

    // Contar solicitudes
    async contarSolicitudes(filtros = {}) {
        return await Solicitud.countDocuments(filtros);
    }

    // Validar ID de MongoDB
    validarId(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('ID de solicitud no válido');
            error.statusCode = 400;
            throw error;
        }
    }
}

module.exports = new SolicitudService();

