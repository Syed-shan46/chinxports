import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
 const banners = [
  {
    img: "/images/banners/banner9.webp",
    title: "Premium Anti-Tarnish Jewelry",
    subtitle: "Long-lasting shine • Moisture resistant",
    link: '/store'
  },
  {
    img: "/images/banners/banner7.webp",
    title: "Anti-Tarnish Wholesale Collection",
    subtitle: "MOQ from 6 pieces • Superior plating ",
    link: '/store'

  },
  {
    img: "/images/banners/banner8.webp",
    title: "Top Selling Anti-Tarnish Designs",
    subtitle: "Durable finish • Trend-ready ",
    link: '/store'
  }
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
      // Swipe Left → Next slide
      setIndex((prev) => (prev + 1) % banners.length);
    }

    if (distance < -50) {
      // Swipe Right → Previous slide
      setIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  // Auto Slide (3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-wrapper mt-4 pt-4">

      <div
        className="hero-slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((b, i) => (
          <div
            key={i}
            className={`hero-slide ${i === index ? "active" : ""}`}
          >
            <img src={b.img} alt="" className="hero-img" />
            <div className="hero-text">
              <h1>{b.title}</h1>
              <p>{b.subtitle}</p>
              <Link to={b.link} className="promo-btn">
              Shop Now
            </Link>
            </div>
          </div>
        ))}

        {/* DOTS */}
        <div className="hero-dots">
          {banners.map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </div>

    </div>
  );
}
