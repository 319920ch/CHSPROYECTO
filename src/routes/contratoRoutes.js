const express = require('express');
const router = express.Router();
const contratoController = require('../controllers/contratoController');

// Rutas para los contratos
router.post('/', contratoController.createContrato);
router.get('/', contratoController.getContratos);
router.get('/:id', contratoController.getContratoById);
router.put('/:id', contratoController.updateContrato);
router.delete('/:id', contratoController.deleteContrato);

module.exports = router;
