// import React, { useState, useEffect, useRef } from "react";
// import vape from "../assets/home/faq-vape-sec-768x993.png";
// import wavesBg from "../assets/home/faq.jfif"; // waves background image yahan add karo
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// const FaqSection = () => {
//   const [openIndex, setOpenIndex] = useState(0);
//   const contentRef = useRef(null);

//   const faqs = [
//     {
//       question: "When will my order be delivered?",
//       answer:
//         "Orders are typically delivered within 3–5 business days depending on your location. You will receive tracking details once your order is shipped.",
//     },
//     {
//       question: "How to charge a vape device?",
//       answer:
//         "Use the provided USB cable and connect it to a safe power source. Avoid overcharging to maintain battery life.",
//     },
//     {
//       question: "I am a beginner, how do I start vaping?",
//       answer:
//         "Start with a beginner-friendly starter kit and low nicotine strength. Our team can help you choose the right product.",
//     },
//   ];

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

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="relative overflow-hidden bg-[#0a0a0f] py-20 md:py-24" id="faq">
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
          
//           {/* Left Image */}
//           <div className="flex justify-center order-1 md:order-1">
//             <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
//               {/* Glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-t from-blue-700/30 
//                             via-cyan-600/20 to-transparent rounded-full blur-3xl"></div>
              
//               {/* Image with up-down animation */}
//               <img
//                 src={vape}
//                 alt="FAQ Vape Device"
//                 className="relative w-full h-auto max-h-[350px] md:max-h-[400px] object-contain animate-up-down drop-shadow-xl"
//               />

//               {/* Decorative wave rings */}
//               <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-blue-500/20 rounded-full animate-ping-slow"></div>
//               <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-cyan-500/20 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>

//               {/* Decorative Elements */}
//               <div className="absolute -top-3 -right-3 w-12 h-12 border border-blue-600/30 rounded-full"></div>
//               <div className="absolute -bottom-3 -left-3 w-16 h-16 border border-cyan-600/30 rounded-full"></div>
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
//                 FAQ
//               </span>
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//               <span className="text-white">Feel free to ask</span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 more questions
//               </span>
//             </h2>

//             {/* FAQ Accordion */}
//             <div className="space-y-3 pt-2">
//               {faqs.map((faq, index) => (
//                 <div
//                   key={index}
//                   className="border-b border-gray-800 pb-3"
//                 >
//                   <button
//                     className="w-full flex justify-between items-center py-2 text-left focus:outline-none"
//                     onClick={() => toggleFAQ(index)}
//                     onMouseEnter={(e) => e.preventDefault()}
//                   >
//                     <h3 className="text-base md:text-lg font-semibold text-gray-200 pr-4">
//                       {faq.question}
//                     </h3>
//                     <span className="text-blue-400 text-xl flex-shrink-0">
//                       {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
//                     </span>
//                   </button>

//                   {openIndex === index && (
//                     <div className="mt-2 pb-2">
//                       <p className="text-gray-400 leading-relaxed text-sm md:text-base">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Additional Trust Indicator */}
//             <div className="pt-4 flex items-center gap-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full 
//                             flex items-center justify-center text-white text-xs font-bold">
//                 ?
//               </div>
//               <span className="text-sm text-gray-400">
//                 Can't find your answer? <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Contact us</button>
//               </span>
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

// export default FaqSection;







// import React, { useState, useEffect, useRef } from "react";
// import vape from "../assets/home/faq-vape-sec-768x993.png";
// import wavesBg from "../assets/home/faq.jfif"; // waves background image yahan add karo
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// const FaqSection = () => {
//   const [openIndex, setOpenIndex] = useState(0);
//   const contentRef = useRef(null);

//   const faqs = [
//     {
//       question: "When will my order be delivered?",
//       answer:
//         "Orders are typically delivered within 3–5 business days depending on your location. You will receive tracking details once your order is shipped.",
//     },
//     {
//       question: "How to charge a vape device?",
//       answer:
//         "Use the provided USB cable and connect it to a safe power source. Avoid overcharging to maintain battery life.",
//     },
//     {
//       question: "I am a beginner, how do I start vaping?",
//       answer:
//         "Start with a beginner-friendly starter kit and low nicotine strength. Our team can help you choose the right product.",
//     },
//   ];

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

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="relative overflow-hidden bg-[#0a0a0f] py-20 md:py-24" id="faq">
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
          
//           {/* Left Image */}
//           <div className="flex justify-center order-1 md:order-1">
//             <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
//               {/* Glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-t from-blue-700/30 
//                             via-cyan-600/20 to-transparent rounded-full blur-3xl"></div>
              
//               {/* Image with up-down animation */}
//               <img
//                 src={vape}
//                 alt="FAQ Vape Device"
//                 className="relative w-full h-auto max-h-[350px] md:max-h-[400px] object-contain animate-up-down drop-shadow-xl"
//               />

//               {/* Decorative wave rings */}
//               <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-blue-500/20 rounded-full animate-ping-slow"></div>
//               <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-cyan-500/20 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>

//               {/* Decorative Elements */}
//               <div className="absolute -top-3 -right-3 w-12 h-12 border border-blue-600/30 rounded-full"></div>
//               <div className="absolute -bottom-3 -left-3 w-16 h-16 border border-cyan-600/30 rounded-full"></div>
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
//                 FAQ
//               </span>
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//               <span className="text-white">Feel free to ask</span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 more questions
//               </span>
//             </h2>

//             {/* FAQ Accordion */}
//             <div className="space-y-3 pt-2">
//               {faqs.map((faq, index) => (
//                 <div
//                   key={index}
//                   className="border-b border-gray-800 pb-3"
//                 >
//                   <button
//                     className="w-full flex justify-between items-center py-2 text-left focus:outline-none"
//                     onClick={() => toggleFAQ(index)}
//                     onMouseEnter={(e) => e.preventDefault()}
//                   >
//                     <h3 className="text-base md:text-lg font-semibold text-gray-200 pr-4">
//                       {faq.question}
//                     </h3>
//                     <span className="text-blue-400 text-xl flex-shrink-0">
//                       {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
//                     </span>
//                   </button>

//                   {openIndex === index && (
//                     <div className="mt-2 pb-2">
//                       <p className="text-gray-400 leading-relaxed text-sm md:text-base">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Additional Trust Indicator */}
//             <div className="pt-4 flex items-center gap-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full 
//                             flex items-center justify-center text-white text-xs font-bold">
//                 ?
//               </div>
//               <span className="text-sm text-gray-400">
//                 Can't find your answer? <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Contact us</button>
//               </span>
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

// export default FaqSection;





import React, { useState, useEffect, useRef } from "react";
import vape from "../../assets/home/faq-vape-sec-768x993.png";
import wavesBg from "../../assets/home/faq.jfif"; // waves background image yahan add karo
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const contentRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Define faqs array here
  const faqs = [
    {
      question: "When will my order be delivered?",
      answer:
        "Orders are typically delivered within 3–5 business days depending on your location. You will receive tracking details once your order is shipped.",
    },
    {
      question: "How to charge a vape device?",
      answer:
        "Use the provided USB cable and connect it to a safe power source. Avoid overcharging to maintain battery life.",
    },
    {
      question: "I am a beginner, how do I start vaping?",
      answer:
        "Start with a beginner-friendly starter kit and low nicotine strength. Our team can help you choose the right product.",
    },
  ];

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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`} id="faq">
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
          
          {/* Left Image */}
          <div className="flex justify-center order-1 md:order-1">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
              {/* Glow effect - dynamic */}
              <div className={`absolute inset-0 rounded-full blur-3xl transition-colors duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-t from-blue-700/30 via-cyan-600/20 to-transparent' 
                  : 'bg-gradient-to-t from-blue-200/30 via-cyan-200/20 to-transparent'
              }`}></div>
              
              {/* Image with up-down animation */}
              <img
                src={vape}
                alt="FAQ Vape Device"
                className="relative w-full h-auto max-h-[350px] md:max-h-[400px] object-contain animate-up-down drop-shadow-xl"
              />

              {/* Decorative wave rings - dynamic */}
              <div className={`absolute -top-6 -right-6 w-24 h-24 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                isDarkMode ? 'border-blue-500/20' : 'border-blue-200/50'
              }`}></div>
              <div className={`absolute -bottom-6 -left-6 w-32 h-32 border-2 rounded-full animate-ping-slow transition-colors duration-500 ${
                isDarkMode ? 'border-cyan-500/20' : 'border-cyan-200/50'
              }`} style={{ animationDelay: '1s' }}></div>

              {/* Decorative Elements - dynamic */}
              <div className={`absolute -top-3 -right-3 w-12 h-12 border rounded-full transition-colors duration-500 ${
                isDarkMode ? 'border-blue-600/30' : 'border-blue-300/50'
              }`}></div>
              <div className={`absolute -bottom-3 -left-3 w-16 h-16 border rounded-full transition-colors duration-500 ${
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
                FAQ
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                Feel free to ask
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                more questions
              </span>
            </h2>

            {/* FAQ Accordion */}
            <div className="space-y-3 pt-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border-b pb-3 transition-colors duration-500 ${
                    isDarkMode ? 'border-gray-800' : 'border-gray-200'
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-center py-2 text-left focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                    onMouseEnter={(e) => e.preventDefault()}
                  >
                    <h3 className={`text-base md:text-lg font-semibold pr-4 transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {faq.question}
                    </h3>
                    <span className={`text-xl flex-shrink-0 transition-colors duration-500 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </button>

                  {openIndex === index && (
                    <div className="mt-2 pb-2">
                      <p className={`leading-relaxed text-sm md:text-base transition-colors duration-500 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Trust Indicator */}
            <div className="pt-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full 
                            flex items-center justify-center text-white text-xs font-bold">
                ?
              </div>
              <span className={`text-sm transition-colors duration-500 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Can't find your answer?{' '}
                <button className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}>
                  Contact us
                </button>
              </span>
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

export default FaqSection;