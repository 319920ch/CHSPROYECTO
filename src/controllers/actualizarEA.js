const Estadoarea = require('../models/estadoarea');


exports.actualizarEstadoArea = async (req, res) => {
  try {
    const { id_area, nuevo_estado, id_contrato, id_proyecto } = req.body;

    // Verificar que se hayan proporcionado todos los campos requeridos
    if (!id_area || !nuevo_estado || !id_contrato || !id_proyecto) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Buscar el estado de área por sus claves primarias
    const estadoArea = await Estadoarea.findOne({
      where: {
        id_area,
        id_contrato,
        id_proyecto
      }
    });

    // Verificar que el estado de área exista
    if (!estadoArea) {
      return res.status(404).json({ error: 'Estado de área no encontrado' });
    }

    // Actualizar el estado de área
    const updateData = { id_estado: nuevo_estado };
    await Estadoarea.update(updateData, {
      where: {
        id_area,
        id_contrato,
        id_proyecto
      }
    });

    res.status(200).json({
      message: 'Estado de área actualizado',
      id_area,
      id_estado: nuevo_estado,
      id_contrato,
      id_proyecto
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};