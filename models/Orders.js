const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{ productId: String, quantity: Number }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('Orders', OrdersSchema);
