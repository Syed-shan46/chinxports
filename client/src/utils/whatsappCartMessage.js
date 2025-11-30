export function generateCartWhatsApp(cart) {
  const phone = "918593939333";
  const domain = "https://chinaxports.com"; // change to your domain

  let message = `Hello, I would like to place an order:\n\n`;

  let grandTotal = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    const productUrl = `${domain}/products/product-details/${item.productId}`;

    message += `
🛍 *${item.productName}*
🔗 ${productUrl}
🔢 Quantity: ${item.quantity}
💵 Price Per Unit: ₹${item.price}
💰 Item Total: ₹${itemTotal}
-----------------------------------
`;
  });

  message += `
🧾 *Grand Total:* ₹${grandTotal}
`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
