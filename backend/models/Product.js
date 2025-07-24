const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: { type: Number, required: true },
  priceType: {
    type: String,
    enum: ["per piece", "per bundle","each","per box","pair"],
    default: "",
  },
  stock: {
    type: Number,
    required: false,
  },
  sold: {
    type: Number,
    default: 0,
  },
  condition: String,
  balance: Number,
  total: Number,
  retail: Number,
  size: String,
  type: String,
  color: String,
  totalSales: { type: Number, default: 0 },
  // imageUrl: String,
  images: [String],
});

module.exports = mongoose.model("Product", ProductSchema);
