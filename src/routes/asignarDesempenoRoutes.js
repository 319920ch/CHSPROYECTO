const express = require('express');
const router = express.Router();
const asignarDesempeno = require('../controllers/asignarDesempeno');

router.post('/iniciar', asignarDesempeno.asignarDesempeno);
router.put('/actualizar', asignarDesempeno.actualizarD);

module.exports = router;