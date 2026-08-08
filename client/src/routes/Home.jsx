import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import LuxuryHero from '../components/Hero/LuxuryHero';
import CategoryCarousel from '../components/CategoryCarousel/CategoryCarousel';
import ShopifyProductSlider from '../components/HorizontalProductSlider/ShopifyProductSlider';
import HomeCollections from '../components/HomeCollections/HomeCollections';
import ShopifyCategoryTabs from '../components/CardsSection/ShopifyCategoryTabs';
import NecklaceShowcase from '../components/Showcase/NecklaceShowcase';
import GlobalWholesaleExperience from '../components/Sections/GlobalWholesaleExperience';
import { X, ArrowRight, ArrowLeft, Check, Globe, ShieldCheck, Clock } from 'lucide-react';
import { BASE_URL } from '../config';
import { useCart } from '../context/CartContext';



export default function Home() {
  const { setIsPartnerModalOpen } = useCart();

  const openPartnerModal = () => setIsPartnerModalOpen(true);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 01. Hero Banner - The High-Impact Entrance */}
      <LuxuryHero onWholesaleClick={openPartnerModal} />

      {/* 02. Category Navigation - The Discovery Rail */}
      <CategoryCarousel />

      {/* 03. Curated Products - Handpicked Slider */}
      <ShopifyProductSlider
        title="Handpicked For You"
        endpoint="handpicked"
      />

      {/* 03.5. Subcategory Collections Grids (10 products per category) */}
      <HomeCollections />

      {/* 06. Category Drilldown - Visual Tabs */}
      <ShopifyCategoryTabs />

      {/* 04. CINEMATIC SHOWCASE: The Necklace Collection */}
      <NecklaceShowcase />

      {/* 08. High-Trust Corporate Visual - The Global Standard */}
      <GlobalWholesaleExperience onBecomePartnerClick={openPartnerModal} />



    </div>
  );
}
