const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Estado = sequelize.define('Estado', {
  id_estado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'estado',
  timestamps: false,
});

module.exports = Estado;
