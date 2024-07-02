const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Contrato = require('./contratom');
const Estado = require('./estadom');
const Producto = require('./productom');

const Proyecto = sequelize.define('Proyecto', {
  id_proyecto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_contrato: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Contrato,
      key: 'id_contrato',
    }
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'id_producto',
    }
  },
  cantidad_producto: {
    type: DataTypes.INTEGER,
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
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Estado,
      key: 'id_estado',
    }
  }
}, {
  tableName: 'proyecto',
  timestamps: false,
});

Proyecto.belongsTo(Estado, { foreignKey: 'id_estado', onDelete: 'CASCADE' });
Proyecto.belongsTo(Contrato, { foreignKey: 'id_contrato', onDelete: 'CASCADE' });
Proyecto.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = Proyecto;
