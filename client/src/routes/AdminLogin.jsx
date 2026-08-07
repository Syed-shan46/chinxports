import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../config";
import { AdminContext } from "../context/AdminContext";

export default function AdminLogin() {
    const { loginAdmin } = useContext(AdminContext);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const res = await axios.post(
                `${BASE_URL}/api/admin`,
                { password },
                { withCredentials: true }
            );

            if (res.data.success) {
                loginAdmin();
                navigate("/upload-product");
            }
        } catch (err) {
            setError("Authentication failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-white">
            <div className="w-full max-w-[440px] animate-fade-in">
                {/* Header Section */}
                <div className="text-center mb-12 space-y-3">
                    <span className="text-[11px] font-bold tracking-[0.4em] text-primary-gold uppercase block">
                        Secure Access
                    </span>
                    <h1 className="font-display text-4xl lg:text-5xl text-deep-black font-medium">
                        Admin <span className="italic font-normal">Portal</span>
                    </h1>
                    <p className="text-warm-gray text-sm italic opacity-60">
                        Enter your credentials to manage the curated catalog
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-off-white/40 backdrop-blur-sm border border-black/[0.03] p-8 lg:p-12 rounded-sm shadow-2xl shadow-black/[0.02]">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-widest text-charcoal/60 uppercase ml-1">
                                Admin Password
                            </label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    className="w-full bg-white border border-black/5 focus:border-primary-gold/50 focus:ring-4 focus:ring-primary-gold/5 outline-none rounded-sm py-4 px-6 font-body text-sm transition-all duration-500 placeholder:text-charcoal/20"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoFocus
                                />
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-charcoal/20 group-focus-within:text-primary-gold transition-colors">
                                    <i className="bi bi-shield-lock-fill text-lg"></i>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-sm text-xs font-semibold flex items-center gap-3 animate-shake">
                                <i className="bi bi-exclamation-circle-fill"></i>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 px-8 rounded-sm text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-3 shadow-xl ${
                                loading 
                                ? "bg-charcoal/10 text-charcoal/40 cursor-wait" 
                                : "bg-deep-black text-white hover:bg-primary-gold hover:-translate-y-1 active:scale-95 shadow-black/10"
                            }`}
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Authorize Access</span>
                                    <i className="bi bi-arrow-right text-lg"></i>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Hint */}
                    <div className="mt-10 pt-8 border-t border-black/[0.03] text-center">
                        <Link 
                            to="/" 
                            className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest hover:text-primary-gold transition-colors flex items-center justify-center gap-2"
                        >
                            <i className="bi bi-house"></i>
                            Return to Homepage
                        </Link>
                    </div>
                </div>

                {/* Bottom Trust Signal */}
                <p className="mt-8 text-center text-[10px] text-warm-gray tracking-tight opacity-40">
                    Encrypted session • System access logged
                </p>
            </div>
        </main>
    );
}
