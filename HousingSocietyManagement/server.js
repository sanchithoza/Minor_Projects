require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const config = require('./config/config');
const createRoutes = require('./routes');
const residentRoutes = require('./routes/residentRoutes');
const cors = require('cors'); // Import the cors package
const PORT = process.env.PORT || config.PORT;
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Create routes
createRoutes(app);
app.get('/', (req, res) => res.send('Hello World!'))
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
