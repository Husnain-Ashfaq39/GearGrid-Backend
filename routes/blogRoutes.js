const express = require('express');
const router = express.Router();
const {
    getAllBlogs,
    addBlog,
    editBlog,
    deleteBlog,
    getBlogById,
} = require('../Controller/blogController');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all blogs
router.get('/', getAllBlogs);

// Get blog by ID
router.get('/:id', getBlogById);

// Add a new blog
router.post('/',upload.array('image', 10), addBlog);

// Edit a blog
router.put('/:id',upload.array('image', 10), editBlog);

// Delete a blog
router.delete('/:id', deleteBlog);

module.exports = router; 