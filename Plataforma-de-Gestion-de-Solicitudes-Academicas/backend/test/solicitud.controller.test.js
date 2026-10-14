const { test, describe } = require('node:test');
const assert = require('node:assert');
const solicitudController = require('../src/controllers/solicitud.controller');

describe('Pruebas del Controlador: SolicitudController (Validacion de Entradas HTTP)', () => {

    test('POST /api/solicitudes debe responder 400 si faltan estudiante, curso o descripcion', async () => {
        let statusCode = 0;
        let responseJson = null;

        const req = { body: { estudiante: 'Juan' } }; // faltan curso y descripcion
        const res = {
            status(code) {
                statusCode = code;
                return this;
            },
            json(data) {
                responseJson = data;
                return this;
            }
        };

        await solicitudController.crear(req, res);
        assert.strictEqual(statusCode, 400);
        assert.strictEqual(responseJson.mensaje, 'Estudiante, curso y descripcion son obligatorios');
    });

    test('GET /api/solicitudes/:id debe responder 400 si el ID no es valido', async () => {
        let statusCode = 0;
        let responseJson = null;

        const req = { params: { id: 'id-invalido' } };
        const res = {
            status(code) {
                statusCode = code;
                return this;
            },
            json(data) {
                responseJson = data;
                return this;
            }
        };

        await solicitudController.obtenerPorId(req, res);
        assert.strictEqual(statusCode, 400);
        assert.strictEqual(responseJson.mensaje, 'ID de solicitud no valido');
    });

    test('PUT /api/solicitudes/:id debe responder 400 si faltan campos para actualizacion completa', async () => {
        let statusCode = 0;
        let responseJson = null;

        const req = {
            params: { id: '6accc0236aa665a732ffe454' },
            body: { estudiante: 'Solo nombre' }
        };
        const res = {
            status(code) {
                statusCode = code;
                return this;
            },
            json(data) {
                responseJson = data;
                return this;
            }
        };

        await solicitudController.actualizar(req, res);
        assert.strictEqual(statusCode, 400);
        assert.strictEqual(responseJson.mensaje, 'Todos los campos son obligatorios para actualizar');
    });

    test('PATCH /api/solicitudes/:id debe responder 400 si el body esta vacio', async () => {
        let statusCode = 0;
        let responseJson = null;

        const req = {
            params: { id: '6accc0236aa665a732ffe454' },
            body: {}
        };
        const res = {
            status(code) {
                statusCode = code;
                return this;
            },
            json(data) {
                responseJson = data;
                return this;
            }
        };

        await solicitudController.actualizarParcial(req, res);
        assert.strictEqual(statusCode, 400);
        assert.strictEqual(responseJson.mensaje, 'Debe enviar al menos un campo para actualizar');
    });

    test('DELETE /api/solicitudes/:id debe responder 400 si el ID no es valido', async () => {
        let statusCode = 0;
        let responseJson = null;

        const req = { params: { id: '123' } };
        const res = {
            status(code) {
                statusCode = code;
                return this;
            },
            json(data) {
                responseJson = data;
                return this;
            }
        };

        await solicitudController.eliminar(req, res);
        assert.strictEqual(statusCode, 400);
        assert.strictEqual(responseJson.mensaje, 'ID de solicitud no valido');
    });
});
