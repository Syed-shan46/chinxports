const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Product = require('./models/productModel');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const targetId = '69c36d19eab4f288c1d04248';
  const prod = await Product.findOne({ mainCategory: targetId });
  if (prod) {
    console.log('Sample Product MainCategory Type:', prod.createdAt ? 'exists' : 'missing');
    console.log('Sample Product MainCategory Value:', prod.mainCategory);
  } else {
    console.log('No products found for', targetId);
  }

  process.exit(0);
}

check();
