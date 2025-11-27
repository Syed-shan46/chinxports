const mongoose = require('mongoose');
require('./subCategoryModel');

// Define the custom validator function FIRST
function arrayLimit(val) {
  return val.length > 0;
}

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  minQty: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  keywords: [
    {
      key: { type: String, required: true, trim: true },
      value: { type: String, required: true, trim: true }
    }
  ],

  tags: {
    type: [String],
    default: []
  },
  trending: {
    type: Boolean,
    default: false
  },
  special: {
    type: Boolean,
    default: false
  },
  handpicked: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: [String], 
    required: true,
    validate: [arrayLimit, '{PATH} must have at least one image']
  },
  mainCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainCategory",
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
