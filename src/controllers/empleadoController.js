const Empleado = require('../models/empleadom');

// Crear un nuevo empleado
exports.createEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = await Empleado.create(req.body);
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los empleados
exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un empleado por ID
exports.getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un empleado por ID
exports.updateEmpleado = async (req, res) => {
  try {
    const [updated] = await Empleado.update(req.body, {
      where: { id_empleado: req.params.id }
    });
    if (updated) {
      const updatedEmpleado = await Empleado.findByPk(req.params.id);
      res.status(200).json(updatedEmpleado);
    } else {
      res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un empleado por ID
exports.deleteEmpleado = async (req, res) => {
  try {
    const deleted = await Empleado.destroy({
      where: { id_empleado: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Empleado eliminado' });
    } else {
      res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
