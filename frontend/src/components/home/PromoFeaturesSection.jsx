// import React from "react";
// import productImg from "../assets/home/product-single-no-decor-501x1024.png";
// import { FiShield, FiWind, FiSmile, FiShoppingBag, FiArrowRight, FiStar } from "react-icons/fi";

// const PromoFeaturesSection = () => {
//   const features = [
//     {
//       icon: FiShield,
//       title: "No dangerous toxins",
//       description: "We offer a wide range of quality vaping products"
//     },
//     {
//       icon: FiWind,
//       title: "Feel of menthol",
//       description: "We offer a wide range of quality vaping products"
//     },
//     {
//       icon: FiSmile,
//       title: "Safer than smoking",
//       description: "We offer a wide range of quality vaping products"
//     }
//   ];

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#0f0f17] to-[#14141f] py-20 px-4 sm:px-6 lg:px-8">
//       {/* Background Effects */}
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-cyan-900/10"></div>
      
//       {/* Animated Background Elements */}
//       <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
//       {/* Decorative Lines */}
//       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
//       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
//       {/* Grid Pattern Overlay */}
//       <div className="absolute inset-0 opacity-5" style={{ 
//         backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
//         backgroundSize: '40px 40px'
//       }}></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-10 lg:gap-16">
          
//           {/* Left Content */}
//           <div className="flex-1 min-w-[280px] text-center lg:text-left space-y-6">
//             {/* Offer Badge */}
//             {/* <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
//                           backdrop-blur-sm border border-blue-500/30 px-5 py-2.5 rounded-full">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
//                                bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//               </span>
//               <span className="text-sm font-medium text-blue-300 tracking-wide">
//                 ⚡ GET 25% OFF NOW
//               </span>
//             </div> */}

//             {/* Heading */}
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//               <span className="text-white">Try our</span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 new taste
//               </span>
//             </h1>

//             {/* Description */}
//             <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
//               Our vape shop is not only a variety of vaping products, 
//               but also an operational support service.
//             </p>

//             {/* CTA Button */}
//             <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
//               <button className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 
//                                text-white font-semibold rounded-full text-base
//                                hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 
//                                transform hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30
//                                flex items-center justify-center gap-2">
//                 <FiShoppingBag className="text-lg" />
//                 <span>Shop Now</span>
//                 <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//               </button>
              
//               {/* Trust Badge */}
//               {/* <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3].map((i) => (
//                     <div key={i}
//                          className="w-6 h-6 rounded-full border-2 border-[#0a0a0f] 
//                                   bg-gradient-to-br from-blue-500 to-cyan-600
//                                   flex items-center justify-center text-white text-[8px] font-bold">
//                       {i === 1 && 'JD'}
//                       {i === 2 && 'MK'}
//                       {i === 3 && 'SL'}
//                     </div>
//                   ))}
//                 </div>
//                 <span className="text-xs text-gray-300">Trusted by 10k+</span>
//               </div> */}
//             </div>
//           </div>

//           {/* Center Image */}
//           <div className="flex-1 text-center">
//             <div className="relative inline-block">
//               {/* Animated Rings */}
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
//                             rounded-full blur-3xl animate-pulse"></div>
//               <div className="absolute -inset-4 border-2 border-blue-500/30 rounded-full animate-ping-slow"></div>
//               <div className="absolute -inset-8 border-2 border-cyan-500/20 rounded-full animate-ping-slow" style={{ animationDelay: '0.5s' }}></div>
              
//               {/* Image Container */}
//               <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 
//                             p-8 md:p-10 rounded-[40px] md:rounded-[50px] 
//                             border border-blue-500/30 backdrop-blur-sm
//                             transform hover:scale-105 transition-transform duration-500
//                             shadow-2xl shadow-blue-500/20">
//                 <img 
//                   src={productImg} 
//                   alt="Vape Product" 
//                   className="w-48 md:w-56 lg:w-64 h-auto object-contain 
//                            drop-shadow-2xl animate-float"
//                 />
//               </div>

//               {/* Floating Badges */}
//               <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-cyan-600 
//                             px-4 py-2 rounded-full shadow-lg animate-float">
//                 <span className="text-sm font-medium text-white">New</span>
//               </div>
              
//               <div className="absolute -bottom-4 -left-4 bg-[#14141f] backdrop-blur-sm 
//                             px-4 py-2 rounded-full border border-cyan-500/30 shadow-lg 
//                             animate-float flex items-center gap-2"
//                    style={{ animationDelay: '0.3s' }}>
//                 <div className="flex items-center gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <FiStar key={i} className="text-yellow-400 fill-current text-sm" />
//                   ))}
//                 </div>
//                 <span className="text-sm text-gray-300 font-medium">4.9</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Features */}
//           <div className="flex-1 min-w-[280px] space-y-5">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <div key={index}
//                      className="group flex gap-4 p-5 rounded-xl bg-[#14141f]/80 backdrop-blur-sm 
//                               border border-gray-800 hover:border-blue-500/50 
//                               transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10
//                               transform hover:scale-[1.02]">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 
//                                 rounded-xl flex items-center justify-center flex-shrink-0
//                                 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
//                     <Icon className="text-white text-xl" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-white mb-1">
//                       {feature.title}
//                     </h4>
//                     <p className="text-sm text-gray-400 leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Additional Feature */}
//             {/* <div className="mt-6 p-5 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 
//                           rounded-xl border border-blue-500/20">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-400">Free Shipping on</p>
//                   <p className="text-lg font-bold text-white">Orders $50+</p>
//                 </div>
//                 <div className="text-3xl filter drop-shadow-lg">🚚</div>
//               </div>
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

//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
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

//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }

//         .animate-ping-slow {
//           animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default PromoFeaturesSection;





import React, { useState, useEffect } from "react";
import productImg from "../../assets/home/product-single-no-decor-501x1024.png";
import { FiShield, FiWind, FiSmile, FiShoppingBag, FiArrowRight, FiStar } from "react-icons/fi";

const PromoFeaturesSection = () => {
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
      title: "No dangerous toxins",
      description: "We offer a wide range of quality vaping products"
    },
    {
      icon: FiWind,
      title: "Feel of menthol",
      description: "We offer a wide range of quality vaping products"
    },
    {
      icon: FiSmile,
      title: "Safer than smoking",
      description: "We offer a wide range of quality vaping products"
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
      <div className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse-slow transition-colors duration-500 ${
        isDarkMode ? 'bg-blue-800/20' : 'bg-blue-200/20'
      }`}></div>
      
      <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse-slow transition-colors duration-500 ${
        isDarkMode ? 'bg-cyan-800/20' : 'bg-cyan-200/20'
      }`} style={{ animationDelay: '1s' }}></div>
      
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse-slow transition-colors duration-500 ${
        isDarkMode ? 'bg-purple-800/20' : 'bg-purple-200/20'
      }`} style={{ animationDelay: '2s' }}></div>
      
      {/* Decorative Lines - dynamic */}
      <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transition-colors duration-500 ${
        isDarkMode ? 'via-blue-400/20' : 'via-blue-300/50'
      }`}></div>
      
      <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transition-colors duration-500 ${
        isDarkMode ? 'via-cyan-400/20' : 'via-cyan-300/50'
      }`}></div>
      
      {/* Grid Pattern Overlay - dynamic */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `radial-gradient(circle at 1px 1px, ${isDarkMode ? '#60a5fa' : '#2563eb'} 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-10 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 min-w-[280px] text-center lg:text-left space-y-6">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                Try our
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                new taste
              </span>
            </h1>

            {/* Description */}
            <p className={`text-base leading-relaxed max-w-md mx-auto lg:mx-0 transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Our vape shop is not only a variety of vaping products, 
              but also an operational support service.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <button className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 
                               text-white font-semibold rounded-full text-base
                               hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
                               transform hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30
                               flex items-center justify-center gap-2">
                <FiShoppingBag className="text-lg" />
                <span>Shop Now</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center Image */}
          <div className="flex-1 text-center">
            <div className="relative inline-block">
              {/* Animated Rings - dynamic */}
              <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse transition-colors duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-800/30 to-cyan-800/30' 
                  : 'bg-gradient-to-r from-blue-200/40 to-cyan-200/40'
              }`}></div>
              
              <div className={`absolute -inset-4 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                isDarkMode ? 'border-blue-500/20' : 'border-blue-300/50'
              }`}></div>
              
              <div className={`absolute -inset-8 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                isDarkMode ? 'border-cyan-500/20' : 'border-cyan-300/40'
              }`} style={{ animationDelay: '0.5s' }}></div>
              
              {/* Image Container - dynamic */}
              <div className={`relative p-8 md:p-10 rounded-[40px] md:rounded-[50px] 
                            border backdrop-blur-sm transform hover:scale-105 transition-transform duration-500
                            shadow-2xl transition-colors duration-500 ${
                              isDarkMode 
                                ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700 shadow-gray-900/50' 
                                : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50 shadow-blue-200/50'
                            }`}>
                <img 
                  src={productImg} 
                  alt="Vape Product" 
                  className="w-48 md:w-56 lg:w-64 h-auto object-contain 
                           drop-shadow-2xl animate-float"
                />
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-cyan-600 
                            px-4 py-2 rounded-full shadow-lg animate-float">
                <span className="text-sm font-medium text-white">New</span>
              </div>
              
              <div className={`absolute -bottom-4 -left-4 backdrop-blur-sm 
                            px-4 py-2 rounded-full border shadow-lg 
                            animate-float flex items-center gap-2 transition-colors duration-500 ${
                              isDarkMode 
                                ? 'bg-gray-800 border-gray-700' 
                                : 'bg-white border-cyan-200'
                            }`}
                   style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current text-sm" />
                  ))}
                </div>
                <span className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>4.9</span>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="flex-1 min-w-[280px] space-y-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index}
                     className={`group flex gap-4 p-5 rounded-xl backdrop-blur-sm 
                              border transition-all duration-300 hover:shadow-lg
                              transform hover:scale-[1.02] ${
                                isDarkMode 
                                  ? 'bg-gray-800/80 border-gray-700 hover:border-blue-600 hover:shadow-blue-900/30' 
                                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-blue-200/50'
                              }`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 
                                rounded-xl flex items-center justify-center flex-shrink-0
                                shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <Icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-1 transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h4>
                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default PromoFeaturesSection;