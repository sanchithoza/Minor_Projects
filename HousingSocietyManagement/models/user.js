const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: false },
  societyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: false },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'society', 'resident'], default: 'resident' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
