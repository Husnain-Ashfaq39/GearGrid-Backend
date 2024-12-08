const express = require('express');
const router = express.Router();
const orderController = require('../Controller/orderController');

// Route to store a new order
router.post('/add', orderController.storeOrder);

// Route to get all orders
router.get('/all', orderController.getAllOrders);

// Route to get an order by order ID
router.get('/:orderId', orderController.getOrderById);

// Route to update an order
router.put('/:orderId', orderController.updateOrder);

// Route to get total earnings
// Changed the route to avoid conflict with ObjectId
router.get('/earnings/total', orderController.getTotalEarnings);

module.exports = router; 