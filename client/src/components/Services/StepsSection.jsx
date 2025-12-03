import './StepsSection.css'

export default function StepsSection() {
    return (
        <section id="steps" className="steps section mt-3">
            {/* Section Title */}


            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="steps-5">
                    <div className="process-container">
                        {/* Step 1 */}
                        <div className="process-item" data-aos="fade-up" data-aos-delay="200">
                            <div className="content">
                                <span className="step-number">01</span>
                                <div className="card-body">
                                    <div className="step-icon">
                                        <i className="bi bi-pencil-square"></i>
                                    </div>
                                    <div className="step-content">
                                        <h3>Product Sourcing</h3>
                                        <p>
                                            Sourcing high-quality products directly from trusted manufacturers and suppliers in China and beyond.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="process-item" data-aos="fade-up" data-aos-delay="300">
                            <div className="content">
                                <span className="step-number">02</span>
                                <div className="card-body">
                                    <div className="step-icon">
                                        <i className="bi bi-gear"></i>
                                    </div>
                                    <div className="step-content">
                                        <h3>Quality Inspection</h3>
                                        <p>
                                            Thorough inspections to ensure products meet industry standards and your specifications before shipment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="process-item" data-aos="fade-up" data-aos-delay="400">
                            <div className="content">
                                <span className="step-number">03</span>
                                <div className="card-body">
                                    <div className="step-icon">
                                        <i className="bi bi-search"></i>
                                    </div>
                                    <div className="step-content">
                                        <h3>Logistics & Shipping</h3>
                                        <p>
                                            Reliable freight forwarding, customs clearance, and door-to-door delivery tailored to your timeline.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="process-item" data-aos="fade-up" data-aos-delay="500">
                            <div className="content">
                                <span className="step-number">04</span>
                                <div className="card-body">
                                    <div className="step-icon">
                                        <i className="bi bi-rocket-takeoff"></i>
                                    </div>
                                    <div className="step-content">
                                        <h3>Supply Chain Management</h3>
                                        <p>
                                            Optimizing your entire supply chain to reduce costs, improve efficiency, and ensure consistent product availability.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="process-item" data-aos="fade-up" data-aos-delay="500">
                            <div className="content">
                                <span className="step-number">05</span>
                                <div className="card-body">
                                    <div className="step-icon">
                                        <i className="bi bi-rocket-takeoff"></i>
                                    </div>
                                    <div className="step-content">
                                        <h3>Customs Documentation</h3>
                                        <p>
                                            Handling all import paperwork and compliance to streamline customs procedures and avoid delays.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="process-item" data-aos="fade-up" data-aos-delay="500">
                            <div className="content">
                                <span className="step-number">06</span>
                                <div className="card-body">
                                    <div className="step-icon">
                                        <i className="bi bi-rocket-takeoff"></i>
                                    </div>
                                    <div className="step-content">
                                        <h3>After-Sales Support</h3>
                                        <p>
                                            Dedicated support to address post-delivery issues, warranties, or reorders, ensuring customer satisfaction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Process Items */}
                    </div>
                </div>
            </div>
        </section>
    );
}

