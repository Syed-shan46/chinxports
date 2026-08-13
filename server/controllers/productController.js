const Product = require('../models/productModel');
const SubCategory = require('../models/subCategoryModel');
const MainCategory = require('../models/mainCategoryModel');
const mongoose = require('mongoose');
const whatsappNumber = '8615669528151'; // your number

const GOLD_CAT_ID = '69c36d19eab4f288c1d04248'; // Now Premium 18k Gold (formerly 316L)


module.exports.getAllProducts = async (req, res) => {
  try {
    const { mainCategory, subCategory } = req.query;
    console.log("getAllProducts query:", { mainCategory, subCategory });

    const productsQuery = {};
    if (mainCategory) {
      productsQuery.mainCategory = new mongoose.Types.ObjectId(mainCategory);
    }

    if (subCategory) {
      productsQuery.subCategory = new mongoose.Types.ObjectId(subCategory);
    }
    
    console.log("Generated match query:", productsQuery);

    // Handpicked products
    const handpickedProducts = await Product.aggregate([
      { $match: { ...productsQuery, handpicked: true } },
      { $sample: { size: 4 } }
    ]);

    // Populate categories
    const populatedHandpicked = await Product.populate(handpickedProducts, [
      { path: 'mainCategory', select: 'name' },
      { path: 'subCategory', select: 'name' }
    ]);

    // Special products
    const specialProducts = await Product.aggregate([
      { $match: { ...productsQuery, special: true } },
      { $sample: { size: 4 } }
    ]);

    const populatedSpecial = await Product.populate(specialProducts, [
      { path: 'mainCategory', select: 'name' },
      { path: 'subCategory', select: 'name' }
    ]);

    // Trending products
    const trendingProducts = await Product.aggregate([
      { $match: { ...productsQuery, trending: true } },
      { $sample: { size: 4 } }
    ]);

    const populatedTrending = await Product.populate(trendingProducts, [
      { path: 'mainCategory', select: 'name' },
      { path: 'subCategory', select: 'name' }
    ]);

    // All products
    // If no mainCategory was specified, we only show GOLD by default
    // If specifically filtered, we show the filtered ones
    const limit = req.query.limit || 20;
    
    const products = await Product.find(productsQuery)
      .populate('mainCategory', 'name')
      .populate('subCategory', 'name')
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    return res.json({
      products,
      handpickedProducts: populatedHandpicked,
      specialProducts: populatedSpecial,
      trendingProducts: populatedTrending
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Server error");
  }
};


module.exports.getHandpickedProducts = async (req, res) => {
  try {
    const targetMainCat = req.query.mainCategory || null;
    let query = targetMainCat ? { _id: targetMainCat } : {};

    const mainCats = await MainCategory.find(query).lean();
    let allProducts = [];

    for (const mainCat of mainCats) {
      const subIds = mainCat?.subCategories || [];
      const subCategories = await SubCategory.find({ _id: { $in: subIds } });

      const productPromises = subCategories.map(sub => 
        Product.find({ 
          mainCategory: mainCat._id, 
          subCategory: sub._id 
        })
        .sort({ createdAt: -1 })
        .limit(4)
        .populate('mainCategory', 'name')
        .populate('subCategory', 'name')
      );

      const productsNested = await Promise.all(productPromises);
      allProducts.push(...productsNested.flat());
    }
    
    // Simple Fisher-Yates shuffle
    for (let i = allProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allProducts[i], allProducts[j]] = [allProducts[j], allProducts[i]];
    }

    // Ultra-Resilient Fallback: If still empty, fetch ANY products to avoid blank screens
    if (allProducts.length === 0) {
      const globalQuery = {};
      const globalLatest = await Product.find(globalQuery)
        .sort({ createdAt: -1 })
        .limit(24)
        .populate('mainCategory', 'name')
        .populate('subCategory', 'name');
      allProducts = globalLatest;
    }

    // Limit final count if needed (e.g., 20)
    res.json(allProducts.slice(0, 24));

  } catch (error) {
    console.error("Error fetching handpicked products:", error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

// Trending = ceramics
module.exports.getCeramicsProducts = async (req, res) => {
  try {
    const targetMainCat = req.query.mainCategory || null;
    const filter = targetMainCat ? { mainCategory: targetMainCat } : {};

    let allProducts = await Product.find(filter)
      .sort({ updatedAt: -1 })
      .limit(24)
      .populate('mainCategory', 'name')
      .populate('subCategory', 'name');

    // Shuffle for visual interest
    allProducts = allProducts.sort(() => Math.random() - 0.5);

    res.json(allProducts.slice(0, 24));
  } catch (error) {
    console.error("Error fetching trending products:", error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

module.exports.getSpecialProducts = async (req, res) => {
  try {
    const filterMainCat = GOLD_CAT_ID;

    const specialProducts = await Product.aggregate([
      { $match: { mainCategory: new mongoose.Types.ObjectId(filterMainCat), special: true } },
      { $sample: { size: 4 } }
    ]);

    console.log("Raw special products:", specialProducts);

    const populatedSpecial = await Product.populate(specialProducts, {
      path: 'category',
      select: 'name'
    });

    console.log("Populated special products:", populatedSpecial);

    if (populatedSpecial.length === 0) {
      const fallback = await Product.find({ mainCategory: new mongoose.Types.ObjectId(filterMainCat) })
        .sort({ createdAt: -1 })
        .limit(4)
        .populate('mainCategory', 'name')
        .populate('subCategory', 'name');
      return res.json(fallback);
    }

    res.json(populatedSpecial);
  } catch (error) {
    console.error("Error fetching special products:", error);

    res.status(500).json({
      error: 'Server error',
      message: error?.message || String(error),
      stack: error?.stack || 'No stack available'
    });
  }
};

module.exports.getProductDetail = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId)
      .populate('mainCategory', 'name')
      .populate('subCategory', 'name');

    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Limit images to max 4
    const images = product.imageUrl?.slice(0, 4) || [];
    product.imageUrl = images;

    // WhatsApp message
    const whatsappNumber = "YOUR_NUMBER_HERE"; // <-- You must define or import it
    const message = encodeURIComponent(``);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Recommended products from SAME main category
    const recommendations = await Product.find({
      mainCategory: product.mainCategory?._id,
      _id: { $ne: product._id }
    })
      .limit(4)
      .lean();

    const processedKeywords = product.keywords?.slice(0, 20) || [];

    res.json({
      product,
      whatsappLink,
      processedKeywords,
      recommendations,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};


module.exports.uploadProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      tags,
      ceramics,
      special,
      handpicked,
      mainCategory,
      subCategory,
      minQty,
      keywordsKeys = [],
      keywordsValues = [],
      imageUrl = [] // NEW: allow JSON URLs
    } = req.body;

    // ----------------------------
    // Process Tags
    // ----------------------------
    let tagsArr = [];
    if (Array.isArray(tags)) {
      tagsArr = tags;
    } else if (typeof tags === "string") {
      tagsArr = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    }

    // ----------------------------
    // Process Keywords (key:value pairs)
    // ----------------------------
    const keysArr = Array.isArray(keywordsKeys) ? keywordsKeys : [keywordsKeys];
    const valuesArr = Array.isArray(keywordsValues) ? keywordsValues : [keywordsValues];

    const keywordsArr = keysArr.reduce((acc, key, idx) => {
      if (key && valuesArr[idx]) acc.push({
        key: key.trim(),
        value: valuesArr[idx].trim()
      });
      return acc;
    }, []);

    // ----------------------------
    // Combine Multer Images + JSON URLs
    // ----------------------------
    const multerImages = req.files?.length ? req.files.map(f => f.path) : [];

    // JSON "imageUrl" can be string or array
    let jsonImages = [];
    if (typeof imageUrl === "string") {
      jsonImages = imageUrl.split(",").map(i => i.trim());
    } else if (Array.isArray(imageUrl)) {
      jsonImages = imageUrl;
    }

    const finalImages = [...multerImages, ...jsonImages];

    if (!finalImages.length) {
      return res.status(400).json({ error: "At least one product image is required (via upload or JSON)" });
    }

    // ----------------------------
    // Create Product
    // ----------------------------
    const newProduct = await Product.create({
      productName,
      description,
      price,
      minQty: Number(minQty) || 12,
      tags: tagsArr,
      ceramics: ceramics === "true" || ceramics === true,
      special: special === "true" || special === true,
      handpicked: handpicked === "true" || handpicked === true,
      imageUrl: finalImages,   // NOW accepts both
      keywords: keywordsArr,
      mainCategory,
      subCategory
    });

    const populatedProduct = await Product.findById(newProduct._id)
      .populate("mainCategory")
      .populate("subCategory");

    return res.status(201).json({
      message: "Product created successfully",
      product: populatedProduct
    });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Server error while uploading product" });
  }
}




// DELETE /api/products/:id
module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({ error: "Server error while deleting product" });
  }
};

module.exports.deleteManyProducts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Please provide an array of IDs to delete." });
    }

    const result = await Product.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      message: "Products deleted successfully",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error("Delete many products error:", error);
    return res.status(500).json({ error: "Server error while deleting products" });
  }
};

// GET /api/products/get-admin-products
// Supports: mainCategory, subCategory, search (productName), page, limit
module.exports.getAdminProducts = async (req, res) => {
  try {
    const { mainCategory, subCategory, search, page = 1, limit = 20 } = req.query;
    
    const query = {};
    
    // Logic: Only apply mainCategory if provided. 
    // If not provided, we show products across ALL brands.
    if (mainCategory) {
      query.mainCategory = new mongoose.Types.ObjectId(mainCategory);
    }
    
    if (subCategory) query.subCategory = new mongoose.Types.ObjectId(subCategory);
    if (search) query.productName = { $regex: search, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .populate('mainCategory', 'name')
      .populate('subCategory', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Get admin products error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/products/bulk-update
// Expects: updates: [{ id, productName, price, mainCategory, subCategory }]
module.exports.bulkUpdateProducts = async (req, res) => {
  try {
    const { updates } = req.body;

    if (!updates || !Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ error: "No updates provided" });
    }

    const bulkOps = updates.map(update => ({
      updateOne: {
        filter: { _id: update.id },
        update: {
          $set: {
            productName: update.productName,
            price: Number(update.price),
            minQty: Number(update.minQty),
            mainCategory: update.mainCategory,
            subCategory: update.subCategory
          }
        }
      }
    }));

    const result = await Product.bulkWrite(bulkOps);

    res.json({
      success: true,
      message: `Successfully updated ${result.modifiedCount} products`,
      result
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during bulk update" });
  }
};

// POST /api/products/bulk-update-moq
// Updates MOQ for ALL products matching filters (bypass pagination)
module.exports.bulkUpdateMOQ = async (req, res) => {
  try {
    const { mainCategory, subCategory, search, minQty } = req.body;
    
    if (minQty === undefined) return res.status(400).json({ error: "minQty is required" });

    const query = {};
    if (mainCategory) query.mainCategory = new mongoose.Types.ObjectId(mainCategory);
    if (subCategory) query.subCategory = new mongoose.Types.ObjectId(subCategory);
    if (search) query.productName = { $regex: search, $options: 'i' };

    const result = await Product.updateMany(query, {
      $set: { minQty: Number(minQty) }
    });

    res.json({
      success: true,
      message: `Successfully updated MOQ to ${minQty} for ${result.modifiedCount} products matching your criteria`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error("Global MOQ update error:", error);
    res.status(500).json({ error: "Server error during global update" });
  }
};

