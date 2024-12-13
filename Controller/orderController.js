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

// Controller to get total orders for a specific user
exports.getUserTotalOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const totalOrders = await Order.countDocuments({ userId: userId });
        res.status(200).json({ totalOrders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get user order statistics by month
exports.getUserOrderStats = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Get orders for the last 12 months
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
        
        const orders = await Order.aggregate([
            {
                $match: {
                    userId: userId,
                    createdAt: { $gte: twelveMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);

        // Transform the data to include all months with 0 if no orders
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const currentDate = new Date();
        const stats = [];
        
        for (let i = 0; i < 12; i++) {
            const date = new Date(twelveMonthsAgo);
            date.setMonth(twelveMonthsAgo.getMonth() + i);
            
            const monthOrder = orders.find(order => 
                order._id.year === date.getFullYear() && 
                order._id.month === (date.getMonth() + 1)
            );
            
            stats.push({
                month: months[date.getMonth()],
                count: monthOrder ? monthOrder.count : 0
            });
        }

        res.status(200).json({ stats });
    } catch (error) {
        console.error("Error retrieving user order stats:", error);
        res.status(500).json({ error: error.message });
    }
};