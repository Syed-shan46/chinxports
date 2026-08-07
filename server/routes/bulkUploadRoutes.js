const express = require('express');
const router = express.Router();
const { bulkUpload } = require('../controllers/bulkUploadController');
const upload = require('../upload');
const adminAuth = require('../middlewares/adminAuth');

// Protected bulk upload route
router.post('/bulk-upload', upload.array('images', 50), bulkUpload);

module.exports = router;
