const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  societyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
  name: { type: String, required: true },
  unitNumber: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String },
  moveInDate: { type: Date, required: true },
  isOwner: { type: Boolean, required: true },
});

const Resident = mongoose.model('Resident', residentSchema);

module.exports = Resident;
