const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/solicitudes_academicas';

async function conectarDB(uri = MONGODB_URI) {
    try {
        await mongoose.connect(uri);

        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = conectarDB;
