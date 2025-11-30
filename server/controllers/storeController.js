// controllers/storeController.js
const Product = require("../models/productModel");

module.exports.storePage = async (req, res) => {
  try {
    const mainCategory = req.query.mainCategory || "";
    const subCategory = req.query.subCategory || "";
    const page = Number(req.query.page) || 1;
    const limit = 30;
    const skip = (page - 1) * limit;

    let filter = {};

    if (mainCategory) {
      filter.mainCategory = mainCategory;
    }

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    const totalCount = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate("mainCategory", "name")
      .populate("subCategory", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
 
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      products,
      totalPages,
      currentPage: page,
    });

  } catch (err) {
    console.error("Store fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
