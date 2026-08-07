const express = require("express");
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.put("/update", updateCart);
router.delete("/remove", removeFromCart);
router.delete("/clear", clearCart);

module.exports = router;
