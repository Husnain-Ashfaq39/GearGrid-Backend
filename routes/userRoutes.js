const express = require('express');
const userController = require('../Controller/userController'); // Changed import to the full module
const { getUserById, changePassword, updateUser,getUserData } = userController; // Destructure after importing

const router = express.Router();
router.get('/getUser/:id', getUserById);
router.put('/changePassword/:id', changePassword); // Added change password route
router.put('/updateUser/:id', updateUser); // Added update user route
router.get('/getUserData',getUserData)
module.exports = router;

