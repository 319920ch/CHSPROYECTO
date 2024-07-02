const Recomendacion = require('../models/recomendacionm');

// Crear una nueva recomendación
exports.createRecomendacion = async (req, res) => {
  try {
    const nuevaRecomendacion = await Recomendacion.create(req.body);
    res.status(201).json(nuevaRecomendacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las recomendaciones
exports.getRecomendaciones = async (req, res) => {
  try {
    const recomendaciones = await Recomendacion.findAll();
    res.status(200).json(recomendaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una recomendación por IDs
exports.getRecomendacionById = async (req, res) => {
  try {
    const { id_area, id_proyecto, id_contrato } = req.params;
    const recomendacion = await Recomendacion.findOne({
      where: { id_area, id_proyecto, id_contrato }
    });
    if (recomendacion) {
      res.status(200).json(recomendacion);
    } else {
      res.status(404).json({ message: 'Recomendación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una recomendación por IDs
exports.updateRecomendacion = async (req, res) => {
  try {
    const { id_area, id_proyecto, id_contrato } = req.params;
    const [updated] = await Recomendacion.update(req.body, {
      where: { id_area, id_proyecto, id_contrato }
    });
    if (updated) {
      const updatedRecomendacion = await Recomendacion.findOne({
        where: { id_area, id_proyecto, id_contrato }
      });
      res.status(200).json(updatedRecomendacion);
    } else {
      res.status(404).json({ message: 'Recomendación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una recomendación por IDs
exports.deleteRecomendacion = async (req, res) => {
  try {
    const { id_area, id_proyecto, id_contrato } = req.params;
    const deleted = await Recomendacion.destroy({
      where: { id_area, id_proyecto, id_contrato }
    });
    if (deleted) {
      res.status(204).json({ message: 'Recomendación eliminada' });
    } else {
      res.status(404).json({ message: 'Recomendación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
