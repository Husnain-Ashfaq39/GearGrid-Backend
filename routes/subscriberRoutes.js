const express = require('express');
const subscriberController = require('../Controller/subscriberController'); // Import the controller

const router = express.Router();

// POST route to add a new subscriber
router.post('/add', subscriberController.addSubscriber);

// GET route to fetch all subscribers
router.get('/all', subscriberController.getAllSubscribers);

module.exports = router; 