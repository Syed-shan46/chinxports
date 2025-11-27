import React from "react";

export default function About() {
  return (
    <>
      <section className="about-section mt-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left side: Image */}
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <img
                src="/images/web/transport-logistics-img.jpg"
                alt="About Us"
                className="img-fluid rounded shadow"
              />
            </div>

            {/* Right side: Content */}
            <div className="col-lg-6" data-aos="fade-left">
              <h2 className="mb-3">About Us</h2>

              <p>
                At ChinaXports, we specialize in sourcing high-quality products
                directly from China and delivering them to customers across the
                globe with a seamless door-to-door service. Our mission is to
                simplify international trade by providing reliable, transparent,
                and cost-effective solutions for businesses and individuals.
              </p>

              <p>
                With strong networks and partnerships across China, we ensure
                that every product is carefully sourced, inspected, and shipped
                with the highest standards of quality control. From small
                packages to bulk consignments, our dedicated team handles every
                step of the process—including product sourcing, consolidation,
                customs clearance, and last-mile delivery—so our clients can
                focus on growing their business while we take care of the
                logistics.
              </p>

              <p>
                Whether you are a business owner looking for trusted suppliers
                or an individual needing direct delivery from China, we provide
                personalized solutions tailored to your needs. With our
                experience, efficiency, and commitment, we guarantee
                hassle-free global sourcing and shipping—right from China to
                your doorstep.
              </p>

              <p>Your products. Our responsibility. Delivered worldwide.</p>

              <h4 className="mt-4">Why Choose Us?</h4>

              <ul className="list-unstyled">
                <li>✅ Competitive wholesale prices</li>
                <li>✅ Worldwide shipping with fast turnaround</li>
                <li>✅ Wide product categories & sourcing expertise</li>
                <li>✅ Reliable, long-term business partnerships</li>
                <li>✅ Dedicated customer support</li>
              </ul>

              <a
                href="https://wa.me/8615669528151"
                className="btn btn-dark btn-lg mt-3"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (Optional) */}
      {/*
      <section className="cta-section py-5 text-center text-white" style={{ background: "#111" }}>
        <div className="container" data-aos="fade-up">
          <h2 className="mb-3">Partner With Us Today</h2>
          <p className="lead mb-4">
            Grow your business with reliable sourcing and global exports at unbeatable prices.
          </p>
          <a href="/contact" className="btn btn-outline-light btn-lg">
            Start Your Journey
          </a>
        </div>
      </section>
      */}
    </>
  );
}
