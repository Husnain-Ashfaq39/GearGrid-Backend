const express = require('express');
const generalDataController = require('../Controller/generalDataController'); // Import the correct controller
const { updateGeneralData, getGeneralData } = generalDataController; // Destructure the update and get functions

const router = express.Router();

router.post('/', updateGeneralData);      // Update General Data API
router.put('/', updateGeneralData);      // Update General Data API
router.get('/all', getGeneralData);          // Get General Data API

module.exports = router;
