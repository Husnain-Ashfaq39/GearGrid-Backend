const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactUs', ContactUsSchema);
