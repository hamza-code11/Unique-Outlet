// import React, { useState, useEffect, useRef } from "react";
// import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";

// const ContactSection = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

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

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     alert("Message sent successfully!");
//   };

//   return (
//     <section id="contact" className="relative overflow-hidden bg-[#0a0a0f] py-20 md:py-24">
//       {/* Gradient backgrounds - dark theme with blue tones */}
//       <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-cyan-900/30 via-transparent to-transparent rounded-full blur-3xl"></div>
      
//       {/* Dark overlay for depth */}
//       <div className="absolute inset-0 bg-[#0a0a0f]/90"></div>
      
//       <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0">
//         <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
//           {/* Left Info */}
//           <div className="space-y-6">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/50 to-cyan-800/30 
//                           border border-blue-700/50 px-4 py-2 rounded-full">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
//                                bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//               </span>
//               <span className="text-xs sm:text-sm font-medium text-blue-300 tracking-wide">
//                 CONTACT US
//               </span>
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//               <span className="text-white">Get in touch</span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 with us
//               </span>
//             </h2>

//             {/* Description */}
//             <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
//               Have questions about our products or need assistance? 
//               Our team is here to help you. Fill out the form and 
//               we'll get back to you as soon as possible.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-4 pt-4">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiMapPin className="text-blue-400 text-sm" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Address</p>
//                   <p className="text-gray-200 font-medium">202 Helga Springs Rd, Crawford, TN 38554</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiPhone className="text-blue-400 text-sm" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className="text-gray-200 font-medium">800.275.8777</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
//                   <FiMail className="text-blue-400 text-sm" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className="text-gray-200 font-medium">support@vapeshop.com</p>
//                 </div>
//               </div>
//             </div>

//             {/* Trust badge */}
//             {/* <div className="flex items-center gap-2 pt-2">
//               <span className="relative flex h-1.5 w-1.5">
//                 <span className="animate-ping absolute inline-flex h-full w-full 
//                                rounded-full bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
//               </span>
//               <span className="text-xs text-gray-500">Typically replies within 24 hours</span>
//             </div> */}
//           </div>

//           {/* Right Form */}
//           <div className="bg-[#14141f] rounded-2xl border border-gray-800 p-8 shadow-lg">
//             <form onSubmit={handleSubmit} className="space-y-5">
              
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Your Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-800 bg-[#0a0a0f] text-gray-200 rounded-lg 
//                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30
//                            transition-all duration-300 text-sm placeholder-gray-600"
//                 />
//               </div>

//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Your Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-800 bg-[#0a0a0f] text-gray-200 rounded-lg 
//                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30
//                            transition-all duration-300 text-sm placeholder-gray-600"
//                 />
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   name="subject"
//                   placeholder="Subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-800 bg-[#0a0a0f] text-gray-200 rounded-lg 
//                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30
//                            transition-all duration-300 text-sm placeholder-gray-600"
//                 />
//               </div>

//               <div>
//                 <textarea
//                   name="message"
//                   rows="4"
//                   placeholder="Your Message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-800 bg-[#0a0a0f] text-gray-200 rounded-lg 
//                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30
//                            transition-all duration-300 text-sm resize-none placeholder-gray-600"
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="group w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                          text-white font-medium rounded-lg 
//                          hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 
//                          flex items-center justify-center gap-2
//                          shadow-lg shadow-blue-600/30"
//               >
//                 <span>Send Message</span>
//                 <FiSend className="group-hover:translate-x-1 transition-transform duration-300" />
//               </button>

//             </form>
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
//       `}</style>
//     </section>
//   );
// };

// export default ContactSection;































// import React, { useState, useEffect, useRef } from "react";
// import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";

// const ContactSection = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const sectionRef = useRef(null);
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

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     alert("Message sent successfully!");
//   };

//   return (
//     <section id="contact" className={`relative overflow-hidden py-20 md:py-24 transition-colors duration-500 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-white'
//     }`}>
//       {/* Gradient backgrounds - dynamic */}
//       <div className={`absolute top-0 left-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
//         isDarkMode 
//           ? 'bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent' 
//           : 'bg-gradient-to-br from-blue-100/30 via-blue-50/20 to-transparent'
//       }`}></div>
      
//       <div className={`absolute bottom-0 right-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
//         isDarkMode 
//           ? 'bg-gradient-to-tl from-cyan-900/30 via-transparent to-transparent' 
//           : 'bg-gradient-to-tl from-cyan-100/30 via-transparent to-transparent'
//       }`}></div>
      
//       {/* Overlay for depth - dynamic */}
//       <div className={`absolute inset-0 transition-colors duration-500 ${
//         isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
//       }`}></div>
      
//       <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0">
//         <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
//           {/* Left Info */}
//           <div className="space-y-6">
//             {/* Badge */}
//             <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-500 ${
//               isDarkMode 
//                 ? 'bg-gradient-to-r from-blue-900/50 to-cyan-800/30 border border-blue-700/50' 
//                 : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200'
//             }`}>
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
//                                bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//               </span>
//               <span className={`text-xs sm:text-sm font-medium tracking-wide ${
//                 isDarkMode ? 'text-blue-300' : 'text-blue-600'
//               }`}>
//                 CONTACT US
//               </span>
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//               <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
//                 Get in touch
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//                 with us
//               </span>
//             </h2>

//             {/* Description */}
//             <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Have questions about our products or need assistance? 
//               Our team is here to help you. Fill out the form and 
//               we'll get back to you as soon as possible.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-4 pt-4">
//               <div className="flex items-start gap-3">
//                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-800 border-gray-700' 
//                     : 'bg-gray-100 border-gray-200'
//                 }`}>
//                   <FiMapPin className={`text-sm ${
//                     isDarkMode ? 'text-blue-400' : 'text-blue-600'
//                   }`} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Address</p>
//                   <p className={`font-medium transition-colors duration-500 ${
//                     isDarkMode ? 'text-gray-200' : 'text-gray-900'
//                   }`}>202 Helga Springs Rd, Crawford, TN 38554</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-800 border-gray-700' 
//                     : 'bg-gray-100 border-gray-200'
//                 }`}>
//                   <FiPhone className={`text-sm ${
//                     isDarkMode ? 'text-blue-400' : 'text-blue-600'
//                   }`} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className={`font-medium transition-colors duration-500 ${
//                     isDarkMode ? 'text-gray-200' : 'text-gray-900'
//                   }`}>800.275.8777</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-800 border-gray-700' 
//                     : 'bg-gray-100 border-gray-200'
//                 }`}>
//                   <FiMail className={`text-sm ${
//                     isDarkMode ? 'text-blue-400' : 'text-blue-600'
//                   }`} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className={`font-medium transition-colors duration-500 ${
//                     isDarkMode ? 'text-gray-200' : 'text-gray-900'
//                   }`}>support@vapeshop.com</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Form */}
//           <div className={`rounded-2xl border p-8 shadow-lg transition-colors duration-500 ${
//             isDarkMode 
//               ? 'bg-gray-800 border-gray-700' 
//               : 'bg-white border-gray-200'
//           }`}>
//             <form onSubmit={handleSubmit} className="space-y-5">
              
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Your Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className={`w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm
//                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200
//                            ${
//                              isDarkMode 
//                                ? 'border border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
//                                : 'border border-gray-300 bg-white text-gray-900 placeholder-gray-400'
//                            }`}
//                 />
//               </div>

//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Your Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className={`w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm
//                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200
//                            ${
//                              isDarkMode 
//                                ? 'border border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
//                                : 'border border-gray-300 bg-white text-gray-900 placeholder-gray-400'
//                            }`}
//                 />
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   name="subject"
//                   placeholder="Subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className={`w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm
//                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200
//                            ${
//                              isDarkMode 
//                                ? 'border border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
//                                : 'border border-gray-300 bg-white text-gray-900 placeholder-gray-400'
//                            }`}
//                 />
//               </div>

//               <div>
//                 <textarea
//                   name="message"
//                   rows="4"
//                   placeholder="Your Message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   className={`w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm resize-none
//                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200
//                            ${
//                              isDarkMode 
//                                ? 'border border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
//                                : 'border border-gray-300 bg-white text-gray-900 placeholder-gray-400'
//                            }`}
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="group w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                          text-white font-medium rounded-lg 
//                          hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
//                          flex items-center justify-center gap-2
//                          shadow-lg shadow-blue-600/30"
//               >
//                 <span>Send Message</span>
//                 <FiSend className="group-hover:translate-x-1 transition-transform duration-300" />
//               </button>

//             </form>
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
//       `}</style>
//     </section>
//   );
// };

// export default ContactSection;















// src/components/home/ContactSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { FiMapPin, FiMail, FiSend, FiHeadphones } from "react-icons/fi";
import axios from "axios";

import { API_URL, STORAGE_URL } from "../../config";

// Pre-fetch data immediately
let contactDataCache = null;
let dataPromise = null;

// Start fetching data immediately
const fetchData = async () => {
  if (dataPromise) return dataPromise;
  
  dataPromise = axios.get(`${API_URL}/contact-section`, { timeout: 3000 })
    .then(response => {
      if (response.data.success && response.data.contact) {
        contactDataCache = response.data.contact;
      }
      return contactDataCache;
    })
    .catch(() => {
      // Fallback data
      contactDataCache = {
        badge: "Contact Us",
        heading: "Get in Touch",
        paragraph: "Feel free to contact us anytime",
        address: "123 Main Street, New York",
        email: "support@vape.com",
        map_location: "https://maps.google.com/?q=New+York"
      };
      return contactDataCache;
    });
  
  return dataPromise;
};

// Start fetching immediately
fetchData();

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sectionRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [contactData, setContactData] = useState(contactDataCache);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
    if (!contactData) {
      fetchData().then(data => {
        if (data) setContactData(data);
      });
    }
  }, [contactData]);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send data to backend
      const response = await axios.post(`${API_URL}/contact`, {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      console.log("Contact form submitted:", response.data);
      
      // Show success message
      setSubmitStatus('success');
      
      // Clear form
      setFormData({ name: "", email: "", message: "" });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format heading
  const headingParts = contactData?.heading?.split(' ') || ["Get in", "Touch"];
  const firstPart = headingParts.slice(0, 2).join(' ') || "Get in";
  const secondPart = headingParts.slice(2).join(' ') || "Touch";

  return (
    <section id="contact" className={`relative overflow-hidden py-20 md:py-24 transition-opacity duration-700 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    } ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
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
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Info */}
          <div className="space-y-6">
            {/* Badge */}
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
                {contactData?.badge?.toUpperCase() || "CONTACT US"}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                {firstPart}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {secondPart}
              </span>
            </h2>

            {/* Description */}
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {contactData?.paragraph || "Have questions about our products or need assistance? Our team is here to help you."}
            </p>

            {/* Contact Info */}
            <div className="space-y-4 pt-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <FiMapPin className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className={`font-medium transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{contactData?.address || "202 Helga Springs Rd, Crawford, TN 38554"}</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <FiMail className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className={`font-medium transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{contactData?.email || "support@vapeshop.com"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className={`rounded-2xl border p-8 shadow-lg transition-colors duration-500 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm
                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           ${
                             isDarkMode 
                               ? 'border border-gray-600 bg-gray-700 text-white placeholder-gray-400 disabled:bg-gray-800' 
                               : 'border border-gray-300 bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100'
                           }`}
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm
                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           ${
                             isDarkMode 
                               ? 'border border-gray-600 bg-gray-700 text-white placeholder-gray-400 disabled:bg-gray-800' 
                               : 'border border-gray-300 bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100'
                           }`}
                />
              </div>


              {/* Message Textarea */}
              <div>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm resize-none
                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           ${
                             isDarkMode 
                               ? 'border border-gray-600 bg-gray-700 text-white placeholder-gray-400 disabled:bg-gray-800' 
                               : 'border border-gray-300 bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100'
                           }`}
                ></textarea>
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  ✗ Failed to send message. Please try again.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                         text-white font-medium rounded-lg 
                         hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
                         flex items-center justify-center gap-2
                         shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed
                         ${isSubmitting ? 'cursor-wait' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>

            </form>
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
      `}</style>
    </section>
  );
};

export default ContactSection;