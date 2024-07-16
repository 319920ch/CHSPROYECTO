const Asignacion = require('../models/asignacionm');

// Crear una nueva asignación
exports.createAsignacion = async (req, res) => {
  try {
    const nuevaAsignacion = await Asignacion.create(req.body);
    res.status(201).json(nuevaAsignacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las asignaciones
exports.getAsignaciones = async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll();
    res.status(200).json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Obtener asignaciones por ID de contrato y área (sin empleado)
exports.getAsignacionesByContratoYArea = async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll({
      where: {
        id_area: req.params.id_area,
        id_contrato: req.params.id_contrato
      }
    });
    if (asignaciones.length > 0) {
      res.status(200).json(asignaciones);
    } else {
      res.status(404).json({ message: 'No se encontraron asignaciones para este contrato y área' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Obtener una asignación por ID
exports.getAsignacionById = async (req, res) => {
  try {
    const asignacion = await Asignacion.findOne({
      where: {
        id_area: req.params.id_area,
        id_empleado: req.params.id_empleado,
        id_contrato: req.params.id_contrato
      }
    });
    if (asignacion) {
      res.status(200).json(asignacion);
    } else {
      res.status(404).json({ message: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una asignación por ID
exports.updateAsignacion = async (req, res) => {
  try {
    const [updated] = await Asignacion.update(req.body, {
      where: { 
        id_area: req.params.id_area,
        id_empleado: req.params.id_empleado,
        id_contrato: req.params.id_contrato}
    });
    if (updated) {
      const updatedAsignacion = await Asignacion.findByPk(req.params.id);
      res.status(200).json(updatedAsignacion);
    } else {
      res.status(404).json({ message: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una asignación por ID
exports.deleteAsignacion = async (req, res) => {
  try {
    const deleted = await Asignacion.destroy({
      where: {
        id_area: req.params.id_area,
        id_empleado: req.params.id_empleado,
        id_contrato: req.params.id_contrato
      }
    });
    if (deleted) {
      res.status(204).json({ message: 'Asignación eliminada' });
    } else {
      res.status(404).json({ message: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
