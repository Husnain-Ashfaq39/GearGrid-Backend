// controllers/categoryController.js
const Categories = require('../models/Categories');
const { uploadImagesToCloudinary, deleteImageFromCloudinary } = require('../cloudinaryServices');

// Controller function to handle adding a category with images
const addCategory = async (req, res) => {
    try {
      const { name, description, parentCategoryId } = req.body;
      
  
      let uploadedImage = [];
  
     
    uploadedImage = await uploadImagesToCloudinary(req.files);
     
  
      const newCategory = new Categories({
        name,
        description,
        parentCategoryId,
        image: uploadedImage.length > 0 ? uploadedImage : null,
      });
  
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating category');
    }
  };

// Controller function to handle fetching all categories
const getAllCategories = async (req, res) => {
    try {
      console.log('Fetching categories...');  // Step 1: Debug log
  
      // Fetch all categories from the database
      const categories = await Categories.find();  // Make sure to use the correct model name, e.g., Category
  
      console.log('Categories fetched successfully '+categories);  // Step 2: Debug log
  
      // Return the categories as a JSON response
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);  // More detailed error log
      res.status(500).send('Error fetching categories');  // Return appropriate error message
    }
  };

// Controller function to handle updating a category
const updateCategory = async (req, res) => {
  try {
    const { name, description, parentCategoryId } = req.body;
    
    const category = await Categories.findById(req.params.id);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    let uploadedImage = [];
    if (req.files && req.files.length > 0) {
      uploadedImage = await uploadImagesToCloudinary(req.files);
    }

    category.name = name !== undefined ? name : category.name;
    category.description = description !== undefined ? description : category.description;
    category.parentCategoryId = parentCategoryId !== undefined ? parentCategoryId : category.parentCategoryId;
    category.image = uploadedImage.length > 0 ? uploadedImage : category.image;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send('Error updating category');
  }
};

// Method to delete a category
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    console.log('cat id '+categoryId);
    
    try {
        // Assuming you have a Category model to interact with your database
        const result = await Categories.findByIdAndDelete(categoryId);
        if (!result) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};

// Method to get a category by ID
const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Categories.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

module.exports = {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
