const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Contrato = require('./contratom');
const Area = require('./aream');
const Proyecto = require('./proyectom'); // supongo que tienes un modelo Proyecto

const Presupuesto = sequelize.define('Presupuesto', {
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
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Area,
      key: 'id_area',
    }
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
}, {
  tableName: 'presupuesto',
  timestamps: false,
});

module.exports = Presupuesto;