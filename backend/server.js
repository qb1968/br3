const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const path = require("path");
const Product = require("./models/Product"); // import Product model for sitemap
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve public folder for Google verification HTML
app.use(express.static(path.join(__dirname, "public")));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Dynamic Sitemap Route
app.get("/sitemap.xml", async (req, res) => {
  try {
    // Fetch products directly from MongoDB instead of localhost
    const products = await Product.find().lean();

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const FRONTEND_URL = "https://buildersre-source.com"; // your frontend URL

    // Static pages
    const staticPages = [
      { url: `${FRONTEND_URL}/`, priority: "1.0" },
      { url: `${FRONTEND_URL}/products`, priority: "0.9" },
      { url: `${FRONTEND_URL}/about`, priority: "0.7" },
      { url: `${FRONTEND_URL}/contact`, priority: "0.7" },
    ];

    // Build static URLs
    let urls = staticPages
      .map(
        (p) =>
          `<url>
  <loc>${p.url}</loc>
  <lastmod>${today}</lastmod>
  <priority>${p.priority}</priority>
</url>`
      )
      .join("");

    // Add product URLs
    urls += products
      .map(
        (p) =>
          `<url>
  <loc>${FRONTEND_URL}/products/${p._id}</loc>
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

// Health check
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

// Optional: React SPA catch-all (if serving frontend from backend)
// app.use(express.static(path.join(__dirname, "client", "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
