const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

// Rutas para los proyectos
router.post('/', estadoController.createEstado);
router.get('/', estadoController.getEstado);
router.get('/:id', estadoController.getEstadoById);
router.put('/:id', estadoController.updateEstado);
router.delete('/:id', estadoController.deleteEstado);

module.exports = router;
