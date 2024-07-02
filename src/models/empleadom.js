const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Empleado = sequelize.define('Empleado', {
  id_empleado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tiempo_exp_general: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numero_contacto: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'empleado',
  timestamps: false,
});

module.exports = Empleado;
