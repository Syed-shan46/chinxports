import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { generateCartWhatsApp } from "../utils/whatsappCartMessage";
import "../styles/Cart.css";
import { BASE_URL } from "../config";
export default function Cart() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);

    const [showUserPopup, setShowUserPopup] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "",
        phone: "",
        code: "+91",
    });

    const [userNote, setUserNote] = useState("");

    const { cart, update, removeItem, clear } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const navigate = useNavigate();

    // Auto redirect after email success
    if (successPopup) {
        setTimeout(() => {
            clear();         // empty cart
            navigate("/");   // go home
        }, 2000); // 2 seconds
    }





    async function sendOrderEmail(payload, setIsSubmitting, setSuccessPopup) {
        try {
            setIsSubmitting(true);

            const res = await fetch(`${BASE_URL}/api/email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                setSuccessPopup(true);
            }
        } catch {
            alert("Unable to send email. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }




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
                        When you proceed to checkout, your order details will be sent via email to our team.
                        We will review your order and contact you shortly for confirmation and payment details.
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
                    placeholder="Add any special instructions or requirements (e.g., color preferences, size specifications, delivery notes)."
                ></textarea>
            </div>



            {/* SUMMARY */}
            {cart.length > 0 && (
                <div className="cart-summary mt-1 p-2">
                    <h3 className="mb-3">Total: <span>₹{total.toLocaleString()}</span></h3>

                    <div className="d-flex gap-3">

                        <button
                            onClick={() => setShowUserPopup(true)}
                            className="btn btn-pink  px-5 py-2 text-light  w-100"
                        >
                            <span className="bi bi-envelope"></span> Submit Your Order
                        </button>


                    </div>


                </div>
            )}

            {showUserPopup && (
                <div className="email-popup-overlay">
                    <div className="email-popup-box">

                        <h4 className="mb-3"><span className="bi bi-person-circle me-2"></span> Contact Details</h4>

                        <p className="text-muted mb-3">
                            Please enter your contact details so our team can assist you with order confirmation and payment.
                        </p>

                        {/* Name */}
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Your Name"
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        />

                        {/* Phone Row */}
                        <div className="d-flex mb-3 gap-2">

                            {/* Country Code */}
                            <select
                                className="form-select"
                                style={{ maxWidth: "110px" }}
                                value={userDetails.code}
                                onChange={(e) => setUserDetails({ ...userDetails, code: e.target.value })}
                            >
                                <option value="+91">🇮🇳 +91</option>
                                <option value="+86">🇨🇳 +86</option>
                                <option value="+971">🇦🇪 +971</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+44">🇬🇧 +44</option>
                                <option value="+60">🇲🇾 +60</option>
                            </select>

                            {/* Phone Input */}
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Phone Number"
                                value={userDetails.phone}
                                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            className="btn-pink w-100 py-2 rounded-3"
                            disabled={isSubmitting}
                            onClick={() => {
                                if (!userDetails.name || !userDetails.phone) {
                                    alert("Please enter your name and phone number.");
                                    return;
                                }

                                // Close user popup
                                setShowUserPopup(false);

                                // Submit email
                                sendOrderEmail(
                                    { cart, userDetails },
                                    setIsSubmitting,
                                    setSuccessPopup
                                );
                            }}
                        >
                            {isSubmitting ? (
                                <span>
                                    <span className="spinner-border spinner-border-sm me-2 "></span>
                                    Submitting...
                                </span>
                            ) : (
                                "Submit Details"
                            )}
                        </button>

                        <button
                            className="btn text-danger w-100 mt-2"
                            onClick={() => setShowUserPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}


            {successPopup && (
                <div className="email-popup-overlay">
                    <div className="email-popup-box">
                        <span className="bi bi-check-circle-fill popup-icon"></span>

                        <h4>Order Sent Successfully</h4>

                        <p>
                            Thank you! Your order details have been sent to our team.
                            We will contact you shortly to confirm your order,
                            guide you through the payment process, and assist you further.
                        </p>

                        <p className="text-muted">Redirecting to home...</p>
                    </div>
                </div>
            )}



        </section>
    );
}
