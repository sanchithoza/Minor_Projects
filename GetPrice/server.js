// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');
const app = express();
const config = require('./config/config');
const connectDB = require('./config/db');

const PORT = process.env.PORT || config.PORT;

// Call the database connection function
connectDB();

// Use the cors middleware
// const corsOptions = {
//     origin: 'http://example.com', // Replace with your frontend's domain
//     methods: 'GET, POST, PUT, DELETE',
//   };
  
//   app.use(cors(corsOptions));
app.use(cors());

// Define routes and middleware here
// Example middleware to parse JSON requests
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRoutes);

// Example route
app.get('/api/welcome', (req, res) => {
  res.json({ message: 'Welcome to the MERN app!' });
});

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
  });

//   // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Handle other routes by serving the index.html from React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
