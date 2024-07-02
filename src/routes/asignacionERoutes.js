const express = require('express');
const router = express.Router();
const asignaE = require('../controllers/asignacionE');

// Rutas para los empleados
router.post('/asigE', asignaE.asignarEmpleado);

module.exports = router;
