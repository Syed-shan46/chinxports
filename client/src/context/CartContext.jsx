import { createContext, useContext, useEffect, useState } from "react";
import * as cartApi from "../api/cartApi";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from session
  const loadCart = () => {
    cartApi.getCart().then((res) => setCart(res.data.cart || []));
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Add item
  const add = (productId, quantity, price) =>
    cartApi.addToCart(productId, quantity, price).then((res) => setCart(res.data.cart));

  // Update item qty
  const update = (productId, quantity) =>
    cartApi.updateCart(productId, quantity).then((res) => setCart(res.data.cart));

  // Remove item
  const removeItem = (productId) =>
    cartApi.removeFromCart(productId).then((res) => setCart(res.data.cart));

  // Clear cart
  const clear = () =>
    cartApi.clearCart().then(() => setCart([]));

  return (
    <CartContext.Provider value={{ cart, add, update, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}
