// import React, { useEffect, useRef } from "react";
// import vape from "../assets/home/products-new.png";
// import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

// const PromoSection = () => {
//   const contentRef = useRef(null);

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

//     if (contentRef.current) {
//       observer.observe(contentRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="relative overflow-hidden bg-[#0a0a0f] py-12 md:py-16">
//       {/* Gradient backgrounds - dark theme with blue tones */}
//       <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-cyan-900/30 via-transparent to-transparent rounded-full blur-3xl"></div>
      
//       {/* Dark overlay for depth */}
//       <div className="absolute inset-0 bg-[#0a0a0f]/90"></div>
      
//       {/* Decorative elements */}
//       <div className="absolute top-20 right-20 w-32 h-32 border border-blue-700/20 rounded-full"></div>
//       <div className="absolute bottom-20 left-20 w-40 h-40 border border-cyan-700/20 rounded-full"></div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div ref={contentRef} className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center opacity-0">
          
//           {/* Left Image - Reduced height */}
//           <div className="flex justify-center md:justify-start order-1">
//             <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[380px]">
//               {/* Glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-t from-blue-700/30 
//                             via-cyan-600/20 to-transparent rounded-full blur-2xl"></div>
              
//               {/* Image with up-down animation */}
//               <img
//                 src={vape}
//                 alt="Starter Kit"
//                 className="relative w-full h-auto max-h-[260px] md:max-h-[300px] object-contain animate-up-down drop-shadow-2xl"
//               />

//               {/* Decorative Elements */}
//               <div className="absolute -top-3 -left-3 w-12 h-12 border border-blue-600/30 rounded-full"></div>
//               <div className="absolute -bottom-3 -right-3 w-16 h-16 border border-cyan-600/30 rounded-full"></div>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="order-2 space-y-6">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/50 to-cyan-800/30 
//                           border border-blue-700/50 px-4 py-2 rounded-full">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
//                                bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//               </span>
//               <span className="text-xs sm:text-sm font-medium text-blue-300 tracking-wide">
//                 LIMITED OFFER
//               </span>
//             </div>

//             {/* Heading - white with blue gradient emphasis */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//               <span className="text-white">Try our new starter kit</span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 now and get 10% off
//               </span>
//             </h2>

//             {/* Description */}
//             <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg">
//               Our vape shop is not only a variety of vaping products,
//               but also an operational support service that ensures
//               quality, reliability, and customer satisfaction.
//             </p>

//             {/* Features */}
//             <div className="flex flex-wrap gap-4 pt-2">
//               <div className="flex items-center gap-2">
//                 <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center">
//                   <span className="text-blue-400 text-xs">✓</span>
//                 </div>
//                 <span className="text-sm text-gray-300">Premium Quality</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center">
//                   <span className="text-cyan-400 text-xs">✓</span>
//                 </div>
//                 <span className="text-sm text-gray-300">Limited Time</span>
//               </div>
//             </div>

//             {/* Button */}
//             <div className="pt-4">
//               <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 
//                                text-white font-medium rounded-lg 
//                                hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 
//                                flex items-center justify-center gap-3
//                                shadow-lg shadow-blue-600/30">
//                 <FiShoppingBag className="text-lg" />
//                 <span>Go to shop</span>
//                 <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
//               </button>
//             </div>

//             {/* Trust indicator */}
//             <div className="flex items-center gap-4 pt-2">
//               <div className="flex -space-x-2">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} 
//                        className="w-7 h-7 rounded-full border-2 border-[#0a0a0f] 
//                                 bg-gradient-to-br from-blue-500 to-cyan-600
//                                 flex items-center justify-center text-white text-[10px]">
//                     {i === 1 && 'U'}
//                     {i === 2 && 'S'}
//                     {i === 3 && 'A'}
//                   </div>
//                 ))}
//               </div>
//               <span className="text-xs text-gray-400">Join 5k+ happy customers</span>
//             </div>
//           </div>
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

//         @keyframes upDown {
//           0% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-12px);
//           }
//           100% {
//             transform: translateY(0);
//           }
//         }
        
//         .animate-up-down {
//           animation: upDown 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default PromoSection;








import React, { useEffect, useRef, useState } from "react";
import vape from "../../assets/home/products-new.png";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

const PromoSection = () => {
  const contentRef = useRef(null);
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

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative overflow-hidden py-12 md:py-16 transition-colors duration-500 ${
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
      
      {/* Decorative elements - dynamic */}
      <div className={`absolute top-20 right-20 w-32 h-32 border rounded-full transition-colors duration-500 ${
        isDarkMode ? 'border-blue-500/20' : 'border-blue-200/50'
      }`}></div>
      
      <div className={`absolute bottom-20 left-20 w-40 h-40 border rounded-full transition-colors duration-500 ${
        isDarkMode ? 'border-cyan-500/20' : 'border-cyan-200/50'
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center opacity-0">
          
          {/* Left Image - Reduced height */}
          <div className="flex justify-center md:justify-start order-1">
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[380px]">
              {/* Glow effect - dynamic */}
              <div className={`absolute inset-0 rounded-full blur-2xl transition-colors duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-t from-blue-700/30 via-cyan-600/20 to-transparent' 
                  : 'bg-gradient-to-t from-blue-200/30 via-cyan-200/20 to-transparent'
              }`}></div>
              
              {/* Image with up-down animation */}
              <img
                src={vape}
                alt="Starter Kit"
                className="relative w-full h-auto max-h-[260px] md:max-h-[300px] object-contain animate-up-down drop-shadow-xl"
              />

              {/* Decorative Elements - dynamic */}
              <div className={`absolute -top-3 -left-3 w-12 h-12 border rounded-full transition-colors duration-500 ${
                isDarkMode ? 'border-blue-500/30' : 'border-blue-300/50'
              }`}></div>
              <div className={`absolute -bottom-3 -right-3 w-16 h-16 border rounded-full transition-colors duration-500 ${
                isDarkMode ? 'border-cyan-500/30' : 'border-cyan-300/50'
              }`}></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="order-2 space-y-6">
            {/* Badge - dynamic */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900/50 to-cyan-800/30 border border-blue-700/50' 
                : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
                               bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className={`text-xs sm:text-sm font-medium tracking-wide ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                LIMITED OFFER
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                Try our new starter kit
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                now and get 10% off
              </span>
            </h2>

            {/* Description */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-lg transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Our vape shop is not only a variety of vaping products,
              but also an operational support service that ensures
              quality, reliability, and customer satisfaction.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500 ${
                  isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>✓</span>
                </div>
                <span className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500 ${
                  isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-100'
                }`}>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
                  }`}>✓</span>
                </div>
                <span className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Limited Time</span>
              </div>
            </div>

            {/* Button */}
            <div className="pt-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 
                               text-white font-medium rounded-lg 
                               hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
                               flex items-center justify-center gap-3
                               shadow-lg shadow-blue-600/30">
                <FiShoppingBag className="text-lg" />
                <span>Go to shop</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Trust indicator */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} 
                       className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-white text-[10px]
                                bg-gradient-to-br from-blue-500 to-cyan-600 ${
                                  isDarkMode ? 'border-gray-900' : 'border-white'
                                }`}>
                    {i === 1 && 'U'}
                    {i === 2 && 'S'}
                    {i === 3 && 'A'}
                  </div>
                ))}
              </div>
              <span className={`text-xs transition-colors duration-500 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Join 5k+ happy customers</span>
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

        @keyframes upDown {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        .animate-up-down {
          animation: upDown 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default PromoSection;