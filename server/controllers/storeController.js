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

    const conditions = [];

    // 🔍 Logical Global Search Handling
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      conditions.push({
        $or: [
          { productName: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { tags: { $elemMatch: { $regex: searchRegex } } }
        ]
      });
    }

    const categoryId = req.query.category || req.query.mainCategory;
    if (categoryId) {
      const mainCatDoc = await MainCategory.findById(categoryId).lean();
      const subIds = mainCatDoc?.subCategories || [];
      if (subIds.length > 0) {
        conditions.push({
          $or: [
            { mainCategory: categoryId },
            { subCategory: { $in: subIds } }
          ]
        });
      } else {
        conditions.push({ mainCategory: categoryId });
      }
    }

    const subCategoryId = req.query.subCategory || req.query.sub;
    if (subCategoryId) {
      conditions.push({ subCategory: subCategoryId });
    }

    if (req.query.priceMin) {
      const min = Number(req.query.priceMin);
      if (!isNaN(min)) conditions.push({ price: { $gte: min } });
    }

    if (req.query.priceMax) {
      const max = Number(req.query.priceMax);
      if (!isNaN(max)) conditions.push({ price: { $lte: max } });
    }

    const filter = conditions.length > 0 ? (conditions.length === 1 ? conditions[0] : { $and: conditions }) : {};

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
