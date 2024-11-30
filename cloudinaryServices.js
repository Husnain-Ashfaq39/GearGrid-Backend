// Helper function to upload images to Cloudinary
const  cloudinary = require('./config/cloudinaryConfig')
const uploadImagesToCloudinary = async (files) => {
    const uploadedImages = [];
  
    for (const file of files) {
      try {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) {
                return reject(new Error('Cloudinary upload failed'));
              }
              resolve(result);
            }
          );
          stream.end(file.buffer); // Upload buffer directly
        });
  
        uploadedImages.push(result.secure_url); // Store the secure URL
      } catch (error) {
        console.error('Cloudinary upload failed:', error);
        throw error; // Rethrow error to be handled by the caller
      }
    }
  
    return uploadedImages;
  };

  // Helper function to delete images from Cloudinary using secure_url
 const deleteImageFromCloudinary = async (secureUrl) => {
    try {
      // Extract public_id from secure_url
      const publicId = secureUrl.split('/').pop().split('.')[0]; // Extracts public_id from URL
      
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result === 'ok') {
        console.log('Image deleted successfully');
      } else {
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      console.error('Cloudinary delete failed:', error);
      throw error; // Rethrow error to be handled by the caller
    }
  };

  
  // Helper function to fetch image details from Cloudinary using secure_url
const getImageDetails = async (secureUrl) => {
    try {
      // Extract public_id from secure_url
      const publicId = secureUrl.split('/').pop().split('.')[0];
      
      const result = await cloudinary.api.resource(publicId);
      console.log('Image details:', result);
      return result;
    } catch (error) {
      console.error('Cloudinary fetch image details failed:', error);
      throw error; // Rethrow error to be handled by the caller
    }
  };

  
  // Helper function to list images in a folder
 const listImagesInFolder = async (folderName) => {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folderName, // Specify folder name
        max_results: 100, // Set limit to the number of results
      });
      console.log('Images in folder:', result.resources);
      return result.resources; // Each resource will have the secure_url field
    } catch (error) {
      console.error('Cloudinary listing failed:', error);
      throw error; // Rethrow error to be handled by the caller
    }
  };
  
  module.exports = {
    uploadImagesToCloudinary,
    deleteImageFromCloudinary,
    getImageDetails,
    listImagesInFolder
};