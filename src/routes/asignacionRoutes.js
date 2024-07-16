const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/asignacionController');

// Rutas para las asignaciones
router.post('/', asignacionController.createAsignacion);
router.get('/', asignacionController.getAsignaciones);
router.get('/:id_area/:id_empleado/:id_contrato', asignacionController.getAsignacionById);
router.get('/:id_area/:id_contrato', asignacionController.getAsignacionesByContratoYArea);
router.put('/:id_area/:id_empleado/:id_contrato', asignacionController.updateAsignacion);
router.delete('/:id_area/:id_empleado/:id_contrato', asignacionController.deleteAsignacion);

module.exports = router;
