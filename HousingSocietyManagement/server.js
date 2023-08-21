const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const createRoutes = require('./routes');
const cors = require('cors'); // Import the cors package

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Create routes
createRoutes(app);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
