import React from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/footer/Footer";
import WholesaleTrustBar from "../components/common/WholesaleTrustBar";
import RecentlyExplored from "../components/common/RecentlyExplored";
import LuxuryHeader from "../components/Header/LuxuryHeader";
import ReplaceCartModal from "../components/common/ReplaceCartModal";
import CartDrawer from "../components/cart/CartDrawer";
import LuxurySnackbar from "../components/common/LuxurySnackbar";
import SimplifiedPartnerModal from "../components/common/SimplifiedPartnerModal";
import B2BOverlaySuite from "../components/common/B2BOverlaySuite";
import { useCart } from "../context/CartContext";

export default function MainLayout({ children }) {
  const { isDrawerOpen } = useCart();

  const shouldAnimate = isDrawerOpen && typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <div className="bg-matte-black min-h-screen overflow-x-hidden relative">
      <LuxuryHeader />
      {/* Optimized Content Wrapper */}
      <motion.div
        animate={{ 
          scale: shouldAnimate ? 0.96 : 1,
          opacity: shouldAnimate ? 0.9 : 1
        }}
        transition={{ 
          type: 'tween', 
          duration: 0.4,
          ease: [0.33, 1, 0.68, 1]
        }}
        className={`flex flex-col min-h-screen bg-white shadow-2xl relative z-10 ${shouldAnimate ? 'will-change-transform' : ''}`}
      >
        <main className="flex-grow">
          {children}
        </main>
        <RecentlyExplored />
        <WholesaleTrustBar />
        <Footer />
        <ReplaceCartModal />
      </motion.div>
      
      {/* Global Luxury Overlays */}
      <CartDrawer />
      <LuxurySnackbar />
      <SimplifiedPartnerModal />
      <B2BOverlaySuite />
    </div>
  );
}
