const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { uploadImagesToCloudinary } = require('../cloudinaryServices');
const mongoose = require('mongoose');

// Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password'); // Exclude password
        if (!user) {    
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Server error while fetching user' });
    }
};
// Update User
exports.updateUser = async (req, res) => {
    try {
        console.log("request body " + JSON.stringify(req.body)); // Log the entire request body
        const userId = req.params.id;
        const updates = req.body; // Get the updates from the request body

        // Check if any field is added before updating
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updatedFields = [];

        // Use existing email or name if not provided in the updates
        if (!updates.email) {
            updates.email = user.email; // Use the existing email
        } else {
            updatedFields.push('email');
        }
        if (!updates.name) {
            updates.name = user.name; // Use the existing name
        } else {
            updatedFields.push('name');
        }

        // Update only the fields that are present in the request body
        Object.keys(updates).forEach(key => {
            if (updates[key] !== undefined) {
                user[key] = updates[key];
                updatedFields.push(key);
            }
        });

        await user.save(); // Save the updated user

        // Create a dynamic message based on updated fields
        const message = updatedFields.length > 0 
            ? updatedFields.map(field => `User ${field} updated successfully`).join('. ') 
            : 'No fields were updated';

        res.status(200).json({ message: 'Profile updated successfully', user }); // Send the dynamic message
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: 'Server error while updating user' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'New passwords do not match' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ error: 'Server error while changing password' });
    }
};

// Change Profile Picture
exports.changeProfilePicture = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Upload the image to Cloudinary
        const uploadedImage = await uploadImagesToCloudinary(req.files); // Upload single file
        user.profilePictureUrl = uploadedImage[0]; // Save the link to the profile picture
console.log('user '+ user);

        await user.save();
        res.status(200).json({ message: 'Profile picture updated successfully', user });
    } catch (error) {
        console.error("Error changing profile picture:", error);
        res.status(500).json({ error: 'Server error while changing profile picture' });
    }
};

// Get User by ID
exports.getUserData = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('name email role _id location phone profilePictureUrl'); // Select only name, email, role, and _id
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Server error while fetching user' });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await User.find(); // Assuming you have a User model
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customers', error });
    }
};


