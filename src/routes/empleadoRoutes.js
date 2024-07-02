const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Rutas para los empleados
router.post('/', empleadoController.createEmpleado);
router.get('/', empleadoController.getEmpleados);
router.get('/:id', empleadoController.getEmpleadoById);
router.put('/:id', empleadoController.updateEmpleado);
router.delete('/:id', empleadoController.deleteEmpleado);

module.exports = router;
