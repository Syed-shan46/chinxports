import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ShopifyProductCard from '../product/ShopifyProductCard';
import { BASE_URL } from '../../config';

export default function HomeCollections() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollectionsData = async () => {
            try {
                // 1. Fetch subcategories of Premium 18k Gold (restricted on backend automatically)
                const subRes = await axios.get(`${BASE_URL}/api/categories/get-subcategories`);
                const subCats = subRes.data?.subcategories || [];

                // 2. Fetch products for each subcategory in parallel (limit 10 products per subcategory)
                const dataPromises = subCats.map(async (sub) => {
                    try {
                        const prodRes = await axios.get(`${BASE_URL}/api/categories/subcategory/${sub._id}`);
                        const products = prodRes.data?.products || [];
                        const filteredProducts = products.slice(0, 10);
                        return {
                            ...sub,
                            products: filteredProducts
                        };
                    } catch (err) {
                        console.error(`Error fetching products for subcategory ${sub.name}:`, err);
                        return { ...sub, products: [] };
                    }
                });

                const results = await Promise.all(dataPromises);
                const mappedResults = results.map(col => ({
                    ...col,
                    name: col.name.charAt(0).toUpperCase() + col.name.slice(1)
                }));
                setCollections(mappedResults.filter(c => c.products.length > 0));
            } catch (error) {
                console.error("Error fetching collections for homepage:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionsData();
    }, []);

    if (loading) {
        return (
            <div className="py-12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
                {[1, 2].map((n) => (
                    <div key={n} className="space-y-6 animate-pulse">
                        <div className="h-8 bg-black/[0.03] w-48 rounded-md" />
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((x) => (
                                <div key={x} className="aspect-[3/4] bg-black/[0.02] rounded-2xl" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (collections.length === 0) return null;

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-0 pb-12 sm:pt-6 sm:pb-20 lg:pt-8 lg:pb-24 space-y-16 sm:space-y-24 bg-white">
            {collections.map((col) => {
                const mainCatId = col.mainCategory?._id || col.mainCategory;
                const viewMoreLink = mainCatId ? `/store?category=${mainCatId}&sub=${col._id}` : `/store?sub=${col._id}`;
                return (
                <section key={col._id} className="space-y-8">
                    {/* Header */}
                    <div className="flex items-end justify-between border-b border-black/[0.04] pb-4">
                        <div className="space-y-2">
                            <span className="text-[9px] font-bold tracking-[0.3em] text-primary-gold uppercase">
                                Collection
                            </span>
                            <h2 className="font-display text-2xl sm:text-4xl text-matte-black tracking-tight leading-none">
                                {col.name}
                            </h2>
                        </div>
                        <Link
                            to={viewMoreLink}
                            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-gold hover:text-matte-black transition-colors"
                        >
                            <span>View More</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Products Grid - 2 per row on mobile, 4 per row on desktop */}
                    <div className="grid gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 grid-cols-2 lg:grid-cols-4">
                        {col.products.map((product) => (
                            <ShopifyProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>
                );
            })}
        </div>
    );
}
