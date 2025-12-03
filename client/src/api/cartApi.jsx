import axios from "axios";
import { BASE_URL } from "../config";

axios.defaults.withCredentials = true; // <-- IMPORTANT

export const getCart = () => axios.get(`${BASE_URL}/api/cart`);
export const addToCart = (productId, quantity, price) =>
  axios.post(`${BASE_URL}/api/cart/add`, { productId, quantity, price });

export const updateCart = (productId, quantity) =>
  axios.put(`${BASE_URL}/api/cart/update`, { productId, quantity });

export const removeFromCart = (productId) =>
  axios.delete(`${BASE_URL}/api/cart/remove`, {
    data: { productId },
  });

export const clearCart = () => axios.delete(`${BASE_URL}/api/cart/clear`);
