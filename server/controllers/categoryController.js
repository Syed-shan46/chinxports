
const Product = require("../models/productModel");
const MainCategory = require("../models/mainCategoryModel");
const SubCategory = require("../models/subCategoryModel");

module.exports.getCategoriesAndCount = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat._id });
        return { ...cat, productCount: count };
      })
    );
    res.json(categoriesWithCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}


module.exports.createSubCategory = async (req, res) => {
  try {
    const { name, mainCategoryId, imageUrl } = req.body;

    // ----------------------------
    // VALIDATE MAIN CATEGORY
    // ----------------------------
    const mainCategoryExists = await MainCategory.findById(mainCategoryId);
    if (!mainCategoryExists) {
      return res.status(400).json({ error: "Invalid mainCategoryId" });
    }

    // ----------------------------
    // HANDLE IMAGE (Multer + JSON)
    // ----------------------------
    let finalImage = "";

    // 1️⃣ If multer file uploaded → use that
    if (req.file) {
      finalImage = req.file.path;
    }

    // 2️⃣ If frontend sends JSON imageUrl → override
    if (typeof imageUrl === "string" && imageUrl.trim() !== "") {
      finalImage = imageUrl.trim();
    }

    // 3️⃣ If no image provided → optional placeholder
    if (!finalImage) {
      finalImage = "";
      // You can also add:
      // finalImage = "/placeholder/subcategory.png";
    }

    // ----------------------------
    // CREATE SUBCATEGORY
    // ----------------------------
    const subCategory = await SubCategory.create({
      name,
      mainCategory: mainCategoryId,
      imageUrl: finalImage
    });

    // ----------------------------
    // PUSH TO MAIN CATEGORY
    // ----------------------------
    await MainCategory.findByIdAndUpdate(mainCategoryId, {
      $push: { subcategories: subCategory._id }
    });

    return res.status(201).json({
      message: "SubCategory created successfully",
      subCategory
    });

  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res.status(500).json({ error: "Server error" });
  }
};




exports.createMainCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const exists = await MainCategory.findOne({ name });
    if (exists) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await MainCategory.create({ name });

    res.json({ success: true, category });
  } catch (error) {
    console.error("Create Main Category Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getAllSubCats = async (req, res) => {
  try {
    const subcategories = await SubCategory.find()
      .populate("mainCategory", "name imageUrl") // optional: shows main category name
      .lean();

    res.json({
      success: true,
      subcategories
    });

  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategories"
    });
  }
};

// Get all subcategories with main category populated
module.exports.getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find()
      .populate("mainCategory", "name") // only return mainCategory name
      .lean();

    res.json({ success: true, subcategories });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
};

module.exports.getProductsBySubCategory = async (req, res) => {
  try {
    const { subCatId } = req.params;

    console.log("Requested SubCategory:", subCatId);

    const products = await Product.find({
      subCategory: subCatId
    });

    console.log("Matched Products:", products.length);

    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};



// Get MainCategories with SubCategories included
exports.getAllMainCategories = async (req, res) => {
  try {
    // Get all main categories
    const mainCategories = await MainCategory.find().sort({ name: 1 }).lean();

    // For each main category, fetch its subcategories
    const categoriesWithSubs = await Promise.all(
      mainCategories.map(async (main) => {
        const subCategories = await SubCategory.find({ mainCategory: main._id })
          .sort({ name: 1 })
          .lean();
        return { ...main, subCategories };
      })
    );

    res.json({ success: true, categories: categoriesWithSubs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.searchCategories = async (req, res) => {
  try {
    const q = req.query.q?.trim() || "";

    if (!q) return res.json({ products: [], subCategories: [] });

    // Search Products
    const products = await Product.find({
      productName: { $regex: q, $options: "i" }
    })
      .select("productName imageUrl")
      .limit(10);

    // Search Subcategories
    const subCategories = await SubCategory.find({
      name: { $regex: q, $options: "i" }
    })
      .select("name mainCategory")
      .limit(10);

    res.json({ products, subCategories });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

