const express = require('express');
const authController = require('../Controller/authController'); // Changed import to the full module
const { login, register, getCurrentUser, checkAuth } = authController; // Destructure after importing

const router = express.Router();

router.post('/login', login);      // Login API
router.post('/register', register); // Register API

module.exports = router;
