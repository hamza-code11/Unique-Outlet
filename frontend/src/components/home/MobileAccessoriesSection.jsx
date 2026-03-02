// File name: MobileAccessoriesSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { FiShoppingBag, FiStar, FiArrowRight } from "react-icons/fi";

// Sample data for cards with imported images
import accessory1 from "../../assets/home/p1.jpg";
import accessory2 from "../../assets/home/p2.jpg";
import accessory3 from "../../assets/home/p3.jpg";
import accessory4 from "../../assets/home/p4.jpg";

const accessories = [
  { id: 1, name: "Wireless Earbuds", image: accessory1, price: "$49.99", rating: 4 },
  { id: 2, name: "Phone Case", image: accessory2, price: "$19.99", rating: 4 },
  { id: 3, name: "Charger", image: accessory3, price: "$29.99", rating: 5 },
  { id: 4, name: "Power Bank", image: accessory4, price: "$39.99", rating: 4 },
];

const MobileAccessoriesSection = () => {
  const sectionRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode class on html element
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDarkMode();

    // Observe changes to html class
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Background gradient effects - dynamic */}
      <div className={`absolute top-0 left-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent' 
          : 'bg-gradient-to-br from-blue-100/30 via-blue-50/20 to-transparent'
      }`}></div>
      
      <div className={`absolute bottom-0 right-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-tl from-cyan-900/30 via-transparent to-transparent' 
          : 'bg-gradient-to-tl from-cyan-100/30 via-transparent to-transparent'
      }`}></div>
      
      {/* Overlay for depth - dynamic */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
      }`}></div>

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0">
        {/* Section heading with theme styling */}
        <div className="text-center mb-12">
          {/* Heading with gradient */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              Mobile
            </span>{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Accessories
            </span>
          </h2>

          <p className={`text-sm sm:text-base mt-4 max-w-2xl mx-auto transition-colors duration-500 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Complete your setup with our premium mobile accessories. 
            Quality you can trust, style you'll love.
          </p>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {accessories.map((item) => (
            <div 
              key={item.id} 
              className={`group rounded-xl p-5 transition-all duration-300 relative ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700 hover:shadow-lg hover:shadow-blue-900/30 hover:border-blue-700' 
                  : 'bg-white border border-gray-200 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300'
              }`}
            >
              {/* Image container */}
              <div className="relative mb-4 flex justify-center">
                {/* Glow effect on hover - dynamic */}
                <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 ${
                                isDarkMode 
                                  ? 'bg-gradient-to-t from-blue-900/30 to-transparent' 
                                  : 'bg-gradient-to-t from-blue-100/50 to-transparent'
                              }`}></div>
                
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative w-32 h-32 object-contain group-hover:scale-105 
                           transition-transform duration-500"
                />
              </div>

              {/* Product info */}
              <div className="text-center">
                {/* Rating stars */}
                <div className="flex items-center justify-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`text-sm ${
                        i < item.rating 
                          ? 'text-blue-500 fill-current' 
                          : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <h3 className={`font-semibold text-base mb-2 transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {item.name}
                </h3>

                <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 
                           bg-clip-text text-transparent mb-3">
                  {item.price}
                </p>

                {/* Add to cart button */}
                <button className={`w-full px-3 py-2 border rounded-lg text-sm
                                 transition-all duration-300
                                 flex items-center justify-center gap-2
                                 group/btn ${
                                   isDarkMode 
                                     ? 'border-blue-600 text-blue-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-blue-600' 
                                     : 'border-blue-500 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-blue-600'
                                 }`}>
                  <FiShoppingBag className="text-sm group-hover/btn:text-white" />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <a
            href="#"
            className={`group inline-flex items-center gap-2 font-semibold 
                     transition-colors duration-300 ${
                       isDarkMode 
                         ? 'text-blue-400 hover:text-blue-300' 
                         : 'text-blue-600 hover:text-blue-700'
                     }`}
          >
            <span>View all accessories</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
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
    </section>
  );
};

export default MobileAccessoriesSection;