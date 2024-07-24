const Proyecto = require('../models/proyectom');
const Area = require('../models/aream');
const Contrato = require('../models/contratom');
const Estado = require('../models/estadom');
const EstadoArea = require('../models/estadoarea');
const Presupuesto = require('../models/presupuestom');
const Producto = require('../models/productom');

exports.getContratoInfo = async (req, res) => {
  try {
    const { id_contrato } = req.body;
    const contrato = await Contrato.findByPk(id_contrato);

    if (!contrato) {
      return res.status(404).json({ error: 'Contrato no encontrado' });
    }

    const proyectos = await Proyecto.findAll({
      where: { id_contrato },
      attributes: ['id_proyecto', 'id_producto', 'cantidad_producto']
    });

    const proyectosInfo = await Promise.all(proyectos.map(async (proyecto) => {
      const producto = await Producto.findByPk(proyecto.id_producto, {
        attributes: ['nombre_producto']
      });

      const estadoAreas = await EstadoArea.findAll({
        where: {
          id_contrato,
          id_proyecto: proyecto.id_proyecto
        },
        attributes: ['id_area', 'id_estado']
      });

      const areasInfo = await Promise.all(estadoAreas.map(async (estadoArea) => {
        const area = await Area.findByPk(estadoArea.id_area, {
          attributes: ['id_area', 'nombre_area']
        });

        const estado = await Estado.findByPk(estadoArea.id_estado, {
          attributes: ['estado']
        });

        const presupuesto = await Presupuesto.findOne({
          where: {
            id_contrato,
            id_proyecto: proyecto.id_proyecto,
            id_area: area.id_area,
          },
          attributes: ['monto']
        });

        return {
          id_area: area.id_area,
          nombre_area: area.nombre_area,
          estado: estado.estado,
          presupuesto: presupuesto ? presupuesto.monto : null
        };
      }));

      console.log(`Proyecto ID: ${proyecto.id_proyecto}, Producto: ${producto ? producto.nombre_producto : null}, Cantidad: ${proyecto.cantidad_producto}`);

      return {
        id_proyecto: proyecto.id_proyecto,
        producto: producto ? producto.nombre_producto : null,
        cantidad_producto: proyecto.cantidad_producto,
        areas: areasInfo
      };
    }));

    const contratoInfo = {
      id_contrato: contrato.id_contrato,
      cliente: contrato.cliente,
      fecha_inicio: contrato.fecha_inicio,
      fecha_fin: contrato.fecha_fin,
      presupuesto: contrato.presupuesto,
      proyectos: proyectosInfo
    };

    res.status(200).json(contratoInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



  exports.getAreasInfo = async (req, res) => {
    try {
      const { id_contrato } = req.body;
      const contrato = await Contrato.findByPk(id_contrato);
  
      if (!contrato) {
        return res.status(404).json({ error: 'Contrato no encontrado' });
      }
  
      const proyectos = await Proyecto.findAll({
        where: { id_contrato },
        attributes: ['id_proyecto', 'fecha_inicio', 'fecha_fin']
      });
  
      const areasInfo = await Promise.all(proyectos.map(async (proyecto) => {
        const estadoAreas = await EstadoArea.findAll({
          where: {
            id_contrato,
            id_proyecto: proyecto.id_proyecto
          },
          attributes: ['id_area', 'id_estado']
        });
  
        return await Promise.all(estadoAreas.map(async (estadoArea) => {
          const area = await Area.findByPk(estadoArea.id_area, {
            attributes: ['id_area', 'nombre_area']
          });
  
          const estado = await Estado.findByPk(estadoArea.id_estado, {
            attributes: ['estado']
          });
  
          const diasRestantes = calcularDiasRestantes(proyecto.fecha_inicio, proyecto.fecha_fin);
  
          return {
            id_contrato: contrato.id_contrato,
            fecha_inicio: contrato.fecha_inicio,
            fecha_fin: contrato.fecha_fin,
            cliente: contrato.cliente,
            id_proyecto: proyecto.id_proyecto,
            id_area: area.id_area,
            nombre_area: area.nombre_area,
            estado: estado.estado,
            //dias_restantes: estado.estado === 'en proceso' ? diasRestantes : 0
          };
        }));
      }));
  
      res.status(200).json(areasInfo.flat());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  function calcularDiasRestantes(fechaInicio, fechaFin) {
    const fechaActual = new Date();
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
  
    if (fechaActual > fechaFinDate) {
      return 0;
    }
  
    const diasRestantes = Math.round((fechaFinDate - fechaActual) / (1000 * 60 * 60 * 24));
    return diasRestantes;
  }
  
  function calcularHorasRestantes(fechaInicio, fechaFin) {
    const fechaActual = new Date();
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
  
    if (fechaActual > fechaFinDate) {
      return 0;
    }
  
    const horasRestantes = Math.round((fechaFinDate - fechaActual) / (1000 * 60 * 60));
    return horasRestantes;
  }

  const { Op } = require('sequelize');

exports.getContratosVigentes = async (req, res) => {
  try {
    const currentDate = new Date();

    const contratos = await Contrato.findAll({
      where: {
        fecha_inicio: { [Op.lte]: currentDate },
        fecha_fin: { [Op.gte]: currentDate }
      },
      attributes: ['id_contrato', 'cliente', 'fecha_inicio', 'fecha_fin']
    });

    res.status(200).json(contratos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
