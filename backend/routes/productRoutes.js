const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add new product
router.post("/", upload.single("image"), async (req, res) => {
  const { name, category, description, price, stock } = req.body;
  const newProduct = new Product({
    name,
    category,
    description,
    price,
    stock,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
  });
  await newProduct.save();
  res.json(newProduct);
});

// Update product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, category, description, price, stock } = req.body;

    const updatedProduct = await Product.findById(req.params.id);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    updatedProduct.name = name || updatedProduct.name;
    updatedProduct.category = category || updatedProduct.category;
    updatedProduct.description = description || updatedProduct.description;
    updatedProduct.price = price || updatedProduct.price;
    updatedProduct.stock = stock || updatedProduct.stock;

    if (req.file && req.file.path) {
      updatedProduct.imageUrl = req.file.path; // Cloudinary URL
    }

    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
