import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';

// Base definitions with static images, but we'll try to match with real IDs
const categoryDefinitions = [
    { name: "Bangles", image: "/images/collections/bangle.png" },
    { name: "Bracelets", image: "/images/collections/bracelets.png" },
    { name: "Necklaces", image: "/images/collections/necklace.png" },
    { name: "Earrings", image: "/images/collections/earings.png" },
    { name: "Rings", image: "/images/banners/banner6.webp" },
];

const CategoryCarousel = () => {
    const scrollRef = useRef(null);
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const [mainRes, subRes] = await Promise.all([
                    axios.get(`${BASE_URL}/api/categories/get-maincategories`),
                    axios.get(`${BASE_URL}/api/categories/get-subcategories`)
                ]);

                const apiCats = (mainRes.data?.categories ?? []).filter(c => c._id === '69c36d19eab4f288c1d04248');
                const subCats = (subRes.data?.subcategories ?? []);

                // Merge API data with our premium images
                const merged = categoryDefinitions.map(def => {
                    const targetName = def.name.toLowerCase();

                    // 1. Check for exact or partial subcategory match first
                    const subMatch = subCats.find(sub =>
                        sub.name.toLowerCase().includes(targetName) ||
                        targetName.includes(sub.name.toLowerCase())
                    );

                    if (subMatch) {
                        let mainId = subMatch.mainCategory?._id || subMatch.mainCategory;
                        let mainIdStr = typeof mainId === 'string' ? mainId : (mainId?._id || "");
                        if (mainIdStr !== '69c36d19eab4f288c1d04248') {
                            mainIdStr = '69c36d19eab4f288c1d04248';
                        }
                        return {
                            ...def,
                            link: `/store?category=${mainIdStr}&sub=${subMatch._id}`
                        };
                    }

                    // 2. Check for main category match
                    const mainMatch = apiCats.find(apiCat =>
                        apiCat.name.toLowerCase().includes(targetName) ||
                        targetName.includes(apiCat.name.toLowerCase())
                    );

                    if (mainMatch) {
                        return {
                            ...def,
                            link: `/store?category=${mainMatch._id}`
                        };
                    }

                    // 3. Fallback to general store
                    return {
                        ...def,
                        link: '/store?category=69c36d19eab4f288c1d04248'
                    };
                });

                setDynamicCategories(merged);
            } catch (err) {
                console.error("Failed to fetch categories for carousel:", err);
                setDynamicCategories(categoryDefinitions.map(d => ({ ...d, link: '/store?category=69c36d19eab4f288c1d04248' })));
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="pt-12 pb-4 lg:pt-24 lg:pb-12 bg-white overflow-hidden relative">
            <div className="relative z-10">
                <div className="pl-6 lg:pl-16 pr-6 mb-8">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-display text-4xl lg:text-7xl text-matte-black italic leading-none tracking-tighter">
                            Signature <span className="not-italic font-normal text-charcoal/90">Series</span>
                        </h2>
                    </div>
                </div>

                {/* Premium Grid / Rail */}
                <div
                    ref={scrollRef}
                    className="grid grid-cols-5 gap-1.5 px-4 md:flex md:gap-8 md:overflow-x-auto md:no-scrollbar md:scroll-smooth md:snap-x md:snap-mandatory md:pr-6 md:lg:pr-16"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    <div className="hidden md:block flex-none w-6 lg:w-16 -mr-4 lg:-mr-8 snap-start" aria-hidden="true"></div>

                    {dynamicCategories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            whileTap={{ scale: 0.96 }}
                            className="group cursor-pointer flex flex-col items-center snap-start md:flex-none w-full md:w-52"
                        >
                            <Link to={cat.link} className="flex flex-col items-center w-full">
                                <div className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-36 md:h-36 lg:w-44 lg:h-44 overflow-hidden rounded-full bg-[#fafaf9] border-[0.5px] border-black/5 mb-3 md:mb-5 transition-all duration-700 group-hover:border-primary-gold group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:shadow-primary-gold/10">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-700"></div>
                                </div>
                                <div className="text-center w-full">
                                    <span className="text-[8px] sm:text-[10px] md:text-[13px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.2em] text-charcoal/40 group-hover:text-matte-black transition-colors block truncate">
                                        {cat.name}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    <div className="hidden md:block flex-none w-10 lg:w-24 h-1"></div>
                </div>

                {/* Signature Gold Divider */}
                <div className="mt-8 lg:mt-12 flex items-center justify-center">
                    <div className="w-24 lg:w-40 h-[1px] bg-gradient-to-r from-transparent via-primary-gold/40 to-transparent relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary-gold rounded-full shadow-[0_0_10px_rgba(198,167,105,0.8)]"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryCarousel;