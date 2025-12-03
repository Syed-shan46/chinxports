
import "./PromoCards.css"
import { Link } from "react-router-dom";
export default function PromoCards() {
    const promoCards = [


        {
            img: "/images/banners/banner8.png",
            title: "Necklaces",
            subtitle: "Timeless pieces that complete every outfit",
            link: "/store?sub=69306865ca452e54325b5c5b"
        },
        {
            img: "/images/banners/banner7.png",
            title: "Bracelets Collection",
            subtitle: "Elegant designs crafted to elevate your style",
            link: "/store?sub=69306e66ca452e54325b5c63"
        },
        {
            img: "/images/banners/banner6.png",
            title: "Rings Selection",
            subtitle: "Premium rings crafted for every occasion",
            link: "/store?sub=6930682dca452e54325b5c57"
        },
        {
            img: "/images/banners/banner10.png",
            title: "Earrings Collection",
            subtitle: "Chic and versatile earrings for daily wear",
            link: "/store?sub=69306814ca452e54325b5c53"
        },

        {
            img: "/images/banners/banner9.png",
            title: "Bangles Collection",
            subtitle: "Traditional and modern bangles for every style",
            link: "/store?sub=69306e52ca452e54325b5c5f"
        }

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

                       <Link to={p.link} className="promo-btn">
                            Shop Now
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
