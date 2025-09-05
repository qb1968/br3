const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
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

// ✅ Dynamic Sitemap Route
app.get("/sitemap.xml", async (req, res) => {
  try {
    // Fetch products from your API
    const { data: products } = await axios.get(
      "http://localhost:5000/api/products" // use internal API route
    );

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Static pages
    const staticPages = [
      { url: "https://yourdomain.com/", priority: "1.0" },
      { url: "https://yourdomain.com/products", priority: "0.9" },
      { url: "https://yourdomain.com/about", priority: "0.7" },
      { url: "https://yourdomain.com/contact", priority: "0.7" },
    ];

    // Build static URLs
    let urls = staticPages
      .map(
        (p) => `
      <url>
        <loc>${p.url}</loc>
        <lastmod>${today}</lastmod>
        <priority>${p.priority}</priority>
      </url>`
      )
      .join("");

    // Add product URLs
    urls += products
      .map(
        (p) => `
      <url>
        <loc>https://yourdomain.com/products/${p._id}</loc>
        <lastmod>${today}</lastmod>
        <priority>0.8</priority>
      </url>`
      )
      .join("");

    // Final sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (err) {
    console.error("Error generating sitemap:", err.message);
    res.status(500).send("Error generating sitemap");
  }
});

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
