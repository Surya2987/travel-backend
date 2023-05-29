const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sightseeing = sequelize.define('Sightseeing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Sightseeing;