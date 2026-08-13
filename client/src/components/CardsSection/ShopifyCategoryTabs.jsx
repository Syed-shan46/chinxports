import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ShopifyProductCard from "../product/ShopifyProductCard";
import { BASE_URL } from "../../config";

let cachedCategories = null;
let cachedProducts = {};

export default function ShopifyCategoryTabs() {
    const [categories, setCategories] =
        useState([]);

    const [products, setProducts] = useState([]);

    const [activeCategory, setActiveCategory] =
        useState(null);

    const [initialLoading, setInitialLoading] =
        useState(true);

    useEffect(() => {
        if (cachedCategories) {
            setCategories(cachedCategories);

            const firstCatId =
                cachedCategories[0]?._id;

            setActiveCategory(firstCatId);

            if (cachedProducts[firstCatId]) {
                setProducts(
                    cachedProducts[firstCatId]
                );

                setInitialLoading(false);
            } else {
                fetchProducts(firstCatId, true);
            }

            return;
        }

        fetch(
            `${BASE_URL}/api/categories/get-subcategories`
        )
            .then((res) => res.json())
            .then((data) => {
                const cats = data.subcategories || [];

                cachedCategories = cats;

                setCategories(cats);

                if (cats.length > 0) {
                    const firstCatId = cats[0]._id;

                    setActiveCategory(firstCatId);

                    fetchProducts(firstCatId, true);
                }
            })
            .catch((err) =>
                console.error(
                    "Category fetch error:",
                    err
                )
            );
    }, []);

    const fetchProducts = (
        categoryId,
        isInitial = false
    ) => {
        if (isInitial) setInitialLoading(true);

        if (cachedProducts[categoryId]) {
            setProducts(
                cachedProducts[categoryId]
            );

            if (isInitial)
                setInitialLoading(false);

            return;
        }

        fetch(
            `${BASE_URL}/api/categories/subcategory/${categoryId}`
        )
            .then((res) => res.json())
            .then((data) => {
                const prods = (data.products || [])
                    .filter(
                        (p) =>
                            p.mainCategory ===
                            "69c36d19eab4f288c1d04248" ||
                            p.mainCategory?._id ===
                            "69c36d19eab4f288c1d04248"
                    )
                    .slice(-8)
                    .reverse();

                cachedProducts[categoryId] = prods;

                setProducts(prods);
            })
            .catch((err) =>
                console.error(
                    "Product fetch failed:",
                    err
                )
            )
            .finally(() => {
                if (isInitial)
                    setInitialLoading(false);
            });
    };

    const handleCategoryClick = (catId) => {
        setActiveCategory(catId);

        fetchProducts(catId);
    };

    return (
        <section className="relative overflow-hidden bg-white pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pt-16 lg:pb-32 xl:pt-20 xl:pb-40">
            {/* Ambient Luxury Background */}
            <div className="pointer-events-none absolute -top-24 right-0 h-[320px] w-[320px] rounded-full bg-primary-gold/[0.05] blur-[120px] sm:h-[420px] sm:w-[420px]" />

            <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[#f8f3eb] blur-[100px] sm:h-[340px] sm:w-[340px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "radial-gradient(#000 0.6px, transparent 0.6px)",
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                {/* Header */}
                <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-16">
                    <span className="inline-flex items-center rounded-full border border-primary-gold/15 bg-primary-gold/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-primary-gold sm:px-5 sm:text-[11px]">
                        Curated Collections
                    </span>

                    <h2 className="mt-5 font-display text-[2.2rem] leading-[0.95] tracking-tight text-matte-black sm:text-5xl md:text-6xl xl:text-7xl">
                        Shop By{" "}
                        <span className="font-normal italic text-primary-gold">
                            Category
                        </span>
                    </h2>

                    <div className="mx-auto mt-6 h-[1px] w-24 bg-gradient-to-r from-transparent via-primary-gold/40 to-transparent" />

                    <p className="mx-auto mt-6 max-w-2xl px-2 text-sm leading-relaxed text-charcoal/60 sm:text-base md:text-[17px]">
                        Explore timeless jewelry
                        collections crafted for modern
                        luxury retailers and premium
                        wholesale buyers worldwide.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="relative mb-10 sm:mb-12 lg:mb-16">
                    <div className="no-scrollbar overflow-x-auto">
                        <div className="flex min-w-max items-center gap-3 px-1 pb-2 sm:gap-4 lg:justify-center">
                            {categories.map((cat) => {
                                const active =
                                    activeCategory === cat._id;

                                return (
                                    <button
                                        key={cat._id}
                                        onClick={() =>
                                            handleCategoryClick(
                                                cat._id
                                            )
                                        }
                                        className={`group relative flex h-11 items-center justify-center overflow-hidden rounded-full border px-5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 sm:h-12 sm:px-6 sm:text-[11px]
                    
                    ${active
                                                ? "border-matte-black bg-matte-black text-white shadow-[0_14px_35px_rgba(0,0,0,0.14)]"
                                                : "border-black/8 bg-white text-charcoal/65 hover:border-primary-gold/30 hover:bg-primary-gold/[0.03] hover:text-matte-black"
                                            }`}
                                    >
                                        {!active && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-gold/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                        )}

                                        <span className="relative z-10">
                                            {cat.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid min-h-[400px] grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12 xl:grid-cols-4 xl:gap-x-7">
                    {initialLoading ? (
                        [...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="overflow-hidden rounded-[24px] sm:rounded-[28px]"
                            >
                                <div className="aspect-[0.72] animate-pulse rounded-[24px] bg-black/[0.04] sm:rounded-[28px]" />

                                <div className="mt-4 space-y-3">
                                    <div className="h-4 w-2/3 animate-pulse rounded-full bg-black/[0.04]" />

                                    <div className="h-4 w-1/3 animate-pulse rounded-full bg-black/[0.04]" />
                                </div>
                            </div>
                        ))
                    ) : products.length === 0 ? (
                        <div className="col-span-full">
                            <div className="rounded-[28px] border border-black/5 bg-[#fafafa] px-6 py-20 text-center sm:rounded-[32px] sm:py-24">
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black/[0.03]">
                                    <span className="text-2xl">
                                        ✨
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-matte-black">
                                    No Products Available
                                </h3>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/55">
                                    This category is currently
                                    being updated with new
                                    arrivals and curated luxury
                                    pieces.
                                </p>
                            </div>
                        </div>
                    ) : (
                        products.map((product, index) => (
                            <div
                                key={product._id}
                                className="group animate-fade-in"
                                style={{
                                    animationDelay: `${index * 70}ms`,
                                }}
                            >
                                <div className="transition-all duration-500 group-hover:-translate-y-1.5">
                                    <ShopifyProductCard
                                        product={product}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 flex justify-center sm:mt-16 lg:mt-20">
                    <Link
                        to="/store?category=69c36d19eab4f288c1d04248"
                        className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full bg-matte-black px-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-primary-gold hover:text-matte-black sm:h-14 sm:px-10 sm:text-[11px] shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
                    >
                        {/* Light Sweep */}
                        <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-1000 group-hover:translate-x-[120%]" />

                        <div className="relative z-10 flex items-center gap-3">
                            <span>
                                Explore All Collections
                            </span>

                            <ArrowRight
                                size={15}
                                className="transition-transform duration-300 group-hover:translate-x-1.5"
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}