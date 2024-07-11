const Proyecto = require('../models/proyectom');
const Area = require('../models/aream');
const Presupuesto = require('../models/presupuestom');
const Contrato = require('../models/contratom');
const Regla = require('../models/reglas');
const Estadoarea = require('../models/estadoarea');

exports.asignarAreasProyecto = async (req, res) => {
  try {
    const { id_proyecto, id_contrato, areas } = req.body;
    const proyecto = await Proyecto.findByPk(id_proyecto, {
      include: [
        {
          model: Contrato,
          attributes: ['cliente']
        }
      ]
    });
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const areasAsignadas = [];
    for (const area of areas) {
      const areaExistente = await Area.findOne({
        where: { nombre_area: area.nombre_area },
        attributes: ['id_area', 'nombre_area'] // Include id_area attribute
      });
      if (!areaExistente) {
        return res.status(404).json({ error: `Área ${area.nombre_area} no encontrada` });
      }

      const { monto } = area; // Obtener el monto desde el objeto de área enviado en la solicitud

      if (monto == null) {
        return res.status(400).json({ error: `El monto no puede ser null para el área ${area.nombre_area}` });
      }

      const presupuesto = await Presupuesto.create({
        id_proyecto,
        id_contrato,
        id_area: areaExistente.id_area,
        monto: monto // Usar el monto proporcionado en la solicitud
      });

      areasAsignadas.push({
        nombre_cliente: proyecto.Contrato.nombre_cliente,
        nombre_proyecto: proyecto.nombre_proyecto,
        nombre_area: areaExistente.nombre_area,
        monto: presupuesto.monto
      });
    }

    res.status(201).json({
      message: 'Áreas asignadas al proyecto',
      areasAsignadas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.modificarPresupuestoArea = async (req, res) => {
  try {
    const { id_contrato, id_proyecto, id_area, nuevo_monto } = req.body;

    // Obtener la regla de ganancia
    const regla = await Regla.findOne({ where: { nombre: 'Ganancia' } });
    if (!regla) {
      return res.status(404).json({ error: 'Regla de ganancia no encontrada' });
    }

    // Obtener el presupuesto total del contrato
    const contrato = await Contrato.findByPk(id_contrato, {
      attributes: ['presupuesto']
    });
    if (!contrato) {
      return res.status(404).json({ error: 'Contrato no encontrado' });
    }

    const presupuestoTotalContrato = parseFloat(contrato.presupuesto);
    const porcentajePermitido = 1 - regla.valor / 100; // En este caso, 80% es permitido si la ganancia es 20%
    const gastoPermitido = presupuestoTotalContrato * porcentajePermitido;

    // Verificar si el proyecto existe con el contrato
    const proyecto = await Proyecto.findOne({
      where: {
        id_contrato,
        id_proyecto
      }
    });
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado con el contrato' });
    }

    // Verificar si el área existe con el proyecto y contrato
    const area = await Estadoarea.findOne({
      where: {
        id_proyecto,
        id_contrato,
        id_area
      }
    });
    if (!area) {
      return res.status(404).json({ error: 'Área no encontrada con el proyecto y contrato' });
    }

    // Obtener todos los presupuestos de áreas de cada proyecto del contrato
    let sumaActual = 0;
    const presupuestosAreas = await Presupuesto.findAll({
      where: {
        id_contrato,
        id_proyecto
      },
      attributes: ['monto']
    });

    // Calcular la suma actual de los presupuestos de áreas para cada proyecto
    sumaActual = presupuestosAreas.reduce((total, presupuesto) => total + presupuesto.monto, 0);

    // Verificar si la suma actual no supera el presupuesto total del contrato
    if (sumaActual > presupuestoTotalContrato) {
      return res.status(400).json({ error: 'El total de los presupuestos de áreas supera el presupuesto total del contrato' });
    }

    // Verificar si el nuevo monto no supera el presupuesto total del contrato
    if (nuevo_monto > presupuestoTotalContrato) {
      return res.status(400).json({ error: `El presupuesto superar el gasto permitido $ ${gastoPermitido} del presupuesto del contrato` });
    }

    // Calcular la nueva suma con el nuevo monto del área
    const areaActual = await Presupuesto.findOne({
      where: {
        id_proyecto,
        id_contrato,
        id_area
      },
      attributes: ['monto']
    });

    const nuevaSuma = sumaActual - (areaActual ? areaActual.monto : 0) + nuevo_monto;

    // Verificar si la nueva suma no supera el gasto permitido (80% del presupuesto total del contrato)
    if (nuevaSuma > gastoPermitido) {
      return res.status(400).json({ error: `El total de los presupuestos de áreas no puede superar el ${porcentajePermitido * 100}% del presupuesto del contrato` });
    }

    // Actualizar el monto del presupuesto del área
    const presupuestos = await Presupuesto.update({
      monto: nuevo_monto
    }, {
      where: {
        id_proyecto,
        id_contrato,
        id_area
      }
    });

    res.status(200).json({
      message: `Presupuesto de área actualizado a $ ${nuevo_monto}`,
      presupuesto: nuevo_monto
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};