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
  // imageUrl: String,
  images: [String],
});

module.exports = mongoose.model("Product", ProductSchema);
