const express = require('express');
const router = express.Router();
const estadoareaController = require('../controllers/estadoareaController');

// Rutas para los estados de área

// Crear un estado de área
router.post('/', estadoareaController.createEstadoarea);

// Obtener todos los estados de área
router.get('/', estadoareaController.getEstadoarea);

// Obtener un estado de área por ID de estado, ID de contrato, ID de área y ID de proyecto
router.get('/:id_estado/id_contrato/:id_contrato/id_area/:id_area/id_proyecto/:id_proyecto', estadoareaController.getEstadoareaoById);

// Actualizar un estado de área por ID de estado, ID de contrato, ID de área y ID de proyecto
router.put('/', estadoareaController.actualizarEstadoArea);


// Eliminar un estado de área por ID de estado, ID de contrato, ID de área y ID de proyecto
router.delete('/:id_estado/id_contrato/:id_contrato/id_area/:id_area/id_proyecto/:id_proyecto', estadoareaController.deleteEstadoarea);

module.exports = router;
