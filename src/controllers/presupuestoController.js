const Presupuesto = require('../models/presupuestom');

// Crear un nuevo presupuesto
exports.createPresupuesto = async (req, res) => {
  try {
    const nuevoPresupuesto = await Presupuesto.create({
      id_contrato: req.body.id_contrato,
      id_proyecto: req.body.id_proyecto,
      id_area: req.body.id_area,
      monto: req.body.monto,
    });
    res.status(201).json(nuevoPresupuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los presupuestos
exports.getPresupuestos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.findAll();
    res.status(200).json(presupuestos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un presupuesto por ID
exports.getPresupuestoById = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({
      where: {
        id_contrato: req.params.id_contrato,
        id_proyecto: req.params.id_proyecto,
        id_area: req.params.id_area,
      },
    });
    if (presupuesto) {
      res.status(200).json(presupuesto);
    } else {
      res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un presupuesto por ID
exports.updatePresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({
      where: {
        id_contrato: req.params.id_contrato,
        id_proyecto: req.params.id_proyecto,
        id_area: req.params.id_area,
      },
    });
    if (presupuesto) {
      await presupuesto.update({
        monto: req.body.monto,
      });
      res.status(200).json(presupuesto);
    } else {
      res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un presupuesto por ID
exports.deletePresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({
      where: {
        id_contrato: req.params.id_contrato,
        id_proyecto: req.params.id_proyecto,
        id_area: req.params.id_area,
      },
    });
    if (presupuesto) {
      await presupuesto.destroy();
      res.status(204).json({ message: 'Presupuesto eliminado' });
    } else {
      res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ...
// Obtener todos los proyectos con sus areas por ID de contrato
exports.getProyectosByContrato = async (req, res) => {
  try {
    const proyectos = await Presupuesto.findAll({
      where: {
        id_contrato: req.params.id_contrato,
      },
      attributes: ['id_proyecto', 'id_area', 'monto' ],
      group: ['id_proyecto', 'id_area', 'monto' ],
    });
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};