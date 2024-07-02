const Usuario = require('../models/usuariom');
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.findOne = async (nombre, contrasena) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        nombre: nombre
      }
    });
    if (usuario) {
      if (await bcrypt.compare(contrasena, usuario.contrasena)) {
        return { message: 'Autenticado correctamente' };
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } else {
      throw new Error('Usuario no encontrado');
    }
  } catch (error) {
    throw error;
  }
};

// Actualizar un usuario por ID
exports.updateUsuario = async (req, res) => {
  try {
    const [updated] = await Usuario.update(req.body, {
      where: { nombre: req.params.id }
    });
    if (updated) {
      const updatedUsuario = await Usuario.findByPk(req.params.id);
      res.status(200).json(updatedUsuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUsuario = async (req, res) => {
  try {
    const deleted = await Usuario.destroy({
      where: { nombre: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
