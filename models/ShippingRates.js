const mongoose = require('mongoose');

const ShippingRatesSchema = new mongoose.Schema({
    region: { type: String, required: true },
    weight: { type: Number, required: true },
    rate: { type: Number, required: true }
});

module.exports = mongoose.model('ShippingRates', ShippingRatesSchema);
