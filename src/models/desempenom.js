const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Desempeno = sequelize.define('Desempeno', {
  id_desempeno: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  puntuacion_desempeño: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'desempeno',
  timestamps: false,
});

module.exports = Desempeno;
