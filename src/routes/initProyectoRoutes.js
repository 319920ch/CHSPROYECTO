const express = require('express');
const router = express.Router();
const initProyectoController = require('../controllers/initProyectoController');

router.post('/iniciar', initProyectoController.initProyecto);
router.post('/actualizarEstado', initProyectoController.updateEstadoProyecto);
router.post('/actualizarFin', initProyectoController.updateFechaFinProyecto);


module.exports = router;