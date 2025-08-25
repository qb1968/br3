const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios"); // Add this if not already
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// SerpAPI route
app.get("/api/compare-prices", async (req, res) => {
  try {
    const { q } = req.query;
    const apiKey = process.env.SERP_API_KEY;

    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_shopping",
        q,
        api_key: apiKey,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data from SerpAPI" });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
