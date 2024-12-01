const mongoose = require('mongoose');

const GeneralDataSchema = new mongoose.Schema({
    logo: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    terms: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GeneralData', GeneralDataSchema);
