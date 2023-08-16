// config/config.js
module.exports = {
  // Port number for the server
  PORT: process.env.PORT || 5000,

  // MongoDB connection URL (you can replace this with your actual MongoDB URL)
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/getPriceDB',

  // Other configuration options
  // ...
};
