const Area = require('../models/aream');

// Crear un nuevo área
exports.createArea = async (req, res) => {
  try {
    const nuevaArea = await Area.create(req.body);
    res.status(201).json(nuevaArea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las áreas
exports.getAreas = async (req, res) => {
  try {
    const areas = await Area.findAll();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un área por ID
exports.getAreaById = async (req, res) => {
  try {
    const area = await Area.findByPk(req.params.id);
    if (area) {
      res.status(200).json(area);
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un área por ID
exports.updateArea = async (req, res) => {
  try {
    const [updated] = await Area.update(req.body, {
      where: { id_area: req.params.id }
    });
    if (updated) {
      const updatedArea = await Area.findByPk(req.params.id);
      res.status(200).json(updatedArea);
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un área por ID
exports.deleteArea = async (req, res) => {
  try {
    const deleted = await Area.destroy({
      where: { id_area: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Área eliminada' });
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

