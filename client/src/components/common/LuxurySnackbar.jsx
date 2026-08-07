import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const LuxurySnackbar = () => {
    const { snackbar, setSnackbar } = useCart();

    useEffect(() => {
        if (snackbar.show) {
            const timer = setTimeout(() => {
                setSnackbar(prev => ({ ...prev, show: false }));
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [snackbar.show, snackbar.timestamp, setSnackbar]);

    return (
        <AnimatePresence mode="wait">
            {snackbar.show && (
                <motion.div
                    key={snackbar.timestamp} 
                    initial={{ y: -100, opacity: 0, x: '-50%' }} 
                    animate={{ y: 0, opacity: 1, x: '-50%' }}
                    exit={{ y: -100, opacity: 0, x: '-50%' }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className="fixed z-[250] top-10 left-1/2 px-10 py-4 bg-matte-black text-white rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10"
                >
                    <p className="text-[11px] font-bold tracking-[0.3em] uppercase whitespace-nowrap">
                        {snackbar.message || "Product Added To Bag"}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LuxurySnackbar;
