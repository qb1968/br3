const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: String,
  stock: {
    type: Number,
    required: false,
  },
  sold: {
    type: Number,
    default: 0,
  },
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
