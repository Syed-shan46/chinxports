import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const banners = [
    {
      img: "/images/banners/banner6.png",
      title: "Premium Products Imported From China",
      subtitle: "Best Prices • Fast Shipping • Verified Suppliers"
    },
    {
      img: "/images/banners/banner7.png",
      title: "Shop Wholesale | Save More",
      subtitle: "MOQ from 6 pieces • Lowest Rates"
    },
    {
      img: "/images/banners/banner8.png",
      title: "Top Trending Items",
      subtitle: "Updated Daily from Chinese Markets"
    }
  ];

  const [index, setIndex] = useState(0);

  // Auto Slide (3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-wrapper mt-4 pt-4">

      {/* HERO SLIDER */}
      <div className="hero-slider">
        {banners.map((b, i) => (
          <div
            key={i}
            className={`hero-slide ${i === index ? "active" : ""}`}
          >
            <img src={b.img} alt="" className="hero-img" />
            <div className="hero-text">
              <h1>{b.title}</h1>
              <p>{b.subtitle}</p>
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
