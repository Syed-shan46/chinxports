import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const PremiumAddToCart = ({ onAdd, isInCart }) => {
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleClick = async () => {
        if (isInCart) {
            onAdd(); 
            return;
        }

        setStatus('loading');
        
        // Luxury timing: slow enough to be felt, fast enough not to annoy
        await new Promise(resolve => setTimeout(resolve, 1400));
        
        onAdd();
        setStatus('success');

        // Stay in success state for a bit before allowing re-interaction
        setTimeout(() => setStatus('idle'), 4000);
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            disabled={status === 'loading'}
            className={`
                relative w-full h-[60px] lg:h-[65px] border-[1px] rounded-full 
                text-[11px] font-bold uppercase tracking-[0.4em] 
                transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)]
                overflow-hidden flex items-center justify-center
                ${status === 'success' || isInCart
                    ? 'bg-matte-black border-matte-black text-soft-white' 
                    : 'bg-transparent border-matte-black/20 text-matte-black hover:border-matte-black'
                }
            `}
        >
            <AnimatePresence mode="wait">
                {status === 'idle' && !isInCart && (
                    <motion.span
                        key="idle"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    >
                        Add to Collection
                    </motion.span>
                )}

                {isInCart && status === 'idle' && (
                    <motion.span
                        key="in-cart"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        View in Bag
                    </motion.span>
                )}

                {status === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center"
                    >
                        {/* Thin Luxury Loader */}
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                            <circle 
                                className="opacity-20" 
                                cx="12" cy="12" r="10" 
                                stroke="currentColor" strokeWidth="1" fill="none" 
                            />
                            <path 
                                className="opacity-100" 
                                fill="none" stroke="currentColor" strokeWidth="1" 
                                strokeLinecap="round"
                                d="M12 2a10 10 0 0 1 10 10"
                            />
                        </svg>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                        >
                            <Check size={16} strokeWidth={3} className="text-soft-white" />
                        </motion.div>
                        <motion.span
                            initial={{ x: 5, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            Added
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Hover Glow */}
            <motion.div 
                className="absolute inset-0 bg-matte-black opacity-0 transition-opacity duration-500 pointer-events-none"
                whileHover={{ opacity: status === 'idle' && !isInCart ? 0.03 : 0 }}
            />
        </motion.button>
    );
};

export default PremiumAddToCart;
