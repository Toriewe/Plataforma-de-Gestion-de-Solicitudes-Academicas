const { test, describe } = require('node:test');
const assert = require('node:assert');
const solicitudService = require('../src/services/solicitud.service');

describe('Pruebas de Logica de Persistencia: SolicitudService', () => {

    test('Debe rechazar obtenerSolicitudPorId si el ID no es un ObjectId valido de MongoDB', async () => {
        await assert.rejects(
            async () => {
                await solicitudService.obtenerSolicitudPorId('id-invalido-123');
            },
            (error) => {
                assert.strictEqual(error.message, 'ID de solicitud no valido');
                assert.strictEqual(error.statusCode, 400);
                return true;
            }
        );
    });

    test('Debe rechazar actualizarSolicitud si el ID no es un ObjectId valido', async () => {
        await assert.rejects(
            async () => {
                await solicitudService.actualizarSolicitud('id-falso', { estudiante: 'Nuevo' }, false);
            },
            (error) => {
                assert.strictEqual(error.message, 'ID de solicitud no valido');
                assert.strictEqual(error.statusCode, 400);
                return true;
            }
        );
    });

    test('Debe rechazar actualizarSolicitud (PUT) si faltan campos obligatorios', async () => {
        const idValido = '6accc0236aa665a732ffe454';
        await assert.rejects(
            async () => {
                await solicitudService.actualizarSolicitud(idValido, { estudiante: 'Solo estudiante' }, true);
            },
            (error) => {
                assert.ok(error.message.includes('Todos los campos son obligatorios para actualizar'));
                assert.strictEqual(error.statusCode, 400);
                return true;
            }
        );
    });

    test('Debe rechazar eliminarSolicitud si el ID no es un ObjectId valido', async () => {
        await assert.rejects(
            async () => {
                await solicitudService.eliminarSolicitud('abc-xyz');
            },
            (error) => {
                assert.strictEqual(error.message, 'ID de solicitud no valido');
                assert.strictEqual(error.statusCode, 400);
                return true;
            }
        );
    });
});
