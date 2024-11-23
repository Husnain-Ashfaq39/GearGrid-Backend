const mongoose = require('mongoose');

const DeliveryMetadataSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    trackingNumber: { type: String },
    carrier: { type: String },
    estimatedArrival: { type: Date },
    status: { type: String, required: true },
    shippingFee: { type: Number, required: true },
    weight: { type: Number }
});

module.exports = mongoose.model('DeliveryMetadata', DeliveryMetadataSchema);
