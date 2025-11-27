// A reusable component for product list
export function ProductGrid({ items }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
      gap: "25px",
      padding: "10px",
    }}>
      {items.map((p) => (
        <div
          key={p._id}
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          className="product-card"
        >
          {/* Image */}
          {p.images?.length > 0 && (
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={p.images[0]}
                alt={p.productName}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                className="product-img"
              />
            </div>
          )}

          {/* Content */}
          <div style={{ padding: "15px" }}>
            <h3 style={{
              fontSize: "1.0rem",
              fontWeight: "100",
              marginBottom: "5px",
              overflow: "hidden !important", 
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              color: "#333",
            }}>
              {p.productName}
            </h3>

            <p style={{ margin: 0, color: "#777", fontSize: "0.9rem" }}>
              {p.category?.name}
            </p>

            <p style={{
              marginTop: "12px",
              fontWeight: "700",
              color: "#295ba7",
              fontSize: "1.1rem",
            }}>
              ₹{p.price}
            </p>

            {/* Button */}
            <button style={{
              width: "100%",
              padding: "10px",
              background: "#295ba7",
              border: "none",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "8px",
              marginTop: "10px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            className="product-btn"
            >
              View Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
