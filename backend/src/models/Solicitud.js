const mongoose = require('mongoose');

const ESTADOS_VALIDOS = ['Pendiente', 'En revision', 'Aprobada', 'Rechazada'];

const solicitudSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },

    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true,
        minlength: [3, 'El apellido debe tener al menos 3 caracteres'],
        maxlength: [100, 'El apellido no puede exceder los 100 caracteres']
    },

    celular: {
        type: String,
        required: [true, 'El celular es obligatorio'],
        trim: true,
        match: [/^\d{9}$/, 'El celular debe contener exactamente 9 dígitos']
    },

    estado: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
    collection: 'solicituds'
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

module.exports = Solicitud;
