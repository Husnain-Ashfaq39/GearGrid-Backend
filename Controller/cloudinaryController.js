const { uploadImagesToCloudinary, deleteImageFromCloudinary } = require('../cloudinaryServices');

// Function to upload an image to Cloudinary
exports.uploadImage = async (req, res) => {
    try {
        
        const result = await uploadImagesToCloudinary(req.files); // Upload the image
        res.status(200).json({ message: 'Image uploaded successfully', data: result });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: 'Server error while uploading image' });
    }
};

// Function to delete an image from Cloudinary
exports.deleteImage = async (req, res) => {
    try {
        const url = req.params.id; 
        const result = await deleteImageFromCloudinary(url);
        res.status(200).json({ message: 'Image deleted successfully', data: result });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: 'Server error while deleting image' });
    }
};