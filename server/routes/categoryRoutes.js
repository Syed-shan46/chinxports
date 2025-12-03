var express = require('express');
const { getCategoriesAndCount, createMainCategory, createSubCategory, getAllSubCategories, getAllMainCategories, getProductsBySubCategory, getAllSubCats, searchCategories } = require('../controllers/categoryController');
var router = express.Router();
const upload = require('../upload');


router.get('/', getCategoriesAndCount);
router.get("/subcategory/:subCatId", getProductsBySubCategory);

router.get('/search', searchCategories);

router.post('/main-category', createMainCategory);
router.get('/get-maincategories', getAllMainCategories);

router.post('/sub-category', upload.single("imageUrl"), createSubCategory);
router.get('/get-subcategories/:mainCategoryId', getAllSubCategories);
router.get('/get-subcategories', getAllSubCats);


module.exports = router;