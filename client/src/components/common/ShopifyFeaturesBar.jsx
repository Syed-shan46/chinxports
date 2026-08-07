export default function ShopifyFeaturesBar() {
    const features = [
        {
            icon: "bi-globe",
            title: "Global Wholesale",
            description: "Importing excellence worldwide"
        },
        {
            icon: "bi-patch-check",
            title: "Certified Quality",
            description: "Premium materials & craft"
        },
        {
            icon: "bi-lightning-charge",
            title: "Express Logistics",
            description: "Fast door-to-door delivery"
        },
        {
            icon: "bi-shield-lock",
            title: "Secure Network",
            description: "Verified supplier protection"
        }
    ];

    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-black/5">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-4 lg:px-8 group"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-off-white text-charcoal group-hover:bg-primary-gold group-hover:text-white transition-all duration-500">
                                <i className={`bi ${feature.icon} text-xl`}></i>
                            </div>
                            <div className="text-center lg:text-left space-y-1">
                                <h4 className="text-[11px] lg:text-[13px] font-bold tracking-widest uppercase text-deep-black">
                                    {feature.title}
                                </h4>
                                <p className="text-[10px] lg:text-[11px] font-body text-charcoal/60 lowercase italic tracking-wide">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
