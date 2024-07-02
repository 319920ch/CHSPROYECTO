const express = require('express');
const router = express.Router();
const Rempleado = require('../controllers/registroempleados');

// Rutas para las evaluaciones

router.post('/iniciar', Rempleado.registerEmpleado);

module.exports = router;