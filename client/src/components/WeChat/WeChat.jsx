import React from "react";
import "../WeChat/WeChat.css";

export default function WeChat() {
    const wechatId = "Shihad pkd"; // Or props / API

    return (
        <div className="wechat-container mt-5 pt-5">
            <h1>Connect on WeChat</h1>

            {/* QR BOX */}
            <div className="wechat-image-box">
                <img src="/images/wechat/wechat-qr.jpeg" alt="WeChat QR Code" />
            </div>

            {/* ID */}
            <p className="wechat-id">
                WeChat ID: <span>{wechatId}</span>
            </p>

            {/* Back button */}
            <a href="/" className="back-link" aria-label="Go back">
                « Back to Home
            </a>
        </div>
    );
}
