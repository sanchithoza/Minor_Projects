const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  societyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Society",
    required: true,
  },
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    required: true,
  },
  date: { type: Date, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["paid", "overdue"], default: "resident" },
});

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;
