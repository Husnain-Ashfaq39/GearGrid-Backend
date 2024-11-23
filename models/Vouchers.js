const mongoose = require('mongoose');

const VouchersSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    usageLimit: { type: Number },
    usedCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Vouchers', VouchersSchema);
