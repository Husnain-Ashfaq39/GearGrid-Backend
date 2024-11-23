const mongoose = require('mongoose');

const TermsAndConditionsSchema = new mongoose.Schema({
    section: { type: String, required: true },
    content: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TermsAndConditions', TermsAndConditionsSchema);
