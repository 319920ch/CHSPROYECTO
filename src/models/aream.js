const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Proyecto = require('./proyectom');

const Area = sequelize.define('Area', {
  id_area: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion_area: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'area',
  timestamps: false,
});

Area.belongsTo(Proyecto, { foreignKey: 'id_area', onDelete: 'CASCADE' });


module.exports = Area;
