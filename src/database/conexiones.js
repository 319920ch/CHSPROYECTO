require('dotenv').config();

const { Sequelize } = require('sequelize');

const dbConfig = {
  database: process.env.DB_NAME || 'PROYECTO',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres'
};

try {
  const sequelize = new Sequelize(dbConfig);
  module.exports = sequelize;
} catch (error) {
  console.error('Error connecting to database:', error);
  process.exit(1);
}