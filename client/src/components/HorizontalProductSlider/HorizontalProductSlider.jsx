import { useRef, useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import "./HorizontalProductSlider.css";
import { BASE_URL } from "../../config";

export default function HorizontalProductSlider() {
    const sliderRef = useRef(null);
    const [handpickedProducts, setHandpickedProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/products/handpicked`)
            .then((res) => {
                if (!res.ok) {
                    // handle non-200 responses
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setHandpickedProducts(data))
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    // Auto Scroll Effect

    // Arrow Controls
    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -300, behavior: "  " });
    };
    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="container mt-3">
            <section className="horizontal-slider-section">
                {/* Title */}


                {/* Horizontal Scroll Wrapper */}
                <div className="horizontal-slider" ref={sliderRef}>
                    {handpickedProducts.map((product) => (
                        <ProductCard specialBadge={true} key={product._id} product={product} col={4} cartBtnPdg="5px 20px" />
                    ))}
                </div>
            </section></div>
    );
}
