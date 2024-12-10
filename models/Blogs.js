const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String },
    image: { type: [String], required: false },
    tags: { type: [String] },
    publishedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blogs', BlogsSchema);
