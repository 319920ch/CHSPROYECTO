// routes/progresoRoutes.js

const express = require('express');
const router = express.Router();
const progresoController = require('../controllers/progresoController');

router.post('/', progresoController.createProgreso);
router.get('/', progresoController.getProgresos);
router.get('/:id_area/:id_estado/:id_contrato/:id_proyecto', progresoController.getProgresoById);
router.put('/:id_area/:id_contrato/:id_proyecto', progresoController.updateProgreso);
router.delete('/:id_area/:id_estado/:id_contrato/:id_proyecto', progresoController.deleteProgreso);

module.exports = router;
