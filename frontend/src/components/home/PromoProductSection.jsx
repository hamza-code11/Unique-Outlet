// import React from "react";
// import productImg from "../assets/home/get-image2.png"; // apni product image ka path
// import wavesBg from "../assets/home/Vertical Garden Wall With Neon Light.jfif"; // smoke/waves background image
// import { FiShoppingBag, FiArrowRight, FiClock, FiTag, FiShield, FiWind, FiSmile, FiStar } from "react-icons/fi";

// const PromoProductSection = () => {
//   const features = [
//     {
//       icon: FiShield,
//       title: "100% Natural",
//       description: "Premium quality ingredients"
//     },
//     {
//       icon: FiWind,
//       title: "Fresh Menthol",
//       description: "Smooth cooling effect"
//     },
//     {
//       icon: FiSmile,
//       title: "30 Day Refund",
//       description: "Money-back guarantee"
//     }
//   ];

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#0f0f17] to-[#14141f] py-20 px-4 sm:px-6 lg:px-8">
//       {/* Background Effects */}
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-cyan-900/10"></div>
      
//       {/* Animated Background Elements */}
//       <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
//       <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
//       {/* Decorative Lines */}
//       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
//       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
//           {/* Left Content - Product Image with Smoke Background */}
//           <div className="relative">
//             {/* Main Background Container - Smoke attached to background */}
//             <div className="absolute inset-0 -m-10 rounded-3xl overflow-hidden">
//               {/* Smoke/Waves Background Image */}
//               <div className="absolute inset-0">
//                 <img 
//                   src={wavesBg} 
//                   alt="Smoke Effect" 
//                   className="w-full h-full object-cover opacity-40 mix-blend-screen"
//                   style={{ 
//                     filter: 'brightness(1.2) contrast(1.1)',
//                   }}
//                 />
//               </div>
              
//               {/* Gradient Overlay to blend smoke with background */}
//               <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0f]/80 via-[#0f0f17]/60 to-transparent"></div>
              
//               {/* Colored overlays for smoke effect */}
//               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 mix-blend-overlay"></div>
//             </div>

//             {/* Animated Rings - Adjusted to be behind image */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative w-80 h-80">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
//                               rounded-full blur-3xl animate-pulse"></div>
//                 <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-ping-slow"></div>
//                 <div className="absolute inset-4 border-2 border-cyan-500/20 rounded-full animate-ping-slow" style={{ animationDelay: '0.5s' }}></div>
//               </div>
//             </div>
            
//             {/* Floating smoke elements - Integrated with background */}
//             <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl"></div>
//             <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/5 rounded-full blur-3xl"></div>
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-400/5 rounded-full blur-3xl"></div>
            
//             {/* Image Container - No animation */}
//             <div className="relative z-20 flex justify-center items-center py-10">
//               <div className="relative">
//                 {/* Soft glow behind image */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
//                               rounded-full blur-3xl scale-150"></div>
                
//                 {/* Product Image - No float animation */}
//                 <img 
//                   src={productImg} 
//                   alt="Product" 
//                   className="relative w-full max-w-[380px] mx-auto h-auto object-contain
//                            drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
//                   style={{ 
//                     filter: 'drop-shadow(0 20px 30px rgba(0, 150, 255, 0.3))',
//                     transform: 'scale(1.02)'
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Floating particles (subtle smoke effect) - Static but visible */}
//             <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/20 rounded-full"></div>
//             <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-cyan-400/20 rounded-full"></div>
//             <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400/20 rounded-full"></div>
//           </div>

//           {/* Right Content - Product Info */}
//           <div className="space-y-6">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
//                           backdrop-blur-sm border border-blue-500/30 px-5 py-2.5 rounded-full">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
//                                bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//               </span>
//               <span className="text-sm font-medium text-blue-300 tracking-wide">
//                 LATEST ARRIVAL
//               </span>
//             </div>

//             {/* Title - Single line, smaller */}
//             <h2 className="text-3xl md:text-4xl font-bold text-white">
//               Premium Products
//             </h2>

//             {/* Price */}
//             <div className="flex items-center gap-4 flex-wrap">
//               <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 
//                                bg-clip-text text-transparent">
//                 $49.00
//               </span>
//               <span className="text-xl text-gray-500 line-through decoration-gray-600">
//                 $99.00
//               </span>
//               {/* <span className="px-3 py-1.5 bg-green-500/20 text-green-400 text-sm font-medium 
//                              rounded-full border border-green-500/30">
//                 Save 50%
//               </span> */}
//             </div>

//             {/* Description - No border/bg, just text */}
//             <p className="text-gray-300 text-base leading-relaxed">
//               There Are Many Variations Of Passages Of Lorem Ipsum Available, 
//               But The Majority Have Suffered Alteration In Some Form, By Injected 
//               Humour, Or Randomised Words Which...
//             </p>

//             {/* Features List - As separate lines */}
//             <div className="space-y-3 pt-2">
//               {/* 100% Natural */}
//               <div className="flex items-center gap-3">
//                 <FiShield className="text-blue-400 text-lg" />
//                 <span className="text-gray-300">100% Natural</span>
//               </div>

//               {/* Fresh Menthol */}
//               <div className="flex items-center gap-3">
//                 <FiWind className="text-blue-400 text-lg" />
//                 <span className="text-gray-300">Fresh Menthol</span>
//               </div>

//               {/* 30 Day Refund */}
//               <div className="flex items-center gap-3">
//                 <FiSmile className="text-blue-400 text-lg" />
//                 <span className="text-gray-300">30 Day Refund</span>
//               </div>

//               {/* Special Coupon */}
//               {/* <div className="flex items-center gap-3">
//                 <FiTag className="text-blue-400 text-lg" />
//                 <span className="text-gray-300">
//                   Coupon <span className="text-blue-400 font-bold">$61.99</span> | Code:{' '}
//                   <span className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-400 font-mono text-sm font-bold">W2</span>
//                 </span>
//               </div> */}
//             </div>

//             {/* Call to Action */}
//             <div className="pt-4">
//               <div className="mb-4">
//                 <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 
//                                bg-clip-text text-transparent">
//                   HUNGRY UP!
//                 </span>
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button className="group flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                                  text-white font-semibold rounded-full text-base
//                                  hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 
//                                  transform hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30
//                                  flex items-center justify-center gap-2">
//                   <FiShoppingBag className="text-lg" />
//                   <span>Shop Now</span>
//                   <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//                 </button>
                
//                 <button className="group flex-1 px-6 py-3 border-2 border-blue-500/50 
//                                  text-blue-400 font-semibold rounded-full text-base
//                                  hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 
//                                  hover:text-white hover:border-transparent
//                                  transition-all duration-300">
//                   Learn More
//                 </button>
//               </div>
//             </div>

//             {/* Trust Indicators */}
//             {/* <div className="flex items-center gap-2 pt-2">
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <FiStar key={i} className="text-yellow-400 fill-current text-sm" />
//                 ))}
//               </div>
//               <span className="text-sm text-gray-400">4.9 (2.5k+ reviews)</span>
//             </div> */}
//           </div>

//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse-slow {
//           0%, 100% {
//             opacity: 0.3;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.6;
//             transform: scale(1.1);
//           }
//         }

//         @keyframes ping-slow {
//           75%, 100% {
//             transform: scale(1.5);
//             opacity: 0;
//           }
//         }
        
//         .animate-pulse-slow {
//           animation: pulse-slow 4s ease-in-out infinite;
//         }

//         .animate-ping-slow {
//           animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default PromoProductSection;










import React, { useState, useEffect } from "react";
import productImg from "../../assets/home/get-image2.png"; // apni product image ka path
import wavesBg from "../../assets/home/Vertical Garden Wall With Neon Light.jfif"; // smoke/waves background image
import { FiShoppingBag, FiArrowRight, FiClock, FiTag, FiShield, FiWind, FiSmile, FiStar } from "react-icons/fi";

const PromoProductSection = () => {
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

  const features = [
    {
      icon: FiShield,
      title: "100% Natural",
      description: "Premium quality ingredients"
    },
    {
      icon: FiWind,
      title: "Fresh Menthol",
      description: "Smooth cooling effect"
    },
    {
      icon: FiSmile,
      title: "30 Day Refund",
      description: "Money-back guarantee"
    }
  ];

  return (
    <section className={`relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-white via-gray-50 to-white'
    }`}>
      {/* Background Effects - dynamic */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-blue-900/20 via-transparent to-cyan-900/20' 
          : 'bg-gradient-to-b from-blue-100/30 via-transparent to-cyan-100/30'
      }`}></div>
      
      {/* Animated Background Elements - dynamic */}
      <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow transition-colors duration-500 ${
        isDarkMode ? 'bg-blue-800/20' : 'bg-blue-200/20'
      }`}></div>
      
      <div className={`absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow transition-colors duration-500 ${
        isDarkMode ? 'bg-cyan-800/20' : 'bg-cyan-200/20'
      }`} style={{ animationDelay: '1s' }}></div>
      
      {/* Decorative Lines - dynamic */}
      <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transition-colors duration-500 ${
        isDarkMode ? 'via-blue-400/20' : 'via-blue-300/50'
      }`}></div>
      
      <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transition-colors duration-500 ${
        isDarkMode ? 'via-cyan-400/20' : 'via-cyan-300/50'
      }`}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content - Product Image with Smoke Background */}
          <div className="relative">
            {/* Main Background Container - Smoke attached to background */}
            <div className="absolute inset-0 -m-10 rounded-3xl overflow-hidden">
              {/* Smoke/Waves Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={wavesBg} 
                  alt="Smoke Effect" 
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isDarkMode 
                      ? 'opacity-30 mix-blend-screen' 
                      : 'opacity-20 mix-blend-multiply'
                  }`}
                  style={{ 
                    filter: isDarkMode ? 'brightness(1.2) contrast(1.1)' : 'brightness(1.1) contrast(1.05)',
                  }}
                />
              </div>
              
              {/* Gradient Overlay to blend smoke with background - dynamic */}
              <div className={`absolute inset-0 transition-colors duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-tr from-gray-900/80 via-gray-800/60 to-transparent' 
                  : 'bg-gradient-to-tr from-white/80 via-gray-50/60 to-transparent'
              }`}></div>
              
              {/* Colored overlays for smoke effect - dynamic */}
              <div className={`absolute top-0 left-0 w-full h-full mix-blend-overlay transition-colors duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-cyan-900/30' 
                  : 'bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-cyan-100/30'
              }`}></div>
            </div>

            {/* Animated Rings - dynamic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-80">
                <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-800/30 to-cyan-800/30' 
                    : 'bg-gradient-to-r from-blue-200/30 to-cyan-200/30'
                }`}></div>
                <div className={`absolute inset-0 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                  isDarkMode ? 'border-blue-500/20' : 'border-blue-300/30'
                }`}></div>
                <div className={`absolute inset-4 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                  isDarkMode ? 'border-cyan-500/20' : 'border-cyan-300/30'
                }`} style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            {/* Floating smoke elements - dynamic */}
            <div className={`absolute top-10 left-10 w-40 h-40 rounded-full blur-3xl transition-colors duration-500 ${
              isDarkMode ? 'bg-blue-800/20' : 'bg-blue-200/20'
            }`}></div>
            <div className={`absolute bottom-10 right-10 w-40 h-40 rounded-full blur-3xl transition-colors duration-500 ${
              isDarkMode ? 'bg-purple-800/20' : 'bg-purple-200/20'
            }`}></div>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl transition-colors duration-500 ${
              isDarkMode ? 'bg-cyan-800/20' : 'bg-cyan-200/20'
            }`}></div>
            
            {/* Image Container */}
            <div className="relative z-20 flex justify-center items-center py-10">
              <div className="relative">
                {/* Soft glow behind image - dynamic */}
                <div className={`absolute inset-0 rounded-full blur-3xl scale-150 transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-800/30 to-cyan-800/30' 
                    : 'bg-gradient-to-r from-blue-200/40 to-cyan-200/40'
                }`}></div>
                
                {/* Product Image */}
                <img 
                  src={productImg} 
                  alt="Product" 
                  className="relative w-full max-w-[380px] mx-auto h-auto object-contain
                           drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  style={{ 
                    filter: isDarkMode 
                      ? 'drop-shadow(0 20px 30px rgba(0, 150, 255, 0.3))' 
                      : 'drop-shadow(0 20px 30px rgba(0, 150, 255, 0.2))',
                  }}
                />
              </div>
            </div>

            {/* Floating particles - dynamic */}
            <div className={`absolute top-1/4 left-1/4 w-1 h-1 rounded-full transition-colors duration-500 ${
              isDarkMode ? 'bg-blue-400/30' : 'bg-blue-300/40'
            }`}></div>
            <div className={`absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full transition-colors duration-500 ${
              isDarkMode ? 'bg-cyan-400/30' : 'bg-cyan-300/40'
            }`}></div>
            <div className={`absolute top-1/2 right-1/4 w-1 h-1 rounded-full transition-colors duration-500 ${
              isDarkMode ? 'bg-purple-400/30' : 'bg-purple-300/40'
            }`}></div>
          </div>

          {/* Right Content - Product Info */}
          <div className="space-y-6">
            {/* Badge - dynamic */}
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900/50 to-cyan-800/30 border border-blue-700/50' 
                : 'bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
                               bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className={`text-sm font-medium tracking-wide ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                LATEST ARRIVAL
              </span>
            </div>

            {/* Title */}
            <h2 className={`text-3xl md:text-4xl font-bold transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Premium Products
            </h2>

            {/* Price */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 
                               bg-clip-text text-transparent">
                $49.00
              </span>
              <span className={`text-xl line-through transition-colors duration-500 ${
                isDarkMode ? 'text-gray-500 decoration-gray-600' : 'text-gray-400 decoration-gray-300'
              }`}>
                $99.00
              </span>
            </div>

            {/* Description */}
            <p className={`text-base leading-relaxed transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              There Are Many Variations Of Passages Of Lorem Ipsum Available, 
              But The Majority Have Suffered Alteration In Some Form, By Injected 
              Humour, Or Randomised Words Which...
            </p>

            {/* Features List */}
            <div className="space-y-3 pt-2">
              {/* 100% Natural */}
              <div className="flex items-center gap-3">
                <FiShield className={`text-lg ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <span className={`transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>100% Natural</span>
              </div>

              {/* Fresh Menthol */}
              <div className="flex items-center gap-3">
                <FiWind className={`text-lg ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <span className={`transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Fresh Menthol</span>
              </div>

              {/* 30 Day Refund */}
              <div className="flex items-center gap-3">
                <FiSmile className={`text-lg ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <span className={`transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>30 Day Refund</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-4">
              <div className="mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 
                               bg-clip-text text-transparent">
                  HUNGRY UP!
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="group flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                                 text-white font-semibold rounded-full text-base
                                 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
                                 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30
                                 flex items-center justify-center gap-2">
                  <FiShoppingBag className="text-lg" />
                  <span>Shop Now</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className={`group flex-1 px-6 py-3 border-2 rounded-full text-base
                                 transition-all duration-300 ${
                                   isDarkMode 
                                     ? 'border-blue-600 text-blue-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-transparent' 
                                     : 'border-blue-300 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-transparent'
                                 }`}>
                  Learn More
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default PromoProductSection;