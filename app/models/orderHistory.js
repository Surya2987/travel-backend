const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Itinerary = require('./Itinerary');

const OrderHistory = sequelize.define('OrderHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itineraryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bookedBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalCost: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
});

OrderHistory.belongsTo(User, { foreignKey: 'bookedBy' });
User.hasMany(OrderHistory, { foreignKey: 'bookedBy' });

OrderHistory.belongsTo(Itinerary, { foreignKey: 'itineraryId' });
Itinerary.hasMany(OrderHistory, { foreignKey: 'itineraryId' });

module.exports = OrderHistory;
