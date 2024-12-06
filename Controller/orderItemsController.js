const OrderItem = require('../models/OrderItems');

// Add a new order item
exports.addOrderItem = async (req, res) => {
    try {
        const newOrderItem = new OrderItem(req.body);
        console.log('storing order item');
        
        await newOrderItem.save();
        console.log('stored order item');
        res.status(200).json(newOrderItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get an order item by ID
exports.getOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        if (!orderItem) return res.status(404).json({ message: 'Order item not found' });
        res.json(orderItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order item by ID
exports.deleteOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
        if (!orderItem) return res.status(404).json({ message: 'Order item not found' });
        res.json({ message: 'Order item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all order items
exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.find();
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 