import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { convertToINR } from "../../utils/priceUtils";
import { getSafeImageUrl } from "../../utils/imageUtils";
import { Plus, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShopifyProductCard({ product, darkTheme = false }) {
    const { add, cart, setIsDrawerOpen } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const isInCart = cart.some(item => item.productId === product._id);
    const priceINR = convertToINR(product.price);

    // Premium B2B Feature Suite: Deterministic dynamic labeling
    const getDeterministicIndex = (str, max) => {
        if (!str) return 0;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash) % max;
    };

    const premiumBadges = ["Export Ready", "Wholesale Favorite", "Premium Finish", "Anti-Tarnish", "New Arrival", "Bestseller"];
    const wholesaleMsgs = ["Available for wholesale production", "MOQ Supported", "Export Packaging Ready", "Bulk Orders Available", "Corporate Direct Pricing"];

    const badgeIndex = getDeterministicIndex(product._id, premiumBadges.length);
    const msgIndex = getDeterministicIndex(product._id + "b2b", wholesaleMsgs.length);

    const activeBadge = premiumBadges[badgeIndex];
    const activeMsg = wholesaleMsgs[msgIndex];

    const handleCartClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInCart) {
            setIsDrawerOpen(true);
            return;
        }

        setIsAdding(true);

        setTimeout(() => {
            add(product, product.minQty || 12, priceINR);
            setIsAdding(false);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setIsDrawerOpen(true);
            }, 1200);
        }, 1000);
    };

    return (
        <div className={`group relative flex flex-col h-full transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] 
            ${darkTheme ? 'bg-transparent' : 'bg-white'}`}>
            {/* Image Section */}
            <Link
                to={`/products/product-details/${product._id}`}
                className={`relative aspect-square block overflow-hidden rounded-[20px] 
                    ${darkTheme ? 'bg-[#171717] border border-white/5' : 'bg-off-white'}`}
            >
                <img
                    src={getSafeImageUrl(product.imageUrl)}
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    loading="lazy"
                />

                {/* Minimalist Quick Add (Desktop Only) */}
                <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden lg:block">
                    <button
                        onClick={handleCartClick}
                        disabled={isAdding || showSuccess}
                        className={`w-9 h-9 flex items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all duration-300 ${
                            isAdding || showSuccess ? 'bg-primary-gold text-white' : 
                            isInCart ? 'bg-matte-black text-white' : 
                            darkTheme ? 'bg-white/10 text-white hover:bg-white hover:text-black' : 'bg-white/80 text-matte-black hover:bg-matte-black hover:text-white'
                        }`}
                    >
                        <AnimatePresence mode="wait">
                            {isAdding ? (
                                <motion.div
                                    key="loader"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.5, opacity: 0 }}
                                >
                                    <Loader2 size={16} className="animate-spin" />
                                </motion.div>
                            ) : (showSuccess || isInCart) ? (
                                <motion.div
                                    key="check"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <Check size={16} strokeWidth={3} />
                                </motion.div>
                            ) : (
                                <motion.div key="plus">
                                    <Plus size={16} strokeWidth={2} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Premium B2B Status Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-white/80 backdrop-blur-md border border-black/[0.03] text-matte-black text-[7px] font-bold uppercase tracking-widest rounded-full shadow-sm flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-primary-gold animate-pulse" />
                        {activeBadge}
                    </span>
                </div>
            </Link>

            {/* Content Area */}
            <div className="pt-4 flex flex-col flex-grow">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-[8px] font-bold uppercase tracking-[0.2em] ${darkTheme ? 'text-white/30' : 'text-charcoal/30'}`}>
                        {product.subCategory?.name || "Premium Collection"}
                    </span>
                    <span className="text-[7px] font-bold text-primary-gold px-2 py-0.5 border border-primary-gold/20 rounded-full uppercase tracking-widest">
                        MOQ {product.minQty || 12}
                    </span>
                </div>

                <Link
                    to={`/products/product-details/${product._id}`}
                    className="group-hover:text-primary-gold transition-colors"
                >
                    <h3 className={`font-display text-[15px] lg:text-[17px] font-medium leading-[1.2] mb-3 line-clamp-1 
                        ${darkTheme ? 'text-white' : 'text-matte-black'}`}>
                        {product.productName || "Untitled Piece"}
                    </h3>
                </Link>

                {/* Bottom Row - Standardized Add Action */}
                <div className={`mt-auto pt-3 flex items-center justify-between border-t ${darkTheme ? 'border-white/5' : 'border-black/[0.03]'}`}>
                    <div className="flex flex-col">
                        <span className={`text-[12px] font-bold ${darkTheme ? 'text-white' : 'text-matte-black'}`}>
                            {!product.price ? "Inquiry" : `₹${priceINR.toLocaleString()}`}
                        </span>
                    </div>

                    <button
                        onClick={handleCartClick}
                        disabled={isAdding || showSuccess}
                        className={`
                            relative w-24 h-8 flex items-center justify-center rounded-full border-[1px] transition-all duration-500
                            ${(isAdding || showSuccess)
                                ? 'bg-primary-gold border-primary-gold text-white cursor-wait' 
                                : isInCart
                                    ? darkTheme ? 'bg-white border-white text-black' : 'bg-matte-black border-matte-black text-soft-white'
                                    : darkTheme 
                                        ? 'bg-transparent border-white/10 text-white hover:bg-white hover:text-black' 
                                        : 'bg-transparent border-matte-black text-matte-black hover:bg-matte-black hover:text-soft-white'
                            }
                        `}
                    >
                        <AnimatePresence mode="wait">
                            {isAdding ? (
                                <motion.div
                                    key="loader-btn"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.5, opacity: 0 }}
                                >
                                    <Loader2 size={14} className="animate-spin" />
                                </motion.div>
                            ) : (showSuccess || isInCart) ? (
                                <motion.div
                                    key="check-btn"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <Check size={14} strokeWidth={3} />
                                </motion.div>
                            ) : (
                                <motion.span 
                                    key="add-btn"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[8px] font-bold uppercase tracking-[0.2em]"
                                >
                                    Add
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>
        </div>
    );
}
