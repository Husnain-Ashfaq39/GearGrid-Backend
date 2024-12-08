const mongoose = require('mongoose');

const VouchersSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    
});

module.exports = mongoose.model('Vouchers', VouchersSchema);
