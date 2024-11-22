const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home Page', message: 'Welcome to Express Starter!' });
});

// API example route
router.get('/api', (req, res) => {
  res.json({ message: 'Hello, API!' });
});

module.exports = router;
