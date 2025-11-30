import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { generateCartWhatsApp } from "../utils/whatsappCartMessage";

async function handleWhatsAppCheckout() {
    const excelRes = await axios.get(`${BASE_URL}/api/excel/generate-cart-excel`, {
        withCredentials: true
    });

    const excelUrl = excelRes.data.url;

    window.location.href = generateCartWhatsApp(cart, excelUrl);
}



export default function Cart() {
    const { cart, update, removeItem, clear } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="container mt-5 pt-5" >
            <h1 className="mb-4">Your Cart</h1>

            {cart.length === 0 && <h4>Your cart is empty.</h4>}

            {cart.map((item) => {
                const itemTotal = item.price * item.quantity;

                return (
                    <div key={item.productId} className="cart-item d-flex align-items-center border mb-3 p-3">

                        <img src={item.imageUrl} style={{ width: 80 }} alt="" />

                        <div className="ms-3 flex-grow-1">
                            <h5>{item.productName}</h5>

                            {/* UNIT PRICE */}
                            <p className="mb-1">
                                Price per unit: <strong>₹{item.price.toLocaleString()}</strong>
                            </p>


                            {/* ITEM TOTAL */}
                            <p className="mb-2">
                                Total: <strong>₹{itemTotal.toLocaleString()}</strong>
                            </p>

                            {/* Quantity Controls (+6 / -6) */}
                            <div className="d-flex gap-2 align-items-center">

                                {/* DECREMENT BUTTON */}
                                <button
                                    onClick={() => {
                                        const minQty = 6;
                                        const newQty = item.quantity - 6;
                                        update(item.productId, newQty < minQty ? minQty : newQty);
                                    }}
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                {/* INCREMENT BUTTON */}
                                <button
                                    onClick={() => update(item.productId, item.quantity + 6)}
                                >
                                    +
                                </button>

                            </div>

                        </div>

                        <button className="btn btn-danger" onClick={() => removeItem(item.productId)}>
                            Remove
                        </button>
                    </div>
                );
            })}


            {cart.length > 0 && (
                <>
                    <h3>Total: ₹{total}</h3>

                    <button className="btn btn-warning mt-3 me-3" onClick={clear}>
                        Clear Cart
                    </button>

                    <a
                        href={generateCartWhatsApp(cart)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success mt-3 me-3"
                    >
                        Checkout via WhatsApp
                    </a>
                </>
            )}
        </section>
    );
}
