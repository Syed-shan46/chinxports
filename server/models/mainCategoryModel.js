// models/MainCategory.js
const mongoose = require("mongoose");

const mainCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("MainCategory", mainCategorySchema);
