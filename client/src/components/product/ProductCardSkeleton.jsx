export default function ProductCardSkeleton({ col = 4, colLg = 2, cartBtnPdg = "10px 15px" }) {
  return (
    <div className={`col-lg-${colLg} col-${col} col-md-6`}>
      <div className="product-item skeleton-card">
        
        {/* Product Image Skeleton */}
        <div className="product-image" style={{ borderRadius: "15px" }}>
          <div className="skeleton-shimmer skeleton-image"></div>
        </div>

        {/* Product Info Skeleton */}
        <div className="product-info">
          <div className="skeleton-shimmer skeleton-category"></div>
          <p className="skeleton-shimmer skeleton-price"></p>
          <p className="skeleton-shimmer skeleton-moq"></p>
          <button className="add-cart-btn skeleton-shimmer skeleton-button" style={{ padding: cartBtnPdg }}>
          </button>
        </div>

      </div>
    </div>
  );
}
