const express = require('express');
const router = express.Router();
const estadoA = require('../controllers/actualizarEA');

// Rutas para los empleados
router.put('/modificarE', estadoA.actualizarEstadoArea);


module.exports = router;
