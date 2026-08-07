const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const session = require("express-session");
const path = require('path');

// Load environment variables from parent directory or server directory fallback
dotenv.config({ path: path.resolve(__dirname, '../chinxports.env') });
dotenv.config();

const connectDB = require('./db');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const storeRoutes = require('./routes/storeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cartRoutes = require('./routes/cartRoutes');
const excelRoutes = require("./routes/excelRoutes");
const bulkUploadRoutes = require("./routes/bulkUploadRoutes");
const rateRoutes = require('./routes/rateRoutes');
const mailRoutes = require('./routes/mailRoutes');

// ✅ Define CORS options with dynamic origin matching for local network flexibility
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://chinxports-client.onrender.com",
      "https://www.chinaxports.com",
      "https://chinaxports.com",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.31.58:5173",
      "http://192.168.1.5:5173", // Common fallback
      "http://192.168.31.108:5173"
    ];
    
    // Allow local development origins (localhost, 127.0.0.1, and all 192.168.x.x or 10.x.x.x IPs)
    if (!origin || 
        origin.startsWith("http://localhost") || 
        origin.startsWith("http://127.0.0.1") || 
        /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d+$/.test(origin) ||
        /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(origin) ||
        allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true, // Required for secure cookies behind a proxy (like Render)
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true for HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

connectDB();

// Routes
app.use('/api', productRoutes);
app.use('/api/products', bulkUploadRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/excel", excelRoutes);
app.use("/api/rate", rateRoutes);
app.use('/api', mailRoutes);
app.use("/excel", express.static("public/excel"));
app.use("/uploads", express.static("uploads"));


app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on all network interfaces");
});

