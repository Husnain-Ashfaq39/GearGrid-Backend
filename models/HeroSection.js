const mongoose = require('mongoose');

const HeroSectionSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String },
    image: { type: String, required: true },
    callToActionText: { type: String },
    callToActionLink: { type: String }
});

module.exports = mongoose.model('HeroSection', HeroSectionSchema);
