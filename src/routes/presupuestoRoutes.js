const express = require('express');
const router = express.Router();
const presupuestoController = require('../controllers/presupuestoController');

// Rutas para los presupuestos
router.post('/', presupuestoController.createPresupuesto);
router.get('/', presupuestoController.getPresupuestos);
router.get('/:id_area/:id_proyecto/:id_contrato', presupuestoController.getPresupuestoById);
router.put('/:id_area/:id_proyecto/:id_contrato', presupuestoController.updatePresupuesto);
router.delete('/:id_area/:id_proyecto/:id_contrato', presupuestoController.deletePresupuesto);

module.exports = router;
