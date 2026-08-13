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
        const { 
            name, biz, email, wa, purpose,
            website, country, yearsInBusiness, 
            requestType, investment, distribution, retailing 
        } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and Email are required." });
        }

        const isImmediateOrder = requestType?.toLowerCase().includes("order");
        const subjectPrefix = isImmediateOrder ? "🛍️ [IMMEDIATE ORDER REQUEST]" : "ℹ️ [GENERAL CATALOG INQUIRY]";
        const subject = `${subjectPrefix} New Partnership Request: ${biz || name}`;

        const html = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                <h2 style="color: #C6A769; border-bottom: 2px solid #C6A769; padding-bottom: 10px; margin-top: 0;">🤝 New Partner Application Received</h2>
                
                <div style="background: ${isImmediateOrder ? '#e8f5e9' : '#f5f5f5'}; padding: 15px; border-left: 5px solid ${isImmediateOrder ? '#4caf50' : '#9e9e9e'}; border-radius: 4px; margin: 15px 0 20px 0;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold; color: ${isImmediateOrder ? '#2e7d32' : '#333'};">
                        APPLICATION INTENT: ${isImmediateOrder ? 'IMMEDIATE WHOLESALE ORDER REQUEST' : 'GENERAL CATALOG & PRICE INQUIRY'}
                    </p>
                </div>

                <p>A new prospective wholesaler has submitted an advanced partnership intake application on ChinaXports.</p>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #f0f0f0;">
                    <h3 style="color: #333; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 5px;">👤 Contact Information</h3>
                    <p style="margin: 8px 0;"><strong>Representative Name:</strong> ${name}</p>
                    <p style="margin: 8px 0;"><strong>Company Name:</strong> ${biz || "Not Provided"}</p>
                    <p style="margin: 8px 0;"><strong>Email Address:</strong> ${email}</p>
                    <p style="margin: 8px 0;"><strong>WhatsApp / Contact:</strong> ${wa || "Not Provided"}</p>
                    <p style="margin: 8px 0;"><strong>Region / Country:</strong> ${country || "Not Provided"}</p>
                    <p style="margin: 8px 0;"><strong>Website / Socials:</strong> ${website ? `<a href="${website}" target="_blank">${website}</a>` : "Not Provided"}</p>

                    <h3 style="color: #333; margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">💼 Business Profile & Advanced Verification</h3>
                    <p style="margin: 8px 0;"><strong>Years in Business:</strong> ${yearsInBusiness || "New Startup"}</p>
                    <p style="margin: 8px 0;"><strong>Planned Investment Range:</strong> ${investment || "Under $2,000"}</p>
                    <p style="margin: 8px 0;"><strong>Distribution Channel:</strong> ${distribution || "Not Provided"}</p>
                    <p style="margin: 8px 0;"><strong>Retailing Channels:</strong> ${retailing || "Not Provided"}</p>
                    
                    <h3 style="color: #333; margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">📝 Partnership Details</h3>
                    <p style="margin: 8px 0; background: #fff; padding: 12px; border: 1px solid #e0e0e0; border-radius: 4px; line-height: 1.5; color: #555;">
                        ${purpose || "No additional message provided."}
                    </p>
                </div>

                <p style="font-size: 11px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
                    Sent from ChinaXports B2B Intake System. Secure application logs archived.
                </p>
            </div>
        `;

        await sendOrderEmail(subject, html);

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

// --- DISTRIBUTOR APPLICATION NOTIFICATION ---
router.post("/distributor-request", async (req, res) => {
    try {
        const { name, phone, location, investment, experience, interestArea } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: "Name and Phone Number are required fields." });
        }

        const subject = `🚀 [NEW DISTRIBUTOR APPLICATION] ₹5L+ Lead: ${name} (${location || 'India'})`;

        const html = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 1px solid #1a1a1a; background: #0b0b0b; color: #ffffff; border-radius: 12px;">
                <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #222;">
                    <span style="color: #C6A769; font-size: 11px; font-weight: bold; letter-spacing: 3px; uppercase;">CHINAXPORTS ENTERPRISE</span>
                    <h2 style="color: #ffffff; margin: 10px 0 0 0; font-size: 22px;">💼 Become a Distributor Application</h2>
                </div>
                
                <div style="background: #141414; padding: 18px; border-left: 4px solid #C6A769; border-radius: 6px; margin: 25px 0;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #C6A769;">
                        MINIMUM CAPITAL TIER VERIFIED: ${investment || "₹5,00,000+"}
                    </p>
                </div>

                <div style="background: #141414; padding: 20px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #222;">
                    <h3 style="color: #C6A769; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #222; padding-bottom: 8px;">👤 Applicant Profile</h3>
                    <p style="margin: 10px 0; font-size: 14px;"><strong>Full Name:</strong> ${name}</p>
                    <p style="margin: 10px 0; font-size: 14px;"><strong>Phone / WhatsApp:</strong> <a href="tel:${phone}" style="color: #C6A769; text-decoration: none;">${phone}</a></p>
                    <p style="margin: 10px 0; font-size: 14px;"><strong>Location / Region:</strong> ${location || "Not Provided"}</p>
                    <p style="margin: 10px 0; font-size: 14px;"><strong>Investment Capacity:</strong> <span style="background: #C6A769; color: #000; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">${investment || "₹5,00,000+"}</span></p>
                    <p style="margin: 10px 0; font-size: 14px;"><strong>Distribution Interest:</strong> ${interestArea || "Local & Online Distribution"}</p>
                </div>

                <div style="background: #141414; padding: 20px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #222;">
                    <h3 style="color: #C6A769; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #222; padding-bottom: 8px;">💼 Experience & Notes</h3>
                    <p style="margin: 10px 0; font-size: 14px; line-height: 1.6; color: #ccc;">
                        ${experience || "No prior distribution experience detailed. Candidate ready for ₹5L entry onboarding."}
                    </p>
                </div>

                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #222;">
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="background: #25D366; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 30px; display: inline-block; font-size: 13px;">
                        💬 Connect via WhatsApp Directly
                    </a>
                </div>

                <p style="font-size: 11px; color: #666; text-align: center; margin-top: 25px;">
                    Sent from Chinaxports Become a Distributor Intake System. Lead flagged high priority.
                </p>
            </div>
        `;

        await sendOrderEmail(subject, html);

        res.json({ success: true, message: "Distributor application delivered successfully" });

    } catch (err) {
        console.error("Distributor Application Error:", err);
        res.status(500).json({ error: "Internal server failure processing distributor request" });
    }
});

module.exports = router;
