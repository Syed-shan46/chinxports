const express = require('express');
const router = express.Router();
const multer = require('multer');
const bulkUploadController = require('../controllers/bulkUploadController');

const upload = multer({ dest: 'uploads/' });

router.post('/products/bulk-upload', upload.array('images', 20), bulkUploadController);

module.exports = router;