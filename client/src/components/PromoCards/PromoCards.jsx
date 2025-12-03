
import "./PromoCards.css"
export default function PromoCards() {
    const promoCards = [
        

        {
            img: "/images/banners/banner8.png",
            title: "Necklaces",
            subtitle: "Timeless pieces that complete every outfit",
            link: "/store?category=necklaces"
        },
        {
            img: "/images/banners/banner7.png",
            title: "Bracelets Collection",
            subtitle: "Elegant designs crafted to elevate your style",
            link: "/store?category=bracelets"
        },
        {
            img: "/images/banners/banner6.png",
            title: "Rings Selection",
            subtitle: "Premium rings crafted for every occasion",
            link: "/store?category=rings"
        },
        {
            img: "/images/banners/banner10.png",
            title: "Earrings Collection",
            subtitle: "Chic and versatile earrings for daily wear",
            link: "/store?category=earrings"
        },

    ];

    return (
        <div className="promo-wrapper container">
            {promoCards.map((p, i) => (
                <div key={i} className="promo-card mt-1">
                    <img src={p.img} alt={p.title} className="promo-img" />

                    {/* Gradient overlay */}
                    <div className="promo-overlay"></div>

                    <div className="promo-content">
                        <h3 className="promo-title">{p.title}</h3>
                        <p className="promo-subtitle">{p.subtitle}</p>

                        <a href={p.link} className="promo-btn">
                            Shop Now
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
