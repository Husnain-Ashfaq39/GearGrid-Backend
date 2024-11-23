const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String] }
});

module.exports = mongoose.model('AboutUs', AboutUsSchema);
