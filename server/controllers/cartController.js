const Product = require("../models/productModel");
const { convertToINR } = require("../utils/priceUtils");


/* ---------------------------------------------------
   Initialize cart inside session
---------------------------------------------------- */
const initCart = (req) => {
  if (!req.session.cart) req.session.cart = [];
  return req.session.cart;
};

/* ---------------------------------------------------
   ADD TO CART
---------------------------------------------------- */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;

    if (!req.session.cart) {
      req.session.cart = [];  // initialize ONCE
    }

    const cart = req.session.cart;

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
    } else {
      // Fetch product details
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Add new item
      cart.push({
        productId,
        productName: product.productName,
        imageUrl: product.imageUrl[0] || "",
        price: price,
        quantity,
      });
    }

    req.session.cart = cart;

    console.log("UPDATED CART:", req.session.cart);

    res.json({ cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ---------------------------------------------------
   GET CART
---------------------------------------------------- */
exports.getCart = (req, res) => {
  const cart = initCart(req);
  res.json({ cart });
};

/* ---------------------------------------------------
   UPDATE CART ITEM
---------------------------------------------------- */
exports.updateCart = (req, res) => {
  const { productId, quantity } = req.body;
  const cart = initCart(req);

  const item = cart.find((p) => p.productId === productId);
  if (!item)
    return res.status(404).json({ message: "Cart item not found" });

  item.quantity = quantity;
  req.session.cart = cart;

  res.json({ cart });
};

/* ---------------------------------------------------
   REMOVE CART ITEM
---------------------------------------------------- */
exports.removeFromCart = (req, res) => {
  const { productId } = req.body;
  let cart = initCart(req);

  cart = cart.filter((item) => item.productId !== productId);
  req.session.cart = cart;

  res.json({ cart });
};

/* ---------------------------------------------------
   CLEAR CART
---------------------------------------------------- */
exports.clearCart = (req, res) => {
  req.session.cart = [];
  res.json({ cart: [] });
};
