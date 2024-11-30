const express = require('express');
const userController = require('../Controller/userController'); // Changed import to the full module
const { getUserById } = userController; // Destructure after importing

const router = express.Router();
router.get('/getUser/:id',getUserById )


module.exports = router;


