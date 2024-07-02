const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

// Rutas para los proyectos
router.post('/', proyectoController.createProyecto);
router.get('/', proyectoController.getProyectos);
router.get('/:id', proyectoController.getProyectoById);
router.put('/:id', proyectoController.updateProyecto);
router.delete('/:id', proyectoController.deleteProyecto);

module.exports = router;
