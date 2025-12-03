const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,     // your Gmail
        pass: process.env.EMAIL_PASS      // app password
    }
});

async function sendOrderEmail(subject, html) {
    try {
        await transporter.sendMail({
            from: `"ChinaXports" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVE_ORDER_EMAIL,   // your company email
            subject,
            html
        });

        console.log("✔ Order email sent");
        return true;
    } catch (err) {
        console.log("❌ Email error:", err);
        return false;
    }
}

module.exports = { sendOrderEmail };
