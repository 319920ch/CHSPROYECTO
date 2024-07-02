const express = require('express');
const router = express.Router();
const initContratoController = require('../controllers/initContrato');

router.post('/iniciar', initContratoController.initContrato);
router.post('/actualizarEstado', initContratoController.updateEstadoContrato);
//router.post('/actualizarFin', initContratoController.updateFechaFinContrato);


module.exports = router;