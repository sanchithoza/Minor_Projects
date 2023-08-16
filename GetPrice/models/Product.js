// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  manufacturedBy: { type: String, required: true },
  modelNumber: { type: String, required: true },
  costPrice: { type: Number, required: true },
  wholesalePrice: { type: Number, required: true },
  retailPrice: { type: Number, required: true },
  insertedDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
