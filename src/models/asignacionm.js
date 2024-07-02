  const { DataTypes } = require('sequelize');
  const sequelize = require('../database/conexiones');
  const Area = require('./aream');
  const Empleado = require('./empleadom');
  const Contrato = require('./contratom');

  const Asignacion = sequelize.define('Asignacion', {
      id_area: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: Area,
            key: 'id_area',
          }
        },
        id_empleado: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: Empleado,
            key: 'id_empleado',
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
    }
  }, {
    tableName: 'asignacion',
    timestamps: false,
  });

  module.exports = Asignacion;
