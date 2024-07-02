const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Area = require('./aream');
const Estado = require('./empleadom');
const Contrato = require('./contratom');
const Proyecto = require('./proyectom');

const Estadoarea = sequelize.define('Estadoarea', {
    id_area: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Area,
          key: 'id_area',
        }
      },
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Estado,
          key: 'id_estado',
        }
      },
  id_contrato: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Contrato,
      key: 'id_contrato',
    }
  },
  id_proyecto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Proyecto,
      key: 'id_proyecto',
    }
  },
}, {
  tableName: 'estadoarea',
  timestamps: false,
});

Estadoarea.belongsTo(Area, { foreignKey: 'id_area', onDelete: 'CASCADE' });
Estadoarea.belongsTo(Estado, { foreignKey: 'id_estado', onDelete: 'CASCADE' });

module.exports = Estadoarea;
