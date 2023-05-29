const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HotelStay = sequelize.define('HotelStay', {
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
  },
  costPerRoom: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
});

module.exports = HotelStay;
