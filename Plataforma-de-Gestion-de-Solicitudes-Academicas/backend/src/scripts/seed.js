const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Solicitud = require('../models/Solicitud');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/solicitudes_academicas';

async function cargarDatosSemilla() {
    const jsonPath = path.join(__dirname, '..', 'data', 'seed-solicitudes.json');
    if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, 'utf8');
        return JSON.parse(raw);
    }
    throw new Error('No se encontro el archivo seed-solicitudes.json');
}

async function ejecutarSeed() {
    console.log('--- Iniciando carga idempotente de datos semilla ---');
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB conectado correctamente');

        const solicitudes = await cargarDatosSemilla();
        console.log(`Se encontraron ${solicitudes.length} registros para procesar.`);

        let procesados = 0;
        for (const item of solicitudes) {
            const { _id, createdAt, updatedAt, ...resto } = item;
            await Solicitud.findByIdAndUpdate(
                _id,
                {
                    $set: {
                        ...resto,
                        createdAt: createdAt ? new Date(createdAt) : new Date(),
                        updatedAt: updatedAt ? new Date(updatedAt) : new Date()
                    }
                },
                { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
            );
            procesados++;
        }

        const totalEnColeccion = await Solicitud.countDocuments();
        console.log(`Se procesaron con exito ${procesados} registros.`);
        console.log(`Total de documentos en la coleccion 'solicituds': ${totalEnColeccion}`);
        console.log('Operacion completada sin duplicar registros.');
    } catch (error) {
        console.error('Error durante la ejecucion de la semilla:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('Conexion con MongoDB cerrada.');
    }
}

if (require.main === module) {
    ejecutarSeed();
}

module.exports = { ejecutarSeed, cargarDatosSemilla };
