const Contrato = require('../models/contratom');

exports.initContrato = async (req, res) => {
  try {
    const { cliente, presupuesto, fecha_inicio, fecha_fin } = req.body;
    const fechaActual = new Date();

    // Parsear las fechas
    const fechaInicio = new Date(fecha_inicio);
    const fechaFin = new Date(fecha_fin);

    // Validar que las fechas sean válidas
    if (isNaN(fechaInicio.getTime())) {
      return res.status(400).json({ error: 'Formato de fecha inválido para fecha de inicio' });
    }

    if (isNaN(fechaFin.getTime())) {
      return res.status(400).json({ error: 'Formato de fecha inválido para fecha fin' });
    }

    // Validar condiciones
    let error = '';

    if (fechaInicio < fechaActual) {
      error += 'La fecha de inicio no puede ser antes de la fecha actual. ';
    }

    if (fechaFin < fechaActual) {
      error += 'La fecha de fin no puede ser antes de la fecha actual. ';
    }

    if (fechaFin < fechaInicio) {
      error += 'La fecha de fin no puede ser antes de la fecha de inicio. ';
    }

    if (fechaInicio.getDay() === 0 || fechaFin.getDay() === 0) {
      error += 'La fecha de inicio y fin no pueden caer en un día domingo. ';
    }

    // Si hay errores, retornar el error
    if (error) {
      return res.status(400).json({ error: 'Error en la validación de fechas: ' + error });
    }

    // Crear el contrato si la validación es exitosa
    const contrato = await Contrato.create({
      cliente,
      presupuesto,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin, // Inicializar la fecha fin correctamente
      id_estado: 1, // Estado inicial del contrato
    });

    // Obtener el estado actualizado del contrato
    const estado = await contrato.getEstado();
    const estadoNombre = estado ? estado.estado : null;

    return res.status(201).json({
      message: 'Contrato iniciado',
      id_contrato: contrato.id_contrato,
      cliente: contrato.cliente,
      presupuesto: contrato.presupuesto,
      fecha_inicio: contrato.fecha_inicio,
      fecha_fin: contrato.fecha_fin,
      estado: estadoNombre,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEstadoContrato = async (req, res) => {
  try {
    const { id_contrato, id_estado } = req.body;
    const contrato = await Contrato.findByPk(id_contrato);
    
    if (!contrato) {
      return res.status(404).json({ error: 'Contrato no encontrado' });
    }

    await contrato.update({ id_estado });

    // Obtener el estado actualizado del contrato
    const estado = await contrato.getEstado();
    const estadoNombre = estado ? estado.estado : null;

    return res.status(200).json({
      message: 'Estado de contrato actualizado',
      id_contrato: contrato.id_contrato,
      cliente: contrato.cliente,
      presupuesto: contrato.presupuesto,
      fecha_inicio: contrato.fecha_inicio,
      fecha_fin: contrato.fecha_fin,
      estado: estadoNombre,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
