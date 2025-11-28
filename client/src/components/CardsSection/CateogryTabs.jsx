import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import { BASE_URL } from "../../config";

export default function CategoryTabs() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    // Show loading only on first page load, not on tab switch
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
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

        fetch(`${BASE_URL}/api/categories/subcategory/${categoryId}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products || []);
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
        <section id="portfolio" className="portfolio section">

            <div className="container section-title" data-aos="fade-up">
                <h2>Explore Our Range</h2>
            </div>

            <div className="container">
                <div className="isotope-layout">

                    {/* Category Tabs */}
                    <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
                        {categories.map(cat => (
                            <li
                                key={cat._id}
                                className={activeCategory === cat._id ? "filter-active" : ""}
                                onClick={() => handleCategoryClick(cat._id)}
                                style={{ cursor: "pointer" }}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>

                    {/* Products */}
                    <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
                        {initialLoading ? (
                            <p>Loading...</p>
                        ) : products.length === 0 ? (
                            <p>No products found.</p>
                        ) : (
                            products.map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    col={4}
                                    cartBtnPdg="5px 20px"
                                />
                            ))
                        )}
                    </div>

                </div>
            </div>

            <div className="container d-flex justify-content-center mt-4">
                <a href="/store" className="btn btn-outline px-4 py-2 rounded-3 col-pink fs-sm">
                    <i className="bi bi-box-seam me-2 col-pink"></i> View All
                </a>
            </div>

        </section>
    );
}
