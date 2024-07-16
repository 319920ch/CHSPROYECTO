const express = require('express');
const router = express.Router();
const recomendacionController = require('../controllers/recomendacionController');

// Rutas para las asignaciones
router.post('/', recomendacionController.createRecomendacion);
router.get('/', recomendacionController.getRecomendaciones);
router.get('/:id_contrato/:id_proyecto/:id_area', recomendacionController.getRecomendacionById);
router.put('/:id_contrato/:id_proyecto/:id_area', recomendacionController.updateRecomendacion);
router.delete('/:id_contrato/:id_proyecto/:id_area', recomendacionController.deleteRecomendacion);

module.exports = router;