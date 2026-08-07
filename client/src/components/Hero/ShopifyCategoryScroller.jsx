import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";

export default function ShopifyCategoryScroller() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getLocalImage = (name) => {
        if (!name) return null;
        const lowerName = name.toLowerCase().trim();
        const imageMap = {
            "rings": "/images/categories/ring.png",
            "necklaces": "/images/categories/necklace.png",
            "bangles": "/images/categories/bangle.png",
            "bracelets": "/images/categories/bracelet.png",
            "earrings": "/images/categories/earrings.png"
        };
        return imageMap[lowerName] || imageMap[lowerName + 's'];
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/api/categories/get-subcategories`)
            .then((res) => {
                if (res.data.success) {
                    const filtered = res.data.subcategories.filter(sub => 
                        sub.mainCategory && sub.mainCategory.name === "18k pvd gold coated"
                    );
                    setCategories(filtered);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 lg:px-12">
                {/* Horizontal Scroll Wrapper */}
                <div className="flex gap-8 lg:gap-16 overflow-x-auto pb-8 pt-4 no-scrollbar scroll-smooth snap-x">
                    {loading ? (
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 min-w-[100px] snap-center animate-pulse">
                                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-off-white border-2 border-black/5 shadow-inner"></div>
                                <div className="w-16 h-2 bg-off-white rounded-full"></div>
                            </div>
                        ))
                    ) : (
                        categories.map((cat, idx) => (
                            <Link
                                to={`/store?sub=${cat._id}`}
                                key={idx}
                                className="group flex flex-col items-center gap-5 min-w-[100px] lg:min-w-[120px] snap-center transition-transform hover:-translate-y-2 duration-500"
                            >
                                {/* Icon Container */}
                                <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-full bg-off-white border-2 border-transparent transition-all duration-500 group-hover:border-primary-gold group-hover:rotate-6 group-hover:shadow-[0_0_30px_rgba(178,142,68,0.2)]">
                                    <img
                                        src={getLocalImage(cat.name) || cat.imageUrl}
                                        alt={cat.name}
                                        className="w-3/5 h-3/5 object-contain transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/10542/10542548.png"; }} // Fallback Jewelry Icon
                                    />
                                    {/* Gold Accent Ring */}
                                    <div className="absolute inset-0 rounded-full border border-black/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                {/* Label */}
                                <span className="text-[11px] lg:text-[13px] font-bold tracking-widest text-charcoal uppercase group-hover:text-primary-gold transition-colors duration-300">
                                    {cat.name}
                                </span>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
