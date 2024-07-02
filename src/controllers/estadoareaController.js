const Estadoarea = require('../models/estadoarea');

// Crear un nuevo presupuesto
exports.createEstadoarea = async (req, res) => {
  try {
    const nuevoEstadoarea = await Estadoarea.create({
      id_estado: req.body.id_estado,
      id_contrato: req.body.id_contrato,
      id_area: req.body.id_area,
      id_proyecto: req.body.id_proyecto,
    });
    res.status(201).json(nuevoEstadoarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los presupuestos
exports.getEstadoarea = async (req, res) => {
  try {
    const estadoareas = await Estadoarea.findAll();
    res.status(200).json(estadoareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un estado de área por ID de estado, ID de contrato, ID de área y ID de proyecto
exports.getEstadoareaoById = async (req, res) => {
  try {
    const estadoarea = await Estadoarea.findOne({
      where: {
        id_estado: req.params.id_estado,
        id_contrato: req.params.id_contrato,
        id_area: req.params.id_area,
        id_proyecto: req.params.id_proyecto
      }
    });
    if (estadoarea) {
      res.status(200).json(estadoarea);
    } else {
      res.status(404).json({ message: 'Estado de área no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un estado de área por ID de estado, ID de contrato, ID de área y ID de proyecto
exports.updateEstadoarea = async (req, res) => {
  try {
    const [updated] = await Estadoarea.update(req.body, {
      where: {
        id_estado: req.params.id_estado,
        id_contrato: req.params.id_contrato,
        id_area: req.params.id_area,
        id_proyecto: req.params.id_proyecto
      }
    });
    if (updated) {
      const updatedEstadoarea = await Estadoarea.findOne({
        where: {
          id_estado: req.params.id_estado,
          id_contrato: req.params.id_contrato,
          id_area: req.params.id_area,
          id_proyecto: req.params.id_proyecto
        }
      });
      res.status(200).json(updatedEstadoarea);
    } else {
      res.status(404).json({ message: 'Estado de área no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un estado de área por ID de estado, ID de contrato, ID de área y ID de proyecto
exports.deleteEstadoarea = async (req, res) => {
  try {
    const deleted = await Estadoarea.destroy({
      where: {
        id_estado: req.params.id_estado,
        id_contrato: req.params.id_contrato,
        id_area: req.params.id_area,
        id_proyecto: req.params.id_proyecto
      }
    });
    if (deleted) {
      res.status(204).json({ message: 'Estado de área eliminado' });
    } else {
      res.status(404).json({ message: 'Estado de área no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
