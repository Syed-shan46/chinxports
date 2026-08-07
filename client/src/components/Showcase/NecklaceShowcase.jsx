import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { getSafeImageUrl } from '../../utils/imageUtils';
import { ArrowRight, Sparkles, ShieldCheck, Globe } from 'lucide-react';

const NecklaceShowcase = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [necklaceCategoryId, setNecklaceCategoryId] = useState(null);

    useEffect(() => {
        const fetchNecklaces = async () => {
            try {
                // 1. Fetch Subcategories to map correctly
                const subRes = await axios.get(`${BASE_URL}/api/categories/get-subcategories`);
                const subCats = subRes.data?.subcategories ?? [];
                const necklaceSub = subCats.find(s => s.name.toLowerCase().includes('necklace'));
                
                // 2. Fetch Main Category for deeper linking if needed
                const catRes = await axios.get(`${BASE_URL}/api/categories/get-maincategories`);
                const mainCats = catRes.data?.categories ?? [];
                
                // Identify routing info
                if (necklaceSub) {
                    const parentId = necklaceSub.mainCategory?._id || necklaceSub.mainCategory;
                    setNecklaceCategoryId({
                        sub: necklaceSub._id,
                        cat: typeof parentId === 'string' ? parentId : null
                    });
                }

                // 3. Fetch Products
                const prodRes = await axios.get(`${BASE_URL}/api/products?limit=200`);
                const allProducts = prodRes.data?.products ?? [];
                
                // Dynamic Filter: Subcategory Name OR Product Name
                const dynamicNecklaces = allProducts.filter(p => {
                    const nameMatch = p.productName?.toLowerCase().includes('necklace');
                    const subMatch = p.subCategory?.name?.toLowerCase().includes('necklace');
                    const catMatch = p.mainCategory?.name?.toLowerCase().includes('necklace');
                    return subMatch || catMatch || nameMatch;
                });

                if (dynamicNecklaces.length > 0) {
                    setProducts(dynamicNecklaces.slice(0, 5));
                } else {
                    setProducts(allProducts.slice(0, 5));
                }

            } catch (err) {
                console.error("Failed to fetch necklaces dynamically:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNecklaces();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="relative py-24 lg:py-32 bg-[#FAF9F6] text-matte-black overflow-hidden selection:bg-primary-gold/20 selection:text-matte-black border-t border-black/[0.02]">
            {/* Cinematic Decorative Lighting (Refined Soft Tones) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-gold/[0.06] blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#C6A769]/[0.03] blur-[120px] rounded-full" />
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 lg:px-16 relative z-10">
                
                {/* Editorial Header */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="mb-16 lg:mb-24"
                >
                    <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                        <span className="h-[0.5px] w-12 bg-primary-gold/60"></span>
                        <span className="text-[10px] font-extrabold tracking-[0.5em] text-primary-gold uppercase">Signature Necklaces</span>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                        <motion.h2 variants={itemVariants} className="font-display text-5xl lg:text-8xl italic leading-[0.9] tracking-tighter text-matte-black">
                            Crafted To <br />
                            <span className="not-italic font-normal text-matte-black/90">Define Elegance</span>
                        </motion.h2>
                        
                        <motion.p variants={itemVariants} className="text-sm lg:text-base text-charcoal/50 max-w-md leading-relaxed font-medium mb-2">
                            Discover modern luxury necklaces engineered for premium retailers, curated collections, and international wholesale buyers.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Main Showcase Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* LEFT: Hero Card (Asymmetrical) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-6 relative group"
                    >
                        <div className="relative aspect-[4/5] lg:aspect-[4/5] max-h-[600px] overflow-hidden rounded-[40px] border border-black/[0.04] bg-[#F3F2EF] shadow-2xl">
                            <motion.img 
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                src="/images/categories/necklace.png" 
                                className="w-full h-full object-cover mix-blend-multiply opacity-95"
                                alt="Featured Necklace"
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = "https://images.unsplash.com/photo-1599643478524-fb524419875e?q=80&w=800&auto=format&fit=crop";
                                }}
                            />
                            
                            {/* Floating Luxury Badges */}
                            <div className="absolute top-8 left-8 flex flex-col gap-3">
                                <div className="px-4 py-2 bg-white/95 border border-black/[0.03] shadow-sm rounded-full flex items-center gap-2">
                                    <Sparkles size={12} className="text-primary-gold" />
                                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-matte-black/80">Premium 18K PVD</span>
                                </div>
                                <div className="px-4 py-2 bg-white/95 border border-black/[0.03] shadow-sm rounded-full flex items-center gap-2">
                                    <ShieldCheck size={12} className="text-primary-gold" />
                                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-matte-black/80">Anti-Tarnish</span>
                                </div>
                            </div>

                            {/* Center Overlay Branding (Super Subdued) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <h3 className="text-matte-black/[0.02] text-[15vw] font-display uppercase tracking-tighter select-none rotate-[-15deg]">CHINAXPORTS</h3>
                            </div>

                            {/* Bottom Label (High-end Frosted Material) */}
                            <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/95 border border-black/[0.04] rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] translate-y-0 opacity-100 transition-all duration-700 group-hover:translate-y-[-5px]">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-primary-gold uppercase tracking-[0.3em] mb-2">Editor's Choice</p>
                                        <p className="text-xl font-display text-matte-black italic font-medium">The Celestial Cascade</p>
                                    </div>
                                    <Globe className="text-charcoal/20" size={24} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Shadow Accent Halo */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-gold/[0.08] blur-[80px] rounded-full pointer-events-none group-hover:bg-primary-gold/[0.12] transition-colors duration-1000" />
                    </motion.div>

                    {/* RIGHT: Product Column */}
                    <div className="lg:col-span-6 space-y-12">
                        <div className="grid grid-cols-1 gap-8 lg:gap-10">
                            {products.length > 0 ? products.slice(0, 3).map((product, idx) => (
                                <motion.div 
                                    key={product._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15, duration: 0.8 }}
                                    className="group relative flex gap-8 items-center bg-white p-4 rounded-[32px] border border-black/[0.02] hover:border-primary-gold/25 shadow-[0_10px_35px_rgba(0,0,0,0.02)] transition-all duration-500"
                                >
                                    <div className="w-28 h-36 bg-[#faf9f6] rounded-[24px] overflow-hidden border border-black/[0.03] relative flex-shrink-0">
                                        <img 
                                            src={getSafeImageUrl(product.imageUrl)} 
                                            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
                                            alt={product.productName} 
                                        />
                                        <div className="absolute inset-0 bg-matte-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full bg-matte-black flex items-center justify-center text-white shadow-md">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 flex-grow">
                                        <span className="text-[9px] font-bold text-primary-gold uppercase tracking-[0.4em]">Wholesale Collection</span>
                                        <h4 className="text-lg font-display text-matte-black italic group-hover:text-primary-gold transition-colors duration-300">{product.productName}</h4>
                                        <div className="flex items-center gap-3 pt-2">
                                            <span className="w-4 h-[0.5px] bg-charcoal/20"></span>
                                            <span className="text-[9px] font-bold text-charcoal/40 uppercase tracking-widest">Sourcing Available</span>
                                        </div>
                                    </div>
                                    <Link to={`/products/product-details/${product._id}`} className="absolute inset-0 z-10" />
                                </motion.div>
                            )) : (
                                [1,2,3].map((_, idx) => (
                                    <div key={idx} className="flex gap-8 items-center animate-pulse bg-white p-4 rounded-[32px] border border-black/[0.02]">
                                        <div className="w-28 h-36 bg-black/[0.03] rounded-[24px]" />
                                        <div className="space-y-3 flex-grow">
                                            <div className="h-2 w-20 bg-black/[0.03] rounded-full" />
                                            <div className="h-6 w-40 bg-black/[0.04] rounded-lg" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Museum Style Tag */}
                        <div className="p-8 border-l border-primary-gold/40 bg-primary-gold/[0.03] rounded-r-3xl space-y-4">
                            <p className="text-[10px] font-bold text-primary-gold uppercase tracking-[0.5em]">Gallery Note</p>
                            <p className="text-xs italic text-charcoal/70 leading-relaxed font-medium">
                                "Our necklaces are designed to be more than accessories; they are architectural statements of luxury, engineered with export-grade PVD plating for longevity."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Final Action Callout */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 lg:mt-28 flex flex-col items-center gap-8"
                >
                    <div className="w-px h-16 bg-gradient-to-b from-primary-gold/60 to-transparent" />
                    <Link 
                        to={necklaceCategoryId 
                            ? `/store?category=${necklaceCategoryId.cat || ""}&sub=${necklaceCategoryId.sub}` 
                            : "/store"}
                        className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full border border-matte-black bg-transparent px-9 py-4 text-[10px] font-extrabold uppercase tracking-[0.25em] text-matte-black shadow-lg transition-all duration-500 hover:bg-matte-black hover:text-white"
                    >
                        {/* Animated Hover Shine */}
                        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                        
                        <span className="relative z-10">Explore Collection</span>
                        <ArrowRight size={13} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default NecklaceShowcase;
