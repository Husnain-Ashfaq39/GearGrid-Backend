const express = require('express');
const userController = require('../Controller/userController'); // Changed import to the full module
const { getUserById, changePassword, updateUser, getUserData, changeProfilePicture, getAllCustomers } = userController; 

const router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getUser/:id', getUserById);
router.put('/changePassword/:id', changePassword); // Added change password route
router.put('/updateUser/:id', updateUser); // Added update user route
router.put('/changeProfilePicture/:id',upload.array('image1', 10), changeProfilePicture); // Added change profile picture route
router.get('/getUserData', getUserData);
router.get('/getAllCustomers', getAllCustomers);
module.exports = router;

