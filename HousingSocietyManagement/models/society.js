const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  totalUnits: { type: Number, required: true },
  amenities: [{ type: String }],
});

const Society = mongoose.model("Society", societySchema);

module.exports = Society;
