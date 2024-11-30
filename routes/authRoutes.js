const express = require('express');
const { login, register } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);      // Login API
router.post('/register', register); // Register API

module.exports = router;
