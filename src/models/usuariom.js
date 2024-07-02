const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Rol = require('./rolm');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Rol,
      key: 'id_rol',
    }
  }
}, {
  tableName: 'usuario',
  timestamps: false,
});

module.exports = Usuario;
