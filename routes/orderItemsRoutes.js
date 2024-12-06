const express = require('express');
const router = express.Router();
const orderItemsController = require('../Controller/orderItemsController');

// Route to add a new order item
router.post('/add', orderItemsController.addOrderItem);

// Route to get an order item by ID
router.get('/:id', orderItemsController.getOrderItem);

// Route to delete an order item by ID
router.delete('/:id', orderItemsController.deleteOrderItem);

// Route to get all order items
router.get('/all', orderItemsController.getAllOrderItems);

module.exports = router; 