const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    orderStatus: { type: String, default: 'Pending' },
    paymentStatus: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    phoneNumber: { type: String },
    email: { type: String, required: true },
    paymentMethod: { type: String },
    deliveryInstructions: { type: String },
    stripeOrderId: { type: String },
    customerFirstName: { type: String, required: true },
    customerLastName: { type: String, required: true },
    transactionId: { type: String },
    deliveryAddressLine1: { type: String, required: true },
    deliveryAddressLine2: { type: String },
    deliveryCity: { type: String, required: true },
    deliveryRegion: { type: String, required: true },
    deliveryPostalCode: { type: String, required: true },
    deliveryCountry: { type: String, required: true },
});

module.exports = mongoose.model('Orders', OrdersSchema);
