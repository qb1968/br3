// const express = require("express");
// const router = express.Router();
// const Category = require("../models/Category");

// router.get("/", async (req, res) => {
//   const categories = await Category.find();
//   res.json(categories);
// });

// router.post("/", async (req, res) => {
//   const { name } = req.body;
//   try {
//     const existing = await Category.findOne({ name });
//     if (!existing) {
//       const newCategory = new Category({ name });
//       await newCategory.save();
//       return res.status(201).json(newCategory);
//     }
//     res.status(200).json(existing);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating category", error });
//   }
// });

// module.exports = router;
const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
