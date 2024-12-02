const express = require('express');
const router = express.Router();
const contactUsController = require('../Controller/contactUsController');

// Route for adding contact us data
router.post('/add', contactUsController.addContactUs);

// Route for fetching all contact us data
router.get('/all', contactUsController.getAllContactUs);

// Route for updating the read field
router.put('/update-read/:id', contactUsController.updateReadStatus);

module.exports = router; 