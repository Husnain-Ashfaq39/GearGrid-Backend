const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the templating engine (optional)
app.set('view engine', 'ejs');

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
