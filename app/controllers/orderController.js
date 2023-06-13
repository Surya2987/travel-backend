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
        const orders = await Order.findAll({ where: { bookedBy: id } });
        if (orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ error: 'No orders found for the user' });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteOrder = async (req, res) => {
  const {id} = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'order not found' });
    }
    await order.destroy();
    return res.status(200).json({ message: 'Order is Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
