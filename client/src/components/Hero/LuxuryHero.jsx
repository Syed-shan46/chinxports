import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Building2 } from "lucide-react";

const LuxuryHero = ({ onWholesaleClick }) => {
    const trustCards = [
        "Verified Export Partner",
        "Worldwide Logistics",
        "MOQ Friendly",
        "Premium 18K PVD",
        "Anti-Tarnish Certified",
        "Bulk Manufacturing",
    ];

    return (
        <section className="relative overflow-hidden bg-white min-h-[60vh] lg:min-h-[80vh] flex items-center">
            {/* Soft Luxury Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Gradient Blobs */}
                <div className="absolute top-[-120px] right-[-80px] w-[420px] h-[420px] bg-primary-gold/[0.06] rounded-full blur-[120px]" />

                <div className="absolute bottom-[-140px] left-[-80px] w-[380px] h-[380px] bg-[#f7efe4] rounded-full blur-[100px]" />

                {/* Grid Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-6 lg:pt-28 lg:pb-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.25 }}
                            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4"
                        >
                            <Link
                                to="/become-a-distributor"
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-matte-black text-white font-semibold text-xs tracking-[0.2em] uppercase shadow-2xl overflow-hidden hover:bg-[#C6A769] hover:text-black transition-all duration-500 transform hover:-translate-y-0.5 border border-matte-black"
                            >
                                <Sparkles size={16} className="text-[#C6A769] group-hover:text-black transition-colors" />
                                <span>Become a Distributor</span>
                                <span className="text-[9px] bg-[#C6A769]/20 text-[#C6A769] group-hover:bg-black/20 group-hover:text-black px-2.5 py-0.5 rounded-full font-bold transition-colors">
                                    Min ₹5L
                                </span>
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/store"
                                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-black/10 hover:border-black/30 text-matte-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-black/5"
                            >
                                <span>Explore Store</span>
                            </Link>
                        </motion.div>

                        {/* Trust Points */}
                        <motion.div
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden sm:flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-10"
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