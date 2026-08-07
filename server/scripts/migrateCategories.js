const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const MainCategory = require("../models/mainCategoryModel");
const SubCategory = require("../models/subCategoryModel");

const MONGO_URI = process.env.MONGO_URI;

const NEW_MAIN_CATEGORY = "18k pvd gold coated and 316 L";
const SUB_CATEGORIES = [
  "bangles",
  "necklaces",
  "earrings",
  "rings",
  "bracelets"
];

async function migrate() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // 1. Create or find Main Category
    let mainCat = await MainCategory.findOne({ name: NEW_MAIN_CATEGORY });
    if (!mainCat) {
      mainCat = await MainCategory.create({ name: NEW_MAIN_CATEGORY });
      console.log(`Created Main Category: ${NEW_MAIN_CATEGORY}`);
    } else {
      console.log(`Main Category already exists: ${NEW_MAIN_CATEGORY}`);
    }

    // 2. Create Subcategories
    const subCatIds = [];
    for (const subName of SUB_CATEGORIES) {
      let subCat = await SubCategory.findOne({ name: subName, mainCategory: mainCat._id });
      if (!subCat) {
        subCat = await SubCategory.create({
          name: subName,
          mainCategory: mainCat._id,
          imageUrl: `/images/categories/${subName.replace(/s$/, "")}.png` // Default naming convention
        });
        console.log(`Created Sub Category: ${subName}`);
      } else {
        console.log(`Sub Category already exists: ${subName}`);
      }
      subCatIds.push(subCat._id);
    }

    // 3. Update Main Category with Subcategories
    mainCat.subCategories = subCatIds;
    await mainCat.save();
    console.log("Updated Main Category with subcategories");

    console.log("Migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
