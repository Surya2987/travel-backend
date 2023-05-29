const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('travel_itenary', 'phpmyadmin', '12345', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
});

module.exports = sequelize;