const { Op } = require('sequelize');
const Order = require('../models/orderHistory');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'order not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { userId,tripId,totalCost } = req.body;
  try {
    const order = await Order.create({
        itineraryId: tripId,
        bookedBy: userId,
        totalCost
    });
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOrdersOfUser = async (req, res) => {
    const { id } = req.params;
    try {
        const check = {
            [Op.and]: [],
        };
        check[Op.and].push({ bookedBy: id });
        const order = await Order.findOne({ where: check }); // Changed `findByPk` to `findOne`
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: 'Orders are not found for user' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

