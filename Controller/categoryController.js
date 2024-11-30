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
    const { name, description, parentCategoryId, images } = req.body;
    const category = await Categories.findById(req.params.id);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    let updatedImages = category.image;
    if (images && images.length > 0) {
      if (category.image.length > 0) {
        for (const image of category.image) {
          await deleteImageFromCloudinary(image);
        }
      }
      updatedImages = await uploadImagesToCloudinary(images);
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.parentCategoryId = parentCategoryId || category.parentCategoryId;
    category.image = updatedImages;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating category');
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  updateCategory,
};
