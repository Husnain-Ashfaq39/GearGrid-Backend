const Order = require('../models/Orders');

// Controller to store a new order
exports.storeOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller to get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get an order by order ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get total number of orders
exports.getTotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        res.status(200).json({ totalOrders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update an order by order ID
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Method to get total earnings
exports.getTotalEarnings = async (req, res) => {
    try {
        const orders = await Order.find(); // Filter for completed orders
        const totalEarnings = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        res.status(200).json({ totalEarnings });
    } catch (error) {
        console.error("Error retrieving total earnings:", error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving total earnings' });
    }
}; 