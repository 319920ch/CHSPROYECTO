const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Area = require('./aream');
const Desempeno = require('./desempenom');
const Empleado = require('./empleadom');

const Evaluacion = sequelize.define('Evaluacion', {
    id_area: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Area,
          key: 'id_area',
        }
      },
      id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Empleado,
          key: 'id_empleado',
        }
      },
  id_desempeno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Desempeno,
      key: 'id_desempeno',
    }
  }
}, {
  tableName: 'evaluacion',
  timestamps: false,
});

Evaluacion.belongsTo(Empleado, { foreignKey: 'id_empleado', onDelete: 'CASCADE' });
Evaluacion.belongsTo(Area, { foreignKey: 'id_area', onDelete: 'CASCADE' });
Evaluacion.belongsTo(Desempeno, { foreignKey: 'id_desempeno', onDelete: 'CASCADE' });

module.exports = Evaluacion;
