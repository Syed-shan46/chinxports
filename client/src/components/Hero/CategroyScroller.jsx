import { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryScroller.css";
import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";

export default function CategoryScroller() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/categories/get-subcategories`)
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.subcategories);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  {
    loading
      ? [...Array(10)].map((_, i) => (
        <div key={i} className="cat-item skeleton"></div>
      ))
      : categories.map((cat, idx) => (
        <div key={idx} className="cat-item text-center p-0 m-0 me-3">
          <div className="cat-img-wrapper d-flex align-items-center justify-content-center"
            style={{ width: "47px", height: "47px", borderRadius: "14px" }}>

            <img
              src={cat.imageUrl}
              alt={cat.name}
              loading="lazy"
              className="img-fluid"
              style={{
                width: "70%",
                height: "70%",
                objectFit: "contain"
              }}
            />
          </div>
          <p className="cat-name mt-1 mb-0 text-truncate">
            {cat.name}
          </p>
        </div>
      ))
  }



  return (

    <div className="container">
      <div className="category-scroll-section">
        <div className="slider-title-wrapper">
          <h3 className="slider-title"></h3>
        </div>



        <div className="cat-scroll-wrapper">
          <div className="cat-scroll">
            {categories.map((cat, idx) => (
              <Link
                to={`/store?sub=${cat._id}`}
                className="text-decoration-none"
              >
                <div key={idx} className="cat-item text-center p-0 m-0 me-3">

                  {/* Image */}
                  <div
                    className="cat-img-wrapper d-flex align-items-center justify-content-center"
                    style={{ width: "47px", height: "47px", borderRadius: "14px" }}
                  >
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="img-fluid"
                      style={{ width: "70%", height: "70%", objectFit: "contain" }}
                    />
                  </div>

                  {/* Name */}
                  <p className="cat-name mt-2 mb-0 text-dark" style={{ fontSize: "11px", maxWidth: "70px", whiteSpace: "normal", lineHeight: "12px" }}>
                    {cat.name}
                  </p>

                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>


  );
}
