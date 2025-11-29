const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const session = require("express-session");
dotenv.config();
const connectDB = require('./db');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const storeRoutes = require('./routes/storeRoutes');
const adminRoutes = require('./routes/adminRoutes');

// ✅ Define CORS options FIRST
const corsOptions = {
  origin: [
    "http://192.168.31.108:5173",
    "http://localhost:5173",
    "http://192.168.31.58:5173",
    "https://chinxports-client.onrender.com",
    "https://www.chinaxports.com",
    "https://chinaxports.com",], // Your React frontend URL
  credentials: true,               // Allow cookies
  methods: "GET,POST,PUT,DELETE",  // Allow required methods
  allowedHeaders: "Content-Type,Authorization",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // true only if HTTPS
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

connectDB();

// Routes
app.use('/api', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/admin', adminRoutes);


app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on all network interfaces");
});

