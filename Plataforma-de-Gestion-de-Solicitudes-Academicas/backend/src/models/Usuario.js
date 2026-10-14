const mongoose = require('mongoose');

const ROLES_VALIDOS = ['admin', 'docente', 'estudiante'];

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre completo es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electronico es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El correo electronico ingresado no tiene un formato valido']
    },
    password: {
        type: String,
        required: [true, 'La contrasenia es obligatoria'],
        minlength: [6, 'La contrasenia debe tener al menos 6 caracteres']
    },
    rol: {
        type: String,
        enum: {
            values: ROLES_VALIDOS,
            message: '"{VALUE}" no es un rol valido. Roles permitidos: ' + ROLES_VALIDOS.join(', ')
        },
        default: 'estudiante'
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'usuarios'
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
module.exports.ROLES_VALIDOS = ROLES_VALIDOS;
