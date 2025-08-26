const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const { cloudinary, storage } = require("../utils/cloudinaryStorage");

const router = express.Router();
const upload = multer({ storage });

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new product
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      stock,
      condition,
      color,
      retail,
      type,
      priceType = "each",
      totalSales,
      total,
      existingImages = [] // 👈 array of URLs passed from frontend
    } = req.body;

    // Collect new uploads (if any) + existing image URLs
    const uploadedImages = req.files.map((file) => file.path); // new cloudinary URLs
    const images = [...uploadedImages, ...existingImages]; // 👈 merge them

    const parsedPrice = parseFloat(price) || 0;
    const product = new Product({
      name,
      category,
      description,
      price: parsedPrice,
      stock,
      condition,
      color,
      images,
      retail,
      type,
      total,
      totalSales,
      priceType,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update product
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      stock,
      condition,
      color,
      sold,
      balance,
      total,
      retail,
      size,
      type,
      priceType,
      existingImages = [],
    } = req.body;

    const uploadedImages = req.files?.map((file) => file.path) || [];

    const updatedFields = {
      name,
      category,
      description,
      price: parseFloat(price) || 0,
      stock,
      condition,
      color,
      sold,
      balance,
      total,
      retail,
      size,
      type,
      priceType,
      images: [...uploadedImages, ...existingImages],
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: err.message });
  }
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk insert products
router.post("/bulk", async (req, res) => {
  try {
    const newProducts = req.body;

    // Optional: validate each required field
    if (!Array.isArray(newProducts)) {
      return res.status(400).json({ error: "Invalid input format" });
    }

    const inserted = await Product.insertMany(newProducts, { ordered: false });
    res.status(201).json(inserted);
  } catch (err) {
    console.error("Bulk insert failed:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;