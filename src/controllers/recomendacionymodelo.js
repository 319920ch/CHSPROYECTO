// Importar modelos
const Proyecto = require('../models/proyectom');
const Area = require('../models/aream');
const Contrato = require('../models/contratom');
const Recomendacion = require('../models/recomendacionm');
const Producto = require('../models/productom');
const Evaluacion = require('../models/evaluacionm');
const Empleado = require('../models/empleadom');
const Desempeno = require('../models/desempenom');
const EstadoArea = require('../models/estadoarea');
const Estado = require('../models/estadom');

// Función para calcular la cantidad de empleados necesarios
function empleadosNecesarios(area, producto, cantidad, plazo, desempeno) {
  // Obtener el tiempo estándar para el área y producto
  const tiempos = {
    corte: { mesas: 1, sillas: 1, puertas: 1 },
    soldadura: { mesas: 2, sillas: 3, puertas: 2 },
    pintura: { mesas: 2, sillas: 2, puertas: 1 },
    ensamblaje: { mesas: 3, sillas: 4, puertas: 3 },
    'verificación de calidad': { mesas: 0.5, sillas: 0.5, puertas: 0.5 }
  };

  const tiempoEstandar = tiempos[area][producto];
  const tiempoEfectivo = tiempoEstandar / desempeno;
  const empleados = (tiempoEfectivo * cantidad) / plazo;
  return empleados;
}

// Exportar función para sugerir cantidad de empleados
exports.sugerirEmpleados = async (req, res) => {
    try {
      const { id_contrato, id_proyecto, id_area } = req.body;
      const proyecto = await Proyecto.findByPk(id_proyecto, {
        include: [
          {
            model: Contrato,
            attributes: ['cliente']
          },
          {
            model: Producto,
            attributes: ['nombre_producto']
          }
        ]
      });
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      const area = await Area.findByPk(id_area, {
        attributes: ['nombre_area']
      });
      if (!area) {
        return res.status(404).json({ error: `Área no encontrada` });
      }
  
      const cantidad = proyecto.cantidad_producto;
      const producto = proyecto.Producto.nombre_producto;
      const plazo = 1; // plazo en días, puede ser actualizado según sea necesario
      const desempeno = 3; // desempeño medio, puede ser actualizado según sea necesario
  
      const empleados = empleadosNecesarios(area.nombre_area, producto, cantidad, plazo, desempeno);
      const empleadosRedondeados = Math.round(empleados); // Redondear el valor de empleados
      
    // Obtener el número total de empleados registrados
    const totalEmpleados = await Empleado.count();

    if (empleadosRedondeados > totalEmpleados) {
      return res.status(400).json({ error: `No hay suficientes empleados registrados (${totalEmpleados}) para asignar ${empleadosRedondeados} empleados.` });
    }

      const recomendacion = await Recomendacion.create({
        id_contrato,
        id_proyecto,
        id_area,
        recomendacion_num_e: empleadosRedondeados,
        cantidad_asignada: 0
      });
  
      res.status(201).json({
        message: `Se sugiere ${empleadosRedondeados} empleados en el área de ${area.nombre_area} para producir ${cantidad} ${producto} en ${plazo} día(s) con un desempeño mínimo de ${desempeno}.`,
        recomendacion
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Exportar función para actualizar cantidad asignada
exports.actualizarCantidadAsignada = async (req, res) => {
    try {
      const { id_contrato, id_proyecto, id_area , cantidad_asignada } = req.body;
      const recomendacion = await Recomendacion.findByPk(id_contrato, id_proyecto, id_area );
      if (!recomendacion) {
        return res.status(404).json({ error: 'Recomendación no encontrada' });
      }
  
      const cantidadSugerida = recomendacion.recomendacion_num_e;
      if (cantidad_asignada < cantidadSugerida) {
        return res.status(400).json({ error: `La cantidad asignada no puede ser menor a la cantidad sugerida (${cantidadSugerida})` });
      }
      // Obtener el número total de empleados registrados
    const totalEmpleados = await Empleado.count();

    if (cantidad_asignada > totalEmpleados) {
      return res.status(400).json({ error: `No hay suficientes empleados registrados (${totalEmpleados}) para asignar ${cantidad_asignada} empleados.` });
    }
    
      recomendacion.cantidad_asignada = cantidad_asignada;
      await recomendacion.save();
  
      res.status(200).json({
        message: `Cantidad asignada actualizada a ${cantidad_asignada} para la recomendación ${id_recomendacion}.`,
        recomendacion
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.obtenerEmpleadosPorDesempeno = async (req, res) => {
    try {
      const { id_area } = req.body;
  
      // Buscar evaluaciones en el área específica y ordenar por desempeño
      const evaluaciones = await Evaluacion.findAll({
        where: { id_area },
        include: [
          {
            model: Empleado,
            attributes: ['id_empleado', 'nombres', 'apellidos', 'cedula', 'tiempo_exp_general', 'numero_contacto']
          },
          {
            model: Desempeno,
            attributes: ['puntuacion_desempeño'],
            order: [['puntuacion_desempeño', 'DESC']]
          }
        ],
        order: [[Desempeno, 'puntuacion_desempeño', 'DESC'],
        [Empleado, 'tiempo_exp_general', 'DESC']]
      });
  
      if (evaluaciones.length === 0) {
        return res.status(404).json({ error: 'No se encontraron empleados para el área especificada' });
      }
  
      const empleadosInfo = evaluaciones.map(evaluacion => ({
        id_empleado: evaluacion.Empleado.id_empleado,
        nombres: evaluacion.Empleado.nombres,
        apellidos: evaluacion.Empleado.apellidos,
        cedula: evaluacion.Empleado.cedula,
        tiempo_exp_general: evaluacion.Empleado.tiempo_exp_general,
        numero_contacto: evaluacion.Empleado.numero_contacto,
        puntuacion_desempeno: evaluacion.Desempeno.puntuacion_desempeño
      }));
  
      res.status(200).json(empleadosInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.recomendarAsignacionAdicional = async (req, res) => {
    try {
      const { id_contrato, id_proyecto, id_area } = req.body;
  
      // Obtener el estado del área
      const estadoArea = await EstadoArea.findOne({
        where: { id_contrato, id_proyecto, id_area },
      });
  
      if (!estadoArea) {
        return res.status(404).json({ error: 'Estado del área no encontrado' });
      }
  
      const { id_estado } = estadoArea;
  
      // Si el estado es "retrasado" (id_estado = 3)
      if (id_estado === 3) {
        // Obtener la lista de empleados disponibles ordenados por desempeño y experiencia
        const evaluaciones = await Evaluacion.findAll({
          where: { id_area },
          include: [
            {
              model: Empleado,
              attributes: ['id_empleado', 'nombres', 'apellidos', 'cedula', 'tiempo_exp_general', 'numero_contacto']
            },
            {
              model: Desempeno,
              attributes: ['puntuacion_desempeño']
            }
          ],
          order: [
            [Desempeno, 'puntuacion_desempeño', 'DESC'],
            [Empleado, 'tiempo_exp_general', 'DESC']
          ]
        });
  
        const empleadosInfo = evaluaciones.map(evaluacion => ({
          id_empleado: evaluacion.Empleado.id_empleado,
          nombres: evaluacion.Empleado.nombres,
          apellidos: evaluacion.Empleado.apellidos,
          cedula: evaluacion.Empleado.cedula,
          tiempo_exp_general: evaluacion.Empleado.tiempo_exp_general,
          numero_contacto: evaluacion.Empleado.numero_contacto,
          puntuacion_desempeno: evaluacion.Desempeno.puntuacion_desempeño
        }));
  
        return res.status(200).json({
          message: 'El área está retrasada. Se recomienda asignar un empleado adicional.',
          empleadosDisponibles: empleadosInfo
        });
      } else {
        return res.status(200).json({
          message: 'El área no está retrasada. No se necesita asignar empleados adicionales.',
          estado: estadoArea.Estado.estado
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };