import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { convertToINR } from "../../utils/priceUtils";


export default function ProductCard({ product, col = 4, cartBtnPdg = "10px 15px" }) {
  const { add, cart } = useCart();


  const isInCart = cart.some(item => item.productId === product._id);

  // Convert price here
  const priceINR = convertToINR(product.price);

  return (
    <div className={`col-lg-2 col-${col} col-md-6`}>

      <div className="product-item" data-aos="fade-up" data-aos-delay="100">
        <Link to={`/products/product-details/${product._id}`}
          className="text-decoration-none text-dark"
        >
          <div className="product-image" style={{ borderRadius: "15px" }}>
            {product.featured && <div className="product-badge">Limited</div>}

            <img
              src={product.imageUrl?.[0] || "/placeholder.jpg"}
              alt={product.productName}
              className="img-fluid"
              loading="eager"
            />
          </div>
        </Link>

        <div className="product-info">
          <div className="product-category" style={{ fontWeight: "600" }}>
            {product.subCategory?.name || ""}
          </div>

          <p className="text-dark fw-semibold mb-1">
            ₹{priceINR.toLocaleString()}
          </p>

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
              WebkitLineClamp: 2,
            }}
          >
            {product.productName}
          </h4>

          {/* Add to Cart Button */}
          <button
            className={`add-cart-btn mt-2 ${isInCart ? "added" : ""}`}
            style={{ padding: cartBtnPdg }}
            onClick={() => {
              if (isInCart) return;  // already added → do nothing

              console.log("Adding from ProductCard:", product._id);
              add(product._id, product.minQty || 6);
            }}
          >
            <i className={`fa-solid ${isInCart ? "fa-circle-check" : "fa-bag-shopping"}`}></i>
            {isInCart ? " Picked" : " Pick"}
          </button>

        </div>
      </div>
    </div>
  );
}
