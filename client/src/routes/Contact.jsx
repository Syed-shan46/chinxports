import { Link } from "react-router-dom";

export default function Contact() {
  const contactMethods = [
    {
      icon: "bi-whatsapp",
      title: "WhatsApp",
      description: "Direct chat with our sourcing experts",
      action: "Chat Now",
      link: "https://wa.me/919747758555",
      color: "text-green-500"
    },
    {
      icon: "bi-telephone",
      title: "Direct Call",
      description: "Immediate assistance for urgent orders",
      action: "Call Now",
      link: "tel:+8615669528151",
      color: "text-charcoal"
    },
    {
      icon: "bi-envelope",
      title: "Email Inquiry",
      description: "Detailed quotes and partnership proposals",
      action: "Send Email",
      link: "mailto:chinaxports012@gmail.com",
      color: "text-primary-gold"
    }
  ];

  return (
    <main className="bg-white min-h-[80vh] flex flex-col justify-center">
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            {/* Header */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold tracking-[0.4em] text-primary-gold uppercase">Contact Us</span>
              <h1 className="font-display text-4xl lg:text-7xl text-deep-black tracking-tight">
                Let's Build Your <br />
                <span className="italic font-normal">Global Supply Chain.</span>
              </h1>
              <p className="font-body text-charcoal/60 text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
                Connect with our dedicated team to discuss sourcing, logistics, or wholesale partnerships.
                We are available 24/7 to bridge your path to excellence.
              </p>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, i) => (
                <a
                  key={i}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-10 border border-black/5 bg-off-white hover:bg-white hover:shadow-2xl hover:border-primary-gold/20 transition-all duration-700 rounded-sm text-center space-y-6"
                >
                  <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-sm mx-auto group-hover:scale-110 transition-transform duration-500`}>
                    <i className={`bi ${method.icon} text-3xl ${method.color}`}></i>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-deep-black">{method.title}</h3>
                    <p className="text-[11px] text-charcoal/40 font-body leading-relaxed max-w-[150px] mx-auto italic">
                      {method.description}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-primary-gold">{method.action}</span>
                    <i className="bi bi-arrow-right text-xs text-primary-gold transition-transform group-hover:translate-x-1"></i>
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="pt-12 flex flex-col items-center gap-6">
              <div className="w-12 h-[1px] bg-black/10"></div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-black/30">
                Operating directly from the heart of global manufacturing
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
