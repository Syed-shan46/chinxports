var express = require('express');
const { getAllProducts, getHandpickedProducts, getProductDetail, getSpecialProducts, getTrendingProducts, uploadProduct } = require('../controllers/productController');
var router = express.Router();
const upload = require('../upload');
const adminAuth = require('../middlewares/adminAuth');

router.get('/products', getAllProducts);

router.get('/products/handpicked', getHandpickedProducts);

router.get('/products/special', getSpecialProducts);

router.get('/products/trending', getTrendingProducts);

router.get('/products/:id', getProductDetail);

router.post('/products/upload-product', adminAuth, upload.array('imageUrl', 6), uploadProduct);


module.exports = router;