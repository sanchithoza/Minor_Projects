const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
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
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
