var express = require('express');
const { getAllProducts, getHandpickedProducts, getProductDetail, getSpecialProducts, getTrendingProducts, uploadProduct } = require('../controllers/productController');
var router = express.Router();
const upload = require('../upload');
const adminAuth = require('../middlewares/adminAuth');

router.get("/search", async (req, res) => {
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
});


router.get('/products', getAllProducts);

router.get('/products/handpicked', getHandpickedProducts);

router.get('/products/special', getSpecialProducts);

router.get('/products/trending', getTrendingProducts);

router.get('/products/:id', getProductDetail);

router.post('/products/upload-product', upload.array('imageUrl', 6), uploadProduct);


module.exports = router;