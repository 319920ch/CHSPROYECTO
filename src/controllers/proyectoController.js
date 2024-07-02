const Proyecto = require('../models/proyectom');

// Crear un nuevo proyecto
exports.createProyecto = async (req, res) => {
  try {
    const nuevoProyecto = await Proyecto.create(req.body);
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los proyectos
exports.getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un proyecto por ID
exports.getProyectoById = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      res.status(200).json(proyecto);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un proyecto por ID
exports.updateProyecto = async (req, res) => {
  try {
    const [updated] = await Proyecto.update(req.body, {
      where: { id_proyecto: req.params.id }
    });
    if (updated) {
      const updatedProyecto = await Proyecto.findByPk(req.params.id);
      res.status(200).json(updatedProyecto);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un proyecto por ID
exports.deleteProyecto = async (req, res) => {
  try {
    const deleted = await Proyecto.destroy({
      where: { id_proyecto: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Proyecto eliminado' });
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
