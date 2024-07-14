const Estadoarea = require('../models/estadoarea');
const Estado = require('../models/estadom');

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

exports.actualizarEstadoArea = async (req, res) => {
  const { id_area, nuevo_estado, id_contrato, id_proyecto } = req.body;

  console.log('Datos recibidos:', { id_area, nuevo_estado, id_contrato, id_proyecto });

  try {
    // Verificar que el nuevo estado existe
    const estadoExistente = await Estado.findByPk(nuevo_estado);
    if (!estadoExistente) {
      console.error('El estado especificado no existe');
      return res.status(400).json({ error: 'El estado especificado no existe' });
    }

    // Actualizar el estado del área
    const resultado = await Estadoarea.update(
      { id_estado: nuevo_estado },
      {
        where: {
          id_area,
          id_contrato,
          id_proyecto,
        },
      }
    );

    if (resultado[0] === 0) {
      console.error('No se encontró el registro para actualizar');
      return res.status(404).json({ error: 'No se encontró el registro para actualizar' });
    }

    console.log('Estado actualizado correctamente');
    res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el estado del área:', error);
    res.status(500).json({ error: 'Error al actualizar el estado del área' });
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
