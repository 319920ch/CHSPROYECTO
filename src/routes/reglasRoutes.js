const express = require('express');
const router = express.Router();
const reglasController = require('../controllers/reglasController');

// Rutas para los presupuestos
router.post('/', reglasController.createRegla);
router.get('/', reglasController.getReglas);
router.get('/:id', reglasController.getReglaById);
router.put('/:id', reglasController.updateRegla);
router.delete('/:id', reglasController.deleteRegla);

module.exports = router;
