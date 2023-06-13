const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.get('/users/:id', orderController.getOrdersOfUser);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
