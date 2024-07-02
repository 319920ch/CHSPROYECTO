const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../database/conexiones');

const Rol = sequelize.define('Rol', {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_rol: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  tableName: 'rol'
});

module.exports = Rol;