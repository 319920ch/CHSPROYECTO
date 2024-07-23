const express = require('express');
const router = express.Router();
const evaluacionController = require('../controllers/evaluacionController');

// Rutas para las evaluaciones

// Crear una evaluación
router.post('/', evaluacionController.createEvaluacion);

// Obtener todas las evaluaciones
router.get('/', evaluacionController.getEvaluaciones);

// Obtener una evaluación por ID de área, ID de empleado y ID de desempeño
router.get('/:id_area/:id_empleado/:id_desempeno', evaluacionController.getEvaluacionById);

// Actualizar una evaluación por ID de área, ID de empleado y ID de desempeño
router.put('/:id_area/:id_empleado', evaluacionController.actualizarEvaluacion);

// Eliminar una evaluación por ID de área, ID de empleado y ID de desempeño
router.delete('/:id_area/:id_empleado/:id_desempeno', evaluacionController.deleteEvaluacion);

module.exports = router;
