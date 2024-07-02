const Rol = require('../models/rolm');

// Crear un nuevo rol
exports.createRol = async (req, res) => {
  try {
    const nuevoRol = await Rol.create(req.body);
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los roles
exports.getRoles = async (req, res) => {
  try {
    console.log('Obteniendo roles...');
    const roles = await Rol.findAll();
    console.log('Roles obtenidos:', roles);
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener un rol por ID
exports.getRolById = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (rol) {
      res.status(200).json(rol);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un rol por ID
exports.updateRol = async (req, res) => {
  try {
    const [updated] = await Rol.update(req.body, {
      where: { id_rol: req.params.id }
    });
    if (updated) {
      const updatedRol = await Rol.findByPk(req.params.id);
      res.status(200).json(updatedRol);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un rol por ID
exports.deleteRol = async (req, res) => {
  try {
    const deleted = await Rol.destroy({
      where: { id_rol: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Rol eliminado' });
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
