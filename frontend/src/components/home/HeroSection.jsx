// // src/components/HeroSection.jsx
// import React, { useEffect, useRef } from "react";
// import vapeImg from "../assets/home/01.png";
// import wavesBg from "../assets/home/waves-bg.jfif"; // waves background image yahan add karo
// import {
//   FiShoppingBag,
//   FiShield,
//   FiTruck,
//   FiClock,
//   FiArrowRight,
//   FiStar,
//   FiPlay,
//   FiLock
// } from "react-icons/fi";

// function HeroSection() {
//   const sectionRef = useRef(null);
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
//     <section ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0f] min-h-screen flex items-center py-12 md:py-16">
//       {/* Waves Background Image */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src={wavesBg} 
//           alt="Waves Background" 
//           className="w-full h-full object-cover opacity-20 md:opacity-30"
//           style={{ 
//             maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
//             WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
//           }}
//         />
//       </div>

//       {/* Gradient backgrounds - dark theme with blue tones */}
//       <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-blue-900/40 via-blue-800/20 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-tr from-cyan-900/40 via-transparent to-transparent rounded-full blur-3xl"></div>
      
//       {/* Dark overlay for depth - slightly reduced opacity to show waves */}
//       <div className="absolute inset-0 bg-[#0a0a0f]/70"></div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div ref={contentRef} className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 xl:gap-16 opacity-0">

//           {/* Left Content */}
//           <div className="flex-1 space-y-6 sm:space-y-8 w-full">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/50 to-cyan-800/30 
//                           border border-blue-700/50 px-4 py-2 rounded-full">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
//                                bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//               </span>
//               <span className="text-xs sm:text-sm font-medium text-blue-300 tracking-wide">
//                 WAVES COLLECTION • 25% OFF
//               </span>
//             </div>

//             {/* Heading */}
//             <div className="space-y-2">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//                 <span className="text-white">Ride the waves of</span>
//                 <br />
//                 <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                   smooth vaping
//                 </span>
//               </h1>

//               <p className="text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed">
//                 Premium vaping products curated for enthusiasts.
//                 Quality you can trust, support you deserve.
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
//               <button className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                                text-white font-medium rounded-lg 
//                                hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 
//                                flex items-center justify-center gap-2
//                                shadow-lg shadow-blue-600/30">
//                 <FiShoppingBag className="text-lg" />
//                 <span>Shop Collection</span>
//                 <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
//                                        transition-all duration-300" />
//               </button>

//               <button className="px-6 py-3 bg-transparent text-gray-300 font-medium 
//                                border border-gray-800 rounded-lg 
//                                hover:border-blue-500 hover:text-blue-400 
//                                transition-all duration-300
//                                flex items-center justify-center gap-2">
//                 <span>Watch Demo</span>
//                 <FiPlay className="text-sm fill-current" />
//               </button>
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiShield className="text-sm text-blue-400" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-200 text-sm">Premium Quality</h3>
//                   <p className="text-xs text-gray-500">Lab tested</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiTruck className="text-sm text-blue-400" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-200 text-sm">Free Shipping</h3>
//                   <p className="text-xs text-gray-500">On orders $50+</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiClock className="text-sm text-blue-400" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-200 text-sm">24/7 Support</h3>
//                   <p className="text-xs text-gray-500">Always here</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiLock className="text-sm text-blue-400" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-200 text-sm">Secure Payment</h3>
//                   <p className="text-xs text-gray-500">100% encrypted</p>
//                 </div>
//               </div>
//             </div>

//             {/* Trust Indicators */}
//             <div className="flex items-center gap-6 pt-2">
//               <div className="flex -space-x-2">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i}
//                     className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] 
//                                 bg-gradient-to-br from-blue-500 to-cyan-600
//                                 shadow-md flex items-center justify-center text-white text-xs">
//                     {i === 1 && 'JD'}
//                     {i === 2 && 'MK'}
//                     {i === 3 && 'SL'}
//                     {i === 4 && '+2'}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <FiStar key={i} className="text-blue-400 fill-current text-xs" />
//                   ))}
//                 </div>
//                 <span className="text-sm font-bold text-white">50k+</span>
//                 <span className="text-xs text-gray-500">happy customers</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="flex-1 flex justify-center items-center">
//             <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
//               {/* Main Image with up-down animation */}
//               <div className="relative animate-up-down flex justify-center">
//                 {/* Glow effect */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-blue-700/30 
//                               via-cyan-600/20 to-transparent rounded-full blur-2xl scale-110"></div>

//                 {/* Image */}
//                 <img
//                   src={vapeImg}
//                   alt="Premium Vape Device"
//                   className="relative w-2/3 sm:w-1/2 md:w-3/4 h-auto object-contain drop-shadow-2xl
//                            transform hover:scale-105 transition-transform duration-500"
//                 />
//               </div>

//               {/* Decorative wave rings */}
//               <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-blue-500/20 rounded-full animate-ping-slow"></div>
//               <div className="absolute -bottom-6 -left-6 w-40 h-40 border-2 border-cyan-500/20 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>

//               {/* Stats Card */}
//               <div className="absolute -bottom-6 left-0 bg-[#14141f]/95 backdrop-blur-sm px-4 py-3 
//                             shadow-xl rounded-lg border border-gray-800
//                             hidden lg:flex items-center gap-3 min-w-[160px] animate-up-down"
//                 style={{ animationDelay: '0.5s' }}>
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-lg 
//                               flex items-center justify-center border border-blue-800/30">
//                   <FiStar className="text-blue-400 fill-current text-xs text-xl" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Trusted by</p>
//                   <p className="text-base font-bold text-gray-200">10,000+</p>
//                 </div>
//               </div>

//               {/* Floating Badge */}
//               <div className="absolute top-4 -right-3 bg-[#14141f] shadow-lg rounded-full px-4 py-2 
//                             border border-gray-800 hidden lg:flex items-center gap-2 animate-up-down"
//                 style={{ animationDelay: '0.2s' }}>
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full 
//                                  rounded-full bg-green-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                 </span>
//                 <span className="text-sm font-medium text-gray-200">In Stock</span>
//               </div>
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
//             transform: translateY(-15px);
//           }
//           100% {
//             transform: translateY(0);
//           }
//         }
        
//         .animate-up-down {
//           animation: upDown 3s ease-in-out infinite;
//         }

//         @keyframes ping-slow {
//           75%, 100% {
//             transform: scale(1.5);
//             opacity: 0;
//           }
//         }

//         .animate-ping-slow {
//           animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
//       `}</style>
//     </section>
//   );
// }

// export default HeroSection;




// // src/components/HeroSection.jsx
// import React, { useEffect, useRef } from "react";
// import vapeImg from "../assets/home/01.png";
// import wavesBg from "../assets/home/waves-bg.jfif"; // waves background image yahan add karo
// import {
//   FiShoppingBag,
//   FiShield,
//   FiTruck,
//   FiClock,
//   FiArrowRight,
//   FiStar,
//   FiPlay,
//   FiLock
// } from "react-icons/fi";

// function HeroSection() {
//   const sectionRef = useRef(null);
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
//     <section ref={sectionRef} className="relative overflow-hidden bg-white min-h-screen flex items-center py-12 md:py-16">
//       {/* Waves Background Image */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src={wavesBg} 
//           alt="Waves Background" 
//           className="w-full h-full object-cover opacity-5 md:opacity-10"
//           style={{ 
//             maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
//             WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
//           }}
//         />
//       </div>

//       {/* Gradient backgrounds - light theme with blue tones */}
//       <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-blue-100/40 via-blue-50/20 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-tr from-cyan-100/40 via-transparent to-transparent rounded-full blur-3xl"></div>
      
//       {/* Light overlay for depth */}
//       <div className="absolute inset-0 bg-white/50"></div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div ref={contentRef} className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 xl:gap-16 opacity-0">

//           {/* Left Content */}
//           <div className="flex-1 space-y-6 sm:space-y-8 w-full">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 
//                           border border-blue-200 px-4 py-2 rounded-full">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
//                                bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//               </span>
//               <span className="text-xs sm:text-sm font-medium text-blue-600 tracking-wide">
//                 WAVES COLLECTION • 25% OFF
//               </span>
//             </div>

//             {/* Heading */}
//             <div className="space-y-2">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//                 <span className="text-gray-900">Ride the waves of</span>
//                 <br />
//                 <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//                   smooth vaping
//                 </span>
//               </h1>

//               <p className="text-gray-600 text-sm sm:text-base max-w-lg leading-relaxed">
//                 Premium vaping products curated for enthusiasts.
//                 Quality you can trust, support you deserve.
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
//               <button className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                                text-white font-medium rounded-lg 
//                                hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
//                                flex items-center justify-center gap-2
//                                shadow-lg shadow-blue-600/30">
//                 <FiShoppingBag className="text-lg" />
//                 <span>Shop Collection</span>
//                 <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
//                                        transition-all duration-300" />
//               </button>

//               <button className="px-6 py-3 bg-transparent text-gray-700 font-medium 
//                                border border-gray-300 rounded-lg 
//                                hover:border-blue-500 hover:text-blue-600 
//                                transition-all duration-300
//                                flex items-center justify-center gap-2">
//                 <span>Watch Demo</span>
//                 <FiPlay className="text-sm fill-current" />
//               </button>
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
//                   <FiShield className="text-sm text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-sm">Premium Quality</h3>
//                   <p className="text-xs text-gray-500">Lab tested</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
//                   <FiTruck className="text-sm text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-sm">Free Shipping</h3>
//                   <p className="text-xs text-gray-500">On orders $50+</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
//                   <FiClock className="text-sm text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-sm">24/7 Support</h3>
//                   <p className="text-xs text-gray-500">Always here</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
//                   <FiLock className="text-sm text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-sm">Secure Payment</h3>
//                   <p className="text-xs text-gray-500">100% encrypted</p>
//                 </div>
//               </div>
//             </div>

//             {/* Trust Indicators */}
//             <div className="flex items-center gap-6 pt-2">
//               <div className="flex -space-x-2">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i}
//                     className="w-8 h-8 rounded-full border-2 border-white 
//                                 bg-gradient-to-br from-blue-500 to-cyan-600
//                                 shadow-md flex items-center justify-center text-white text-xs">
//                     {i === 1 && 'JD'}
//                     {i === 2 && 'MK'}
//                     {i === 3 && 'SL'}
//                     {i === 4 && '+2'}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <FiStar key={i} className="text-blue-500 fill-current text-xs" />
//                   ))}
//                 </div>
//                 <span className="text-sm font-bold text-gray-900">50k+</span>
//                 <span className="text-xs text-gray-500">happy customers</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="flex-1 flex justify-center items-center">
//             <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
//               {/* Main Image with up-down animation */}
//               <div className="relative animate-up-down flex justify-center">
//                 {/* Glow effect */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-blue-200/30 
//                               via-cyan-200/20 to-transparent rounded-full blur-2xl scale-110"></div>

//                 {/* Image */}
//                 <img
//                   src={vapeImg}
//                   alt="Premium Vape Device"
//                   className="relative w-2/3 sm:w-1/2 md:w-3/4 h-auto object-contain drop-shadow-xl
//                            transform hover:scale-105 transition-transform duration-500"
//                 />
//               </div>

//               {/* Decorative wave rings */}
//               <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-blue-200/50 rounded-full animate-ping-slow"></div>
//               <div className="absolute -bottom-6 -left-6 w-40 h-40 border-2 border-cyan-200/50 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>

//               {/* Stats Card */}
//               <div className="absolute -bottom-6 left-0 bg-white/95 backdrop-blur-sm px-4 py-3 
//                             shadow-xl rounded-lg border border-gray-200
//                             hidden lg:flex items-center gap-3 min-w-[160px] animate-up-down"
//                 style={{ animationDelay: '0.5s' }}>
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg 
//                               flex items-center justify-center border border-blue-200">
//                   <FiStar className="text-blue-600 fill-current text-xs text-xl" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Trusted by</p>
//                   <p className="text-base font-bold text-gray-900">10,000+</p>
//                 </div>
//               </div>

//               {/* Floating Badge */}
//               <div className="absolute top-4 -right-3 bg-white shadow-lg rounded-full px-4 py-2 
//                             border border-gray-200 hidden lg:flex items-center gap-2 animate-up-down"
//                 style={{ animationDelay: '0.2s' }}>
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full 
//                                  rounded-full bg-green-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                 </span>
//                 <span className="text-sm font-medium text-gray-700">In Stock</span>
//               </div>
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
//             transform: translateY(-15px);
//           }
//           100% {
//             transform: translateY(0);
//           }
//         }
        
//         .animate-up-down {
//           animation: upDown 3s ease-in-out infinite;
//         }

//         @keyframes ping-slow {
//           75%, 100% {
//             transform: scale(1.5);
//             opacity: 0;
//           }
//         }

//         .animate-ping-slow {
//           animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
//       `}</style>
//     </section>
//   );
// }

// export default HeroSection;








// src/components/HeroSection.jsx
import React, { useState, useEffect, useRef } from "react";
import vapeImg1 from "../../assets/home/01.png";
import vapeImg2 from "../../assets/home/p5.png"; // accessories ki image
import vapeImg3 from "../../assets/home/p7.png"; // additional product image
import wavesBg from "../../assets/home/waves-bg.jfif";
import {
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiClock,
  FiArrowRight,
  FiStar,
  FiPlay,
  FiLock
} from "react-icons/fi";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const autoPlayRef = useRef(null);

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

  const slides = [
    {
      id: 1,
      brand: "WAVES",
      image: vapeImg1,
      title: "Ride the waves of",
      highlight: "smooth vaping",
      description: "Premium Waves vaping products curated for enthusiasts. Quality you can trust, support you deserve.",
      badge: "WAVES COLLECTION • 25% OFF",
      features: {
        quality: "Premium Waves Quality",
        shipping: "Free Shipping",
        support: "24/7 Waves Support",
        payment: "Secure Payment"
      },
      buttonText: "Shop Waves Collection",
      demoText: "Watch Waves Demo",
      imageSize: "w-2/3 sm:w-1/2 md:w-3/4"
    },
    {
      id: 2,
      brand: "Watch",
      image: vapeImg2,
      title: "Discover premium",
      highlight: "vape accessories",
      description: "Complete your setup with our premium accessories. From coils to chargers, we have everything you need.",
      badge: "ACCORCIES • UP TO 40% OFF",
      features: {
        quality: "Premium Accessories",
        shipping: "Free Shipping",
        support: "24/7 Support",
        payment: "Secure Payment"
      },
      buttonText: "Shop Accessories",
      demoText: "View Accessories",
      imageSize: "w-3/4 sm:w-2/3 md:w-5/6 lg:w-full"
    },
    {
      id: 3,
      brand: "Head Phone",
      image: vapeImg3,
      title: "Limited edition",
      highlight: "starter kits",
      description: "Get started with our specially curated starter kits. Perfect for beginners and enthusiasts alike.",
      badge: "LIMITED EDITION • WHILE STOCKS LAST",
      features: {
        quality: "Premium Quality",
        shipping: "Free Shipping",
        support: "24/7 Support",
        payment: "Secure Payment"
      },
      buttonText: "Shop Starter Kits",
      demoText: "Learn More",
      imageSize: "w-3/4 sm:w-2/3 md:w-5/6 lg:w-full"
    }
  ];

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

    // Auto play slider
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      observer.disconnect();
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const currentData = slides[currentSlide];

  return (
    <section ref={sectionRef} className={`relative overflow-hidden min-h-screen flex items-center py-12 md:py-16 transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Waves Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={wavesBg} 
          alt="Waves Background" 
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isDarkMode ? 'opacity-10 md:opacity-20' : 'opacity-5 md:opacity-10'
          }`}
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
          }}
        />
      </div>

      {/* Gradient backgrounds - dynamic */}
      <div className={`absolute top-0 right-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-bl from-blue-900/40 via-blue-800/20 to-transparent' 
          : 'bg-gradient-to-bl from-blue-100/40 via-blue-50/20 to-transparent'
      }`}></div>
      
      <div className={`absolute bottom-0 left-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-tr from-cyan-900/40 via-transparent to-transparent' 
          : 'bg-gradient-to-tr from-cyan-100/40 via-transparent to-transparent'
      }`}></div>
      
      {/* Overlay for depth - dynamic */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900/70' : 'bg-white/50'
      }`}></div>

      {/* Slide Indicators - dynamic */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-blue-600' 
                : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 xl:gap-16 opacity-0">

          {/* Left Content */}
          <div className="flex-1 space-y-6 sm:space-y-8 w-full transition-opacity duration-500">
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
                {currentData.badge}
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {currentData.title}
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {currentData.highlight}
                </span>
              </h1>

              <p className={`text-sm sm:text-base max-w-lg leading-relaxed transition-colors duration-500 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {currentData.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                               text-white font-medium rounded-lg 
                               hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
                               flex items-center justify-center gap-2
                               shadow-lg shadow-blue-600/30">
                <FiShoppingBag className="text-lg" />
                <span>{currentData.buttonText}</span>
                <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
                                       transition-all duration-300" />
              </button>

              <button className={`px-6 py-3 font-medium rounded-lg transition-all duration-300
                               flex items-center justify-center gap-2 ${
                                 isDarkMode 
                                   ? 'bg-transparent text-gray-300 border border-gray-700 hover:border-blue-500 hover:text-blue-400' 
                                   : 'bg-transparent text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600'
                               }`}>
                <span>{currentData.demoText}</span>
                <FiPlay className="text-sm fill-current" />
              </button>
            </div>

            {/* Features */}
            <div className={`grid grid-cols-2 gap-4 pt-4 border-t transition-colors duration-500 ${
              isDarkMode ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <FiShield className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{currentData.features.quality}</h3>
                  <p className="text-xs text-gray-500">Lab tested</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <FiTruck className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{currentData.features.shipping}</h3>
                  <p className="text-xs text-gray-500">On orders $50+</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <FiClock className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{currentData.features.support}</h3>
                  <p className="text-xs text-gray-500">Always here</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <FiLock className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{currentData.features.payment}</h3>
                  <p className="text-xs text-gray-500">100% encrypted</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-xs
                                bg-gradient-to-br from-blue-500 to-cyan-600 shadow-md ${
                                  isDarkMode ? 'border-gray-900' : 'border-white'
                                }`}>
                    {i === 1 && 'JD'}
                    {i === 2 && 'MK'}
                    {i === 3 && 'SL'}
                    {i === 4 && '+2'}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-blue-500 fill-current text-xs" />
                  ))}
                </div>
                <span className={`text-sm font-bold transition-colors duration-500 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>50k+</span>
                <span className="text-xs text-gray-500">happy customers</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
              {/* Main Image */}
              <div className="relative animate-up-down flex justify-center">
                {/* Glow effect - dynamic */}
                <div className={`absolute inset-0 rounded-full blur-2xl scale-110 transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-t from-blue-700/30 via-cyan-600/20 to-transparent' 
                    : 'bg-gradient-to-t from-blue-200/30 via-cyan-200/20 to-transparent'
                }`}></div>

                {/* Image with dynamic sizing based on slide */}
                <img
                  key={currentData.id}
                  src={currentData.image}
                  alt={`${currentData.brand} Product`}
                  className={`relative ${currentData.imageSize} h-auto object-contain drop-shadow-xl
                           transform hover:scale-105 transition-transform duration-500`}
                  onError={(e) => {
                    console.error(`Image failed to load: ${currentData.image}`);
                    e.target.src = vapeImg1; // fallback to first image
                  }}
                />
              </div>

              {/* Decorative rings - dynamic */}
              <div className={`absolute -top-6 -right-6 w-32 h-32 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                isDarkMode ? 'border-blue-500/20' : 'border-blue-200/50'
              }`}></div>
              <div className={`absolute -bottom-6 -left-6 w-40 h-40 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                isDarkMode ? 'border-cyan-500/20' : 'border-cyan-200/50'
              }`} style={{ animationDelay: '1s' }}></div>

              {/* Brand Badge */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-600 to-cyan-600 
                            px-4 py-2 rounded-full shadow-lg animate-float hidden lg:block">
                <span className="text-sm font-medium text-white">{currentData.brand}</span>
              </div>

              {/* Stats Card - dynamic */}
              <div className={`absolute -bottom-6 left-0 backdrop-blur-sm px-4 py-3 
                            shadow-xl rounded-lg border hidden lg:flex items-center gap-3 min-w-[160px] animate-up-down transition-colors duration-500 ${
                              isDarkMode 
                                ? 'bg-gray-800/95 border-gray-700' 
                                : 'bg-white/95 border-gray-200'
                            }`}
                style={{ animationDelay: '0.5s' }}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-800/30' 
                    : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
                }`}>
                  <FiStar className={`fill-current text-xl ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Trusted by</p>
                  <p className={`text-base font-bold transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>10,000+</p>
                </div>
              </div>

              {/* Floating Badge - dynamic */}
              <div className={`absolute top-4 -right-3 shadow-lg rounded-full px-4 py-2 
                            border hidden lg:flex items-center gap-2 animate-up-down transition-colors duration-500 ${
                              isDarkMode 
                                ? 'bg-gray-800 border-gray-700' 
                                : 'bg-white border-gray-200'
                            }`}
                style={{ animationDelay: '0.2s' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full 
                                 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>In Stock</span>
              </div>
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
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        .animate-up-down {
          animation: upDown 3s ease-in-out infinite;
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;