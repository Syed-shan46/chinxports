import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import { BASE_URL } from "../../config";

export default function CategoryTabs() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch categories first
    useEffect(() => {
        fetch(`${BASE_URL}/api/categories/get-subcategories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.subcategories || []);

                // Auto-load first category products
                if (data.subcategories?.length > 0) {
                    const firstCatId = data.subcategories[0]._id;
                    setActiveCategory(firstCatId);
                    fetchProducts(firstCatId);
                }
            })
            .catch(err => console.error("Category fetch error:", err));
    }, []);

    // Fetch products by subcategory
    const fetchProducts = (categoryId) => {
        setLoading(true);
        fetch(`${BASE_URL}/api/categories/subcategory/${categoryId}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products || []);
            })
            .catch(err => console.error("Product fetch failed:", err))
            .finally(() => setLoading(false));
    };

    // On tab click
    const handleCategoryClick = (catId) => {
        setActiveCategory(catId);
        fetchProducts(catId);
    };

    return (
        <section id="portfolio" className="portfolio section">

            <div className="container section-title" data-aos="fade-up">
                <h2>Categories</h2>
            </div>

            <div className="container">
                <div className="isotope-layout">

                    {/* Dynamic Category Tabs */}
                    <ul
                        className="portfolio-filters isotope-filters"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
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
                    <div
                        className="row gy-4 isotope-container"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {loading ? (
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

        </section>
    );
}
