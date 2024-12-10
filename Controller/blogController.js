const Blog = require('../models/Blogs');
const { uploadImagesToCloudinary } = require('../cloudinaryServices'); // Import your image upload service

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new blog
const addBlog = async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        let uploadedImages = [];

        // Upload images if any
        if (req.files && req.files.length > 0) {
            uploadedImages = await uploadImagesToCloudinary(req.files);
        }

        const blog = new Blog({
            title,
            content,
            author,
            image: uploadedImages.length > 0 ? uploadedImages : null,
            tags,
        });

        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Edit a blog
const editBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const { title, content, author, tags } = req.body;

        // Update fields if provided
        if (title != null) {
            blog.title = title;
        }
        if (content != null) {
            blog.content = content;
        }
        if (author != null) {
            blog.author = author;
        }
        if (tags != null) {
            blog.tags = tags;
        }

        // Upload new images if any
        if (req.files && req.files.length > 0) {
            const uploadedImages = await uploadImagesToCloudinary(req.files);
            blog.image = uploadedImages.length > 0 ? uploadedImages : blog.image; // Update images
        }

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get blog by ID
const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId); // Assuming you're using Mongoose

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllBlogs,
    addBlog,
    editBlog,
    deleteBlog,
    getBlogById,
}; 