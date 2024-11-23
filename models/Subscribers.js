const mongoose = require('mongoose');

const SubscribersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscribers', SubscribersSchema);
