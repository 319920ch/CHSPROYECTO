const express = require('express');
const router = express.Router();
const areasPresupuesto = require('../controllers/areasPresupuestoController');

router.post('/iniciar', areasPresupuesto.asignarAreasProyecto);
router.put('/modificarP', areasPresupuesto.modificarPresupuestoArea);
router.post('/', areasPresupuesto.obtenerProyectosPorContrato);

module.exports = router;