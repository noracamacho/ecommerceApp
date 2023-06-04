const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {logging: false}) // Add {logging: false} to avoid console logs

module.exports = sequelize;