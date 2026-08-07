// server/routes/rateRoutes.js
const express = require("express");
const router = express.Router();
const { getRmbRate, getLastUpdated } = require("../services/rmbRate");

// GET /api/rate/rmb
router.get("/rmb", (req, res) => {
  try {
    const rate = getRmbRate();
    const lastUpdated = getLastUpdated();
    return res.json({ success: true, rate, lastUpdated });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
