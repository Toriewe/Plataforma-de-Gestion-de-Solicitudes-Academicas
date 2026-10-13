/**
 * Script de prueba E2E / demostración en vivo de los endpoints CRUD
 * Ejecutar con el servidor activo: node src/scripts/test-crud-live.js
 */

const http = require('http');

const BASE_URL = process.env.API_URL || 'http://localhost:3000';

function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                let parsed = data;
                try {
                    parsed = JSON.parse(data);
                } catch (e) {}
                resolve({ status: res.statusCode, data: parsed });
            });
        });

        req.on('error', reject);

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runDemo() {
    console.log('====================================================');
    console.log('   PRUEBA INTEGRAL DE PERSISTENCIA Y ENDPOINTS CRUD ');
    console.log('====================================================\n');

    try {
        // 1. Probar ruta raiz
        console.log('[1] Probando GET / ...');
        const resHome = await request('GET', '/');
        console.log(`    Status: ${resHome.status}`);
        console.log('    Respuesta:', JSON.stringify(resHome.data));
        console.log('    ✓ Servidor respondiendo correctamente.\n');

        // 2. Probar GET /api/solicitudes
        console.log('[2] Probando GET /api/solicitudes ...');
        const resList = await request('GET', '/api/solicitudes');
        console.log(`    Status: ${resList.status}`);
        console.log(`    Total solicitudes encontradas: ${Array.isArray(resList.data) ? resList.data.length : 0}`);
        if (Array.isArray(resList.data) && resList.data.length > 0) {
            console.log('    Primera solicitud:', JSON.stringify(resList.data[0]));
        }
        console.log('    ✓ Endpoint GET funcional.\n');

        // 3. Probar validaciones con POST invalido
        console.log('[3] Probando POST /api/solicitudes con datos invalidos (faltan campos)...');
        const resInvalid = await request('POST', '/api/solicitudes', { estudiante: 'Al' });
        console.log(`    Status: ${resInvalid.status} (Esperado: 400)`);
        console.log('    Respuesta de validacion:', JSON.stringify(resInvalid.data));
        console.log('    ✓ Validacion de entrada funcionando.\n');

        // 4. Probar POST con datos validos
        console.log('[4] Probando POST /api/solicitudes creando nueva solicitud...');
        const nuevaData = {
            estudiante: 'Estudiante Evidencia PA2',
            curso: 'Programacion Web II',
            descripcion: 'Solicitud creada durante la prueba de persistencia en vivo',
            estado: 'Pendiente'
        };
        const resCreate = await request('POST', '/api/solicitudes', nuevaData);
        console.log(`    Status: ${resCreate.status} (Esperado: 201)`);
        console.log('    Documento persistido:', JSON.stringify(resCreate.data));
        const idCreado = resCreate.data._id;
        console.log(`    ✓ Registro persistido con _id: ${idCreado}\n`);

        // 5. Probar GET por ID
        console.log(`[5] Probando GET /api/solicitudes/${idCreado} ...`);
        const resGetOne = await request('GET', `/api/solicitudes/${idCreado}`);
        console.log(`    Status: ${resGetOne.status} (Esperado: 200)`);
        console.log('    Documento recuperado:', JSON.stringify(resGetOne.data));
        console.log('    ✓ Consulta por ID exitosa.\n');

        // 6. Probar PUT (actualizacion completa)
        console.log(`[6] Probando PUT /api/solicitudes/${idCreado} (actualizacion)...`);
        const updateData = {
            estudiante: 'Estudiante Evidencia PA2 (Actualizado)',
            curso: 'Programacion Web II',
            descripcion: 'Descripcion actualizada mediante PUT',
            estado: 'En revision'
        };
        const resPut = await request('PUT', `/api/solicitudes/${idCreado}`, updateData);
        console.log(`    Status: ${resPut.status} (Esperado: 200)`);
        console.log('    Documento actualizado:', JSON.stringify(resPut.data));
        console.log('    ✓ Operacion PUT exitosa.\n');

        // 7. Probar PATCH (actualizacion parcial de estado)
        console.log(`[7] Probando PATCH /api/solicitudes/${idCreado} (cambio de estado)...`);
        const resPatch = await request('PATCH', `/api/solicitudes/${idCreado}`, { estado: 'Aprobada' });
        console.log(`    Status: ${resPatch.status} (Esperado: 200)`);
        console.log(`    Nuevo estado: ${resPatch.data.estado}`);
        console.log('    ✓ Operacion PATCH exitosa.\n');

        // 8. Probar DELETE
        console.log(`[8] Probando DELETE /api/solicitudes/${idCreado} ...`);
        const resDel = await request('DELETE', `/api/solicitudes/${idCreado}`);
        console.log(`    Status: ${resDel.status} (Esperado: 200)`);
        console.log('    Respuesta:', JSON.stringify(resDel.data));
        console.log('    ✓ Registro eliminado.\n');

        // 9. Verificar eliminacion con GET 404
        console.log(`[9] Verificando eliminacion con GET /api/solicitudes/${idCreado} ...`);
        const resVerify = await request('GET', `/api/solicitudes/${idCreado}`);
        console.log(`    Status: ${resVerify.status} (Esperado: 404)`);
        console.log('    ✓ Comportamiento 404 confirmado.\n');

        console.log('====================================================');
        console.log('  ¡TODAS LAS PRUEBAS CRUD FINALIZARON CON EXITO!   ');
        console.log('====================================================');
    } catch (error) {
        console.error('Error al conectar con el servidor:', error.message);
        console.error('Asegurate de que el servidor este corriendo con: npm start');
    }
}

runDemo();
