// controllers/storeController.js
const Product = require("../models/productModel");
const MainCategory = require("../models/mainCategoryModel");

module.exports.storePage = async (req, res) => {
  try {
    let sortQuery = {};

    if (req.query.sort === "latest") {
      sortQuery = { createdAt: -1 };
    }
    if (req.query.sort === "price_asc") {
      sortQuery = { price: 1 }; // RMB low → high
    }
    if (req.query.sort === "price_desc") {
      sortQuery = { price: -1 }; // RMB high → low
    }

    const page = Number(req.query.page) || 1;
    const limit = 30;
    const skip = (page - 1) * limit;

    let filter = {};

    // 🔍 Logical Global Search Handling
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { productName: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { tags: { $elemMatch: { $regex: searchRegex } } } // Since tags is array of strings
      ];
    }

    // Only fallback to default GOLD_CAT_ID if neither subCategory nor search is actively specified
    const GOLD_CAT_ID = '69c36d19eab4f288c1d04248';
    let mainCategory = req.query.mainCategory;
    if (!mainCategory && !req.query.subCategory && !req.query.search) {
      mainCategory = GOLD_CAT_ID;
    }

    if (mainCategory) {
      filter.mainCategory = mainCategory;
    }

    if (req.query.subCategory) {
      filter.subCategory = req.query.subCategory;
    }

    const xuping = await MainCategory.findOne({ name: { $regex: /^xuping$/i } });
    if (xuping) {
      if (filter.mainCategory) {
        if (filter.mainCategory.toString() === xuping._id.toString()) {
          return res.json({
            products: [],
            totalPages: 0,
            totalCount: 0,
            currentPage: page
          });
        }
      } else {
        filter.mainCategory = { $ne: xuping._id };
      }
    }

    const totalCount = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortQuery)
      .populate("mainCategory", "name")
      .populate("subCategory", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      products,
      totalPages,
      totalCount,
      currentPage: page,
    });

  } catch (err) {
    console.error("Store fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
