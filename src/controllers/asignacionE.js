const Asignacion = require('../models/asignacionm');
const Empleado = require('../models/empleadom');
const Area = require('../models/aream');

exports.asignarEmpleado = async (req, res) => {
  try {
    const { id_area, id_empleado, id_contrato } = req.body;

    // Verificar que se hayan proporcionado todos los campos requeridos
    if (!id_area ||!id_empleado ||!id_contrato) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar que el área exista
    const area = await Area.findByPk(id_area);
    if (!area) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }

    // Verificar que el empleado exista
    const empleado = await Empleado.findByPk(id_empleado);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    // Verificar que no exista una asignación previa para el empleado y área
    const asignacionExistente = await Asignacion.findOne({
      where: {
        id_area,
        id_empleado,
        id_contrato
      }
    });
    if (asignacionExistente) {
      return res.status(400).json({ error: 'Asignación ya existe' });
    }

    // Crear una nueva asignación
    const nuevaAsignacion = await Asignacion.create({
      id_area,
      id_empleado,
      id_contrato
    });

    // Return the desired fields in the response
    res.status(201).json({
      nombreEmpleado: empleado.nombres,
      apellidoEmpleado: empleado.apellidos,
      nombreArea: area.nombre_area,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};