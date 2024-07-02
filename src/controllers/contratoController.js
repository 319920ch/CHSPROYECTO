const Contrato = require('../models/contratom');

// Crear un nuevo contrato
exports.createContrato = async (req, res) => {
  try {
    const nuevoContrato = await Contrato.create(req.body);
    res.status(201).json(nuevoContrato);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los contratos
exports.getContratos = async (req, res) => {
  try {
    const contratos = await Contrato.findAll();
    res.status(200).json(contratos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un contrato por ID
exports.getContratoById = async (req, res) => {
  try {
    const contrato = await Contrato.findByPk(req.params.id);
    if (contrato) {
      res.status(200).json(contrato);
    } else {
      res.status(404).json({ message: 'Contrato no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un contrato por ID
exports.updateContrato = async (req, res) => {
  try {
    const [updated] = await Contrato.update(req.body, {
      where: { id_contrato: req.params.id }
    });
    if (updated) {
      const updatedContrato = await Contrato.findByPk(req.params.id);
      res.status(200).json(updatedContrato);
    } else {
      res.status(404).json({ message: 'Contrato no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un contrato por ID
exports.deleteContrato = async (req, res) => {
  try {
    const deleted = await Contrato.destroy({
      where: { id_contrato: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Contrato eliminado' });
    } else {
      res.status(404).json({ message: 'Contrato no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
