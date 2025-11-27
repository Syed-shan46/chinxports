var express = require('express');
const { getCategoriesAndCount, createMainCategory, createSubCategory, getAllSubCategories, getAllMainCategories, getProductsBySubCategory, getAllSubCats } = require('../controllers/categoryController');
var router = express.Router();

router.get('/', getCategoriesAndCount);
router.get("/subcategory/:subCatId", getProductsBySubCategory);

router.post('/main-category', createMainCategory);
router.get('/get-maincategories', getAllMainCategories);

router.post('/sub-category', createSubCategory);
router.get('/get-subcategories/:mainCategoryId',getAllSubCategories);
router.get('/get-subcategories', getAllSubCats);


module.exports = router;