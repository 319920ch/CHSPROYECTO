const Proyecto = require('../models/proyectom');

// Iniciar un proyecto
exports.initProyecto = async (req, res) => {
  try {
    const { id_contrato, id_producto, cantidad_producto, fecha_inicio, fecha_fin } = req.body;
    const fechaActual = new Date();

    // Convertir fechas a objetos Date
    const fechaInicio = new Date(fecha_inicio);
    const fechaFin = new Date(fecha_fin);

    // Validar que las fechas sean válidas
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      return res.status(400).json({ error: 'Formato de fecha inválido' });
    }

    // Validar las condiciones en un if compuesto
    if (fechaInicio >= fechaActual && 
        fechaFin >= fechaActual && 
        fechaFin >= fechaInicio && 
        fechaInicio.getDay() !== 0 && 
        fechaFin.getDay() !== 0) {

      // Crear el proyecto solo si todas las validaciones son exitosas
      const proyecto = await Proyecto.create({
        id_contrato,
        id_producto,
        cantidad_producto,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        id_estado: 1, // Estado inicial del proyecto
      });

      const estado = await proyecto.getEstado();
      const estadoNombre = estado ? estado.estado : null;

      return res.status(201).json({
        message: 'Proyecto iniciado',
        id_proyecto: proyecto.id_proyecto,
        id_contrato: proyecto.id_contrato,
        id_producto: proyecto.id_producto,
        cantidad_producto: proyecto.cantidad_producto,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin,
        estado: estadoNombre,
      });

    } else {
      // Validaciones fallidas
      let error = 'Error en la validación de fechas:';
      if (fechaInicio < fechaActual) {
        error += ' La fecha de inicio no puede ser antes de la fecha actual.';
      }
      if (fechaFin < fechaActual) {
        error += ' La fecha de fin no puede ser antes de la fecha actual.';
      }
      if (fechaFin < fechaInicio) {
        error += ' La fecha de fin no puede ser antes de la fecha de inicio.';
      }
      if (fechaInicio.getDay() === 0 || fechaFin.getDay() === 0) {
        error += ' La fecha de inicio y fin no pueden caer en un día domingo.';
      }
      return res.status(400).json({ error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  exports.updateEstadoProyecto = async (req, res) => {
    try {
      const { id_proyecto, id_estado } = req.body;
      const proyecto = await Proyecto.findByPk(id_proyecto);
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      await proyecto.update({ id_estado });
      const estado = await proyecto.getEstado();
      const estadoNombre = estado? estado.estado : null;
  
      res.status(201).json({
        message: 'Proyecto actualizado en su estado',
        id_proyecto: proyecto.id_proyecto,
        id_contrato: proyecto.id_contrato,
        id_producto: proyecto.id_producto,
        cantidad_producto: proyecto.cantidad_producto,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin,
        estado: estadoNombre,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateFechaFinProyecto = async (req, res) => {
    try {
      const { id_proyecto, fecha_fin } = req.body;
      const proyecto = await Proyecto.findByPk(id_proyecto);
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      const fechaFin = new Date(fecha_fin);
      const fechaActual = new Date();
      const fechaInicio = new Date(proyecto.fecha_inicio);
  
      // Validar que la fecha de fin no sea antes de la fecha actual ni de la fecha de inicio
      if (fechaFin < fechaActual || fechaFin < fechaInicio) {
        return res.status(400).json({ error: 'La fecha de fin no puede ser antes de la fecha actual ni de la fecha de inicio' });
      }
  
      // Validar que la fecha de fin no caiga en un día domingo
      if (fechaFin.getDay() === 0) {
        return res.status(400).json({ error: 'La fecha de fin no puede caer en un día domingo' });
      }
  
      // Actualizar la fecha de fin del proyecto solo si todas las validaciones son exitosas
      await proyecto.update({ fecha_fin: fechaFin });
  
      // Obtener el estado actualizado del proyecto
      const estado = await proyecto.getEstado();
      const estadoNombre = estado ? estado.estado : null;
  
      res.status(200).json({
        message: 'Fecha de fin del proyecto actualizada',
        id_proyecto: proyecto.id_proyecto,
        id_contrato: proyecto.id_contrato,
        id_producto: proyecto.id_producto,
        cantidad_producto: proyecto.cantidad_producto,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin,
        estado: estadoNombre,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };