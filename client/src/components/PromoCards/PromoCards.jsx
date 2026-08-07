import "./PromoCards.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PromoCards() {
  const promoCards = [
    {
      img: "/images/banners/banner8.webp",
      title: "Necklaces",
      subtitle: "Timeless pieces that complete every outfit",
      link: "/store?sub=69306865ca452e54325b5c5b"
    },
    {
      img: "/images/banners/banner7.webp",
      title: "Bracelets Collection",
      subtitle: "Elegant designs crafted to elevate your style",
      link: "/store?sub=69306e66ca452e54325b5c63"
    },
    {
      img: "/images/banners/banner6.webp",
      title: "Rings Selection",
      subtitle: "Premium rings crafted for every occasion",
      link: "/store?sub=6930682dca452e54325b5c57"
    },
    {
      img: "/images/banners/banner10.webp",
      title: "Earrings Collection",
      subtitle: "Chic and versatile earrings for daily wear",
      link: "/store?sub=69306814ca452e54325b5c53"
    },
    {
      img: "/images/banners/banner9.webp",
      title: "Bangles Collection",
      subtitle: "Traditional and modern bangles for every style",
      link: "/store?sub=69306e52ca452e54325b5c5f"
    },
  ];



  const [index, setIndex] = useState(0);



  // AUTOPLAY
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promoCards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = promoCards[index];

  return (

    <div className="promo-wrapper container-fluid px-3 px-md-4">

      {/* MOBILE SLIDER (< 768px) */}
      <div className="promo-card mt-1 fade-animation d-md-none">
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

      {/* DESKTOP GRID LAYOUT (>= 768px) */}
      <div className="d-none d-md-block py-4">
        {/* Row 1: 2 Cards */}
        <div className="row g-4 mb-4">
          {promoCards.slice(0, 2).map((card, i) => (
            <div className="col-md-6" key={i}>
              <Link to={card.link} className="text-decoration-none">
                <div className="desktop-promo-card large">
                  <div className="img-wrapper">
                    <img src={card.img} alt={card.title} className="img-fluid" />
                    <div className="overlay"></div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-subtitle">{card.subtitle}</p>
                    <span className="promo-link-btn">Explore Collection <i className="bi bi-arrow-right"></i></span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Row 2: 3 Cards */}
        <div className="row g-4">
          {promoCards.slice(2, 5).map((card, i) => (
            <div className="col-md-4" key={i}>
              <Link to={card.link} className="text-decoration-none">
                <div className="desktop-promo-card small">
                  <div className="img-wrapper">
                    <img src={card.img} alt={card.title} className="img-fluid" />
                    <div className="overlay"></div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title fs-4">{card.title}</h3>
                    <span className="promo-link-btn mt-2">Shop Now</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
