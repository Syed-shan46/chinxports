import "./PromoCards.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    },
  ];

  const [index, setIndex] = useState(0);

  // SWIPE HANDLERS
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      // Swipe Left → Next
      setIndex((prev) => (prev + 1) % promoCards.length);
    }

    if (distance < -50) {
      // Swipe Right → Previous
      setIndex((prev) => (prev - 1 + promoCards.length) % promoCards.length);
    }
  };

  // AUTOPLAY
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promoCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const current = promoCards[index];

  return (
    <div
      className=""
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="promo-wrapper container">

        {/* ONE CARD ONLY */}
        <div className="promo-card mt-1 fade-animation">
          <img src={current.img} alt={current.title} className="promo-img" />

          <div className="promo-overlay"></div>

          <div className="promo-content">
            <h3 className="promo-title">{current.title}</h3>
            <p className="promo-subtitle">{current.subtitle}</p>

            <Link to={current.link} className="promo-btn">
              Shop Now
            </Link>
          </div>

          {/* DOTS */}
          <div className="hero-dots">
            {promoCards.map((_, i) => (
              <span
                key={i}
                className={i === index ? "dot active" : "dot"}
                onClick={() => setIndex(i)}
              ></span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
