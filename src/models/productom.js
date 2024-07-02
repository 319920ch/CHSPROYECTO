const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Producto = sequelize.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion_producto: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'producto',
  timestamps: false,
});

module.exports = Producto;
