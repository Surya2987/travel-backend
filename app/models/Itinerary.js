const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Day = require('./day');

const Itinerary = sequelize.define('Itinerary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  costPerPerson: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: true
  },
  start_date: {
    allowNull: true,
    type: DataTypes.DATEONLY,
  },
  end_date: {
    allowNull: true,
    type: DataTypes.DATEONLY,
  }
});

Itinerary.hasMany(Day, { onDelete: 'CASCADE' });
Day.belongsTo(Itinerary);

module.exports = Itinerary;