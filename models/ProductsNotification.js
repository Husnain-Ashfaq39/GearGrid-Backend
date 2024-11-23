const mongoose = require('mongoose');

const ProductsNotificationSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    notificationType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductsNotification', ProductsNotificationSchema);
