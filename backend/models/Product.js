const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  stock: {
    type: Number,
    required: false,
  },
  imageUrl: String,
});

module.exports = mongoose.model("Product", ProductSchema);
