const Product = require('../models/productModel');
const whatsappNumber = '8615669528151'; // your number


module.exports.getAllProducts = async (req, res) => {
  try {
    // Handpicked products
    const handpickedProducts = await Product.aggregate([
      { $match: { handpicked: true } }, // changed false → true (otherwise wrong logic)
      { $sample: { size: 4 } }
    ]);

    // Populate categories
    const populatedHandpicked = await Product.populate(handpickedProducts, [
      { path: 'mainCategory', select: 'name' },
      { path: 'subCategory', select: 'name' }
    ]);

    // Special products
    const specialProducts = await Product.aggregate([
      { $match: { special: true } },
      { $sample: { size: 4 } }
    ]);

    const populatedSpecial = await Product.populate(specialProducts, [
      { path: 'mainCategory', select: 'name' },
      { path: 'subCategory', select: 'name' }
    ]);

    // Trending products
    const trendingProducts = await Product.aggregate([
      { $match: { trending: true } },
      { $sample: { size: 4 } }
    ]);

    const populatedTrending = await Product.populate(trendingProducts, [
      { path: 'mainCategory', select: 'name' },
      { path: 'subCategory', select: 'name' }
    ]);

    // All products
    const products = await Product.find()
      .populate('mainCategory', 'name')
      .populate('subCategory', 'name')
      .sort({ createdAt: -1 });

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
    console.log("Fetching handpicked products...");

    const handpickedProducts = await Product.aggregate([
      { $match: { handpicked: false } },
      { $sample: { size: 6 } }
    ]);

    console.log("Raw handpicked products:", handpickedProducts);

    const populatedHandpicked = await Product.populate(handpickedProducts, [
      { path: 'mainCategory', select: 'name' },
      { path: 'subCategory', select: 'name' }
    ]);

    console.log("Populated handpicked products:", populatedHandpicked);



    res.json(populatedHandpicked);
  } catch (error) {
    console.error("Error fetching handpicked products:", error);

    // Ensure we always send a JSON response
    res.status(500).json({
      error: 'Server error',
      message: error?.message || String(error),
      stack: error?.stack || 'No stack available'
    });
  }
};

module.exports.getTrendingProducts = async (req, res) => {
  try {
    console.log("Fetching trending products...");

    const trendingProducts = await Product.aggregate([
      { $match: { trending: true } },
      { $sample: { size: 4 } }
    ]);

    console.log("Raw trending products:", trendingProducts);

    const populatedTrending = await Product.populate(trendingProducts, {
      path: 'category',
      select: 'name'
    });

    console.log("Populated trending products:", populatedTrending);

    res.json(populatedTrending);
  } catch (error) {
    console.error("Error fetching trending products:", error);

    res.status(500).json({
      error: 'Server error',
      message: error?.message || String(error),
      stack: error?.stack || 'No stack available'
    });
  }
};

module.exports.getSpecialProducts = async (req, res) => {
  try {
    console.log("Fetching special products...");

    const specialProducts = await Product.aggregate([
      { $match: { special: true } },
      { $sample: { size: 4 } }
    ]);

    console.log("Raw special products:", specialProducts);

    const populatedSpecial = await Product.populate(specialProducts, {
      path: 'category',
      select: 'name'
    });

    console.log("Populated special products:", populatedSpecial);

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
    const message = encodeURIComponent(`I want to know more about ${product.productName}`);
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
      trending,
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
      minQty: Number(minQty) || 1,
      tags: tagsArr,
      trending: trending === "true" || trending === true,
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


