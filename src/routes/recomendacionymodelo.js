const express = require('express');
const router = express.Router();
const recomendacionymodelo = require('../controllers/recomendacionymodelo');

// Rutas para las evaluaciones

router.post('/sugerir', recomendacionymodelo.sugerirEmpleados);
router.put('/actualizar', recomendacionymodelo.actualizarCantidadAsignada);
router.post('/listaE', recomendacionymodelo.obtenerEmpleadosPorDesempeno);
router.get('/adicional', recomendacionymodelo.recomendarAsignacionAdicional);

module.exports = router;