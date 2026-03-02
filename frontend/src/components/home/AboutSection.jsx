// import React, { useEffect, useRef } from "react";
// import vape from "../assets/home/9w45ht.png";
// import wavesBg from "../assets/home/download.jfif"; // waves background image yahan add karo
// import { FiShield, FiZap, FiUsers, FiSmile, FiArrowRight } from "react-icons/fi";

// const AboutSection = () => {
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
//     <section className="relative overflow-hidden bg-[#0a0a0f] py-20" id="about">
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
//       <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-cyan-900/30 via-transparent to-transparent rounded-full blur-3xl"></div>
      
//       {/* Dark overlay for depth - slightly reduced opacity to show waves */}
//       <div className="absolute inset-0 bg-[#0a0a0f]/70"></div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div ref={contentRef} className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center opacity-0">
          
//           {/* Left Image with up-down animation */}
//           <div className="flex justify-center md:justify-start order-1 md:order-1">
//             <div className="relative w-full max-w-sm md:max-w-md">
//               {/* Glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-t from-blue-700/30 
//                             via-cyan-600/20 to-transparent rounded-full blur-2xl"></div>
              
//               {/* Image with up-down animation */}
//               <img
//                 src={vape}
//                 alt="About Vape"
//                 className="relative w-full h-auto object-contain animate-up-down"
//               />

//               {/* Decorative wave rings */}
//               <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-blue-500/20 rounded-full animate-ping-slow"></div>
//               <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-cyan-500/20 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>

//               {/* Decorative Elements */}
//               <div className="absolute -top-3 -left-3 w-16 h-16 border border-blue-600/30 rounded-full"></div>
//               <div className="absolute -bottom-3 -right-3 w-20 h-20 border border-cyan-600/30 rounded-full"></div>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="order-2 md:order-2 space-y-6">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/50 to-cyan-800/30 
//                           border border-blue-700/50 px-4 py-2 rounded-full">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
//                                bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//               </span>
//               <span className="text-xs sm:text-sm font-medium text-blue-300 tracking-wide">
//                 ABOUT US
//               </span>
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//               <span className="text-white">Passionate About</span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 Quality & Innovation
//               </span>
//             </h2>

//             {/* Description */}
//             <div className="space-y-4 text-gray-400">
//               <p className="leading-relaxed">
//                 We are dedicated to delivering premium vaping products designed 
//                 for performance, safety, and satisfaction. Our store offers a 
//                 carefully curated collection of devices and accessories that 
//                 combine modern technology with elegant design.
//               </p>

//               <p className="leading-relaxed">
//                 Whether you're new to vaping or an experienced enthusiast, 
//                 our mission is to provide reliable products, trusted quality, 
//                 and exceptional customer support that makes your experience smooth and enjoyable.
//               </p>
//             </div>

//             {/* Stats/Features - with React icons */}
//             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiShield className="text-blue-400 text-sm" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-200 text-sm">Premium Quality</h3>
//                   <p className="text-xs text-gray-500">Lab tested products</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiZap className="text-blue-400 text-sm" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-200 text-sm">Innovation</h3>
//                   <p className="text-xs text-gray-500">Latest technology</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiUsers className="text-blue-400 text-sm" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-200 text-sm">Trusted</h3>
//                   <p className="text-xs text-gray-500">10k+ customers</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiSmile className="text-blue-400 text-sm" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-200 text-sm">Satisfaction</h3>
//                   <p className="text-xs text-gray-500">100% guaranteed</p>
//                 </div>
//               </div>
//             </div>

//             {/* Button */}
//             <div className="pt-2">
//               <button className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                                text-white font-medium rounded-lg 
//                                hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 
//                                flex items-center justify-center gap-2
//                                shadow-lg shadow-blue-600/30">
//                 <span>Explore More</span>
//                 <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
//               </button>
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
// };

// export default AboutSection;



import React, { useEffect, useRef } from "react";
import vape from "../../assets/home/9w45ht.png";
import wavesBg from "../../assets/home/download.jfif"; // waves background image yahan add karo
import { FiShield, FiZap, FiUsers, FiSmile, FiArrowRight } from "react-icons/fi";

const AboutSection = () => {
  const contentRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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
    <section className={`relative overflow-hidden py-20 transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`} id="about">
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

      {/* Gradient backgrounds - dynamic based on theme */}
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center opacity-0">
          
          {/* Left Image with up-down animation */}
          <div className="flex justify-center md:justify-start order-1 md:order-1">
            <div className="relative w-full max-w-sm md:max-w-md">
              {/* Glow effect - dynamic */}
              <div className={`absolute inset-0 rounded-full blur-2xl transition-colors duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-t from-blue-700/30 via-cyan-600/20 to-transparent' 
                  : 'bg-gradient-to-t from-blue-200/30 via-cyan-200/20 to-transparent'
              }`}></div>
              
              {/* Image with up-down animation */}
              <img
                src={vape}
                alt="About Vape"
                className="relative w-full h-auto object-contain animate-up-down"
              />

              {/* Decorative wave rings - dynamic */}
              <div className={`absolute -top-6 -left-6 w-24 h-24 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                isDarkMode ? 'border-blue-500/20' : 'border-blue-200/50'
              }`}></div>
              <div className={`absolute -bottom-6 -right-6 w-32 h-32 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                isDarkMode ? 'border-cyan-500/20' : 'border-cyan-200/50'
              }`} style={{ animationDelay: '1s' }}></div>

              {/* Decorative Elements - dynamic */}
              <div className={`absolute -top-3 -left-3 w-16 h-16 border rounded-full transition-colors duration-500 ${
                isDarkMode ? 'border-blue-600/30' : 'border-blue-300/50'
              }`}></div>
              <div className={`absolute -bottom-3 -right-3 w-20 h-20 border rounded-full transition-colors duration-500 ${
                isDarkMode ? 'border-cyan-600/30' : 'border-cyan-300/50'
              }`}></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="order-2 md:order-2 space-y-6">
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
                ABOUT US
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                Passionate About
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Quality & Innovation
              </span>
            </h2>

            {/* Description */}
            <div className={`space-y-4 transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <p className="leading-relaxed">
                We are dedicated to delivering premium vaping products designed 
                for performance, safety, and satisfaction. Our store offers a 
                carefully curated collection of devices and accessories that 
                combine modern technology with elegant design.
              </p>

              <p className="leading-relaxed">
                Whether you're new to vaping or an experienced enthusiast, 
                our mission is to provide reliable products, trusted quality, 
                and exceptional customer support that makes your experience smooth and enjoyable.
              </p>
            </div>

            {/* Stats/Features - with React icons */}
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
                  }`}>Premium Quality</h3>
                  <p className="text-xs text-gray-500">Lab tested products</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <FiZap className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>Innovation</h3>
                  <p className="text-xs text-gray-500">Latest technology</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <FiUsers className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>Trusted</h3>
                  <p className="text-xs text-gray-500">10k+ customers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <FiSmile className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>Satisfaction</h3>
                  <p className="text-xs text-gray-500">100% guaranteed</p>
                </div>
              </div>
            </div>

            {/* Button - remains same as it's gradient */}
            <div className="pt-2">
              <button className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                               text-white font-medium rounded-lg 
                               hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
                               flex items-center justify-center gap-2
                               shadow-lg shadow-blue-600/30">
                <span>Explore More</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
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
      `}</style>
    </section>
  );
};

export default AboutSection;