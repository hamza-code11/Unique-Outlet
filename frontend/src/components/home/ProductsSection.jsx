// import React, { useState, useEffect, useRef } from "react";
// import p1 from "../assets/home/p1.jpg";
// import p2 from "../assets/home/p2.jpg";
// import p3 from "../assets/home/p3.jpg";
// import p4 from "../assets/home/p4.jpg";
// import p5 from "../assets/home/p5.webp";
// import p6 from "../assets/home/p6.jpg";
// import p7 from "../assets/home/p7.webp";
// import p8 from "../assets/home/p8.webp";
// import { FiShoppingBag, FiStar, FiArrowRight, FiClock, FiTrendingUp, FiHeart } from "react-icons/fi";

// const products = [
//   {
//     image: p1,
//     name: "Mr. Vapo E-liquid 30ml",
//     price: "$4.50",
//     rating: 4,
//     isNew: true,
//     featured: false,
//   },
//   {
//     image: p2,
//     name: "Starter Kit 1",
//     price: "$54.00",
//     rating: 5,
//     isNew: false,
//     featured: true,
//   },
//   {
//     image: p3,
//     name: "Mr. Vapo Pod Kit",
//     price: "$267.00",
//     rating: 4,
//     isNew: true,
//     featured: false,
//   },
//   {
//     image: p4,
//     name: "Starter Kit 2",
//     price: "$65.00",
//     rating: 4,
//     isNew: false,
//     featured: true,
//   },
//   {
//     image: p5,
//     name: "Mr. Vapo Smoking Device",
//     price: "$65.00",
//     rating: 5,
//     isNew: false,
//     featured: false,
//   },
//   {
//     image: p6,
//     name: "Disposable e-cigarette",
//     price: "$450.00",
//     rating: 3,
//     isNew: true,
//     featured: false,
//   },
//   {
//     image: p7,
//     name: "Vape Pen Starter Kit",
//     price: "$89.00",
//     rating: 4,
//     isNew: false,
//     featured: true,
//   },
//   {
//     image: p8,
//     name: "Premium E-liquid Set",
//     price: "$120.00",
//     rating: 5,
//     isNew: true,
//     featured: false,
//   },
// ];

// const ProductsSection = () => {
//   const [activeFilter, setActiveFilter] = useState("latest");
//   const sectionRef = useRef(null);

//   const filters = [
//     { id: "latest", label: "Latest Items", icon: FiClock },
//     { id: "rating", label: "Top Rating", icon: FiStar },
//     { id: "featured", label: "Featured", icon: FiTrendingUp },
//   ];

//   const getFilteredProducts = () => {
//     switch (activeFilter) {
//       case "latest":
//         return products.filter(p => p.isNew);
//       case "rating":
//         return [...products].sort((a, b) => b.rating - a.rating);
//       case "featured":
//         return products.filter(p => p.featured);
//       default:
//         return products;
//     }
//   };

//   const filteredProducts = getFilteredProducts();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('animate-fade-in-up');
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="relative overflow-hidden bg-[#0a0a0f] py-20 md:py-24">
//       {/* Gradient backgrounds - dark theme with blue tones */}
//       <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-cyan-900/30 via-transparent to-transparent rounded-full blur-3xl"></div>
      
//       {/* Dark overlay for depth */}
//       <div className="absolute inset-0 bg-[#0a0a0f]/90"></div>
      
//       <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0">
        
//         {/* Header with Title and Filters */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
//           {/* Left side - Title in one line */}
//           <div>
//             {/* Dynamic Heading - Now in one line */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//               <span className="text-white">
//                 {activeFilter === "latest" && "Latest Arrivals"}
//                 {activeFilter === "rating" && "Top Rated"}
//                 {activeFilter === "featured" && "Featured"}
//               </span>{' '}
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 Products
//               </span>
//             </h2>
//           </div>

//           {/* Right side - Filter Buttons with transparent background and separators */}
//           <div className="flex items-center gap-1">
//             {filters.map((filter, index) => {
//               const Icon = filter.icon;
//               return (
//                 <React.Fragment key={filter.id}>
//                   <button
//                     onClick={() => setActiveFilter(filter.id)}
//                     className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300
//                       ${activeFilter === filter.id 
//                         ? 'text-blue-400' 
//                         : 'text-gray-400 hover:text-blue-400'
//                       }`}
//                   >
//                     <Icon className="text-base" />
//                     <span>{filter.label}</span>
//                   </button>
//                   {index < filters.length - 1 && (
//                     <span className="text-gray-700 text-lg mx-1">|</span>
//                   )}
//                 </React.Fragment>
//               );
//             })}
//           </div>
//         </div>

//         {/* Products Grid - 4 cards per row */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredProducts.slice(0, 8).map((product, index) => (
//             <div
//               key={index}
//               className="group bg-[#14141f] rounded-xl border border-gray-800 p-4
//                        hover:shadow-lg hover:shadow-blue-900/20 hover:border-blue-800/50 
//                        transition-all duration-300 relative"
//             >
//               {/* Sale badge for demo */}
//               {product.isNew && (
//                 <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                               text-white text-xs font-bold px-2 py-1 rounded-full z-10">
//                   NEW
//                 </div>
//               )}
              
//               {product.featured && (
//                 <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 
//                               text-white text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center gap-1">
//                   <FiHeart className="text-xs" /> FEATURED
//                 </div>
//               )}

//               {/* Image Container */}
//               <div className="relative mb-4 flex justify-center">
//                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent 
//                               rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="relative w-28 h-28 object-contain group-hover:scale-105 transition-transform duration-500"
//                 />
//               </div>

//               {/* Product Info */}
//               <div className="text-center">
//                 <h4 className="font-semibold text-gray-200 mb-2 text-sm line-clamp-2 min-h-[40px]">
//                   {product.name}
//                 </h4>

//                 {/* Rating Stars */}
//                 <div className="flex items-center justify-center gap-0.5 mb-2">
//                   {[...Array(5)].map((_, i) => (
//                     <FiStar
//                       key={i}
//                       className={`text-xs ${
//                         i < product.rating 
//                           ? 'text-blue-400 fill-current' 
//                           : 'text-gray-700'
//                       }`}
//                     />
//                   ))}
//                   <span className="text-xs text-gray-500 ml-1">({product.rating}.0)</span>
//                 </div>

//                 {/* Price */}
//                 <p className="text-lg font-bold text-white mb-3">
//                   {product.price}
//                 </p>

//                 {/* Add to Cart Button - blue theme */}
//                 <button className="w-full px-3 py-2 border border-blue-700 text-blue-400 
//                                  font-medium rounded-lg text-sm
//                                  hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 
//                                  hover:text-white hover:border-blue-600
//                                  transition-all duration-300
//                                  flex items-center justify-center gap-2
//                                  group/btn">
//                   <FiShoppingBag className="text-sm group-hover/btn:text-white" />
//                   <span>Add to cart</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View All Link */}
//         <div className="text-center mt-12">
//           <a
//             href="#"
//             className="group inline-flex items-center gap-2 text-blue-400 font-semibold 
//                      hover:text-blue-300 transition-colors duration-300"
//           >
//             <span>View all products</span>
//             <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
//           </a>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ProductsSection;









import React, { useState, useEffect, useRef } from "react";
import p1 from "../../assets/home/p1.jpg";
import p2 from "../../assets/home/p2.jpg";
import p3 from "../../assets/home/p3.jpg";
import p4 from "../../assets/home/p4.jpg";
import p5 from "../../assets/home/p5.webp";
import p6 from "../../assets/home/p6.jpg";
import p7 from "../../assets/home/p7.webp";
import p8 from "../../assets/home/p8.webp";
import { FiShoppingBag, FiStar, FiArrowRight, FiClock, FiTrendingUp, FiHeart } from "react-icons/fi";

const products = [
  {
    image: p1,
    name: "Mr. Vapo E-liquid 30ml",
    price: "$4.50",
    rating: 4,
    isNew: true,
    featured: false,
  },
  {
    image: p2,
    name: "Starter Kit 1",
    price: "$54.00",
    rating: 5,
    isNew: false,
    featured: true,
  },
  {
    image: p3,
    name: "Mr. Vapo Pod Kit",
    price: "$267.00",
    rating: 4,
    isNew: true,
    featured: false,
  },
  {
    image: p4,
    name: "Starter Kit 2",
    price: "$65.00",
    rating: 4,
    isNew: false,
    featured: true,
  },
  {
    image: p5,
    name: "Mr. Vapo Smoking Device",
    price: "$65.00",
    rating: 5,
    isNew: false,
    featured: false,
  },
  {
    image: p6,
    name: "Disposable e-cigarette",
    price: "$450.00",
    rating: 3,
    isNew: true,
    featured: false,
  },
  {
    image: p7,
    name: "Vape Pen Starter Kit",
    price: "$89.00",
    rating: 4,
    isNew: false,
    featured: true,
  },
  {
    image: p8,
    name: "Premium E-liquid Set",
    price: "$120.00",
    rating: 5,
    isNew: true,
    featured: false,
  },
];

const ProductsSection = () => {
  const [activeFilter, setActiveFilter] = useState("latest");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRef = useRef(null);

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

  const filters = [
    { id: "latest", label: "Latest Items", icon: FiClock },
    { id: "rating", label: "Top Rating", icon: FiStar },
    { id: "featured", label: "Featured", icon: FiTrendingUp },
  ];

  const getFilteredProducts = () => {
    switch (activeFilter) {
      case "latest":
        return products.filter(p => p.isNew);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "featured":
        return products.filter(p => p.featured);
      default:
        return products;
    }
  };

  const filteredProducts = getFilteredProducts();

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
    <section className={`relative overflow-hidden py-20 md:py-24 transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Gradient backgrounds - dynamic */}
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
        
        {/* Header with Title and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          {/* Left side - Title in one line */}
          <div>
            {/* Dynamic Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                {activeFilter === "latest" && "Latest Arrivals"}
                {activeFilter === "rating" && "Top Rated"}
                {activeFilter === "featured" && "Featured"}
              </span>{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
          </div>

          {/* Right side - Filter Buttons */}
          <div className="flex items-center gap-1">
            {filters.map((filter, index) => {
              const Icon = filter.icon;
              return (
                <React.Fragment key={filter.id}>
                  <button
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300
                      ${activeFilter === filter.id 
                        ? 'text-blue-600' 
                        : isDarkMode 
                          ? 'text-gray-400 hover:text-blue-400' 
                          : 'text-gray-500 hover:text-blue-600'
                      }`}
                  >
                    <Icon className="text-base" />
                    <span>{filter.label}</span>
                  </button>
                  {index < filters.length - 1 && (
                    <span className={`text-lg mx-1 transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-700' : 'text-gray-300'
                    }`}>|</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Products Grid - 4 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product, index) => (
            <div
              key={index}
              className={`group rounded-xl p-4 transition-all duration-300 relative ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700 hover:shadow-lg hover:shadow-blue-900/30 hover:border-blue-700' 
                  : 'bg-white border border-gray-200 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300'
              }`}
            >
              {/* Sale badge for demo */}
              {product.isNew && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 
                              text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  NEW
                </div>
              )}
              
              {product.featured && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 
                              text-white text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center gap-1">
                  <FiHeart className="text-xs" /> FEATURED
                </div>
              )}

              {/* Image Container */}
              <div className="relative mb-4 flex justify-center">
                {/* Glow effect on hover - dynamic */}
                <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 ${
                                isDarkMode 
                                  ? 'bg-gradient-to-t from-blue-900/30 to-transparent' 
                                  : 'bg-gradient-to-t from-blue-100/50 to-transparent'
                              }`}></div>
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative w-28 h-28 object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h4 className={`font-semibold mb-2 text-sm line-clamp-2 min-h-[40px] transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {product.name}
                </h4>

                {/* Rating Stars */}
                <div className="flex items-center justify-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`text-xs ${
                        i < product.rating 
                          ? 'text-blue-500 fill-current' 
                          : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.rating}.0)</span>
                </div>

                {/* Price */}
                <p className={`text-lg font-bold mb-3 transition-colors duration-500 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.price}
                </p>

                {/* Add to Cart Button */}
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

        {/* View All Link */}
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
            <span>View all products</span>
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

export default ProductsSection;