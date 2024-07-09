const Evaluacion = require('../models/evaluacionm');

// Crear una evaluación
exports.createEvaluacion = async (req, res) => {
  try {
    const nuevaEvaluacion = await Evaluacion.create(req.body);
    res.status(201).json(nuevaEvaluacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las evaluaciones
exports.getEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.findAll();
    res.status(200).json(evaluaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una evaluación por ID de área, ID de empleado y ID de desempeño
exports.getEvaluacionById = async (req, res) => {
  try {
    const evaluacion = await Evaluacion.findOne({
      where: {
        id_area: req.params.id_area,
        id_empleado: req.params.id_empleado,
        id_desempeno: req.params.id_desempeno
      }
    });
    if (evaluacion) {
      res.status(200).json(evaluacion);
    } else {
      res.status(404).json({ message: 'Evaluación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una evaluación por ID de área, ID de empleado y ID de desempeño
exports.actualizarEvaluacion = async (req, res) => {
  try {
    const [updated] = await Evaluacion.update(req.body, {
      where: {
        id_area: req.params.id_area,
        id_empleado: req.params.id_empleado,
        id_desempeno: req.params.id_desempeno
      }
    });
    if (updated) {
      const updatedEvaluacion = await Evaluacion.findOne({
        where: {
          id_area: req.params.id_area,
          id_empleado: req.params.id_empleado,
          id_desempeno: req.params.id_desempeno
        }
      });
      res.status(200).json(updatedEvaluacion);
    } else {
      res.status(404).json({ message: 'Evaluación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una evaluación por ID de área, ID de empleado y ID de desempeño
exports.deleteEvaluacion = async (req, res) => {
  try {
    const deleted = await Evaluacion.destroy({
      where: {
        id_area: req.params.id_area,
        id_empleado: req.params.id_empleado,
        id_desempeno: req.params.id_desempeno
      }
    });
    if (deleted) {
      res.status(204).json({ message: 'Evaluación eliminada' });
    } else {
      res.status(404).json({ message: 'Evaluación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
