// models/SubCategory.js
const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },

        // 🔥 Add this field so populate works
        mainCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MainCategory",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
