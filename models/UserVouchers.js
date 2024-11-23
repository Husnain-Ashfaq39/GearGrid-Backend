const mongoose = require('mongoose');

const UserVouchersSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    voucherCode: { type: String, required: true },
    redeemedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserVouchers', UserVouchersSchema);
