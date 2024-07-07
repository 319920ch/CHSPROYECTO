const express = require('express');
const router = express.Router();
const Rempleado = require('../controllers/registroempleados');

// Rutas para las evaluaciones

router.post('/', Rempleado.registerEmpleado);

module.exports = router;