// models/contratom.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Estado = require('./estadom');

const Contrato = sequelize.define('Contrato', {
  id_contrato: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Estado,
      key: 'id_estado',
    }
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  presupuesto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
}, {
  tableName: 'contrato',
  timestamps: false,
});

// Asociación de Contrato a Estado
Contrato.belongsTo(Estado, { foreignKey: 'id_estado', onDelete: 'CASCADE' });
//Contrato.hasMany(Proyecto, { foreignKey: 'id_contrato' });

module.exports = Contrato;

