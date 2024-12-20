// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../Controller/categoryController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
// Route to add a new category
router.post('/add',upload.array('image', 10), categoryController.addCategory);

// Route to get all categories
router.get('/all', categoryController.getAllCategories);

// Route to update an existing category
router.put('/:id',upload.array('image', 10), categoryController.updateCategory);

// Route to delete a category
router.delete('/:id', categoryController.deleteCategory);

// Route to get a category by ID
router.get('/:id', categoryController.getCategoryById);

module.exports = router;
