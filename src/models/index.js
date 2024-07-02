const sequelize = require('../database/conexiones.js');
const Proyecto = require('./proyectom.js');
const Area = require('./aream');
const Desempeno = require('./desempenom');
const Contrato = require('./contratom');
const Presupuesto = require('./presupuestom');
const Rol = require('./rolm');
const Producto = require('./productom');
const Usuario = require('./usuariom');
const Asignacion = require('./asignacionm');
const Empleado = require('./empleadom');
const Estado = require('./estadom');
const Evaluacion = require('./evaluacionm.js');
const EstadoArea = require('./estadoarea.js');

// Relaciones
Area.hasMany(Asignacion, { foreignKey: 'id_area' });
Area.hasMany(Evaluacion, { foreignKey: 'id_area' });
Area.hasMany(Presupuesto, { foreignKey: 'id_area' });
Area.hasMany(EstadoArea, { foreignKey: 'id_area' });

Asignacion.belongsTo(Contrato, { foreignKey: 'id_contrato' });
Asignacion.belongsTo(Area, { foreignKey: 'id_area' });
Asignacion.belongsTo(Empleado, { foreignKey: 'id_empleado' });

Contrato.hasMany(Asignacion, { foreignKey: 'id_contrato' });
Contrato.hasMany(Proyecto, { foreignKey: 'id_contrato' });
Contrato.hasMany(Presupuesto, { foreignKey: 'id_contrato' });
Contrato.belongsTo(Estado, { foreignKey: 'id_estado', onDelete: 'CASCADE' });

Desempeno.hasMany(Evaluacion, { foreignKey: 'id_desempeno' });

Empleado.hasMany(Asignacion, { foreignKey: 'id_empleado' });
Empleado.hasMany(Evaluacion, { foreignKey: 'id_empleado' });

Estado.hasMany(Contrato, { foreignKey: 'id_estado' });
Estado.hasMany(Proyecto, { foreignKey: 'id_estado' });
Estado.hasMany(EstadoArea, { foreignKey: 'id_estado' });

EstadoArea.belongsTo(Contrato, { foreignKey: 'id_contrato' });
EstadoArea.belongsTo(Area, { foreignKey: 'id_area' });
EstadoArea.belongsTo(Estado, { foreignKey: 'id_estado' });
EstadoArea.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });

Evaluacion.belongsTo(Desempeno, { foreignKey: 'id_desempeno' });
Evaluacion.belongsTo(Area, { foreignKey: 'id_area' });
Evaluacion.belongsTo(Empleado, { foreignKey: 'id_empleado' });

Presupuesto.belongsTo(Contrato, { foreignKey: 'id_contrato' });
Presupuesto.belongsTo(Area, { foreignKey: 'id_area' });
Presupuesto.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });

Producto.hasMany(Proyecto, { foreignKey: 'id_producto' });

Proyecto.belongsTo(Contrato, { foreignKey: 'id_contrato' });
Proyecto.belongsTo(Producto, { foreignKey: 'id_producto' });
Proyecto.belongsTo(Estado, { foreignKey: 'id_estado' });
Proyecto.hasMany(EstadoArea, { foreignKey: 'id_proyecto' });
Proyecto.hasMany(Presupuesto, { foreignKey: 'id_proyecto' });


module.exports = {
  sequelize,
  Proyecto,
  Estado,
  Evaluacion,
  Area,
  Desempeno,
  Contrato,
  Presupuesto,
  Rol,
  Usuario,
  Producto,
  Asignacion,
  Empleado,
  EstadoArea
};

// Sincronizar todos los modelos con la base de datos
sequelize.sync({ force: false }) // force: true eliminará las tablas existentes y las volverá a crear
  .then(() => {
    console.log('Tablas sincronizadas correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });