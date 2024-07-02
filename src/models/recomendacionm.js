const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Area = require('./aream');
const Proyecto = require('./proyectom');
const Contrato = require('./contratom');

const Recomendacion = sequelize.define('Recomendacion', {
    id_area: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Area,
          key: 'id_area',
        }
      },
      id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Proyecto,
          key: 'id_proyecto',
        }
      },
  id_contrato: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Contrato,
      key: 'id_contrato',
    }
  },
  recomendacion_num_e: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad_asignada: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'recomendacion',
  timestamps: false,
});

module.exports = Recomendacion;

