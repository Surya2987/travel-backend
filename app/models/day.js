const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./event');
const Sightseeing = require('./sightseeing');
const HotelStay = require('./hotelStay');

const Day = sequelize.define('Day', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dayNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Day.hasMany(Event, { onDelete: 'CASCADE' });
Event.belongsTo(Day);

Day.hasMany(Sightseeing, { onDelete: 'CASCADE' });
Sightseeing.belongsTo(Day);

Day.hasMany(HotelStay, { onDelete: 'CASCADE' });
HotelStay.belongsTo(Day);

module.exports = Day;
