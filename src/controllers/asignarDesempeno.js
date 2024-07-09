// asignarDesempeno.js
const Empleado = require('../models/empleadom');
const Desempeno = require('../models/desempenom');
const Evaluacion = require('../models/evaluacionm');
const Area = require('../models/aream');

exports.asignarDesempeno = async (req, res) => {
    try {
      const { id_empleado, id_desempeno, id_area } = req.body;
  
      // Verificar si el empleado existe
      const empleado = await Empleado.findByPk(id_empleado);
      if (!empleado) {
        return res.status(404).json({ error: `Empleado con id ${id_empleado} no encontrado` });
      }
  
      // Verificar si el desempeño existe
      const desempeno = await Desempeno.findByPk(id_desempeno);
      if (!desempeno) {
        return res.status(404).json({ error: `Desempeño con id ${id_desempeno} no encontrado` });
      }
  
      // Verificar si la área existe
      const area = await Area.findByPk(id_area);
      if (!area) {
        return res.status(404).json({ error: `Área con id ${id_area} no encontrada` });
      }

        // Verificar si ya existe una evaluación para el empleado en el área especificada
        const evaluacionExistente = await Evaluacion.findOne({
          where: {
              id_empleado: id_empleado,
              id_area: id_area
          }
      });

      if (evaluacionExistente) {
          return res.status(400).json({ error: `El empleado ya tiene una evaluación en el área ${area.nombre_area}` });
      }

      // Crear una nueva evaluación
      const evaluacion = await Evaluacion.create({
        id_area: id_area,
        id_empleado: id_empleado,
        id_desempeno: id_desempeno,
      });
  
      return res.status(201).json({
        message: `Desempeño asignado con éxito al empleado ${empleado.nombres} ${empleado.apellidos}`,
        id_evaluacion: evaluacion.id_evaluacion,
        id_empleado: id_empleado,
        id_desempeno: desempeno.puntuacion_desempeño,
        id_area: area.nombre_area,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.actualizarD = async (req, res) => {
    try {
      const { id_empleado, nueva_calificacion, id_area } = req.body;
  
      // Verificar si el empleado existe
      const empleado = await Empleado.findByPk(id_empleado);
      if (!empleado) {
        return res.status(404).json({ error: `Empleado con id ${id_empleado} no encontrado` });
      }
  
      // Verificar si el área existe
      const area = await Area.findByPk(id_area);
      if (!area) {
        return res.status(404).json({ error: `Área con id ${id_area} no encontrada` });
      }
  
      // Obtener la evaluación correspondiente al empleado y área
      let evaluacion = await Evaluacion.findOne({
        where: {
          id_empleado,
          id_area,
        },
      });
      if (!evaluacion) {
        return res.status(404).json({ error: `Evaluación no encontrada para el empleado ${empleado.nombres} ${empleado.apellidos} en el área ${area.nombre_area}` });
      }
  
      // Verificar si el desempeño existe
      const desempeno = await Desempeno.findByPk(nueva_calificacion);
      if (!desempeno) {
        return res.status(404).json({ error: `Desempeño con id ${nueva_calificacion} no encontrado` });
      }
  
      // Actualizar la calificación del desempeño
      evaluacion.id_desempeno = nueva_calificacion;
      await evaluacion.save();
  
      // Enviar respuesta de éxito
      return res.status(200).json({
        message: `Calificación de evaluación de desempeño actualizada con éxito del empleado ${empleado.nombres} ${empleado.apellidos}`,
        id_evaluacion: evaluacion.id_evaluacion,
        id_empleado: id_empleado,
        id_desempeno: nueva_calificacion,
        desempeno: desempeno.puntuacion_desempeño,
        id_area: area.nombre_area,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  