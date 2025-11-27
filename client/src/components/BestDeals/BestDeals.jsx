import { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import { BASE_URL } from "../../config";


export default function BestDeals() {
  const [handpickedProducts, setHandpickedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/handpicked`)
      .then((res) => {
        if (!res.ok) {
          // handle non-200 responses
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setHandpickedProducts(data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-container">
    <div className="spinner-border col-pink" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section id="best-sellers
      " className="best-sellers">
        <div className="container section-title" data-aos="fade-up">
          <span className="description-title">Best Deals</span>
          <h2>Best Deals</h2>
        </div>
        {/* <div className="section-badge mb-3 justify-content-center d-flex" data-aos="fade-up">
          <i className="bi bi-star-fill"></i>
          <span>WHAT WE DO</span>
        </div> */}

        <div className="container" >
          <div className="row ">
            {handpickedProducts.length === 0 && <p>No products found.</p>}

            {handpickedProducts.map((product) => (
              <ProductCard key={product._id} product={product} col={4} cartBtnPdg="5px 20px" />
            ))}
          </div>
        </div>

      </section>
    </>

  );
}
