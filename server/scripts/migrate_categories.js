const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const MainCategory = require("../models/mainCategoryModel");
const SubCategory = require("../models/subCategoryModel");
const Product = require("../models/productModel");

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        // 1. Create or Find "Xuping" Main Category
        let xuping = await MainCategory.findOne({ name: "Xuping" });
        if (!xuping) {
            xuping = await MainCategory.create({ name: "Xuping" });
            console.log("Created 'Xuping' Main Category.");
        } else {
            console.log("'Xuping' Main Category already exists.");
        }

        // 2. Identify all existing SubCategories and move them to Xuping
        // This assumes currently they might be under "Stainless Steel" or unassigned
        const subCategories = await SubCategory.find();
        console.log(`Found ${subCategories.length} subcategories to migrate.`);

        for (const sub of subCategories) {
            sub.mainCategory = xuping._id;
            await sub.save();
        }
        console.log("Migrated all subcategories to Xuping.");

        // 3. Sync Xuping's subCategories array
        xuping.subCategories = subCategories.map(s => s._id);
        await xuping.save();

        // 4. Update all Products to point to Xuping
        const productUpdateResult = await Product.updateMany({}, { mainCategory: xuping._id });
        console.log(`Migrated ${productUpdateResult.modifiedCount} products to Xuping.`);

        console.log("Migration completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

migrate();
