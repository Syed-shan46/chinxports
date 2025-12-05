import { useRef, useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import ProductCardSkeleton from "../product/ProductCardSkeleton";
import HorizontalSkeletonRow from "./HorizontalSkeletonRow";
import "./HorizontalProductSlider.css";
import { BASE_URL } from "../../config";

export default function HorizontalCeramicsSlider() {
    const sliderRef = useRef(null);
    const [handpickedProducts, setHandpickedProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${BASE_URL}/api/products/trending`, { signal: controller.signal });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setHandpickedProducts(data || []);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching products:", err);
                    setError(err.message);
                }
            } finally {
                // show 2 seconds loading for better UX
                setTimeout(() => setLoading(false), 2000);
            }
        };
        load();
        return () => controller.abort();
    }, []);

    // Auto Scroll Effect

    // Arrow Controls
    const scrollLeft = () => {
        sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };
    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="container mt-3">
            <section className="horizontal-slider-section">
                {/* Title */}

                {loading && (
                    <HorizontalSkeletonRow innerRef={sliderRef} count={8} col={4} />
                )}

                {/* Horizontal Scroll Wrapper */}
                {!loading && handpickedProducts.length > 0 && (
                    <div className="horizontal-slider" ref={sliderRef}>
                        {handpickedProducts.map((product) => (
                            <ProductCard specialBadge={true} key={product._id} product={product} specialBadgeText="Ceramics" col={4} cartBtnPdg="5px 20px" />
                        ))}
                    </div>
                )}
                {!loading && handpickedProducts.length === 0 && (
                    <div className="px-2 py-3 text-center text-muted">No products available.</div>
                )}
            </section>
        </div>
    );
}
