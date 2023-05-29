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
  maxCapacity: {
    type: DataTypes.INTEGER,
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
  bookingsMade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Itinerary.hasMany(Day, { onDelete: 'CASCADE' });
Day.belongsTo(Itinerary);

module.exports = Itinerary;
