import "./CategoryScroller.css";

export default function CategoryScroller() {
    const categories = [
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },
        { img: "/images/product/cat-img.png", name: "Fashion" },

    ];

    return (
        <div className="container">
            <div className="category-scroll-section">
                <div className="slider-title-wrapper">
                    <h3 className="slider-title"></h3>
                </div>

                <div className="cat-scroll-wrapper">
                    <div className="cat-scroll">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="cat-item text-center p-0 m-0 me-3">

                                {/* Image */}
                                <div
                                    className="cat-img-wrapper d-flex align-items-center justify-content-center"
                                    style={{ width: "47px", height: "47px", borderRadius: "14px", }}
                                >
                                    <img
                                        src={cat.img}
                                        alt={cat.name}
                                        className="img-fluid"
                                        style={{ width: "70%", height: "70%", objectFit: "contain" }}
                                    />
                                </div>

                                {/* Name */}
                                <p className="cat-name mt-1 mb-0 text-truncate" style={{ fontSize: "11px", maxWidth: "70px", whiteSpace: "normal", lineHeight: "12px" }}>
                                    {cat.name}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
