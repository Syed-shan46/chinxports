const Product = require('../models/productModel');

/**
 * POST /api/products/bulk-upload
 * Expects:
 * - images: Array of files from multer
 * - mainCategory: ID
 * - subCategory: ID
 */
module.exports.bulkUpload = async (req, res) => {
    try {
        const { mainCategory, subCategory, productDetails } = req.body;
        const files = req.files || [];

        if (!files.length) {
            return res.status(400).json({ error: "No images provided for bulk upload" });
        }

        if (!mainCategory || !subCategory) {
            return res.status(400).json({ error: "Main Category and Sub Category are required for bulk upload" });
        }

        // Parse product details if provided
        let details = [];
        try {
            if (productDetails) {
                details = JSON.parse(productDetails);
            }
        } catch (e) {
            console.error("Error parsing productDetails:", e);
        }

        const products = [];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const meta = details[i] || {};

            // Determine categories for this specific product
            const itemMainCategory = meta.mainCategory || mainCategory;
            const itemSubCategory = meta.subCategory || subCategory;

            // Create a product for each image with its specific metadata
            const newProduct = await Product.create({
                productName: meta.name || "New Arrival",
                description: "",
                price: Number(meta.price) || 0,
                minQty: 12,
                imageUrl: [file.path],
                mainCategory: itemMainCategory,
                subCategory: itemSubCategory,
                handpicked: false,
                special: false,
                trending: false
            });
            products.push(newProduct);
        }

        return res.status(201).json({
            message: `Successfully uploaded ${products.length} products`,
            products
        });

    } catch (error) {
        console.error("Bulk upload error:", error);
        return res.status(500).json({ error: "Server error during bulk upload" });
    }
};
