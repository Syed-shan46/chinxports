import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BASE_URL } from "../../config";
import { getSafeImageUrl } from "../../utils/imageUtils";

const LuxuryHero = ({ onWholesaleClick }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/products/handpicked`);
                const data = await res.json();
                setProducts(data?.slice(0, 10) || []);
            } catch (e) { console.error("Ticker error", e); }
        };
        loadProducts();
    }, []);
    const trustCards = [
        "Verified Export Partner",
        "Worldwide Logistics",
        "MOQ Friendly",
        "Premium 18K PVD",
        "Anti-Tarnish Certified",
        "Bulk Manufacturing",
    ];

    return (
        <section className="relative overflow-hidden bg-white min-h-[70vh] lg:min-h-screen flex items-center">
            {/* Soft Luxury Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Gradient Blobs */}
                <div className="absolute top-[-120px] right-[-80px] w-[420px] h-[420px] bg-primary-gold/[0.06] rounded-full blur-[120px]" />

                <div className="absolute bottom-[-140px] left-[-80px] w-[380px] h-[380px] bg-[#f7efe4] rounded-full blur-[100px]" />

                {/* Grid Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-8 lg:pt-36 lg:pb-28">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                    {/* LEFT CONTENT */}
                    <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="inline-flex items-center gap-3 rounded-full border border-primary-gold/15 bg-primary-gold/[0.04] px-5 py-2 mb-7"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary-gold" />

                            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-primary-gold">
                                Global Luxury Wholesale
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-display text-[42px] sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.95] tracking-tight text-matte-black"
                        >
                            Jewelry Crafted
                            <br />

                            <span className="italic font-normal text-primary-gold">
                                For Modern Brands
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-7 text-base sm:text-lg leading-relaxed text-charcoal/65 max-w-xl"
                        >
                            Premium 18K PVD jewelry engineered for retailers,
                            resellers, and international distributors seeking
                            elegant craftsmanship with scalable manufacturing.
                        </motion.p>                        {/* INFINITE PRODUCT TICKER */}
                        {/* LUXURY EDITORIAL FLOATING SHOWCASE */}
                        <div className="relative w-screen sm:w-full mt-10 mb-6 left-1/2 sm:left-0 right-1/2 sm:right-0 -ml-[50vw] sm:ml-0">
                            {/* Ambient Background Glow to lift the ticker */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/[0.03] via-transparent to-primary-gold/[0.02] blur-3xl -z-10" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 1.2 }}
                                className="relative overflow-hidden py-4"
                            >
                                <style>{`
                                    @keyframes luxuryTickerDrift {
                                        0% { transform: translateX(0); }
                                        100% { transform: translateX(-50%); }
                                    }
                                    @keyframes shimmerSweep {
                                        0% { transform: translateX(-100%) skewX(-15deg); }
                                        100% { transform: translateX(200%) skewX(-15deg); }
                                    }
                                    .luxury-ticker-track {
                                        display: flex;
                                        gap: 24px;
                                        width: max-content;
                                        animation: luxuryTickerDrift 48s linear infinite;
                                    }
                                    .luxury-ticker-track:hover {
                                        animation-play-state: paused;
                                    }
                                    .luxury-glass-capsule {
                                        position: relative;
                                        display: flex;
                                        align-items: center;
                                        gap: 16px;
                                        padding: 8px 24px 8px 10px;
                                        background: rgba(255, 255, 255, 0.95);
                                        border: 1px solid rgba(198, 167, 105, 0.15);
                                        border-radius: 9999px;
                                        box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.8) inset;
                                        transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.5s, box-shadow 0.5s;
                                        text-decoration: none;
                                        overflow: hidden;
                                    }
                                    .luxury-glass-capsule:hover {
                                        transform: translateY(-3px);
                                        background: rgba(255, 255, 255, 0.98);
                                        border-color: rgba(198, 167, 105, 0.4);
                                        box-shadow: 0 15px 35px -10px rgba(198, 167, 105, 0.2), 0 0 0 1px rgba(255, 255, 255, 1) inset;
                                    }
                                    .luxury-glass-capsule::before {
                                        content: '';
                                        position: absolute;
                                        top: 0; left: 0; width: 50%; height: 100%;
                                        background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
                                        transform: skewX(-15deg);
                                        opacity: 0;
                                        transition: opacity 0.3s;
                                    }
                                    .luxury-glass-capsule:hover::before {
                                        animation: shimmerSweep 1.5s ease infinite;
                                        opacity: 1;
                                    }
                                `}</style>
                                
                                <div className="luxury-ticker-track">
                                    {[...products, ...products].map((prod, i) => (
                                        <a 
                                            key={`${prod?._id}-${i}`}
                                            href={`/products/product-details/${prod?._id}`}
                                            className="luxury-glass-capsule flex-shrink-0 group"
                                        >
                                            {/* FLOATING CIRCULAR IMAGE FRAME */}
                                            <div className="relative w-14 h-14 rounded-full bg-off-white overflow-hidden border border-black/[0.03] shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex-shrink-0">
                                                <div className="absolute inset-0 border border-white/40 rounded-full z-10" />
                                                <img 
                                                    src={getSafeImageUrl(prod?.imageUrl)} 
                                                    alt="" 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                                                />
                                            </div>

                                            {/* EDITORIAL CONTENT CENTER */}
                                            <div className="flex flex-col min-w-[140px] max-w-[180px] flex-shrink-0 py-0.5">
                                                <div className="flex items-center gap-1.5 mb-0.5">
                                                    <span className="h-1 w-1 rounded-full bg-primary-gold" />
                                                    <span className="text-[7px] sm:text-[8px] font-bold text-primary-gold tracking-[0.18em] uppercase leading-none">
                                                        Premium 18K PVD
                                                    </span>
                                                </div>
                                                
                                                <h4 className="font-serif text-xs sm:text-[13px] font-medium text-matte-black tracking-wide truncate leading-snug">
                                                    {prod?.name || "Jewelry Selection"}
                                                </h4>
                                                
                                                <div className="flex items-center justify-between mt-0.5">
                                                    <span className="text-[9px] text-charcoal/50 font-medium uppercase tracking-wider">Wholesale</span>
                                                </div>
                                            </div>

                                            {/* LUXURY CTA RIGHT */}
                                            <div className="h-8 w-8 rounded-full flex items-center justify-center border border-black/5 text-charcoal/40 group-hover:bg-matte-black group-hover:text-white group-hover:border-matte-black transition-all duration-500 flex-shrink-0 ml-2">
                                                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                                            </div>
                                        </a>
                                    ))}
                                    {/* LUXURY SKELETON */}
                                    {products.length === 0 && [1,2,3,4].map(n => (
                                        <div key={n} className="luxury-glass-capsule w-[260px] h-[72px] animate-pulse flex-shrink-0" />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                        {/* Trust Points */}
                        <motion.div
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="hidden sm:flex flex-wrap gap-3 sm:gap-4 mt-8"
                        >
                            {trustCards.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-2.5 rounded-full border border-black/6 bg-white shadow-sm text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase text-charcoal/70"
                                >
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT VISUAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9 }}
                        className="hidden lg:block relative"
                    >
                        {/* Main Image Wrapper */}
                        <div className="relative mx-auto max-w-[620px]">
                            {/* Background Card */}
                            <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[36px] bg-primary-gold/[0.06]" />

                            <div className="relative overflow-hidden rounded-[32px] border border-black/5 bg-[#faf8f5] shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
                                <img
                                    src="/images/hero_bg.png"
                                    alt="Luxury Jewelry"
                                    className="w-full h-[420px] sm:h-[540px] object-cover"
                                />
                            </div>

                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -left-4 sm:left-[-30px] bg-white border border-black/5 shadow-2xl rounded-3xl p-5 backdrop-blur-xl">
                                <p className="text-[10px] uppercase tracking-[0.25em] text-charcoal/40 font-semibold">
                                    Premium Finish
                                </p>

                                <h4 className="mt-2 text-lg font-semibold text-matte-black">
                                    Anti Tarnish
                                </h4>

                                <p className="mt-1 text-sm text-charcoal/55">
                                    Long lasting luxury coating
                                </p>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-xl border border-black/5 rounded-2xl px-5 py-4 shadow-xl">
                                <h3 className="text-2xl font-semibold text-matte-black">
                                    25+
                                </h3>

                                <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal/45 mt-1">
                                    Countries Served
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LuxuryHero;