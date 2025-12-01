import { useCart } from "../context/CartContext";
import { useState } from "react";

import { Link } from "react-router-dom";
import { generateCartWhatsApp } from "../utils/whatsappCartMessage";
import "../styles/Cart.css";

export default function Cart() {
    const [userNote, setUserNote] = useState("");

    const { cart, update, removeItem, clear } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="container cart-container">

            {/* EMPTY CART */}
            {cart.length === 0 && (
                <div className="text-center py-5">
                    <img src="/images/empty-cart.png" className="empty-cart-img mb-3" alt="" />
                    <h4 className="text-muted">Your cart is empty.</h4>

                    <Link to="/store" className="btn btn-pink mt-3">
                        Browse Products
                    </Link>
                </div>
            )}

            {/* CART ITEMS */}
            <div className="cart-list">
                {cart.map((item) => {
                    return (
                        <div key={item.productId} className="cart-row d-flex align-items-center py-3 rounded-4">

                            <button
                                className="cart-remove-btn"
                                onClick={() => removeItem(item.productId)}
                            >
                                ×
                            </button>


                            {/* IMAGE */}
                            <div className="me-3">
                                <img className="cart-row-img" src={item.imageUrl} alt={item.productName} />
                            </div>

                            {/* PRODUCT INFO */}
                            <div className="flex-grow-1">
                                <p className="cart-price mb-1">₹{item.price.toLocaleString()}/-</p>
                                <p className="cart-moq mb-0">MOQ: <span className="cart-moq-value">6</span></p>
                                <p className="cart-total-line mb-1">
                                    Total: <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                                </p>
                            </div>

                            {/* QTY BOX */}
                            <div className="cart-row-qty d-flex align-items-center ms-3">
                                <button
                                    className="qty-btn"
                                    onClick={() => {
                                        const minQty = 6;
                                        const newQty = item.quantity - 6;
                                        update(item.productId, newQty < minQty ? minQty : newQty);
                                    }}
                                >
                                    –
                                </button>

                                <span className="qty-value">{item.quantity}</span>

                                <button
                                    className="qty-btn"
                                    onClick={() => update(item.productId, item.quantity + 6)}
                                >
                                    +
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>

            <div className="cart-info-box d-flex align-items-start mb-2">


                <div>
                    <h5 className="cart-info-title mb-1"> <span className="bi bi-info-circle cart-info-icon"></span> Important Information</h5>
                    <p className="cart-info-text mb-0">
                        When you proceed to checkout, your cart will be redirected to WhatsApp with all item
                        details pre-filled. Our team will assist you with order confirmation and payment.
                    </p>
                </div>
            </div>

            <div className="cart-user-note-box mb-3">
                <label className="form-label fw-semibold">Add a Note (optional)</label>
                <textarea
                    className="form-control cart-note-input rounded-4"
                    rows="3"
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="Add any instructions (e.g., color, size, delivery note). This will be added to your WhatsApp message."
                ></textarea>
            </div>



            {/* SUMMARY */}
            {cart.length > 0 && (
                <div className="cart-summary mt-1 p-2">
                    <h3 className="mb-3">Total: <span>₹{total.toLocaleString()}</span></h3>

                    <div className="d-flex gap-3">
                        
                        <a
                            href={generateCartWhatsApp(cart, userNote)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-pink text-light flex-grow-1"
                            style={{ padding: "10px" }}
                        >
                          <span className="bi bi-whatsapp"></span>  Checkout via WhatsApp
                        </a>
                    </div>
                </div>
            )}

        </section>
    );
}
