const mongoose = require('mongoose');

const ESTADOS_VALIDOS = ['Pendiente', 'En revision', 'Aprobada', 'Rechazada'];

const solicitudSchema = new mongoose.Schema({
    estudiante: {
        type: String,
        required: [true, 'El nombre del estudiante es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre del estudiante debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre del estudiante no puede exceder los 100 caracteres']
    },
    curso: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio'],
        trim: true,
        minlength: [3, 'El curso debe tener al menos 3 caracteres'],
        maxlength: [100, 'El curso no puede exceder los 100 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion de la solicitud es obligatoria'],
        trim: true,
        minlength: [5, 'La descripcion debe tener al menos 5 caracteres'],
        maxlength: [1000, 'La descripcion no puede exceder los 1000 caracteres']
    },
    estado: {
        type: String,
        enum: {
            values: ESTADOS_VALIDOS,
            message: '"{VALUE}" no es un estado valido. Estados permitidos: ' + ESTADOS_VALIDOS.join(', ')
        },
        default: 'Pendiente',
        trim: true
    }
}, {
    timestamps: true,
    collection: 'solicituds' // Mantiene compatibilidad exacta con la coleccion generada por Mongoose y el dump BSON
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

module.exports = Solicitud;
module.exports.ESTADOS_VALIDOS = ESTADOS_VALIDOS;
