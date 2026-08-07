import { createContext, useContext, useEffect, useState } from "react";


const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ show: false, message: "", timestamp: 0 });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item
  const add = (product, quantity, price) => {
    const productCatId = product.mainCategory?._id || product.mainCategory;

    // Logic: Check if cart has items from a DIFFERENT category
    if (cart.length > 0) {
      const firstItemCatId = cart[0].mainCategory;
      if (firstItemCatId !== productCatId) {
        // Mismatch! Show professional replace popup
        setPendingItem({ product, quantity, price, mainCategory: productCatId });
        setShowReplaceModal(true);
        return;
      }
    }

    // Standard Add Logic
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product._id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            productId: product._id,
            productName: product.productName,
            imageUrl: product.imageUrl?.[0] || "",
            price: price,
            quantity: quantity,
            mainCategory: productCatId, // Store mapping for logic
            minQty: product.minQty || 12
          },
        ];
      }
    });

    // Trigger Luxury Snackbar
    setSnackbar({ 
      show: true, 
      message: `${quantity} ${quantity === 1 ? 'Unit' : 'Units'} Added to Bag`, 
      timestamp: Date.now() 
    });
  };

  const confirmReplace = () => {
    if (!pendingItem) return;
    const { product, quantity, price, mainCategory } = pendingItem;
    // Clear and add new
    setCart([{
      productId: product._id,
      productName: product.productName,
      imageUrl: product.imageUrl?.[0] || "",
      price: price,
      quantity: quantity,
      mainCategory: mainCategory,
      minQty: product.minQty || 12
    }]);
    setShowReplaceModal(false);
    setPendingItem(null);
  };

  // Update item qty
  const update = (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  // Remove item
  const removeItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Clear cart
  const clear = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      add, 
      update, 
      removeItem, 
      clear,
      showReplaceModal,
      setShowReplaceModal,
      confirmReplace,
      pendingItem,
      isDrawerOpen,
      setIsDrawerOpen,
      isPartnerModalOpen,
      setIsPartnerModalOpen,
      snackbar,
      setSnackbar
    }}>
      {children}
    </CartContext.Provider>
  );
}
