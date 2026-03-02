import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShield, FiZap, FiUsers, FiSmile, FiArrowRight, FiAward, FiHeart, FiStar } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";
import aboutImg from "../../assets/home/9w45ht.png";
import wavesBg from "../../assets/home/download.jfif";

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "Founder & CEO",
    image: "https://via.placeholder.com/150",
    bio: "10+ years in vaping industry",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Product Manager",
    image: "https://via.placeholder.com/150",
    bio: "Expert in product quality",
  },
  {
    id: 3,
    name: "Mike Williams",
    role: "Customer Support",
    image: "https://via.placeholder.com/150",
    bio: "Always here to help",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Marketing Head",
    image: "https://via.placeholder.com/150",
    bio: "Bringing best deals to you",
  },
];

// Milestones data
const milestones = [
  { year: "2015", title: "Company Founded", description: "Started with a small team of 5" },
  { year: "2017", title: "First Store", description: "Opened first physical store" },
  { year: "2019", title: "Online Launch", description: "Launched e-commerce platform" },
  { year: "2021", title: "10K+ Customers", description: "Reached 10,000 happy customers" },
  { year: "2023", title: "Global Shipping", description: "Started shipping worldwide" },
];

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("story");

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for animations
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

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />

      <ShopBanner 
        title="About Us"
        breadcrumbItems={[
          { name: "WAPO", link: "/" },
          { name: "ABOUT" }
        ]}
        showStats={false}
        showButton={false}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 flex-grow">

        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 animate-on-scroll opacity-0">
          {/* Left Image */}
          <div className="relative">
            {/* Background glow */}
            <div className={`absolute inset-0 rounded-full blur-3xl transition-colors duration-500 ${
              isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100/50'
            }`}></div>
            
            {/* Main Image - Removed border */}
            <div className="relative">
              <img
                src={aboutImg}
                alt="About WAPO"
                className="w-full h-auto object-contain p-8"
              />
            </div>

            {/* Floating Badge */}
            <div className={`absolute -bottom-4 -right-4 px-6 py-3 rounded-full shadow-xl ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center gap-2">
                <FiAward className="text-2xl text-blue-600" />
                <div>
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    10+ Years
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    of Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900/50 to-cyan-800/30 border border-blue-700/50' 
                : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className={`text-xs font-medium tracking-wide ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                OUR STORY
              </span>
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Passionate About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Quality & Innovation
              </span>
            </h2>

            <div className={`space-y-4 mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>
                Founded in 2015, WAPO has grown from a small local shop to a trusted name in the vaping industry. 
                We started with a simple mission: to provide high-quality vaping products that are safe, reliable, and affordable.
              </p>
              <p>
                Today, we serve thousands of customers worldwide, offering a carefully curated selection of devices, 
                e-liquids, and accessories from the best brands in the industry. Our team of experts tests every product 
                to ensure it meets our strict quality standards.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-2xl font-bold text-blue-600">10+</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Years</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">50k+</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">500+</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">24/7</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12 animate-on-scroll opacity-0">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Core Values
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              What makes us different
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-xl border text-center ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <FiShield className="text-xl text-white" />
              </div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quality First
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Every product is tested for safety and performance
              </p>
            </div>

            <div className={`p-6 rounded-xl border text-center ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <FiHeart className="text-xl text-white" />
              </div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Customer Care
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Your satisfaction is our top priority
              </p>
            </div>

            <div className={`p-6 rounded-xl border text-center ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <FiZap className="text-xl text-white" />
              </div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Innovation
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Always bringing you the latest technology
              </p>
            </div>

            <div className={`p-6 rounded-xl border text-center ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <FiUsers className="text-xl text-white" />
              </div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Community
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Building a community of passionate vapers
              </p>
            </div>
          </div>
        </div>

      </div>

      <Footer />

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

        .animate-on-scroll {
          transition: all 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;