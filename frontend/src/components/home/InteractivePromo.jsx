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







// import React, { useState, useEffect } from "react";
// import leftImg from "../../assets/home/view-image1.jpg";
// import rightTop from "../../assets/home/view-image2.jpg";
// import rightBottom from "../../assets/home/view-image3.jpg";
// import { FiShoppingBag, FiGift, FiCompass, FiZap, FiArrowRight } from "react-icons/fi";

// const InteractivePromo = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Check for dark mode class on html element
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };

//     // Initial check
//     checkDarkMode();

//     // Observe changes to html class
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className={`relative overflow-hidden py-16 md:py-20 transition-colors duration-500 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-white'
//     }`}>
//       {/* Background - dynamic */}
//       <div className={`absolute inset-0 transition-colors duration-500 ${
//         isDarkMode 
//           ? 'bg-gradient-to-b from-blue-900/20 via-transparent to-cyan-900/20' 
//           : 'bg-gradient-to-b from-blue-100/30 via-transparent to-cyan-100/30'
//       }`}></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid md:grid-cols-2 gap-6">

//           {/* LEFT BIG CARD */}
//           <div className="relative h-[500px] rounded-2xl overflow-hidden group shadow-lg">
//             {/* Image */}
//             <img
//               src={leftImg}
//               alt="E-Liquid Bundles"
//               className="absolute inset-0 w-full h-full object-cover"
//             />

//             {/* Dark Overlay - consistent for both themes (images ke liye) */}
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
//                                  hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
//                   <FiShoppingBag className="text-sm" />
//                   <span>Shop Now</span>
//                 </button>

//                 <button className="px-5 py-2.5 border border-white/80 text-white 
//                                  font-medium rounded-full text-sm bg-white/10 backdrop-blur-sm
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
//             <div className="relative h-[240px] rounded-2xl overflow-hidden group shadow-md">
//               <img
//                 src={rightTop}
//                 alt="New to vaping"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />

//               {/* Dark Overlay - consistent */}
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
//                                  hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
//                   <span>Start Here</span>
//                   <FiArrowRight className="text-sm" />
//                 </button>
//               </div>
//             </div>

//             {/* Bottom Card */}
//             <div className="relative h-[240px] rounded-2xl overflow-hidden group shadow-md">
//               <img
//                 src={rightBottom}
//                 alt="Vap Mode"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />

//               {/* Dark Overlay - consistent */}
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
//                                  hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
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











// // src/components/home/InteractivePromo.jsx
// import React, { useState, useEffect } from "react";
// import leftImg from "../../assets/home/view-image1.jpg";
// import rightTop from "../../assets/home/view-image2.jpg";
// import rightBottom from "../../assets/home/view-image3.jpg";
// import { FiShoppingBag, FiGift, FiArrowRight } from "react-icons/fi";
// import axios from "axios";

// // Pre-fetch data immediately
// let promoDataCache = null;
// let dataPromise = null;

// // Start fetching data immediately
// const fetchData = async () => {
//   if (dataPromise) return dataPromise;

//   dataPromise = axios.get('http://127.0.0.1:8000/api/interactive-promo', { timeout: 3000 })
//     .then(response => {
//       if (response.data.success && response.data.promo) {
//         promoDataCache = response.data.promo;
//       }
//       return promoDataCache;
//     })
//     .catch(() => {
//       // Fallback data
//       promoDataCache = {
//         left_image: "interactive/6aKXmeb6iM2afnzUJW2wGHDGvswWdnNVUaZ8R9HD.jpg",
//         left_heading: "The Best E-Liquid Bundles",
//         left_paragraph: "Explore a wide range of vaping products with fast delivery and beginner-friendly guidance.",
//         left_button_text: "Shop Now",
//         right_top_image: "interactive/oraSrvBLbNR6kzpGB3MnPLkHcJRBxQHbwWfVqz4D.jpg",
//         right_top_heading: "New To Vaping?",
//         right_top_paragraph: "Learn how vaping works and choose the right starter kit.",
//         right_top_button_text: "Shop Now",
//         right_bottom_image: "interactive/K0nhlPLpmGS4TJ2VcqvEOaVvmYPR1v1ato7M6tOq.jpg",
//         right_bottom_heading: "Vap Mode",
//         right_bottom_paragraph: "Discover advanced devices and customize your experience.",
//         right_bottom_button_text: "Shop Now"
//       };
//       return promoDataCache;
//     });

//   return dataPromise;
// };

// // Start fetching immediately
// fetchData();

// const InteractivePromo = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [promoData, setPromoData] = useState(promoDataCache);
//   const [isVisible, setIsVisible] = useState(false);

//   // Check for dark mode
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };

//     checkDarkMode();
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

//     return () => observer.disconnect();
//   }, []);

//   // Show component immediately with smooth fade
//   useEffect(() => {
//     const raf = requestAnimationFrame(() => {
//       setIsVisible(true);
//     });
//     return () => cancelAnimationFrame(raf);
//   }, []);

//   // Get data if not already cached
//   useEffect(() => {
//     if (!promoData) {
//       fetchData().then(data => {
//         if (data) setPromoData(data);
//       });
//     }
//   }, [promoData]);

//   // Construct image URLs
//   const leftImageUrl = promoData?.left_image 
//     ? `http://127.0.0.1:8000/storage/${promoData.left_image}`
//     : leftImg;

//   const rightTopImageUrl = promoData?.right_top_image 
//     ? `http://127.0.0.1:8000/storage/${promoData.right_top_image}`
//     : rightTop;

//   const rightBottomImageUrl = promoData?.right_bottom_image 
//     ? `http://127.0.0.1:8000/storage/${promoData.right_bottom_image}`
//     : rightBottom;

//   return (
//     <section className={`relative overflow-hidden py-16 md:py-20 transition-opacity duration-700 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-white'
//     } ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

//       {/* Background - dynamic */}
//       <div className={`absolute inset-0 transition-colors duration-500 ${
//         isDarkMode 
//           ? 'bg-gradient-to-b from-blue-900/20 via-transparent to-cyan-900/20' 
//           : 'bg-gradient-to-b from-blue-100/30 via-transparent to-cyan-100/30'
//       }`}></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid md:grid-cols-2 gap-6">

//           {/* LEFT BIG CARD */}
//           <div className="relative h-[500px] rounded-2xl overflow-hidden group shadow-lg">
//             {/* Image */}
//             <img
//               src={leftImageUrl}
//               alt={promoData?.left_heading || "E-Liquid Bundles"}
//               className="absolute inset-0 w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.src = leftImg; // fallback to local image
//               }}
//             />

//             {/* Dark Overlay - consistent for both themes */}
//             <div className="absolute inset-0 bg-black/60"></div>

//             {/* Content */}
//             <div className="absolute inset-0 flex flex-col justify-end p-8">
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
//                 {promoData?.left_heading || "The Best E-Liquid Bundles"}
//               </h2>

//               <p className="text-gray-200 text-sm mb-5 max-w-md">
//                 {promoData?.left_paragraph || "Explore a wide range of vaping products with fast delivery and beginner-friendly guidance."}
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-full text-sm
//                                  hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
//                   <FiShoppingBag className="text-sm" />
//                   <span>{promoData?.left_button_text || "Shop Now"}</span>
//                 </button>

//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex flex-col gap-6">

//             {/* Top Card */}
//             <div className="relative h-[240px] rounded-2xl overflow-hidden group shadow-md">
//               <img
//                 src={rightTopImageUrl}
//                 alt={promoData?.right_top_heading || "New to vaping"}
//                 className="absolute inset-0 w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.src = rightTop; // fallback to local image
//                 }}
//               />

//               {/* Dark Overlay - consistent */}
//               <div className="absolute inset-0 bg-black/60"></div>

//               {/* Content */}
//               <div className="absolute inset-0 flex flex-col justify-center p-6">
//                 <h3 className="text-xl font-bold text-white mb-2">
//                   {promoData?.right_top_heading || "New To Vaping?"}
//                 </h3>

//                 <p className="text-gray-200 text-sm mb-4">
//                   {promoData?.right_top_paragraph || "Learn how vaping works and choose the right starter kit."}
//                 </p>

//                 <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-full text-sm w-fit
//                                  hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
//                   <span>{promoData?.right_top_button_text || "Start Here"}</span>
//                   <FiArrowRight className="text-sm" />
//                 </button>
//               </div>
//             </div>

//             {/* Bottom Card */}
//             <div className="relative h-[240px] rounded-2xl overflow-hidden group shadow-md">
//               <img
//                 src={rightBottomImageUrl}
//                 alt={promoData?.right_bottom_heading || "Vap Mode"}
//                 className="absolute inset-0 w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.src = rightBottom; // fallback to local image
//                 }}
//               />

//               {/* Dark Overlay - consistent */}
//               <div className="absolute inset-0 bg-black/60"></div>

//               {/* Content */}
//               <div className="absolute inset-0 flex flex-col justify-center p-6">
//                 <h3 className="text-xl font-bold text-white mb-2">
//                   {promoData?.right_bottom_heading || "Vap Mode"}
//                 </h3>

//                 <p className="text-gray-200 text-sm mb-4">
//                   {promoData?.right_bottom_paragraph || "Discover advanced devices and customize your experience."}
//                 </p>

//                 <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-full text-sm w-fit
//                                  hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
//                   <FiShoppingBag className="text-sm" />
//                   <span>{promoData?.right_bottom_button_text || "Shop Now"}</span>
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






// src/components/home/InteractivePromo.jsx
import React, { useState, useEffect } from "react";
import leftImg from "../../assets/home/view-image1.jpg";
import rightTop from "../../assets/home/view-image2.jpg";
import rightBottom from "../../assets/home/view-image3.jpg";
import { FiShoppingBag, FiGift, FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { API_URL, STORAGE_URL } from "../../config";

// Pre-fetch data immediately
let promoDataCache = null;
let dataPromise = null;

// Start fetching data immediately
const fetchData = async () => {
  if (dataPromise) return dataPromise;

  dataPromise = axios.get(`${API_URL}/interactive-promo`, { timeout: 3000 })
    .then(response => {
      if (response.data.success && response.data.promo) {
        promoDataCache = response.data.promo;
      }
      return promoDataCache;
    })
    .catch(() => {
      // Fallback data
      promoDataCache = {
        left_image: "interactive/6aKXmeb6iM2afnzUJW2wGHDGvswWdnNVUaZ8R9HD.jpg",
        left_heading: "The Best E-Liquid Bundles",
        left_paragraph: "Explore a wide range of vaping products with fast delivery and beginner-friendly guidance.",
        left_button_text: "Shop Now",
        right_top_image: "interactive/oraSrvBLbNR6kzpGB3MnPLkHcJRBxQHbwWfVqz4D.jpg",
        right_top_heading: "New To Vaping?",
        right_top_paragraph: "Learn how vaping works and choose the right starter kit.",
        right_top_button_text: "Shop Now",
        right_bottom_image: "interactive/K0nhlPLpmGS4TJ2VcqvEOaVvmYPR1v1ato7M6tOq.jpg",
        right_bottom_heading: "Vap Mode",
        right_bottom_paragraph: "Discover advanced devices and customize your experience.",
        right_bottom_button_text: "Shop Now"
      };
      return promoDataCache;
    });

  return dataPromise;
};

// Start fetching immediately
fetchData();

const InteractivePromo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [promoData, setPromoData] = useState(promoDataCache);
  const [isVisible, setIsVisible] = useState(false);

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

  // Show component immediately with smooth fade
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Get data if not already cached
  useEffect(() => {
    if (!promoData) {
      fetchData().then(data => {
        if (data) setPromoData(data);
      });
    }
  }, [promoData]);

  // Construct image URLs
  const leftImageUrl = promoData?.left_image
    ? `${STORAGE_URL}/${promoData.left_image}`
    : leftImg;

  const rightTopImageUrl = promoData?.right_top_image
    ? `${STORAGE_URL}/${promoData.right_top_image}`
    : rightTop;

  const rightBottomImageUrl = promoData?.right_bottom_image
    ? `${STORAGE_URL}/${promoData.right_bottom_image}`
    : rightBottom;

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 transition-opacity duration-700 ${isDarkMode ? 'bg-gray-900' : 'bg-white'
      } ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Background - dynamic */}
      <div className={`absolute inset-0 transition-colors duration-500 ${isDarkMode
        ? 'bg-gradient-to-b from-blue-900/20 via-transparent to-cyan-900/20'
        : 'bg-gradient-to-b from-blue-100/30 via-transparent to-cyan-100/30'
        }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT BIG CARD */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden group shadow-lg">
            {/* Image */}
            <img
              src={leftImageUrl}
              alt={promoData?.left_heading || "E-Liquid Bundles"}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = leftImg; // fallback to local image
              }}
            />

            {/* Content with semi-transparent background for text readability */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              {/* Semi-transparent background for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Text content - positioned above the gradient */}
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {promoData?.left_heading || "The Best E-Liquid Bundles"}
                </h2>

                <p className="text-gray-200 text-sm mb-5 max-w-md">
                  {promoData?.left_paragraph || "Explore a wide range of vaping products with fast delivery and beginner-friendly guidance."}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    className="px-5 py-2.5 text-black font-medium rounded-full text-sm
             transition-all duration-300 transform hover:scale-105
             flex items-center gap-2 shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #90ff00 0%, #d7fe00 100%)'
                    }}
                  >
                    <FiShoppingBag className="text-sm" />
                    <span>{promoData?.left_button_text || "Shop Now"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">

            {/* Top Card */}
            <div className="relative h-[240px] rounded-2xl overflow-hidden group shadow-md">
              <img
                src={rightTopImageUrl}
                alt={promoData?.right_top_heading || "New to vaping"}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = rightTop; // fallback to local image
                }}
              />

              {/* Content with semi-transparent background */}
              <div className="absolute inset-0 flex flex-col justify-center p-6">
                {/* Semi-transparent background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

                {/* Text content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {promoData?.right_top_heading || "New To Vaping?"}
                  </h3>

                  <p className="text-gray-200 text-sm mb-4">
                    {promoData?.right_top_paragraph || "Learn how vaping works and choose the right starter kit."}
                  </p>

                  <button
                    className="px-5 py-2.5 text-black font-medium rounded-full text-sm
             transition-all duration-300 transform hover:scale-105
             flex items-center gap-2 shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #90ff00 0%, #d7fe00 100%)'
                    }}>
                    <span>{promoData?.right_top_button_text || "Shop Now"}</span>
                    <FiArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="relative h-[240px] rounded-2xl overflow-hidden group shadow-md">
              <img
                src={rightBottomImageUrl}
                alt={promoData?.right_bottom_heading || "Vap Mode"}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = rightBottom; // fallback to local image
                }}
              />

              {/* Content with semi-transparent background */}
              <div className="absolute inset-0 flex flex-col justify-center p-6">
                {/* Semi-transparent background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

                {/* Text content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {promoData?.right_bottom_heading || "Vap Mode"}
                  </h3>

                  <p className="text-gray-200 text-sm mb-4">
                    {promoData?.right_bottom_paragraph || "Discover advanced devices and customize your experience."}
                  </p>

                  <button
                    className="px-5 py-2.5 text-black font-medium rounded-full text-sm
             transition-all duration-300 transform hover:scale-105
             flex items-center gap-2 shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #90ff00 0%, #d7fe00 100%)'
                    }}>
                    <FiShoppingBag className="text-sm" />
                    <span>{promoData?.right_bottom_button_text || "Shop Now"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePromo;