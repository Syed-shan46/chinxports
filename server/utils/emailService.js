const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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
