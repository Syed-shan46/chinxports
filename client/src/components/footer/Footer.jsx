import React from 'react';
import { Link } from "react-router-dom";
import { 
  Crown, ShieldCheck, Globe, Plane, 
  MessageSquare, Mail, Clock, ArrowRight 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] text-white pt-28 pb-12 overflow-hidden relative selection:bg-[#C6A769] selection:text-black">
      
      {/* Cinematic Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C6A769]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C6A769]/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Pre-Footer Certification Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-20 border-b border-white/5">
          {[
            { icon: <ShieldCheck size={24} />, title: "18K Certified PVD", text: "Export-Grade Standards" },
            { icon: <Globe size={24} />, title: "Worldwide Freight", text: "B2B Door-to-Door Air Cargo" },
            { icon: <Crown size={24} />, title: "Factory Direct Pipeline", text: "Optimized Distribution Scale" },
            { icon: <Clock size={24} />, title: "< 30 Min Support Desk", text: "Active Trade Concierge" },
          ].map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 group">
              <div className="text-[#C6A769] p-3 bg-[#C6A769]/5 border border-[#C6A769]/10 rounded-xl group-hover:scale-105 transition-transform duration-500">
                {badge.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white tracking-wider uppercase">{badge.title}</h4>
                <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">{badge.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Links Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 py-24 text-center md:text-left">
          
          {/* Brand Ethos Column */}
          <div className="lg:col-span-2 space-y-8 flex flex-col items-center md:items-start">
            <div className="space-y-3">
              <Link to="/" className="inline-block group">
                <span className="font-display text-2xl tracking-[0.4em] uppercase font-extrabold text-white group-hover:text-[#C6A769] transition-colors duration-500">
                  CHINAXPORTS
                </span>
              </Link>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="h-[0.5px] w-8 bg-[#C6A769]/50" />
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#D6BE8A]">Global Sourcing Authority</span>
              </div>
            </div>
            <p className="text-white/40 text-[13px] leading-relaxed max-w-xs font-light italic">
              "Simplifying enterprise logistics and direct-from-source premium manufacturing pipelines to scale international jewelry portfolios globally."
            </p>
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: "bi-whatsapp", link: "https://wa.me/919747758555" },
                { icon: "bi-instagram", link: "#" },
                { icon: "bi-facebook", link: "#" },
                { icon: "bi-linkedin", link: "#" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.02] text-white/40 hover:text-[#C6A769] hover:border-[#C6A769]/30 transition-all duration-500 transform hover:-translate-y-0.5 shadow-lg"
                >
                  <i className={`bi ${social.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Wholesale Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#C6A769] border-b border-white/5 pb-3 inline-block md:block w-auto md:w-full">Wholesale Suite</h4>
            <ul className="space-y-4">
              {[
                { l: "Enterprise Store", p: "/store" },
                { l: "B2B Solutions", p: "/services" },
                { l: "Request Partnership", p: "/partner" },
                { l: "Bulk Catalog", p: "/store" },
                { l: "Line Sheets", p: "/store" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.p}
                    className="text-white/40 text-xs font-medium tracking-wide hover:text-white transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.l}
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#C6A769]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logistics Desk */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#C6A769] border-b border-white/5 pb-3 inline-block md:block w-auto md:w-full">Logistics Desk</h4>
            <ul className="space-y-4">
              {[
                { l: "Global Shipping", p: "/shipping" },
                { l: "Customs Support", p: "/shipping" },
                { l: "Lead Times", p: "/services" },
                { l: "Factory Origin", p: "/about" },
                { l: "Supply Chain", p: "/about" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.p}
                    className="text-white/40 text-xs font-medium tracking-wide hover:text-white transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.l}
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#C6A769]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#C6A769] border-b border-white/5 pb-3 inline-block md:block w-auto md:w-full">Connect Desk</h4>
            <ul className="space-y-5">
              <li>
                <a href="tel:+8615669528151" className="group flex flex-col items-center md:items-start gap-1">
                  <span className="text-[9px] uppercase font-bold text-white/30 tracking-widest">Main Hub Line</span>
                  <span className="text-xs font-bold text-white/70 group-hover:text-[#C6A769] transition-colors">+86 156 6952 8151</span>
                </a>
              </li>
              <li>
                <a href="mailto:chinaxports012@gmail.com" className="group flex flex-col items-center md:items-start gap-1">
                  <span className="text-[9px] uppercase font-bold text-white/30 tracking-widest">Inquiry Email</span>
                  <span className="text-xs font-bold text-white/70 group-hover:text-[#C6A769] transition-colors">chinaxports012@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 shadow-inner">
                  <p className="text-[9px] uppercase tracking-widest text-[#C6A769] font-bold mb-1 flex items-center justify-center md:justify-start gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    Desk Active
                  </p>
                  <p className="text-[10px] text-white/30 font-medium leading-relaxed tracking-wide">Global operations active 24/7 for verified partner channels.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Elegant Fine Print Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-[10px] text-white/30 font-medium tracking-[0.15em] uppercase">
            © {new Date().getFullYear()} <span className="text-white/50 font-bold">CHINAXPORTS GLOBAL</span>. All Sovereign Rights Reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">
            <Link to="#" className="hover:text-white transition-colors">Vault Privacy</Link>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <Link to="#" className="hover:text-white transition-colors">Trade Terms</Link>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <Link to="/admin-login" className="hover:text-[#C6A769] transition-colors font-extrabold border border-white/5 px-3 py-1 rounded-md bg-white/[0.01]">Secure Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
