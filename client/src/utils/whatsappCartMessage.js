export function generateCartWhatsApp(cart, userNote = "") {
  const phone = "919747758555";
  const domain = "https://chinaxports.com";

  let message = `Hello, I would like to place an order:\n\n`;
  let grandTotal = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;
    const productUrl = `${domain}/products/product-details/${item.productId}`;

    message += `🛍 *${item.productName}*
🔗 ${productUrl}
🔢 Quantity: ${item.quantity}
💵 Price Per Unit: ₹${item.price}
💰 Item Total: ₹${itemTotal}
-----------------------------------
`;
  });

  message += `🧾 *Grand Total:* ₹${grandTotal}\n`;

  if (userNote.trim() !== "") {
    message += `📝 *Customer Note:* ${userNote}\n`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
