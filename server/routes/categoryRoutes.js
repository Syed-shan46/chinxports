var express = require('express');
const { getCategoriesAndCount, createMainCategory, createSubCategory, getAllSubCategories, getAllMainCategories } = require('../controllers/categoryController');
var router = express.Router();

router.get('/', getCategoriesAndCount);

router.post('/main-category', createMainCategory);
router.get('/get-maincategories', getAllMainCategories);

router.post('/sub-category', createSubCategory);
router.get('/get-subcategories/:mainCategoryId',getAllSubCategories);


module.exports = router;