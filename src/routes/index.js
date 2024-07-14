const express = require('express');
const router = express.Router();

// Importar y usar las rutas de cada entidad
const areaRoutes = require('./areaRoutes');
const asignacionRoutes = require('./asignacionRoutes');
const contratoRoutes = require('./contratoRoutes');
const desempenoRoutes = require('./desempenoRoutes');
const empleadoRoutes = require('./empleadoRoutes');
const presupuestoRoutes = require('./presupuestoRoutes');
const proyectoRoutes = require('./proyectoRoutes');
const rolRoutes = require('./rolRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const estadoRoutes = require('./estadoRoutes');
const estadoareaRoutes = require('./estadoareaRoutes');
const evaluacionRoutes = require('./evaluacionRoutes');
const productoRoutes = require('./productoRoutes');
const authRoutes = require('./authRoutes');
const initproyectosRoutes = require('./initProyectoRoutes');
const areasPresupuesto = require('./areasPresupuestoRoutes');
const manejorol = require('./manejorolRoutes');
const reglas = require('./reglasRoutes');
const initContratosRoutes = require('./initContrato');
const asignarDesempeno = require('./asignarDesempenoRoutes');
const estadoA = require('./estadoARoutes');
const asignaE = require('./asignacionERoutes');
const producto = require('./producto');
const recomendacion = require('./recomendacionRoutes');
const rym = require('./recomendacionymodelo');
const buscainfo = require('./buscainfoRoutes');
const rempleado = require('./registroempleados');


router.use('/rempleado', rempleado);
router.use('/buscainfo', buscainfo);
router.use('/rym', rym);
router.use('/recomendaciones', recomendacion);
router.use('/producto', producto);
router.use('/asignaE', asignaE);
router.use('/estadoA', estadoA);
router.use('/asignarD', asignarDesempeno);
router.use('/initContratos', initContratosRoutes);
router.use('/manejorol', manejorol);
router.use('/reglas', reglas);
router.use('/productos', productoRoutes);
router.use('/estadoareas', estadoareaRoutes);
router.use('/evaluaciones', evaluacionRoutes);
router.use('/areas', areaRoutes);
router.use('/asignaciones', asignacionRoutes);
router.use('/contratos', contratoRoutes);
router.use('/desempenos', desempenoRoutes);
router.use('/empleados', empleadoRoutes);
router.use('/presupuestos', presupuestoRoutes);
router.use('/proyectos', proyectoRoutes);
router.use('/roles', rolRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/estados', estadoRoutes);
router.use('/auth', authRoutes);
router.use('/initProyecto', initproyectosRoutes);
router.use('/areasPresupuesto', areasPresupuesto);


module.exports = router;
