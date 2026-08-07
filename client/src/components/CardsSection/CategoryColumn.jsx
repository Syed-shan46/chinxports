import { Link } from "react-router-dom";

export default function CategoryColumn({ title, icon, products = [] }) {
  // Ensure products is always an array
  const productList = Array.isArray(products) ? products : [];

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center mb-3">
        {icon && <i className={`${icon} me-2`}></i>}
        <h5 className="mb-0">{title}</h5>
      </div>

      <div className="rounded-3 shadow-sm">
        {productList.length > 0 ? (
          <div className="row gy-3">
            {productList.map((p, idx) => (
              <div className="col-12" key={p._id || p.id || idx}>
                <Link
                  to={`/products/product-details/${p._id}`}
                  className="text-decoration-none"
                >
                  <div className="d-flex align-items-start product-card-mini p-2 rounded-2 transition-all">
                    {/* Product Image */}
                    <div className="me-3">
                      {p.imageUrl?.[0] || p.image || p.thumbnail ? (
                        <img
                          src={p.imageUrl?.[0] || p.image || p.thumbnail}
                          alt={p.productName || p.name || "product"}
                          style={{
                            width: 64,
                            height: 64,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                      ) : (
                        <div
                          className="bg-light d-flex align-items-center justify-content-center text-muted"
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                        >
                          No image
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow-1">
                      <h6 className="mb-1 text-dark fs-sm" style={{
                        fontSize: "0.8rem",
                        marginTop: "2px",
                        fontWeight: "500",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,  // 3 lines
                      }}>
                        {p.productName || p.name || "Untitled"}
                      </h6>



                      {/* Old Price */}
                      {p.oldPrice && (
                        <div className="text-muted small">
                          <span style={{ textDecoration: "line-through" }}>
                            ₹{p.oldPrice}
                          </span>
                          <span className="badge bg-danger ms-2">
                            -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                          </span>
                        </div>
                      )}

                      {/* Category, Stock & Price */}
                      <div className="small text-muted mt-2 d-flex align-items-center flex-wrap gap-2">
                        {p.price != null && (
                          <span className="badge bg-info text-dark">
                            Price: ₹{p.price}
                          </span>
                        )}
                        {p.minQty && (
                          <span className="badge bg-info text-dark">
                            MOQ: {p.minQty}
                          </span>
                        )}
                        {p.category?.name && (
                          <span className="badge bg-secondary">
                            {p.category.name}
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      {p.rating && (
                        <div className="mt-2">
                          <i className="bi bi-star-fill text-warning"></i>
                          <span className="ms-1 small">{p.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted">
            <i className="bi bi-inbox"></i>
            <p>No products available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
