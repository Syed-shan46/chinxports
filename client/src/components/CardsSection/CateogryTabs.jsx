import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";
import "./CategoryTabs.css"

let cachedCategories = null;
let cachedProducts = {};


export default function CategoryTabs() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    // Show loading only on first page load, not on tab switch
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        // If categories are already cached, use them instantly
        if (cachedCategories) {
            setCategories(cachedCategories);

            const firstCatId = cachedCategories[0]._id;
            setActiveCategory(firstCatId);

            // load products from cache
            if (cachedProducts[firstCatId]) {
                setProducts(cachedProducts[firstCatId]);
                setInitialLoading(false);
            } else {
                fetchProducts(firstCatId, true);
            }
            return;
        }

        fetch(`${BASE_URL}/api/categories/get-subcategories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.subcategories || []);

                if (data.subcategories?.length > 0) {
                    const firstCatId = data.subcategories[0]._id;
                    setActiveCategory(firstCatId);
                    fetchProducts(firstCatId, true); // initial load
                }
            })
            .catch(err => console.error("Category fetch error:", err));
    }, []);

    const fetchProducts = (categoryId, isInitial = false) => {
        if (isInitial) setInitialLoading(true);

        // Check product cache
        if (cachedProducts[categoryId]) {
            setProducts(cachedProducts[categoryId]);
            if (isInitial) setInitialLoading(false);
            return;
        }

        fetch(`${BASE_URL}/api/categories/subcategory/${categoryId}`)
            .then(res => res.json())
            .then(data => {
                const prods = data.products?.slice(-9).reverse() || [];
                cachedProducts[categoryId] = prods;  // save to cache
                setProducts(prods);
            })
            .catch(err => console.error("Product fetch failed:", err))
            .finally(() => {
                if (isInitial) setInitialLoading(false);
            });
    };

    // On tab click, fetch without showing loading text
    const handleCategoryClick = (catId) => {
        setActiveCategory(catId);
        fetchProducts(catId, false); // disable loading on tab switch
    };

    return (
        <section id="portfolio" className="portfolio section mt-3">
            <div className="container">
                <div className="container section-title" data-aos="fade-up">
                    <h2>Categories</h2>
                </div>
                <div className="isotope-layout">

                    {/* Category Tabs */}
                    <section >
                        {/* Scrollable Tabs */}
                        <div className="cat-tabs-container" data-aos="fade-up">
                            <ul className="cat-tabs-list">
                                {categories.map((cat) => (
                                    <li
                                        key={cat._id}
                                        className={`cat-tab-item rounded-3 ${activeCategory === cat._id ? "active" : ""}`}
                                        onClick={() => handleCategoryClick(cat._id)}
                                    >
                                        {cat.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Products Section */}
                        <div className="row gy-4 m">
                            {initialLoading ? (
                                <p className="loading-text">Loading products…</p>
                            ) : products.length === 0 ? (
                                <p className="loading-text">No products found.</p>
                            ) : (
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        col={4}
                                        cartBtnPdg="5px 20px"
                                    />
                                ))
                            )}
                        </div>



                    </section>






                </div>
            </div>

            <div className="container d-flex justify-content-center mt-4">
                <Link to="/store" className="btn btn-outline px-4 py-2 rounded-3 fs-sm">
                    <i className="bi bi-box-seam me-2 "></i> View All
                </Link>
            </div>

        </section>
    );
}
