const { test, describe } = require('node:test');
const assert = require('node:assert');
const Usuario = require('../src/models/Usuario');

describe('Pruebas del Modelo Mongoose: Usuario', () => {

    test('Debe validar un usuario con datos validos', async () => {
        const usuario = new Usuario({
            nombre: 'Docente Carlos',
            email: 'carlos@instituto.edu.pe',
            password: 'passwordSeguro123',
            rol: 'docente'
        });

        await assert.doesNotReject(async () => {
            await usuario.validate();
        });
        assert.strictEqual(usuario.activo, true);
        assert.strictEqual(usuario.email, 'carlos@instituto.edu.pe');
    });

    test('Debe normalizar email a minusculas y aplicar trim', () => {
        const usuario = new Usuario({
            nombre: '  Estudiante Juan  ',
            email: '  JUAN.PEREZ@ISIL.PE  ',
            password: 'miPassword123'
        });

        assert.strictEqual(usuario.email, 'juan.perez@isil.pe');
        assert.strictEqual(usuario.nombre, 'Estudiante Juan');
        assert.strictEqual(usuario.rol, 'estudiante');
    });

    test('Debe fallar si el email no cumple con el formato', async () => {
        const usuario = new Usuario({
            nombre: 'Usuario Prueba',
            email: 'correo-no-valido',
            password: '123456password'
        });

        await assert.rejects(
            async () => {
                await usuario.validate();
            },
            (error) => {
                assert.ok(error.errors.email);
                return true;
            }
        );
    });

    test('Debe fallar si faltan campos obligatorios', async () => {
        const usuario = new Usuario({});

        await assert.rejects(
            async () => {
                await usuario.validate();
            },
            (error) => {
                assert.ok(error.errors.nombre);
                assert.ok(error.errors.email);
                assert.ok(error.errors.password);
                return true;
            }
        );
    });

    test('Debe fallar si el rol no es valido', async () => {
        const usuario = new Usuario({
            nombre: 'Usuario Test',
            email: 'test@isil.pe',
            password: 'password123',
            rol: 'superadmin' // No valido
        });

        await assert.rejects(
            async () => {
                await usuario.validate();
            },
            (error) => {
                assert.ok(error.errors.rol);
                return true;
            }
        );
    });
});
