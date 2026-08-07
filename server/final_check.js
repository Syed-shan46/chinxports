const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MainCategory = require('./models/mainCategoryModel');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const cats = await MainCategory.find();
  cats.forEach(c => console.log(`Name: '${c.name}' | ID: '${c._id}'`));

  process.exit(0);
}

check();
