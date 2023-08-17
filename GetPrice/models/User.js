// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  insertDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
