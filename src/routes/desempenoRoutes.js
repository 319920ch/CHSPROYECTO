const express = require('express');
const router = express.Router();
const desempenoController = require('../controllers/desempenoController');

// Rutas para los desempeños
router.post('/', desempenoController.createDesempeno);
router.get('/', desempenoController.getDesempenos);
router.get('/:id', desempenoController.getDesempenoById);
router.put('/:id', desempenoController.updateDesempeno);
router.delete('/:id', desempenoController.deleteDesempeno);

module.exports = router;
