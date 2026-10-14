const { test, describe } = require('node:test');
const assert = require('node:assert');
const Solicitud = require('../src/models/Solicitud');
const seedData = require('../src/data/seed-solicitudes.json');

describe('Pruebas del Modelo Mongoose: Solicitud', () => {

    test('Debe validar exitosamente una solicitud con todos sus campos correctos', async () => {
        const solicitud = new Solicitud({
            estudiante: 'Juan Perez',
            curso: 'Programacion Web II',
            descripcion: 'Solicitud de convalidacion de asignatura',
            estado: 'Pendiente'
        });

        await assert.doesNotReject(async () => {
            await solicitud.validate();
        });
        assert.strictEqual(solicitud.estado, 'Pendiente');
    });

    test('Debe aplicar el valor por defecto "Pendiente" si no se proporciona estado', async () => {
        const solicitud = new Solicitud({
            estudiante: 'Ana Garcia',
            curso: 'Base de Datos',
            descripcion: 'Revision de examen final'
        });

        await assert.doesNotReject(async () => {
            await solicitud.validate();
        });
        assert.strictEqual(solicitud.estado, 'Pendiente');
    });

    test('Debe aplicar trim a los campos de texto', () => {
        const solicitud = new Solicitud({
            estudiante: '   Carlos Lopez   ',
            curso: '   Desarrollo Web   ',
            descripcion: '   Descripcion con espacios al inicio y fin   '
        });

        assert.strictEqual(solicitud.estudiante, 'Carlos Lopez');
        assert.strictEqual(solicitud.curso, 'Desarrollo Web');
        assert.strictEqual(solicitud.descripcion, 'Descripcion con espacios al inicio y fin');
    });

    test('Debe fallar si faltan campos obligatorios (estudiante, curso, descripcion)', async () => {
        const solicitud = new Solicitud({});

        await assert.rejects(
            async () => {
                await solicitud.validate();
            },
            (error) => {
                assert.ok(error.errors.estudiante, 'El campo estudiante debe ser obligatorio');
                assert.ok(error.errors.curso, 'El campo curso debe ser obligatorio');
                assert.ok(error.errors.descripcion, 'El campo descripcion debe ser obligatorio');
                return true;
            }
        );
    });

    test('Debe fallar si los campos no cumplen con la longitud minima', async () => {
        const solicitud = new Solicitud({
            estudiante: 'Al', // menor a 3 caracteres
            curso: 'BD',     // menor a 3 caracteres
            descripcion: 'Hola' // menor a 5 caracteres
        });

        await assert.rejects(
            async () => {
                await solicitud.validate();
            },
            (error) => {
                assert.ok(error.errors.estudiante);
                assert.ok(error.errors.curso);
                assert.ok(error.errors.descripcion);
                return true;
            }
        );
    });

    test('Debe fallar si el estado no pertenece a los valores enum permitidos', async () => {
        const solicitud = new Solicitud({
            estudiante: 'Maria Rodriguez',
            curso: 'Programacion Web II',
            descripcion: 'Solicitud con estado invalido',
            estado: 'Cancelada' // No esta en ['Pendiente', 'En revision', 'Aprobada', 'Rechazada']
        });

        await assert.rejects(
            async () => {
                await solicitud.validate();
            },
            (error) => {
                assert.ok(error.errors.estado);
                return true;
            }
        );
    });

    test('Debe aceptar todos los estados permitidos en el enum', async () => {
        for (const estado of Solicitud.ESTADOS_VALIDOS) {
            const solicitud = new Solicitud({
                estudiante: 'Estudiante Test',
                curso: 'Curso Test',
                descripcion: 'Descripcion de prueba valida',
                estado
            });

            await assert.doesNotReject(async () => {
                await solicitud.validate();
            });
        }
    });

    test('Debe validar exitosamente los 6 registros del archivo seed extraido de solicituds.bson', async () => {
        assert.strictEqual(seedData.length, 6, 'Debe haber exactamente 6 registros en los datos semilla');

        for (const item of seedData) {
            const doc = new Solicitud(item);
            await assert.doesNotReject(
                async () => {
                    await doc.validate();
                },
                `El documento semilla (${item.estudiante}) debe ser 100% valido contra el esquema Mongoose`
            );
        }
    });

    test('La coleccion configurada en Mongoose debe ser "solicituds"', () => {
        assert.strictEqual(Solicitud.collection.name, 'solicituds');
    });
});
