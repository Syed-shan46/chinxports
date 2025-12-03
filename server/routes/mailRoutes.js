const express = require("express");
const router = express.Router();
const { sendOrderEmail } = require("../utils/emailService");

router.post("/email", async (req, res) => {
    try {
        const { cart, userDetails } = req.body;

        if (!cart || !cart.length) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        if (!userDetails || !userDetails.name || !userDetails.phone) {
            return res.status(400).json({ error: "Customer details missing" });
        }

        let grandTotal = 0;

        let html = `
            <h2>📦 New Order Received</h2>

            <h3>👤 Customer Details</h3>
            <p><strong>Name:</strong> ${userDetails.name}</p>
            <p><strong>Phone:</strong> ${userDetails.code} ${userDetails.phone}</p>
            <hr>

            <h3>🛒 Order Items</h3>

            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price (INR)</th>
                    <th>Total</th>
                    <th>Link</th>
                </tr>
        `;

        cart.forEach(item => {
            const total = item.price * item.quantity;
            grandTotal += total;

            html += `
        <tr>
            <td style="text-align:center;">
                <img 
                    src="${item.imageUrl}" 
                    alt="${item.productName}"
                    style="width:70px;height:70px;object-fit:cover;border-radius:8px;margin-bottom:6px;"
                /><br/>
                <strong>${item.productName}</strong>
            </td>

            <td style="text-align:center;">${item.quantity}</td>

            <td style="text-align:center;">₹${item.price.toLocaleString()}</td>

            <td style="text-align:center;">₹${total.toLocaleString()}</td>

            <td style="text-align:center;">
                <a 
                    href="https://chinaxports.com/products/product-details/${item.productId}" 
                    style="color:#007bff;text-decoration:none;"
                >
                    View Product
                </a>
            </td>
        </tr>
    `;
        });


        html += `
            </table>
            <h3 style="margin-top: 15px;">Grand Total: ₹${grandTotal.toLocaleString()}</h3>

            <hr>
            <p>This email is auto-generated from <strong>ChinaXports</strong> checkout system.</p>
        `;

        await sendOrderEmail("🛍 New Order Received | ChinaXports", html);

        res.json({ success: true, message: "Email sent successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
