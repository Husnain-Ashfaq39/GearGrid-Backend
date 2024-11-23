const mongoose = require('mongoose');

const CouponsSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date }
});

module.exports = mongoose.model('Coupons', CouponsSchema);
