const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product"); // adjust path if needed

dotenv.config();

const patchProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const products = await Product.find({});

    for (const product of products) {
      product.retail = product.retail || 0;
      product.sold = product.sold || 0;
      product.total = product.stock + product.sold;
      product.balance = product.total - product.sold;
      product.color = product.color || "";
      product.size = product.size || "";
      await product.save();
    }

    console.log("✅ All products patched.");
    process.exit();
  } catch (err) {
    console.error("❌ Error patching products:", err);
    process.exit(1);
  }
};

patchProducts();
