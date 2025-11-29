import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import './Hero.css'

export default function Hero() {
  const lottieRef = useRef(null);

  useEffect(() => {
    const files = [
      "/images/hero/hero-2.json",
      "/images/hero/hero-2.json"
    ];

    const random = files[Math.floor(Math.random() * files.length)];

    customElements.whenDefined("lottie-player").then(() => {
      lottieRef.current?.load(random);
    });
  }, []);

  return (
    // <section id="hero" className="hero section">
    //   <div className="container mt-3 pt-5">
    //     <div className="row align-items-center justify-content-center">

    //       {/* Left Content */}
    //       <div className="col-lg-6 order-2 order-lg-1">
    //         <div className="hero-content">
    //           <h1 className="hero-title  text-dark">Exporting Quality Jewelry Worldwide</h1>
    //           <h5 style={{ fontSize: "15px", fontWeight: "200",lineHeight: "1.6"}}>We provide wholesale stainless steel jewelry with fast shipping across the globe.</h5>
    //         <div className="d-flex gap-3 mt-3 rounded-3 ">
    //           <Link to={'/store'} className="btn btn-pink px-4 py-2 shadow text-light">
    //             <i className="bi bi-shop me-2 text-light"></i> Store
    //           </Link>

    //           <a href="/contact-us" className="btn btn-outline-secondary px-4 py-2 text-pink rounded-3">
    //             <i className="bi bi-chat-dots me-2"></i> Contact
    //           </a>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Right Visual */}
    //     <div className="col-lg-6 order-1 order-lg-2" style={{ minHeight: "250px", }}   >
    //       <lottie-player
    //         ref={lottieRef}
    //         background="transparent"
    //         speed="1"
    //         loop
    //         autoplay
    //         style={{ width: "100%", height: "250px" }}
    //       />
    //     </div>

    //   </div>
    // </div>
    // </section >
    <section id="hero" className="hero mt-5 pt-5">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row align-items-center">


          <div
            className="col-lg-6 order-2 order-lg-1"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="hero-content">
              <h1 className="hero-title">Exporting Quality Jewelry Worldwide</h1>
              <p className="hero-description">
                We provide wholesale stainless steel jewelry with fast shipping across the globe.
              </p>

              <div className="hero-actions d-flex  flex-wrap ">

                <Link to={'/store'} className="btn btn-pink px-4  shadow text-light">
                  <i className="bi bi-shop me-2 text-light"></i> Store
                </Link>
                <a href="/contact-us" className="btn btn-outline-secondary px-4 text-pink rounded-3">
                  <i className="bi bi-chat-dots me-2"></i> Contact
                </a>


              </div>

              <div className="hero-stats d-none d-md-flex">
                <div className="stat-item">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>

                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>

                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            className="col-lg-6 order-1 order-lg-2"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <div className="hero-visual">
              <div className="hero-image-wrapper">

                
                  <lottie-player
                    ref={lottieRef}
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                    style={{ width: "100%", height: "250px" }}
                  />
                {/* <img
                  src="assets/img/illustration/illustration-15.webp"
                  className="img-fluid hero-image"
                  alt="Hero Illustration"
                /> */}

                <div className="floating-elements">
                  <div className="floating-card card-1">
                    <i className="bi bi-lightbulb"></i>
                    <span>Innovation</span>
                  </div>

                  <div className="floating-card card-2">
                    <i className="bi bi-award"></i>
                    <span>Excellence</span>
                  </div>

                  <div className="floating-card card-3">
                    <i className="bi bi-people"></i>
                    <span>Collaboration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
