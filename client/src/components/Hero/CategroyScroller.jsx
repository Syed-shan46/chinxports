import { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryScroller.css";
import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";

export default function CategoryScroller() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to map category names to local images in public/images/categories/
  const getLocalImage = (name) => {
    if (!name) return null;
    const lowerName = name.toLowerCase().trim();

    // Map of singular/plural names to filenames
    const imageMap = {
      "ring": "/images/categories/ring.png",
      "rings": "/images/categories/ring.png",
      "necklace": "/images/categories/necklace.png",
      "necklaces": "/images/categories/necklace.png",
      "bangle": "/images/categories/bangle.png",
      "bangles": "/images/categories/bangle.png",
      "bracelet": "/images/categories/bracelet.png",
      "bracelets": "/images/categories/bracelet.png",
      "earring": "/images/categories/earrings.png",
      "earrings": "/images/categories/earrings.png"
    };

    return imageMap[lowerName];
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/categories/get-subcategories`)
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.subcategories);
        }
      })
      // show 2 seconds loading for better UX
      .finally(() => setTimeout(() => setLoading(false), 100));
  }, []);

  return (
    <div className="container-fluid px-3 px-md-4 py-lg-3 mt-5 pt-1 mt-md-0">
      <div className="category-scroll-section">


        <div className="cat-scroll-wrapper ms-1">
          <div className="cat-scroll">

            {loading ? (
              // ✅ Skeleton Loader
              [...Array(10)].map((_, i) => (
                <div key={i} className="cat-item text-center p-0 m-0">
                  <div className="cat-img-wrapper">
                    <div className="skeleton-box"></div>
                  </div>
                  <div className="skeleton-line"></div>
                </div>
              ))
            ) : (
              // ✅ Real Categories
              categories.map((cat, idx) => (
                <Link
                  to={`/store?sub=${cat._id}`}
                  className="text-decoration-none"
                  key={idx}
                >
                  <div className="cat-item text-center p-0 m-0">

                    {/* Image */}
                    <div className="cat-img-wrapper d-flex align-items-center justify-content-center">
                      <img
                        src={getLocalImage(cat.name) || cat.imageUrl}
                        alt={cat.name}
                        className="img-fluid"
                      />
                    </div>

                    {/* Name */}
                    <p className="cat-name mt-2 mb-0 text-dark">
                      {cat.name}
                    </p>
                  </div>
                </Link>
              ))
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
