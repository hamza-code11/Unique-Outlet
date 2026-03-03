import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import wavesBg from "../../assets/home/footer.jfif"; // fallback image
import { FiMapPin, FiPhone, FiMail, FiSend, FiHeart, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

const Footer = () => {
    const footerRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Icon mapping for social platforms
    const socialIcons = {
        facebook: FiFacebook,
        twitter: FiTwitter,
        instagram: FiInstagram,
        youtube: FiYoutube
    };

    // Fetch footer data on mount
    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://127.0.0.1:8000/api/footer-setting");
                console.log("API Response:", response.data); // Debug log
                
                if (response.data) {
                    // Handle different response structures
                    let data;
                    
                    if (response.data.data) {
                        // If data is wrapped in data property
                        data = response.data.data;
                    } else {
                        // If response itself is the data
                        data = response.data;
                    }
                    
                    console.log("Extracted data:", data); // Debug log
                    setFooterData(data);
                }
            } catch (err) {
                console.error("Error fetching footer data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFooterData();
    }, []);

    // Check for dark mode class on html element
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, [footerData]);

    // Default data in case API fails or while loading
    const defaultData = {
        brand_name: "Wapo",
        description: "Reinventing the way of creating websites, we aim to create the most masterpiece WordPress theme available on the market.",
        location: "202 Helga Springs Rd, Crawford, TN 38554",
        contact: "800.275.8777",
        gmail: "alex@company.com",
        newsletter_desc: "Sign up with your email address to receive news and updates.",
        wavesImage: wavesBg,
        active: true
    };

    // Use API data if available, otherwise use default
    const data = footerData || defaultData;
    
    console.log("Final data being used:", data); // Debug log

    // If footer is not active, don't render
    if (data.active === false) {
        console.log("Footer is inactive, not rendering");
        return null;
    }

    // Show loading state
    if (loading) {
        return (
            <footer className={`relative overflow-hidden pt-20 pb-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </footer>
        );
    }

    return (
        <footer className={`relative overflow-hidden transition-colors duration-500 pt-20 pb-8 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
            {/* Smoke/Waves Background Image - Full Footer */}
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 transition-colors duration-500 ${
                    isDarkMode ? 'bg-gray-900/60' : 'bg-white/60'
                }`}></div>
                <img 
                    src={data.wavesImage || wavesBg} 
                    alt="Smoke Effect" 
                    className={`w-full h-full object-cover transition-all duration-500 ${
                        isDarkMode 
                            ? 'opacity-30 md:opacity-40 mix-blend-screen' 
                            : 'opacity-20 md:opacity-30 mix-blend-multiply'
                    }`}
                    style={{ 
                        filter: isDarkMode ? 'brightness(1.2) contrast(1.1)' : 'brightness(1.1) contrast(1.05)',
                    }}
                    onError={(e) => {
                        e.target.src = wavesBg; // Fallback to default if image fails to load
                    }}
                />
            </div>
            
            {/* Gradient overlays */}
            <div className={`absolute inset-0 z-0 transition-colors duration-500 ${
                isDarkMode 
                    ? 'bg-gradient-to-tr from-gray-900/80 via-gray-800/60 to-transparent' 
                    : 'bg-gradient-to-tr from-white/80 via-gray-50/60 to-transparent'
            }`}></div>
            
            <div className={`absolute inset-0 mix-blend-overlay z-0 transition-colors duration-500 ${
                isDarkMode 
                    ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20' 
                    : 'bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-cyan-100/20'
            }`}></div>

            <div className={`absolute top-0 right-0 w-3/4 h-3/4 rounded-full blur-3xl z-0 transition-colors duration-500 ${
                isDarkMode 
                    ? 'bg-gradient-to-bl from-blue-900/30 via-blue-800/10 to-transparent' 
                    : 'bg-gradient-to-bl from-blue-100/30 via-blue-50/20 to-transparent'
            }`}></div>
            
            <div className={`absolute bottom-0 left-0 w-3/4 h-3/4 rounded-full blur-3xl z-0 transition-colors duration-500 ${
                isDarkMode 
                    ? 'bg-gradient-to-tr from-cyan-900/30 via-transparent to-transparent' 
                    : 'bg-gradient-to-tr from-cyan-100/30 via-transparent to-transparent'
            }`}></div>
            
            <div className={`absolute inset-0 z-0 transition-colors duration-500 ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
            }`}></div>

            <div ref={footerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0">

                {/* Main Footer Content */}
                <div className="grid md:grid-cols-3 gap-10 lg:gap-12">

                    {/* Brand Column - Using brand_name and description */}
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {data.brand_name || "Wapo"}
                            </span>
                        </h3>
                        <p className={`leading-relaxed text-sm transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            {data.description || defaultData.description}
                        </p>
                    </div>

                    {/* Contact Column - Using location, contact, gmail */}
                    <div className="space-y-4">
                        <h4 className={`text-lg font-semibold relative inline-block transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                            Contact Us
                            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                        </h4>

                        <div className="space-y-3">
                            {/* Location */}
                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border backdrop-blur-sm transition-colors duration-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-800 border-gray-700' 
                                        : 'bg-gray-100 border-gray-200'
                                }`}>
                                    <FiMapPin className={`text-sm ${
                                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                </div>
                                <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    {data.location || defaultData.location}
                                </p>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border backdrop-blur-sm transition-colors duration-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-800 border-gray-700' 
                                        : 'bg-gray-100 border-gray-200'
                                }`}>
                                    <FiPhone className={`text-sm ${
                                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                </div>
                                <p className={`text-sm transition-colors duration-500 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Call Us: <span className={`font-semibold transition-colors duration-500 ${
                                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                    }`}>{data.contact || defaultData.contact}</span>
                                </p>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border backdrop-blur-sm transition-colors duration-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-800 border-gray-700' 
                                        : 'bg-gray-100 border-gray-200'
                                }`}>
                                    <FiMail className={`text-sm ${
                                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                </div>
                                <p className={`text-sm transition-colors duration-500 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>{data.gmail || defaultData.gmail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Column - Using newsletter_desc */}
                    <div className="space-y-4">
                        <h4 className={`text-lg font-semibold relative inline-block transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                            Newsletter
                            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                        </h4>

                        <p className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            {data.newsletter_desc || "Sign up with your email address to receive news and updates."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Your e-mail address"
                                className={`w-full px-4 py-3 rounded-l-full border text-sm transition-colors duration-500
                                         focus:outline-none focus:border-blue-500 ${
                                           isDarkMode 
                                             ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-500' 
                                             : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                                         }`}
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-r-full hover:from-blue-700 hover:to-cyan-700 transition duration-300 whitespace-nowrap flex items-center justify-center gap-2 group">
                                <span>Subscribe</span>
                                <FiSend className="group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Trust badge */}
                        <div className="flex items-center gap-2 pt-2">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full 
                               rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                            </span>
                            <span className={`text-xs transition-colors duration-500 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>No spam, unsubscribe anytime</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`border-t mt-16 pt-8 transition-colors duration-500 ${
                    isDarkMode ? 'border-gray-800' : 'border-gray-200'
                }`}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                            Copyright ©2026 {data.brand_name || "Wapo"}. All rights reserved.
                        </p>

                        {/* Footer Links */}
                        <div className="flex items-center gap-6">
                            <a href="#" className={`text-sm transition-colors duration-300 ${
                                isDarkMode 
                                    ? 'text-gray-500 hover:text-blue-400' 
                                    : 'text-gray-500 hover:text-blue-600'
                            }`}>
                                Privacy Policy
                            </a>
                            <a href="#" className={`text-sm transition-colors duration-300 ${
                                isDarkMode 
                                    ? 'text-gray-500 hover:text-blue-400' 
                                    : 'text-gray-500 hover:text-blue-600'
                            }`}>
                                Terms of Service
                            </a>
                            <a href="#" className={`text-sm transition-colors duration-300 ${
                                isDarkMode 
                                    ? 'text-gray-500 hover:text-blue-400' 
                                    : 'text-gray-500 hover:text-blue-600'
                            }`}>
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
        </footer>
    );
};

export default Footer;