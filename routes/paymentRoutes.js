const express = require('express');
const { createPaymentSession } = require('../Controller/stripeController');
const router = express.Router();

router.post('/create-checkout-session', createPaymentSession);

module.exports = router; 