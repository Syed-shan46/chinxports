import { Link } from "react-router-dom";

export default function ProductCard({ product,col=4 ,cartBtnPdg="10px 15px"}) {
  return (
    <div className={`col-lg-2 col-${col} col-md-6`}>
      <Link
        to={`/products/product-details/${product._id}`}
        className="text-decoration-none text-dark"
      >
        <div className="product-item" data-aos="fade-up" data-aos-delay="100">

          <div className="product-image" style={{borderRadius: "15px"}}>
            {product.featured && <div className="product-badge">Limited</div>}

            <img
              src={product.imageUrl?.[0] || "/placeholder.jpg"}
              alt={product.productName}
              className="img-fluid"
              loading="eager"
            />
          </div>

          <div className="product-info">
            <div className="product-category" style={{ fontWeight: "600" }}>
              {product.subCategory?.name || ""}
            </div>

            <h4
              className="product-name-handpicked"
              style={{
                fontSize: "0.8rem",
                marginTop: "2px",
                fontWeight: "500",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,  // 3 lines
              }}
            >
              {product.productName}
            </h4>

             {/* Add to Cart Button */}
            <button style={{ padding: cartBtnPdg }}
              className="add-cart-btn"
              onClick={(e) => {
                e.preventDefault();
                alert("Add to cart clicked! (Connect with backend later)");
              }}
            >
              <i className="fa-solid fa-bag-shopping"></i> Pick 
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
