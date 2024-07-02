const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Regla = sequelize.define('Regla', {
  id_reglas: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'reglas',
  timestamps: false,
});

module.exports = Regla;
