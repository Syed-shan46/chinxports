import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { getSafeImageUrl } from '../../utils/imageUtils';

export default function ShopifyImmersiveSection({
    categoryName = "Signature",
    subTitle = "The Eternal Series",
    mainCategoryId = "",
    subCategoryId = "",
    bgImage = "/images/sections/bangles_bg.png",
    bgVideo = "",
    reverse = false,
    dark = true,
    staticImages = null
}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef(null);

    const exploreLink = subCategoryId ? `/store?sub=${subCategoryId}` : (mainCategoryId ? `/store?category=${mainCategoryId}` : "/store");

    // Determine the data to display: static assets or dynamic products
    const displayItems = staticImages || products;

    useEffect(() => {
        if (staticImages) {
            setLoading(false);
            return;
        }
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Attempt 1: Specific Hierarchical Filter (Main + Sub)
                let query = `limit=4`;
                if (mainCategoryId) query += `&mainCategory=${mainCategoryId}`;
                if (subCategoryId) query += `&subCategory=${subCategoryId}`;

                let res = await axios.get(`${BASE_URL}/api/products?${query}`);
                let items = res.data.products || [];

                // Attempt 2: Relaxed Filter (Sub Category Only) if Attempt 1 is empty
                if (items.length === 0 && subCategoryId) {
                    res = await axios.get(`${BASE_URL}/api/products?limit=4&subCategory=${subCategoryId}`);
                    items = res.data.products || [];
                }

                // Attempt 3: Global Handpicked if still empty
                if (items.length === 0) {
                    res = await axios.get(`${BASE_URL}/api/products?limit=4&trending=true`);
                    items = res.data.products || [];
                }

                setProducts(items.slice(0, 4));
            } catch (err) {
                console.error("Error fetching immersive products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [mainCategoryId, subCategoryId]);

    return (
        <section
            ref={sectionRef}
            className={`relative min-h-[90vh] flex items-center overflow-hidden py-24 ${dark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-deep-black'}`}
        >
            {/* Background Texture/Image/Video */}
            <div className="absolute inset-0 z-0">
                {bgVideo ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`w-full h-full object-cover ${dark ? 'opacity-90' : 'opacity-70'}`}
                    >
                        <source src={bgVideo} type="video/mp4" />
                    </video>
                ) : (
                    <img
                        src={bgImage}
                        alt=""
                        className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 ${dark ? 'opacity-90' : 'opacity-70'}`}
                    />
                )}
                <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-r from-black/80 via-black/40 to-transparent' : 'bg-gradient-to-r from-white/80 via-white/40 to-transparent'}`}></div>
            </div>

            <div className="relative z-10 pl-6 lg:pl-16 pr-6 lg:pr-16">
                <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${reverse ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-10">
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold tracking-[0.6em] text-primary-gold uppercase block animate-fade-in">
                                {subTitle}
                            </span>
                            <h2 className="font-display text-5xl lg:text-8xl leading-tight tracking-tighter italic">
                                {categoryName.split(' ')[0]} <br />
                                <span className={`not-italic font-normal ${dark ? 'text-white/90' : 'text-deep-black/90'}`}>
                                    {categoryName.split(' ').slice(1).join(' ') || "Collection"}
                                </span>
                            </h2>
                        </div>

                        <p className={`font-body text-base lg:text-xl leading-relaxed max-w-md ${dark ? 'text-white/60' : 'text-charcoal/60'}`}>
                            Experience the intersection of surgical precision and artistic brilliance. Each piece is vacuum-plated for an eternal glow that defies time.
                        </p>

                        <div className="flex flex-wrap gap-8 pt-6">
                            <Link
                                to={exploreLink}
                                className="group relative flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em]"
                            >
                                <span className="relative z-10 group-hover:text-primary-gold transition-colors">Explore Entire Series</span>
                                <div className={`w-12 h-12 rounded-full border flex items-center justify-center group-hover:bg-primary-gold group-hover:border-primary-gold transition-all duration-500 ${dark ? 'border-white/20' : 'border-black/10'}`}>
                                    <i className={`bi bi-arrow-right text-sm ${dark ? 'text-white' : 'text-deep-black group-hover:text-white'}`}></i>
                                </div>
                            </Link>
                        </div>

                        {/* Stats/Details */}
                        <div className={`grid grid-cols-2 gap-10 pt-12 border-t ${dark ? 'border-white/10' : 'border-black/10'}`}>
                            <div>
                                <span className="text-[10px] font-bold text-primary-gold uppercase tracking-widest block mb-2">Purity Standard</span>
                                <p className={`text-sm font-body italic ${dark ? 'text-white/40' : 'text-charcoal/40'}`}>100% Verified Metal Categories</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-primary-gold uppercase tracking-widest block mb-2">Wholesale Access</span>
                                <p className={`text-sm font-body italic ${dark ? 'text-white/40' : 'text-charcoal/40'}`}>Global Logistics Ready</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual/Product Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="grid grid-cols-2 gap-4 lg:gap-8">
                            {loading ? (
                                Array(2).fill(0).map((_, i) => (
                                    <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-sm"></div>
                                ))
                            ) : displayItems.map((item, i) => (
                                <div
                                    key={item._id || item.name}
                                    className={`group/prod relative rounded-sm overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-primary-gold/10 hover:-translate-y-2
                                    ${i % 2 !== 0 ? 'translate-y-12' : ''}`}
                                >
                                    <Link to={item.link || `/products/product-details/${item._id}`} className="block relative aspect-[3/4]">
                                        <img
                                            src={item.img || getSafeImageUrl(item.imageUrl)}
                                            alt={item.productName || item.name}
                                            className="w-full h-full object-cover grayscale-[0.2] group-hover/prod:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/prod:opacity-100 transition-opacity"></div>

                                        {/* Minimal Label */}
                                        <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover/prod:translate-y-0 opacity-0 group-hover/prod:opacity-100 transition-all">
                                            <p className="text-[10px] font-bold text-white uppercase tracking-widest truncate">
                                                {item.productName || item.name}
                                            </p>
                                            {item.price && (
                                                <p className="text-[9px] text-primary-gold font-bold">¥ {item.price}</p>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Decorative Geometry */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 border border-primary-gold/10 rounded-full animate-spin-slow pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
