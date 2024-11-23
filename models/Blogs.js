const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String },
    publishedAt: { type: Date, default: Date.now },
    tags: { type: [String] }
});

module.exports = mongoose.model('Blogs', BlogsSchema);
