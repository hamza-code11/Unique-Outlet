// import React, { useEffect, useRef } from "react";
// import user1 from "../assets/home/01.webp";
// import user2 from "../assets/home/02.webp";
// import user3 from "../assets/home/03.webp";
// import { FiStar, FiMessageCircle } from "react-icons/fi";

// const testimonials = [
//   {
//     image: user1,
//     name: "Lisa Smith",
//     role: "Barista",
//     text: "Great! The products are high quality and delivery was super fast. I'm really satisfied with my purchase.",
//     rating: 5,
//   },
//   {
//     image: user2,
//     name: "Andrew Jons",
//     role: "Waiter",
//     text: "Amazing experience shopping here. The customer support team was very helpful and responsive.",
//     rating: 5,
//   },
//   {
//     image: user3,
//     name: "Steve Parker",
//     role: "Project Manager",
//     text: "Professional service and premium products. Highly recommended for anyone looking for reliability.",
//     rating: 4,
//   },
// ];

// const TestimonialSection = () => {
//   const sectionRef = useRef(null);

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
//     <section className="relative overflow-hidden bg-[#0a0a0f] py-20 md:py-24" id="testimonials">
//       {/* Gradient backgrounds - dark theme with blue tones */}
//       <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-blue-900/30 via-blue-800/10 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-tr from-cyan-900/30 via-transparent to-transparent rounded-full blur-3xl"></div>
      
//       {/* Dark overlay for depth */}
//       <div className="absolute inset-0 bg-[#0a0a0f]/90"></div>
      
//       {/* Decorative quote marks */}
//       <div className="absolute top-40 left-20 text-blue-800/20 text-[200px] font-serif select-none">"</div>
//       <div className="absolute bottom-40 right-20 text-cyan-800/20 text-[200px] font-serif select-none">"</div>
      
//       <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0">
        
//         {/* Header Section */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/50 to-cyan-800/30 
//                         border border-blue-700/50 px-4 py-2 rounded-full mb-6">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
//                              bg-blue-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//             </span>
//             <span className="text-xs sm:text-sm font-medium text-blue-300 tracking-wide">
//               TESTIMONIALS
//             </span>
//           </div>

//           {/* Heading */}
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
//             <span className="text-white">Hear from our</span>
//             <br />
//             <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//               happy clients
//             </span>
//           </h2>

//           {/* Description */}
//           <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
//             We offer a wide range of quality products, an easy shopping
//             process, express delivery and first-class service.
//           </p>
//         </div>

//         {/* Testimonials Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {testimonials.map((item, index) => (
//             <div
//               key={index}
//               className="group bg-[#14141f] rounded-2xl p-8
//                        hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 
//                        relative border border-gray-800 hover:border-blue-800/50"
//             >
//               {/* Quote icon */}
//               <div className="absolute top-6 right-6 text-blue-700/30">
//                 <FiMessageCircle className="text-3xl" />
//               </div>

//               {/* User Info */}
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 
//                                 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="relative w-16 h-16 rounded-full object-cover border-2 border-[#14141f] 
//                              shadow-lg group-hover:border-blue-600/50 transition-all duration-300"
//                   />
//                 </div>
//                 <div className="text-left">
//                   <h4 className="font-semibold text-gray-200">
//                     {item.name}
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     {item.role}
//                   </p>
//                 </div>
//               </div>

//               {/* Rating Stars */}
//               <div className="flex items-center gap-0.5 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <FiStar
//                     key={i}
//                     className={`text-base ${
//                       i < item.rating 
//                         ? 'text-blue-400 fill-current' 
//                         : 'text-gray-700'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Testimonial Text */}
//               <p className="text-gray-400 leading-relaxed text-sm italic">
//                 "{item.text}"
//               </p>

//               {/* Bottom gradient line on hover */}
//               {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 
//                             scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"></div> */}
//             </div>
//           ))}
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

// export default TestimonialSection;







import React, { useEffect, useRef, useState } from "react";
import user1 from "../../assets/home/01.webp";
import user2 from "../../assets/home/02.webp";
import user3 from "../../assets/home/03.webp";
import { FiStar, FiMessageCircle } from "react-icons/fi";

const testimonials = [
  {
    image: user1,
    name: "Lisa Smith",
    role: "Barista",
    text: "Great! The products are high quality and delivery was super fast. I'm really satisfied with my purchase.",
    rating: 5,
  },
  {
    image: user2,
    name: "Andrew Jons",
    role: "Waiter",
    text: "Amazing experience shopping here. The customer support team was very helpful and responsive.",
    rating: 5,
  },
  {
    image: user3,
    name: "Steve Parker",
    role: "Project Manager",
    text: "Professional service and premium products. Highly recommended for anyone looking for reliability.",
    rating: 4,
  },
];

const TestimonialSection = () => {
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
    <section className={`relative overflow-hidden py-20 md:py-24 transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`} id="testimonials">
      {/* Gradient backgrounds - dynamic */}
      <div className={`absolute top-0 right-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-bl from-blue-900/30 via-blue-800/10 to-transparent' 
          : 'bg-gradient-to-bl from-blue-100/30 via-blue-50/20 to-transparent'
      }`}></div>
      
      <div className={`absolute bottom-0 left-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-tr from-cyan-900/30 via-transparent to-transparent' 
          : 'bg-gradient-to-tr from-cyan-100/30 via-transparent to-transparent'
      }`}></div>
      
      {/* Overlay for depth - dynamic */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
      }`}></div>
      
      {/* Decorative quote marks - dynamic */}
      <div className={`absolute top-40 left-20 text-[200px] font-serif select-none transition-colors duration-500 ${
        isDarkMode ? 'text-blue-800/20' : 'text-blue-200/50'
      }`}>"</div>
      
      <div className={`absolute bottom-40 right-20 text-[200px] font-serif select-none transition-colors duration-500 ${
        isDarkMode ? 'text-cyan-800/20' : 'text-cyan-200/50'
      }`}>"</div>
      
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge - dynamic */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-colors duration-500 ${
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
              TESTIMONIALS
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              Hear from our
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              happy clients
            </span>
          </h2>

          {/* Description */}
          <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            We offer a wide range of quality products, an easy shopping
            process, express delivery and first-class service.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl p-8 transition-all duration-300 
                       relative border ${
                         isDarkMode 
                           ? 'bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-blue-900/30 hover:border-blue-700' 
                           : 'bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-300'
                       }`}
            >
              {/* Quote icon - dynamic */}
              <div className={`absolute top-6 right-6 transition-colors duration-500 ${
                isDarkMode ? 'text-blue-600/30' : 'text-blue-200/80'
              }`}>
                <FiMessageCircle className="text-3xl" />
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 
                                rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`relative w-16 h-16 rounded-full object-cover border-2 shadow-lg 
                              transition-all duration-300 group-hover:border-blue-300 ${
                                isDarkMode 
                                  ? 'border-gray-700' 
                                  : 'border-white'
                              }`}
                  />
                </div>
                <div className="text-left">
                  <h4 className={`font-semibold transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-base ${
                      i < item.rating 
                        ? 'text-blue-500 fill-current' 
                        : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className={`leading-relaxed text-sm italic transition-colors duration-500 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                "{item.text}"
              </p>
            </div>
          ))}
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

export default TestimonialSection;