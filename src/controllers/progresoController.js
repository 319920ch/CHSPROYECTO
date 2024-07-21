// controllers/progresoController.js

const Progreso = require('../models/progreso');

// Crear un nuevo progreso
exports.createProgreso = async (req, res) => {
  const { id_area, id_estado, id_contrato, id_proyecto, progreso } = req.body;
  try {
    const nuevoProgreso = await Progreso.create({
      id_area,
      id_estado,
      id_contrato,
      id_proyecto,
      progreso,
    });
    res.status(201).json(nuevoProgreso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los progresos
exports.getProgresos = async (req, res) => {
  try {
    const progresos = await Progreso.findAll();
    res.status(200).json(progresos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un progreso por ID
exports.getProgresoById = async (req, res) => {
  const { id_area, id_estado, id_contrato, id_proyecto } = req.params;
  try {
    const progreso = await Progreso.findOne({
      where: { id_area, id_estado, id_contrato, id_proyecto },
    });
    if (progreso) {
      res.status(200).json(progreso);
    } else {
      res.status(404).json({ error: 'Progreso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un progreso existente
exports.updateProgreso = async (req, res) => {
    const { id_area, id_contrato, id_proyecto } = req.params;
    const { progreso } = req.body;
    try {
      const [updated] = await Progreso.update(
        { progreso },
        {
          where: { id_area, id_contrato, id_proyecto },
        }
      );
      if (updated) {
        const updatedProgreso = await Progreso.findOne({
          where: { id_area, id_contrato, id_proyecto },
        });
        res.status(200).json(updatedProgreso);
      } else {
        res.status(404).json({ error: 'Progreso no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Eliminar un progreso
exports.deleteProgreso = async (req, res) => {
  const { id_area, id_estado, id_contrato, id_proyecto } = req.params;
  try {
    const deleted = await Progreso.destroy({
      where: { id_area, id_estado, id_contrato, id_proyecto },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Progreso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
