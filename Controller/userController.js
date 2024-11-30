const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('name email role _id'); // Select only name, email, role, and _id
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Server error while fetching user' });
    }
};

// // Change Password
// exports.changePassword = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const { oldPassword, newPassword } = req.body;

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(oldPassword, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Old password is incorrect' });
//         }

//         const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedNewPassword;
//         await user.save();

//         res.status(200).json({ message: 'Password changed successfully' });
//     } catch (error) {
//         console.error("Error changing password:", error);
//         res.status(500).json({ error: 'Server error while changing password' });
//     }
// };
