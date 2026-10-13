const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitud.controller');

// GET: consultar todas las solicitudes (con soporte de filtros opcionales por query)
router.get('/', (req, res) => solicitudController.obtenerTodas(req, res));

// GET: consultar una solicitud por ID
router.get('/:id', (req, res) => solicitudController.obtenerPorId(req, res));

// POST: crear una solicitud
router.post('/', (req, res) => solicitudController.crear(req, res));

// PUT: actualizar una solicitud completa
router.put('/:id', (req, res) => solicitudController.actualizar(req, res));

// PATCH: actualizar parcialmente una solicitud
router.patch('/:id', (req, res) => solicitudController.actualizarParcial(req, res));

// DELETE: eliminar una solicitud
router.delete('/:id', (req, res) => solicitudController.eliminar(req, res));

module.exports = router;
