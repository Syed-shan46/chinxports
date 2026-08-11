import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Minus, Plus, ChevronRight, Lock, Unlock, Sparkles, PlusCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { getSafeImageUrl } from '../../utils/imageUtils';
import { convertToINR } from '../../utils/priceUtils';

const CartDrawer = () => {
    const { cart, isDrawerOpen, setIsDrawerOpen, update, removeItem, add } = useCart();
    const navigate = useNavigate();

    const [recommendations, setRecommendations] = useState([]);
    const [loadingRecs, setLoadingRecs] = useState(false);

    // Body scroll lock logic
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDrawerOpen]);

    const MIN_PURCHASE = 20000;
    const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 0)), 0);
    const progress = Math.min(100, (subtotal / MIN_PURCHASE) * 100);
    const remaining = Math.max(0, MIN_PURCHASE - subtotal);
    const isUnlocked = subtotal >= MIN_PURCHASE;

    useEffect(() => {
        if (isDrawerOpen && recommendations.length === 0) {
            fetchRecommendations();
        }
    }, [isDrawerOpen]);

    const fetchRecommendations = async () => {
        setLoadingRecs(true);
        try {
            const res = await axios.get(`${BASE_URL}/api/products?limit=20`);
            const allProducts = res.data.products || [];
            const cartIds = cart.map(item => item.productId);
            const available = allProducts.filter(p => !cartIds.includes(p._id));
            const shuffled = available.sort(() => 0.5 - Math.random());
            setRecommendations(shuffled.slice(0, 5));
        } catch (err) {
            console.error("Error fetching recommendations:", err);
        } finally {
            setLoadingRecs(false);
        }
    };

    const handleCheckout = () => {
        if (isUnlocked) {
            setIsDrawerOpen(false);
            navigate('/cart');
        }
    };

    const handleAddAddon = (product) => {
        const priceINR = convertToINR(product.price);
        add(product, product.minQty || 12, priceINR);
    };

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsDrawerOpen(false)}
                        className="fixed inset-0 bg-matte-black/60 backdrop-blur-sm z-[100]"
                    />

                    <motion.div
                        initial={window.innerWidth < 1024 ? { y: '100%' } : { x: '100%' }}
                        animate={window.innerWidth < 1024 ? { y: '0%' } : { x: '0%' }}
                        exit={window.innerWidth < 1024 ? { y: '100%' } : { x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                        style={{ willChange: "transform", transform: "translateZ(0)" }}
                        className={`
                            fixed z-[101] bg-white flex flex-col shadow-[0_-20px_80px_rgba(0,0,0,0.3)]
                            ${window.innerWidth < 1024 
                                ? 'bottom-0 left-0 right-0 h-[85vh] rounded-t-[40px]' 
                                : 'right-0 top-0 h-full w-[460px] lg:rounded-l-[50px]'
                            }
                        `}
                    >
                        {/* 1. FIXED HEADER */}
                        <div className="shrink-0 flex items-center justify-between px-10 pt-10 pb-4">
                            <div className="flex flex-col">
                                <h2 className="font-display text-xl text-matte-black italic leading-none">Your <span className="not-italic font-normal opacity-40">Selection</span></h2>
                                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-primary-gold mt-2">
                                    {cart.length} Wholesale Collections
                                </span>
                            </div>
                            <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-matte-black/40 hover:text-matte-black transition-all">
                                <X size={18} />
                            </button>
                        </div>

                        {/* 2. TOP-FIXED REQUIREMENT PROGRESS */}
                        {cart.length > 0 && (
                            <div className="shrink-0 px-8 pb-5 border-b border-black/[0.03]">
                                <div className="bg-matte-black rounded-[24px] p-5 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 blur-[50px] rounded-full bg-primary-gold/10"></div>
                                    <div className="relative flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-bold text-primary-gold/60 uppercase tracking-[0.4em] mb-1">Requirement Progress</span>
                                                <p className="text-[10px] font-bold text-white uppercase tracking-wider">
                                                    {isUnlocked ? "Threshold Reached" : `Add ₹${remaining.toLocaleString()} to unlock`}
                                                </p>
                                            </div>
                                            {isUnlocked ? <Unlock size={12} className="text-primary-gold" /> : <Lock size={12} className="text-white/20" />}
                                        </div>
                                        <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ type: "spring", damping: 25, stiffness: 80 }} className="absolute inset-0 bg-gradient-to-r from-primary-gold/40 to-primary-gold" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. SCROLLABLE CONTENT */}
                        <div className="flex-grow overflow-y-auto px-10 py-6 space-y-8 no-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-10">
                                    <ShoppingBag size={24} />
                                    <p className="text-[9px] font-bold uppercase tracking-[0.4em]">Empty Bag</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-6">
                                        {cart.map((item) => (
                                            <div key={item.productId} className="flex gap-6 group">
                                                <div className="w-16 h-20 bg-off-white rounded-xl overflow-hidden shrink-0 border border-black/5">
                                                    <img src={getSafeImageUrl(item.imageUrl)} alt={item.productName} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                                                </div>
                                                <div className="flex-grow flex flex-col justify-between py-0.5">
                                                    <div className="space-y-1">
                                                        <h3 className="text-[9px] font-bold uppercase tracking-wider text-matte-black line-clamp-1 pr-10">{item.productName}</h3>
                                                        <p className="text-[9px] text-charcoal/40 font-bold">₹{item.price.toLocaleString()}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center bg-black/[0.03] rounded-full p-0.5 border border-black/[0.05]">
                                                            <button onClick={() => update(item.productId, Math.max(item.minQty || 12, item.quantity - (item.minQty || 12)))} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-all"><Minus size={8} /></button>
                                                            <span className="text-[9px] font-bold w-6 text-center">{item.quantity}</span>
                                                            <button onClick={() => update(item.productId, item.quantity + (item.minQty || 12))} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-all"><Plus size={8} /></button>
                                                        </div>
                                                        <button onClick={() => removeItem(item.productId)} className="text-[8px] font-bold text-red-400 uppercase tracking-widest">Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {!isUnlocked && recommendations.length > 0 && (
                                        <div className="space-y-4 pt-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[7px] font-bold text-matte-black/30 uppercase tracking-[0.3em]">Quick Add Collections</span>
                                                <div className="flex-grow h-[0.5px] bg-black/5"></div>
                                            </div>
                                            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                                {recommendations.map((product) => (
                                                    <button onClick={() => handleAddAddon(product)} key={product._id} className="flex-shrink-0 flex items-center gap-3 p-2.5 bg-off-white rounded-2xl border border-black/5 hover:border-primary-gold/30 transition-all group/addon">
                                                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-sm">
                                                            <img src={getSafeImageUrl(product.imageUrl)} className="w-full h-full object-cover group-hover/addon:scale-110 transition-transform duration-500" alt="" />
                                                        </div>
                                                        <div className="flex flex-col items-start">
                                                            <span className="text-[9px] font-bold text-primary-gold truncate w-20">₹{convertToINR(product.price).toLocaleString()}</span>
                                                            <span className="text-[7px] font-bold text-matte-black/30 uppercase tracking-widest mt-0.5">Quick Add</span>
                                                        </div>
                                                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-matte-black/20 group-hover/addon:bg-primary-gold group-hover/addon:text-white transition-all shadow-sm">
                                                            <Plus size={14} strokeWidth={3} />
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* 4. COMPACT STICKY FOOTER */}
                        {cart.length > 0 && (
                            <div className="px-10 py-5 bg-white border-t border-black/[0.03] space-y-3 shrink-0 shadow-[0_-15px_30px_rgba(0,0,0,0.02)]">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-charcoal/30">Wholesale Value</span>
                                    </div>
                                    <span className="font-display text-2xl text-matte-black tracking-tight">₹{subtotal.toLocaleString()}</span>
                                </div>

                                <button onClick={handleCheckout} disabled={!isUnlocked} className={`w-full h-12 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all duration-700 ${isUnlocked ? 'bg-matte-black text-soft-white hover:bg-primary-gold shadow-lg' : 'bg-black/5 text-matte-black/10 border border-black/5 cursor-not-allowed'}`}>
                                    {isUnlocked ? <><span className="mt-0.5">Secure Checkout</span> <ChevronRight size={12} /></> : <><Lock size={10} /> <span className="mt-0.5">Threshold Not Met</span></>}
                                </button>
                                
                                {!isUnlocked && (
                                    <p className="text-center text-[7px] font-bold text-primary-gold uppercase tracking-[0.15em] animate-pulse">Minimum Sourcing Limit Required</p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
            <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
        </AnimatePresence>
    );
};

export default CartDrawer;
