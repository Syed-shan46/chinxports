const express = require("express");
const router = express.Router();
const { sendOrderEmail } = require("../utils/emailService");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/email", upload.single("screenshot"), async (req, res) => {
    try {
        const { cart: cartStr, userDetails: userDetailsStr, note, transactionId } = req.body;
        const cart = JSON.parse(cartStr);
        const userDetails = JSON.parse(userDetailsStr);
        const screenshot = req.file;

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
            ${transactionId ? `<p><strong>Transaction Reference:</strong> <span style="background:#fffae6;padding:4px 8px;border:1px solid #ffe58f;border-radius:4px;font-family:monospace;color:#d48806;font-weight:bold;">${transactionId}</span></p>` : ""}
            ${note ? `<p style="background:#f9f9f9;padding:10px;border-left:4px solid #3b5353;margin:10px 0;"><strong>📝 Note/Instructions:</strong><br/>${note}</p>` : ""}
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

        const attachments = [];
        if (screenshot) {
            attachments.push({
                filename: `screenshot-${Date.now()}.png`,
                content: screenshot.buffer
            });
        }

        await sendOrderEmail("🛍 New Order Received | ChinaXports", html, attachments);

        res.json({ success: true, message: "Email sent successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// --- PARTNER APPLICATION NOTIFICATION ---
router.post("/partner-request", async (req, res) => {
    try {
        const { name, biz, email, wa, purpose } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and Email are required." });
        }

        const html = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                <h2 style="color: #C6A769; border-bottom: 2px solid #C6A769; padding-bottom: 10px;">🤝 New Partner Application Received</h2>
                <p>A new prospective wholesaler has requested partnership privileges on ChinaXports.</p>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${name}</p>
                    <p style="margin: 8px 0;"><strong>🏢 Business Name:</strong> ${biz || "Not Provided"}</p>
                    <p style="margin: 8px 0;"><strong>📧 Email Address:</strong> ${email}</p>
                    <p style="margin: 8px 0;"><strong>💬 WhatsApp / Contact:</strong> ${wa || "Not Provided"}</p>
                    <p style="margin: 8px 0; background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"><strong>📝 Purpose / Detailed Understanding:</strong><br/>${purpose || "Not Provided"}</p>
                </div>

                <p style="font-size: 12px; color: #777;">Sent from ChinaXports Administrative System.</p>
            </div>
        `;

        await sendOrderEmail(`🤝 New Partnership Request: ${biz || name}`, html);

        res.json({ success: true, message: "Partner application delivered to admin" });

    } catch (err) {
        console.error("Partner Request Error:", err);
        res.status(500).json({ error: "Internal server failure processing request" });
    }
});


// --- CATALOG REQUEST NOTIFICATION ---
router.post("/catalog-request", async (req, res) => {
    try {
        const { name, biz, country, type, wa, purpose } = req.body;

        const html = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                <h2 style="color: #C6A769; border-bottom: 2px solid #C6A769; padding-bottom: 10px;">📂 New Catalog Access Request</h2>
                <p>A prospective partner has requested access to the interactive line sheets.</p>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 8px 0;"><strong>👤 Rep Name:</strong> ${name}</p>
                    <p style="margin: 8px 0;"><strong>🏢 Company:</strong> ${biz}</p>
                    <p style="margin: 8px 0;"><strong>🌍 Region:</strong> ${country}</p>
                    <p style="margin: 8px 0;"><strong>🏷 Business Model:</strong> ${type}</p>
                    <p style="margin: 8px 0;"><strong>💬 WhatsApp:</strong> ${wa}</p>
                    <p style="margin: 8px 0; background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"><strong>📝 Purpose / Detailed Understanding:</strong><br/>${purpose || "Not Provided"}</p>
                </div>

                <p style="font-size: 12px; color: #777;">Sent from ChinaXports Administrative System.</p>
            </div>
        `;

        await sendOrderEmail(`📂 Catalog Request: ${biz}`, html);

        res.json({ success: true, message: "Catalog request delivered" });

    } catch (err) {
        console.error("Catalog Request Error:", err);
        res.status(500).json({ error: "Internal server failure" });
    }
});

module.exports = router;
