const Estado = require('../models/estadom');

// Crear un nuevo estado
exports.createEstado = async (req, res) => {
  try {
    const nuevoEstado = await Estado.create(req.body);
    res.status(201).json(nuevoEstado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas los estados
exports.getEstado = async (req, res) => {
  try {
    const estados = await Estado.findAll();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un estado por ID
// Obtener un estado por ID
exports.getEstadoById = async (req, res) => {
  try {
    console.log('Fetching state with ID:', req.params.id); // Debug log
    const estado = await Estado.findByPk(req.params.id);
    if (estado) {
      console.log('State found:', estado); // Debug log
      res.status(200).json({ nombre_estado: estado.nombre_estado });
    } else {
      res.status(200).json({ nombre_estado: 'Estado no encontrado' });
    }
  } catch (error) {
    console.error('Error fetching state:', error); // Debug log
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un estado por ID
exports.updateEstado = async (req, res) => {
  try {
    const [updated] = await Estado.update(req.body, {
      where: { id_estado: req.params.id }
    });
    if (updated) {
      const updatedEstado = await Estado.findByPk(req.params.id);
      res.status(200).json(updatedEstado);
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un estado por ID
exports.deleteEstado = async (req, res) => {
  try {
    const deleted = await Estado.destroy({
      where: { id_estado: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Estado eliminado' });
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
