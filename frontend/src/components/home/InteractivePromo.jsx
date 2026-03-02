// import React from "react";
// import leftImg from "../assets/home/view-image1.jpg";
// import rightTop from "../assets/home/view-image2.jpg";
// import rightBottom from "../assets/home/view-image3.jpg";
// import { FiShoppingBag, FiGift, FiCompass, FiZap, FiArrowRight } from "react-icons/fi";

// const InteractivePromo = () => {
//   return (
//     <section className="relative overflow-hidden bg-[#0a0a0f] py-16 md:py-20">
//       {/* Simple Background */}
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-cyan-900/10"></div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid md:grid-cols-2 gap-6">
          
//           {/* LEFT BIG CARD */}
//           <div className="relative h-[500px] rounded-2xl overflow-hidden group">
//             {/* Image */}
//             <img
//               src={leftImg}
//               alt="E-Liquid Bundles"
//               className="absolute inset-0 w-full h-full object-cover"
//             />
            
//             {/* Simple Dark Overlay */}
//             <div className="absolute inset-0 bg-black/60"></div>
            
//             {/* Content */}
//             <div className="absolute inset-0 flex flex-col justify-end p-8">
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
//                 The Best E-Liquid Bundles
//               </h2>

//               <p className="text-gray-200 text-sm mb-5 max-w-md">
//                 Explore a wide range of vaping products with fast delivery and beginner-friendly guidance.
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-full text-sm
//                                  hover:bg-blue-700 transition-colors flex items-center gap-2">
//                   <FiShoppingBag className="text-sm" />
//                   <span>Shop Now</span>
//                 </button>

//                 <button className="px-5 py-2.5 border border-blue-400 text-blue-400 
//                                  font-medium rounded-full text-sm
//                                  hover:bg-blue-600 hover:text-white hover:border-blue-600 
//                                  transition-colors flex items-center gap-2">
//                   <FiGift className="text-sm" />
//                   <span>Get 25% Off</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex flex-col gap-6">
            
//             {/* Top Card */}
//             <div className="relative h-[240px] rounded-2xl overflow-hidden group">
//               <img
//                 src={rightTop}
//                 alt="New to vaping"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
              
//               {/* Simple Dark Overlay */}
//               <div className="absolute inset-0 bg-black/60"></div>
              
//               {/* Content */}
//               <div className="absolute inset-0 flex flex-col justify-center p-6">
//                 <h3 className="text-xl font-bold text-white mb-2">
//                   New To Vaping?
//                 </h3>

//                 <p className="text-gray-200 text-sm mb-4">
//                   Learn how vaping works and choose the right starter kit.
//                 </p>

//                 <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-full text-sm w-fit
//                                  hover:bg-blue-700 transition-colors flex items-center gap-2">
//                   <span>Start Here</span>
//                   <FiArrowRight className="text-sm" />
//                 </button>
//               </div>
//             </div>

//             {/* Bottom Card */}
//             <div className="relative h-[240px] rounded-2xl overflow-hidden group">
//               <img
//                 src={rightBottom}
//                 alt="Vap Mode"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
              
//               {/* Simple Dark Overlay */}
//               <div className="absolute inset-0 bg-black/60"></div>
              
//               {/* Content */}
//               <div className="absolute inset-0 flex flex-col justify-center p-6">
//                 <h3 className="text-xl font-bold text-white mb-2">
//                   Vap Mode
//                 </h3>

//                 <p className="text-gray-200 text-sm mb-4">
//                   Discover advanced devices and customize your experience.
//                 </p>

//                 <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-full text-sm w-fit
//                                  hover:bg-blue-700 transition-colors flex items-center gap-2">
//                   <FiShoppingBag className="text-sm" />
//                   <span>Shop Now</span>
//                 </button>
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default InteractivePromo;




import React, { useState, useEffect } from "react";
import leftImg from "../../assets/home/view-image1.jpg";
import rightTop from "../../assets/home/view-image2.jpg";
import rightBottom from "../../assets/home/view-image3.jpg";
import { FiShoppingBag, FiGift, FiCompass, FiZap, FiArrowRight } from "react-icons/fi";

const InteractivePromo = () => {
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

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Background - dynamic */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-blue-900/20 via-transparent to-cyan-900/20' 
          : 'bg-gradient-to-b from-blue-100/30 via-transparent to-cyan-100/30'
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* LEFT BIG CARD */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden group shadow-lg">
            {/* Image */}
            <img
              src={leftImg}
              alt="E-Liquid Bundles"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Dark Overlay - consistent for both themes (images ke liye) */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                The Best E-Liquid Bundles
              </h2>

              <p className="text-gray-200 text-sm mb-5 max-w-md">
                Explore a wide range of vaping products with fast delivery and beginner-friendly guidance.
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-full text-sm
                                 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
                  <FiShoppingBag className="text-sm" />
                  <span>Shop Now</span>
                </button>

                <button className="px-5 py-2.5 border border-white/80 text-white 
                                 font-medium rounded-full text-sm bg-white/10 backdrop-blur-sm
                                 hover:bg-blue-600 hover:text-white hover:border-blue-600 
                                 transition-colors flex items-center gap-2">
                  <FiGift className="text-sm" />
                  <span>Get 25% Off</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">
            
            {/* Top Card */}
            <div className="relative h-[240px] rounded-2xl overflow-hidden group shadow-md">
              <img
                src={rightTop}
                alt="New to vaping"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Dark Overlay - consistent */}
              <div className="absolute inset-0 bg-black/60"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  New To Vaping?
                </h3>

                <p className="text-gray-200 text-sm mb-4">
                  Learn how vaping works and choose the right starter kit.
                </p>

                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-full text-sm w-fit
                                 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
                  <span>Start Here</span>
                  <FiArrowRight className="text-sm" />
                </button>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="relative h-[240px] rounded-2xl overflow-hidden group shadow-md">
              <img
                src={rightBottom}
                alt="Vap Mode"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Dark Overlay - consistent */}
              <div className="absolute inset-0 bg-black/60"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Vap Mode
                </h3>

                <p className="text-gray-200 text-sm mb-4">
                  Discover advanced devices and customize your experience.
                </p>

                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-full text-sm w-fit
                                 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
                  <FiShoppingBag className="text-sm" />
                  <span>Shop Now</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default InteractivePromo;