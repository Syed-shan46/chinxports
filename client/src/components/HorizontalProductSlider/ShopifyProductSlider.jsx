import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShopifyProductCard from "../product/ShopifyProductCard";
import { BASE_URL } from "../../config";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function ShopifyProductSlider({
    title = "Featured Products",
    subtitle = "Our Selection",
    endpoint = "handpicked",
    dark = false
}) {
    const sliderRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const load = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${BASE_URL}/api/products/${endpoint}`, {
                    signal: controller.signal
                });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setProducts(data || []);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching products:", err);
                }
            } finally {
                setLoading(false);
            }
        };
        load();
        return () => controller.abort();
    }, [endpoint]);

    useEffect(() => {
        if (!autoPlay || loading || products.length === 0) return;

        const interval = setInterval(() => {
            if (sliderRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
                const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

                if (isAtEnd) {
                    sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scroll("right");
                }
            }
        }, 8000); // Slower, more elegant autoplay

        return () => clearInterval(interval);
    }, [autoPlay, loading, products]);

    const scroll = (direction) => {
        const scrollAmount = sliderRef.current?.offsetWidth * 0.8 || 320;
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section
            className={`pt-4 pb-8 lg:pt-12 lg:pb-16 transition-all duration-1000 overflow-hidden relative ${dark ? 'bg-matte-black text-white' : 'bg-white text-matte-black'}`}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
        >
            {dark && (
                <>
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-gold/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-gold/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
                </>
            )}

            <div className="relative z-10">
                {/* Standardized Header - Exact Match for CategoryCarousel */}
                <div className="pl-6 lg:pl-16 pr-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <span className={`text-[10px] font-bold tracking-[0.4em] uppercase py-1.5 px-4 border rounded-full inline-block ${dark ? 'text-primary-gold border-primary-gold/30 bg-primary-gold/5' : 'text-primary-gold border-primary-gold/20 bg-primary-gold/5'}`}>
                                {subtitle}
                            </span>
                            <h2 className={`font-display text-4xl lg:text-7xl tracking-tighter italic ${dark ? 'text-soft-white' : 'text-matte-black'}`}>
                                {title.split(' ')[0]} <span className={`not-italic font-normal ${dark ? 'text-white/90' : 'text-charcoal/90'}`}>{title.split(' ').slice(1).join(' ')}</span>
                            </h2>
                        </div>

                    </div>
                </div>

                {/* Slider Wrapper */}
                <div className="relative group/slider">
                    {/* Premium Navigation Arrows */}
                    <button
                        className={`absolute left-8 lg:left-10 top-1/2 -translate-y-1/2 w-12 h-12 hidden lg:flex items-center justify-center rounded-full z-30 transition-all duration-500 opacity-0 group-hover/slider:opacity-100 ${dark ? "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-primary-gold hover:text-matte-black" : "bg-white/80 backdrop-blur-md border border-black/5 shadow-2xl hover:bg-matte-black hover:text-white"}`}
                        onClick={() => { scroll("left"); setAutoPlay(false); }}
                    >
                        <ChevronLeft size={18} strokeWidth={1.5} />
                    </button>

                    <button
                        className={`absolute right-8 lg:right-10 top-1/2 -translate-y-1/2 w-12 h-12 hidden lg:flex items-center justify-center rounded-full z-30 transition-all duration-500 opacity-0 group-hover/slider:opacity-100 ${dark ? "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-primary-gold hover:text-matte-black" : "bg-white/80 backdrop-blur-md border border-black/5 shadow-2xl hover:bg-matte-black hover:text-white"}`}
                        onClick={() => { scroll("right"); setAutoPlay(false); }}
                    >
                        <ChevronRight size={18} strokeWidth={1.5} />
                    </button>

                    {/* Scrollable Container - Unified with Category Rail's Spacer Logic */}
                    <div
                        ref={sliderRef}
                        className="flex gap-4 lg:gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory scroll-smooth pr-6 lg:pr-16"
                        onScroll={() => { if (autoPlay) setAutoPlay(false); }}
                        onTouchStart={() => setAutoPlay(false)}
                        onWheel={() => setAutoPlay(false)}
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {/* Precision Alignment Spacer (Nullifies gap to match header exactly) */}
                        <div className="flex-none w-6 lg:w-16 -mr-4 lg:-mr-8 snap-start" aria-hidden="true"></div>

                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className={`min-w-[42%] md:min-w-[320px] aspect-[3/4] rounded-2xl animate-pulse ${dark ? 'bg-white/[0.03]' : 'bg-black/[0.02]'}`}></div>
                            ))
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product._id}
                                    className="min-w-[42%] md:min-w-[320px] snap-start"
                                >
                                    <ShopifyProductCard product={product} />
                                </div>
                            ))
                        ) : (
                            <div className="mx-6 w-full text-center py-24 bg-black/[0.01] rounded-3xl border border-black/[0.03]">
                                <p className="text-[10px] text-charcoal/20 font-bold tracking-[0.5em] uppercase italic">No items available</p>
                            </div>
                        )}

                        {/* End Bleed Spacer */}
                        <div className="flex-none w-10 lg:w-24 h-1"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
