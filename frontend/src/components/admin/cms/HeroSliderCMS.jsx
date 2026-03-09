// import React, { useState, useRef } from "react";
// import { 
//   FiImage, FiEye, FiEyeOff, FiChevronUp, 
//   FiChevronDown, FiPlus, FiTrash2, FiUpload,
//   FiMove, FiCopy, FiCheck, FiX, FiCamera
// } from "react-icons/fi";

// const HeroSliderCMS = ({ isDarkMode, isVisible }) => {
//   const fileInputRef = useRef(null);
//   const [uploadingId, setUploadingId] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   // Hero Section Slider Data
//   const [heroSlides, setHeroSlides] = useState([
//     {
//       id: 1,
//       brand: "WAVES",
//       title: "Ride the waves of",
//       highlight: "smooth vaping",
//       description: "Premium Waves vaping products curated for enthusiasts. Quality you can trust, support you deserve.",
//       badge: "WAVES COLLECTION • 25% OFF",
//       buttonText: "Shop Waves Collection",
//       demoText: "Watch Waves Demo",
//       image: "/assets/home/01.png",
//       imagePreview: null,
//       active: true,
//       order: 1
//     },
//     {
//       id: 2,
//       brand: "ACCORCIES",
//       title: "Discover premium",
//       highlight: "vape accessories",
//       description: "Complete your setup with our premium accessories. From coils to chargers, we have everything you need.",
//       badge: "ACCORCIES • UP TO 40% OFF",
//       buttonText: "Shop Accessories",
//       demoText: "View Accessories",
//       image: "/assets/home/p5.png",
//       imagePreview: null,
//       active: true,
//       order: 2
//     },
//     {
//       id: 3,
//       brand: "LIMITED",
//       title: "Limited edition",
//       highlight: "starter kits",
//       description: "Get started with our specially curated starter kits. Perfect for beginners and enthusiasts alike.",
//       badge: "LIMITED EDITION • WHILE STOCKS LAST",
//       buttonText: "Shop Starter Kits",
//       demoText: "Learn More",
//       image: "/assets/home/p7.png",
//       imagePreview: null,
//       active: true,
//       order: 3
//     }
//   ]);

//   const moveSlide = (id, direction) => {
//     setHeroSlides(prev => {
//       const index = prev.findIndex(s => s.id === id);
//       if (direction === 'up' && index > 0) {
//         const newSlides = [...prev];
//         [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
//         return newSlides;
//       }
//       if (direction === 'down' && index < prev.length - 1) {
//         const newSlides = [...prev];
//         [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
//         return newSlides;
//       }
//       return prev;
//     });
//   };

//   const addHeroSlide = () => {
//     const newId = Math.max(...heroSlides.map(s => s.id), 0) + 1;
//     setHeroSlides([...heroSlides, {
//       id: newId,
//       brand: "NEW SLIDE",
//       title: "New Slide Title",
//       highlight: "new highlight",
//       description: "New slide description",
//       badge: "NEW • 10% OFF",
//       buttonText: "Shop Now",
//       demoText: "Watch Demo",
//       image: "",
//       imagePreview: null,
//       active: true,
//       order: heroSlides.length + 1
//     }]);
//   };

//   const duplicateSlide = (id) => {
//     const slideToCopy = heroSlides.find(s => s.id === id);
//     const newId = Math.max(...heroSlides.map(s => s.id), 0) + 1;
//     setHeroSlides([...heroSlides, {
//       ...slideToCopy,
//       id: newId,
//       title: `${slideToCopy.title} (Copy)`,
//       order: heroSlides.length + 1
//     }]);
//   };

//   const deleteHeroSlide = (id) => {
//     if (heroSlides.length <= 1) {
//       alert("At least one slide must remain");
//       return;
//     }
//     setHeroSlides(prev => prev.filter(s => s.id !== id));
//   };

//   const updateSlide = (id, field, value) => {
//     setHeroSlides(prev => 
//       prev.map(slide => 
//         slide.id === id ? { ...slide, [field]: value } : slide
//       )
//     );
//   };

//   const handleImageUpload = (id, file) => {
//     if (!file) return;

//     // Check file size (max 2MB)
//     if (file.size > 2 * 1024 * 1024) {
//       alert("File size must be less than 2MB");
//       return;
//     }

//     // Check file type
//     if (!file.type.startsWith('image/')) {
//       alert("Please upload an image file");
//       return;
//     }

//     setUploadingId(id);

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       // Here you would typically upload to server and get URL
//       // For now, we'll use the preview as the image
//       setTimeout(() => {
//         updateSlide(id, 'image', reader.result);
//         updateSlide(id, 'imagePreview', reader.result);
//         setUploadingId(null);
//       }, 500);
//     };
//     reader.readAsDataURL(file);
//   };

//   const triggerFileInput = (id) => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//       setPreviewImage(id);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Hidden file input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           if (previewImage && e.target.files[0]) {
//             handleImageUpload(previewImage, e.target.files[0]);
//           }
//         }}
//       />

//       {/* Header with stats */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Hero Slider Manager
//           </h2>
//           <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             {heroSlides.length} slide{heroSlides.length !== 1 ? 's' : ''} • {heroSlides.filter(s => s.active).length} active
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {!isVisible && (
//             <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
//               Section Hidden
//             </span>
//           )}
//           <button 
//             onClick={addHeroSlide} 
//             className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/30"
//           >
//             <FiPlus /> Add New Slide
//           </button>
//         </div>
//       </div>

//       {/* Slides Grid */}
//       <div className="grid grid-cols-1 gap-6">
//         {heroSlides.map((slide, index) => (
//           <div 
//             key={slide.id} 
//             className={`relative rounded-xl border overflow-hidden transition-all duration-300 ${
//               isDarkMode 
//                 ? slide.active ? 'border-blue-500/30 bg-gray-800/90' : 'border-gray-700 bg-gray-800/50 opacity-60'
//                 : slide.active ? 'border-blue-200 bg-white shadow-md' : 'border-gray-200 bg-gray-50 opacity-60'
//             }`}
//           >
//             {/* Slide Header */}
//             <div className={`px-5 py-3 flex items-center justify-between border-b ${
//               isDarkMode ? 'border-gray-700' : 'border-gray-200'
//             } ${slide.active ? '' : 'opacity-75'}`}>
//               <div className="flex items-center gap-3">
//                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//                   isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//                 }`}>
//                   <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                     {index + 1}
//                   </span>
//                 </div>
//                 <div>
//                   <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {slide.brand}
//                   </h3>
//                   <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                     ID: {slide.id} • Order: {slide.order}
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-1">
//                 {/* Move Up/Down */}
//                 <button 
//                   onClick={() => moveSlide(slide.id, 'up')} 
//                   disabled={index === 0} 
//                   className={`p-2 rounded-lg transition-colors ${
//                     index === 0 
//                       ? 'opacity-30 cursor-not-allowed' 
//                       : isDarkMode 
//                         ? 'hover:bg-gray-700 text-gray-300' 
//                         : 'hover:bg-gray-100 text-gray-600'
//                   }`}
//                   title="Move Up"
//                 >
//                   <FiChevronUp className="text-lg" />
//                 </button>
//                 <button 
//                   onClick={() => moveSlide(slide.id, 'down')} 
//                   disabled={index === heroSlides.length - 1} 
//                   className={`p-2 rounded-lg transition-colors ${
//                     index === heroSlides.length - 1 
//                       ? 'opacity-30 cursor-not-allowed' 
//                       : isDarkMode 
//                         ? 'hover:bg-gray-700 text-gray-300' 
//                         : 'hover:bg-gray-100 text-gray-600'
//                   }`}
//                   title="Move Down"
//                 >
//                   <FiChevronDown className="text-lg" />
//                 </button>

//                 {/* Duplicate */}
//                 <button 
//                   onClick={() => duplicateSlide(slide.id)} 
//                   className={`p-2 rounded-lg transition-colors ${
//                     isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
//                   }`}
//                   title="Duplicate Slide"
//                 >
//                   <FiCopy className="text-lg" />
//                 </button>

//                 {/* Active Toggle */}
//                 <button 
//                   className={`p-2 rounded-lg transition-colors ${
//                     slide.active 
//                       ? isDarkMode ? 'text-green-400 hover:bg-green-500/20' : 'text-green-600 hover:bg-green-50'
//                       : isDarkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'
//                   }`}
//                   onClick={() => updateSlide(slide.id, 'active', !slide.active)}
//                   title={slide.active ? 'Active' : 'Inactive'}
//                 >
//                   {slide.active ? <FiEye className="text-lg" /> : <FiEyeOff className="text-lg" />}
//                 </button>

//                 {/* Delete */}
//                 <button 
//                   onClick={() => deleteHeroSlide(slide.id)} 
//                   className="p-2 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
//                   title="Delete Slide"
//                   disabled={heroSlides.length <= 1}
//                 >
//                   <FiTrash2 className="text-lg" />
//                 </button>
//               </div>
//             </div>

//             {/* Slide Content */}
//             <div className="p-5">
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Left Column - Image Upload */}
//                 <div className="lg:col-span-1">
//                   <div className={`relative rounded-lg border-2 border-dashed overflow-hidden ${
//                     isDarkMode ? 'border-gray-600' : 'border-gray-300'
//                   }`}>
//                     {/* Image Preview */}
//                     <div className="aspect-square relative group">
//                       {slide.image || slide.imagePreview ? (
//                         <img 
//                           src={slide.imagePreview || slide.image} 
//                           alt={slide.brand}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className={`w-full h-full flex flex-col items-center justify-center ${
//                           isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                         }`}>
//                           <FiImage className={`text-4xl mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
//                           <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                             No image
//                           </p>
//                         </div>
//                       )}

//                       {/* Upload Overlay */}
//                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                         <button
//                           onClick={() => triggerFileInput(slide.id)}
//                           disabled={uploadingId === slide.id}
//                           className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
//                         >
//                           {uploadingId === slide.id ? (
//                             <>
//                               <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                               Uploading...
//                             </>
//                           ) : (
//                             <>
//                               <FiUpload />
//                               Upload Image
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <p className={`text-xs mt-2 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                     Click to upload • Recommended: 500x500px • Max 2MB
//                   </p>
//                 </div>

//                 {/* Right Column - Text Fields */}
//                 <div className="lg:col-span-2 space-y-4">
//                   {/* Brand & Badge Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Brand Name
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.brand}
//                         onChange={(e) => updateSlide(slide.id, 'brand', e.target.value)}
//                         placeholder="e.g., WAVES"
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                         }`}
//                       />
//                     </div>
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Badge Text
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.badge}
//                         onChange={(e) => updateSlide(slide.id, 'badge', e.target.value)}
//                         placeholder="e.g., WAVES COLLECTION • 25% OFF"
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                         }`}
//                       />
//                     </div>
//                   </div>

//                   {/* Title & Highlight Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Title
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.title}
//                         onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
//                         placeholder="e.g., Ride the waves of"
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                         }`}
//                       />
//                     </div>
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Highlight Text
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.highlight}
//                         onChange={(e) => updateSlide(slide.id, 'highlight', e.target.value)}
//                         placeholder="e.g., smooth vaping"
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                         }`}
//                       />
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div>
//                     <label className={`block text-xs font-medium mb-1 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       Description
//                     </label>
//                     <textarea
//                       value={slide.description}
//                       onChange={(e) => updateSlide(slide.id, 'description', e.target.value)}
//                       rows="3"
//                       placeholder="Enter slide description..."
//                       className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
//                         isDarkMode 
//                           ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                           : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                       }`}
//                     />
//                   </div>

//                   {/* Button Texts Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Primary Button Text
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.buttonText}
//                         onChange={(e) => updateSlide(slide.id, 'buttonText', e.target.value)}
//                         placeholder="e.g., Shop Waves Collection"
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                         }`}
//                       />
//                     </div>
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Secondary Button Text
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.demoText}
//                         onChange={(e) => updateSlide(slide.id, 'demoText', e.target.value)}
//                         placeholder="e.g., Watch Waves Demo"
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                         }`}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Slide Footer - Status Indicators */}
//             <div className={`px-5 py-2 border-t flex items-center gap-3 text-xs ${
//               isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
//             }`}>
//               <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 <FiMove className="text-sm" />
//                 Drag to reorder
//               </span>
//               <span className={`flex items-center gap-1 ${slide.active 
//                 ? 'text-green-500' 
//                 : isDarkMode ? 'text-gray-500' : 'text-gray-400'
//               }`}>
//                 {slide.active ? <FiEye className="text-sm" /> : <FiEyeOff className="text-sm" />}
//                 {slide.active ? 'Active' : 'Inactive'}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quick Actions Footer */}
//       <div className={`mt-6 p-4 rounded-lg border flex items-center justify-between ${
//         isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <div className="flex items-center gap-4">
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Total Slides: <strong>{heroSlides.length}</strong>
//           </span>
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Active: <strong className="text-green-500">{heroSlides.filter(s => s.active).length}</strong>
//           </span>
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Inactive: <strong className="text-red-500">{heroSlides.filter(s => !s.active).length}</strong>
//           </span>
//         </div>
//         <button
//           onClick={addHeroSlide}
//           className="px-3 py-1.5 bg-blue-600/20 text-blue-600 rounded-lg text-xs hover:bg-blue-600/30 transition-colors flex items-center gap-1"
//         >
//           <FiPlus /> Quick Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HeroSliderCMS;











// import React, { useState, useRef, useEffect } from "react";
// import { 
//   FiImage, FiEye, FiEyeOff, FiChevronUp, 
//   FiChevronDown, FiPlus, FiTrash2, FiUpload,
//   FiMove, FiCopy, FiCheck, FiX, FiCamera, FiSave, FiRefreshCw
// } from "react-icons/fi";
// import axios from "axios";

// const API_URL = 'http://127.0.0.1:8000/api';

// const HeroSliderCMS = ({ isDarkMode, isVisible }) => {
//   const fileInputRef = useRef(null);
//   const [uploadingId, setUploadingId] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [heroSlides, setHeroSlides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Fetch sliders from API
//   const fetchSliders = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(`${API_URL}/sliders`);
      
//       if (response.data.success && response.data.sliders) {
//         // Transform API data to match component structure
//         const transformedSlides = response.data.sliders.map((slider, index) => ({
//           id: slider.id,
//           brand: slider.badge_product_name || "WAVES",
//           title: slider.heading?.split('\n')[0] || "Ride the waves of",
//           highlight: slider.heading?.split('\n')[1] || "smooth vaping",
//           description: slider.paragraph || "",
//           badge: slider.offer_tag || "",
//           buttonText: "Shop Now",
//           demoText: "Watch Demo",
//           image: slider.image ? `http://127.0.0.1:8000/storage/${slider.image}` : "",
//           imagePreview: null,
//           active: true,
//           order: index + 1,
//           originalData: slider // Keep original data for update
//         }));
        
//         setHeroSlides(transformedSlides);
//       }
//     } catch (err) {
//       console.error('Error fetching sliders:', err);
//       setError('Failed to load sliders. Please refresh the page.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load sliders on mount
//   useEffect(() => {
//     fetchSliders();
//   }, []);

//   // Save all slides to API
//   const saveAllSlides = async () => {
//     setSaving(true);
//     setError(null);
//     setSuccessMessage('');

//     try {
//       // Update each slide individually (since API only supports single update)
//       for (const slide of heroSlides) {
//         const formData = new FormData();
        
//         // Prepare data for API
//         const heading = slide.originalData?.heading || `${slide.title}\n${slide.highlight}`;
        
//         formData.append('heading', heading);
//         formData.append('paragraph', slide.description);
//         formData.append('offer_tag', slide.badge);
//         formData.append('badge_product_name', slide.brand);
        
//         // Handle image if changed
//         if (slide.imagePreview && slide.imagePreview.startsWith('data:image')) {
//           // Convert base64 to blob
//           const response = await fetch(slide.imagePreview);
//           const blob = await response.blob();
//           formData.append('image', blob, `slider-${slide.id}.png`);
//         }

//         // Send update request
//         await axios.post(`${API_URL}/sliders/${slide.id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           }
//         });
//       }

//       setSuccessMessage('All slides saved successfully!');
//       setTimeout(() => setSuccessMessage(''), 3000);
      
//       // Refresh data
//       await fetchSliders();
//     } catch (err) {
//       console.error('Error saving sliders:', err);
//       setError('Failed to save changes. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const moveSlide = (id, direction) => {
//     setHeroSlides(prev => {
//       const index = prev.findIndex(s => s.id === id);
//       if (direction === 'up' && index > 0) {
//         const newSlides = [...prev];
//         [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
//         // Update order numbers
//         return newSlides.map((slide, idx) => ({ ...slide, order: idx + 1 }));
//       }
//       if (direction === 'down' && index < prev.length - 1) {
//         const newSlides = [...prev];
//         [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
//         // Update order numbers
//         return newSlides.map((slide, idx) => ({ ...slide, order: idx + 1 }));
//       }
//       return prev;
//     });
//   };

//   // ✅ FIXED: Add Hero Slide with Store API
//   const addHeroSlide = async () => {
//     try {
//       setSaving(true);
//       setError(null);

//       // Create default data for new slide
//       const formData = new FormData();
//       formData.append('heading', "New Slide Title\nnew highlight");
//       formData.append('paragraph', "New slide description");
//       formData.append('offer_tag', "NEW • 10% OFF");
//       formData.append('badge_product_name', "NEW SLIDE");

//       // Call store API
//       const response = await axios.post(`${API_URL}/sliders`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         }
//       });

//       if (response.data.success && response.data.slider) {
//         // Add the new slide to state
//         const newSlider = response.data.slider;
//         const newSlide = {
//           id: newSlider.id,
//           brand: newSlider.badge_product_name || "NEW SLIDE",
//           title: newSlider.heading?.split('\n')[0] || "New Slide Title",
//           highlight: newSlider.heading?.split('\n')[1] || "new highlight",
//           description: newSlider.paragraph || "New slide description",
//           badge: newSlider.offer_tag || "NEW • 10% OFF",
//           buttonText: "Shop Now",
//           demoText: "Watch Demo",
//           image: newSlider.image ? `http://127.0.0.1:8000/storage/${newSlider.image}` : "",
//           imagePreview: null,
//           active: true,
//           order: heroSlides.length + 1,
//           originalData: newSlider
//         };

//         setHeroSlides([...heroSlides, newSlide]);
//         setSuccessMessage('New slide added successfully!');
//         setTimeout(() => setSuccessMessage(''), 3000);
//       }
//     } catch (err) {
//       console.error('Error adding slide:', err);
//       setError('Failed to add new slide. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ✅ FIXED: Duplicate Slide with Store API
//   const duplicateSlide = async (id) => {
//     try {
//       setSaving(true);
//       setError(null);

//       const slideToCopy = heroSlides.find(s => s.id === id);
      
//       // Create data based on copied slide
//       const formData = new FormData();
//       formData.append('heading', `${slideToCopy.title}\n${slideToCopy.highlight} (Copy)`);
//       formData.append('paragraph', slideToCopy.description);
//       formData.append('offer_tag', slideToCopy.badge);
//       formData.append('badge_product_name', slideToCopy.brand);

//       // If there's an image, we need to fetch it and append
//       if (slideToCopy.image && !slideToCopy.image.startsWith('data:')) {
//         try {
//           const imageResponse = await fetch(slideToCopy.image);
//           const blob = await imageResponse.blob();
//           formData.append('image', blob, `slider-copy-${Date.now()}.png`);
//         } catch (imageErr) {
//           console.warn('Could not copy image:', imageErr);
//         }
//       }

//       // Call store API
//       const response = await axios.post(`${API_URL}/sliders`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         }
//       });

//       if (response.data.success && response.data.slider) {
//         // Add the duplicated slide to state
//         const newSlider = response.data.slider;
//         const newSlide = {
//           id: newSlider.id,
//           brand: newSlider.badge_product_name || slideToCopy.brand,
//           title: newSlider.heading?.split('\n')[0] || `${slideToCopy.title} (Copy)`,
//           highlight: newSlider.heading?.split('\n')[1] || slideToCopy.highlight,
//           description: newSlider.paragraph || slideToCopy.description,
//           badge: newSlider.offer_tag || slideToCopy.badge,
//           buttonText: slideToCopy.buttonText,
//           demoText: slideToCopy.demoText,
//           image: newSlider.image ? `http://127.0.0.1:8000/storage/${newSlider.image}` : "",
//           imagePreview: null,
//           active: true,
//           order: heroSlides.length + 1,
//           originalData: newSlider
//         };

//         setHeroSlides([...heroSlides, newSlide]);
//         setSuccessMessage('Slide duplicated successfully!');
//         setTimeout(() => setSuccessMessage(''), 3000);
//       }
//     } catch (err) {
//       console.error('Error duplicating slide:', err);
//       setError('Failed to duplicate slide. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ✅ FIXED: Delete Slide with API
//   const deleteHeroSlide = async (id) => {
//     if (heroSlides.length <= 1) {
//       alert("At least one slide must remain");
//       return;
//     }

//     if (!window.confirm('Are you sure you want to delete this slide?')) {
//       return;
//     }

//     try {
//       setSaving(true);
//       setError(null);

//       // Call delete API (assuming you have a delete endpoint)
//       await axios.delete(`${API_URL}/sliders/${id}`);

//       // Remove from state
//       setHeroSlides(prev => prev.filter(s => s.id !== id));
//       setSuccessMessage('Slide deleted successfully!');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     } catch (err) {
//       console.error('Error deleting slide:', err);
//       setError('Failed to delete slide. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const updateSlide = (id, field, value) => {
//     setHeroSlides(prev => 
//       prev.map(slide => {
//         if (slide.id === id) {
//           const updatedSlide = { ...slide, [field]: value };
//           // Update originalData as well
//           if (field === 'title' || field === 'highlight') {
//             updatedSlide.originalData = {
//               ...slide.originalData,
//               heading: field === 'title' 
//                 ? `${value}\n${slide.highlight}`
//                 : `${slide.title}\n${value}`
//             };
//           } else if (field === 'description') {
//             updatedSlide.originalData = {
//               ...slide.originalData,
//               paragraph: value
//             };
//           } else if (field === 'badge') {
//             updatedSlide.originalData = {
//               ...slide.originalData,
//               offer_tag: value
//             };
//           } else if (field === 'brand') {
//             updatedSlide.originalData = {
//               ...slide.originalData,
//               badge_product_name: value
//             };
//           }
//           return updatedSlide;
//         }
//         return slide;
//       })
//     );
//   };

//   const handleImageUpload = (id, file) => {
//     if (!file) return;

//     // Check file size (max 2MB)
//     if (file.size > 2 * 1024 * 1024) {
//       alert("File size must be less than 2MB");
//       return;
//     }

//     // Check file type
//     if (!file.type.startsWith('image/')) {
//       alert("Please upload an image file");
//       return;
//     }

//     setUploadingId(id);

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       updateSlide(id, 'imagePreview', reader.result);
//       setUploadingId(null);
//     };
//     reader.readAsDataURL(file);
//   };

//   const triggerFileInput = (id) => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//       setPreviewImage(id);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Hidden file input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           if (previewImage && e.target.files[0]) {
//             handleImageUpload(previewImage, e.target.files[0]);
//           }
//         }}
//       />

//       {/* Header with Save Button */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Hero Slider Manager
//           </h2>
//           <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             {heroSlides.length} slide{heroSlides.length !== 1 ? 's' : ''} • {heroSlides.filter(s => s.active).length} active
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {successMessage && (
//             <span className="px-3 py-1.5 bg-green-500/20 text-green-600 rounded-lg text-sm flex items-center gap-1">
//               <FiCheck /> {successMessage}
//             </span>
//           )}
//           {error && (
//             <span className="px-3 py-1.5 bg-red-500/20 text-red-600 rounded-lg text-sm flex items-center gap-1">
//               <FiX /> {error}
//             </span>
//           )}
//           <button
//             onClick={fetchSliders}
//             className="p-2 bg-gray-500/20 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
//             title="Refresh"
//             disabled={saving}
//           >
//             <FiRefreshCw className={`text-lg ${loading || saving ? 'animate-spin' : ''}`} />
//           </button>
//           <button
//             onClick={saveAllSlides}
//             disabled={saving}
//             className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-green-600/30 disabled:opacity-50"
//           >
//             {saving ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <FiSave /> Save All Changes
//               </>
//             )}
//           </button>
//           <button 
//             onClick={addHeroSlide} 
//             disabled={saving}
//             className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
//           >
//             <FiPlus /> Add New Slide
//           </button>
//         </div>
//       </div>

//       {/* Slides Grid */}
//       <div className="grid grid-cols-1 gap-6">
//         {heroSlides.map((slide, index) => (
//           <div 
//             key={slide.id} 
//             className={`relative rounded-xl border overflow-hidden transition-all duration-300 ${
//               isDarkMode 
//                 ? slide.active ? 'border-blue-500/30 bg-gray-800/90' : 'border-gray-700 bg-gray-800/50 opacity-60'
//                 : slide.active ? 'border-blue-200 bg-white shadow-md' : 'border-gray-200 bg-gray-50 opacity-60'
//             }`}
//           >
//             {/* Slide Header */}
//             <div className={`px-5 py-3 flex items-center justify-between border-b ${
//               isDarkMode ? 'border-gray-700' : 'border-gray-200'
//             } ${slide.active ? '' : 'opacity-75'}`}>
//               <div className="flex items-center gap-3">
//                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//                   isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//                 }`}>
//                   <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                     {index + 1}
//                   </span>
//                 </div>
//                 <div>
//                   <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {slide.brand}
//                   </h3>
//                   <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                     ID: {slide.id} • Order: {slide.order}
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-1">
//                 {/* Move Up/Down */}
//                 <button 
//                   onClick={() => moveSlide(slide.id, 'up')} 
//                   disabled={index === 0 || saving} 
//                   className={`p-2 rounded-lg transition-colors ${
//                     index === 0 || saving
//                       ? 'opacity-30 cursor-not-allowed' 
//                       : isDarkMode 
//                         ? 'hover:bg-gray-700 text-gray-300' 
//                         : 'hover:bg-gray-100 text-gray-600'
//                   }`}
//                   title="Move Up"
//                 >
//                   <FiChevronUp className="text-lg" />
//                 </button>
//                 <button 
//                   onClick={() => moveSlide(slide.id, 'down')} 
//                   disabled={index === heroSlides.length - 1 || saving} 
//                   className={`p-2 rounded-lg transition-colors ${
//                     index === heroSlides.length - 1 || saving
//                       ? 'opacity-30 cursor-not-allowed' 
//                       : isDarkMode 
//                         ? 'hover:bg-gray-700 text-gray-300' 
//                         : 'hover:bg-gray-100 text-gray-600'
//                   }`}
//                   title="Move Down"
//                 >
//                   <FiChevronDown className="text-lg" />
//                 </button>

//                 {/* Duplicate */}
//                 <button 
//                   onClick={() => duplicateSlide(slide.id)} 
//                   disabled={saving}
//                   className={`p-2 rounded-lg transition-colors ${
//                     saving
//                       ? 'opacity-30 cursor-not-allowed'
//                       : isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
//                   }`}
//                   title="Duplicate Slide"
//                 >
//                   <FiCopy className="text-lg" />
//                 </button>

//                 {/* Active Toggle */}
//                 <button 
//                   className={`p-2 rounded-lg transition-colors ${
//                     slide.active 
//                       ? isDarkMode ? 'text-green-400 hover:bg-green-500/20' : 'text-green-600 hover:bg-green-50'
//                       : isDarkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'
//                   }`}
//                   onClick={() => updateSlide(slide.id, 'active', !slide.active)}
//                   title={slide.active ? 'Active' : 'Inactive'}
//                 >
//                   {slide.active ? <FiEye className="text-lg" /> : <FiEyeOff className="text-lg" />}
//                 </button>

//                 {/* Delete */}
//                 <button 
//                   onClick={() => deleteHeroSlide(slide.id)} 
//                   className="p-2 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
//                   title="Delete Slide"
//                   disabled={heroSlides.length <= 1 || saving}
//                 >
//                   <FiTrash2 className="text-lg" />
//                 </button>
//               </div>
//             </div>

//             {/* Slide Content */}
//             <div className="p-5">
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Left Column - Image Upload */}
//                 <div className="lg:col-span-1">
//                   <div className={`relative rounded-lg border-2 border-dashed overflow-hidden ${
//                     isDarkMode ? 'border-gray-600' : 'border-gray-300'
//                   }`}>
//                     {/* Image Preview */}
//                     <div className="aspect-square relative group">
//                       {slide.image || slide.imagePreview ? (
//                         <img 
//                           src={slide.imagePreview || slide.image} 
//                           alt={slide.brand}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className={`w-full h-full flex flex-col items-center justify-center ${
//                           isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                         }`}>
//                           <FiImage className={`text-4xl mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
//                           <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                             No image
//                           </p>
//                         </div>
//                       )}

//                       {/* Upload Overlay */}
//                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                         <button
//                           onClick={() => triggerFileInput(slide.id)}
//                           disabled={uploadingId === slide.id || saving}
//                           className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
//                         >
//                           {uploadingId === slide.id ? (
//                             <>
//                               <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                               Uploading...
//                             </>
//                           ) : (
//                             <>
//                               <FiUpload />
//                               Upload Image
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <p className={`text-xs mt-2 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                     Click to upload • Recommended: 500x500px • Max 2MB
//                   </p>
//                 </div>

//                 {/* Right Column - Text Fields */}
//                 <div className="lg:col-span-2 space-y-4">
//                   {/* Brand & Badge Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Badge Product Name
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.brand}
//                         onChange={(e) => updateSlide(slide.id, 'brand', e.target.value)}
//                         placeholder="e.g., Vapes"
//                         disabled={saving}
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
//                         }`}
//                       />
//                     </div>
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Offer Tag
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.badge}
//                         onChange={(e) => updateSlide(slide.id, 'badge', e.target.value)}
//                         placeholder="e.g., WAVES COLLECTION • 25% OFF"
//                         disabled={saving}
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
//                         }`}
//                       />
//                     </div>
//                   </div>

//                   {/* Title & Highlight Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Title (First Line)
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.title}
//                         onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
//                         placeholder="e.g., Ride the waves of"
//                         disabled={saving}
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
//                         }`}
//                       />
//                     </div>
//                     <div>
//                       <label className={`block text-xs font-medium mb-1 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         Highlight (Second Line)
//                       </label>
//                       <input
//                         type="text"
//                         value={slide.highlight}
//                         onChange={(e) => updateSlide(slide.id, 'highlight', e.target.value)}
//                         placeholder="e.g., smooth vaping"
//                         disabled={saving}
//                         className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
//                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
//                         }`}
//                       />
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div>
//                     <label className={`block text-xs font-medium mb-1 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       Paragraph
//                     </label>
//                     <textarea
//                       value={slide.description}
//                       onChange={(e) => updateSlide(slide.id, 'description', e.target.value)}
//                       rows="3"
//                       placeholder="Enter slide description..."
//                       disabled={saving}
//                       className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
//                         isDarkMode 
//                           ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
//                           : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
//                       }`}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Slide Footer */}
//             <div className={`px-5 py-2 border-t flex items-center gap-3 text-xs ${
//               isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
//             }`}>
//               <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 <FiMove className="text-sm" />
//                 Drag to reorder
//               </span>
//               <span className={`flex items-center gap-1 ${slide.active 
//                 ? 'text-green-500' 
//                 : isDarkMode ? 'text-gray-500' : 'text-gray-400'
//               }`}>
//                 {slide.active ? <FiEye className="text-sm" /> : <FiEyeOff className="text-sm" />}
//                 {slide.active ? 'Active' : 'Inactive'}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quick Actions Footer */}
//       <div className={`mt-6 p-4 rounded-lg border flex items-center justify-between ${
//         isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <div className="flex items-center gap-4">
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Total Slides: <strong>{heroSlides.length}</strong>
//           </span>
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Active: <strong className="text-green-500">{heroSlides.filter(s => s.active).length}</strong>
//           </span>
//         </div>
//         <button
//           onClick={addHeroSlide}
//           disabled={saving}
//           className="px-3 py-1.5 bg-blue-600/20 text-blue-600 rounded-lg text-xs hover:bg-blue-600/30 transition-colors flex items-center gap-1 disabled:opacity-50"
//         >
//           <FiPlus /> Quick Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HeroSliderCMS;











import React, { useState, useRef, useEffect } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiChevronUp, 
  FiChevronDown, FiPlus, FiTrash2, FiUpload,
  FiMove, FiCopy, FiCheck, FiX, FiCamera, FiSave, FiRefreshCw
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const HeroSliderCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [heroSlides, setHeroSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch sliders from API
  const fetchSliders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/sliders`);
      
      if (response.data.success && response.data.sliders) {
        // Transform API data to match component structure
        const transformedSlides = response.data.sliders.map((slider, index) => ({
          id: slider.id,
          brand: slider.badge_product_name || "WAVES",
          title: slider.heading?.split('\n')[0] || "Ride the waves of",
          highlight: slider.heading?.split('\n')[1] || "smooth vaping",
          description: slider.paragraph || "",
          badge: slider.offer_tag || "",
          buttonText: "Shop Now",
          demoText: "Watch Demo",
          image: slider.image ? `http://127.0.0.1:8000/storage/${slider.image}` : "",
          imagePreview: null,
          active: true,
          order: index + 1,
          isNew: false, // Flag to identify new slides
          originalData: slider // Keep original data for update
        }));
        
        setHeroSlides(transformedSlides);
      }
    } catch (err) {
      console.error('Error fetching sliders:', err);
      setError('Failed to load sliders. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Load sliders on mount
  useEffect(() => {
    fetchSliders();
  }, []);

  // Save all slides to API
  const saveAllSlides = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      let successCount = 0;
      
      for (const slide of heroSlides) {
        const formData = new FormData();
        
        // Prepare data for API
        const heading = `${slide.title}\n${slide.highlight}`;
        
        formData.append('heading', heading);
        formData.append('paragraph', slide.description);
        formData.append('offer_tag', slide.badge);
        formData.append('badge_product_name', slide.brand);
        
        // Handle image if changed
        if (slide.imagePreview && slide.imagePreview.startsWith('data:image')) {
          // Convert base64 to blob
          const response = await fetch(slide.imagePreview);
          const blob = await response.blob();
          formData.append('image', blob, `slider-${slide.id}-${Date.now()}.png`);
        }

        // Check if it's a new slide (not in DB yet)
        if (slide.isNew) {
          // Use store API for new slides
          await axios.post(`${API_URL}/sliders`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });
        } else {
          // Use update API for existing slides
          await axios.post(`${API_URL}/sliders/${slide.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });
        }
        
        successCount++;
      }

      setSuccessMessage(`${successCount} slide(s) saved successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh data to get updated IDs for new slides
      await fetchSliders();
    } catch (err) {
      console.error('Error saving sliders:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const moveSlide = (id, direction) => {
    setHeroSlides(prev => {
      const index = prev.findIndex(s => s.id === id);
      if (direction === 'up' && index > 0) {
        const newSlides = [...prev];
        [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
        // Update order numbers
        return newSlides.map((slide, idx) => ({ ...slide, order: idx + 1 }));
      }
      if (direction === 'down' && index < prev.length - 1) {
        const newSlides = [...prev];
        [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
        // Update order numbers
        return newSlides.map((slide, idx) => ({ ...slide, order: idx + 1 }));
      }
      return prev;
    });
  };

  // ✅ FIXED: Add Hero Slide - Creates a new blank slide in UI first
  const addHeroSlide = () => {
    // Create a temporary ID for the new slide (negative to avoid conflicts)
    const tempId = -Date.now();
    
    const newSlide = {
      id: tempId,
      brand: "",
      title: "",
      highlight: "",
      description: "",
      badge: "",
      buttonText: "Shop Now",
      demoText: "Watch Demo",
      image: "",
      imagePreview: null,
      active: true,
      order: heroSlides.length + 1,
      isNew: true, // Mark as new slide
      originalData: null
    };

    setHeroSlides([...heroSlides, newSlide]);
    setSuccessMessage('New slide added. Fill in the details and click Save All Changes.');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  // ✅ FIXED: Duplicate Slide - Creates a copy in UI
  const duplicateSlide = (id) => {
    const slideToCopy = heroSlides.find(s => s.id === id);
    const tempId = -Date.now();
    
    const newSlide = {
      ...slideToCopy,
      id: tempId,
      title: slideToCopy.title,
      highlight: slideToCopy.highlight,
      description: slideToCopy.description,
      badge: slideToCopy.badge,
      brand: slideToCopy.brand,
      image: slideToCopy.image,
      imagePreview: slideToCopy.imagePreview,
      order: heroSlides.length + 1,
      isNew: true, // Mark as new slide
      originalData: null
    };

    setHeroSlides([...heroSlides, newSlide]);
    setSuccessMessage('Slide duplicated. Click Save All Changes to store in database.');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  // ✅ FIXED: Delete Slide - Removes from UI
  const deleteHeroSlide = async (id) => {
    if (heroSlides.length <= 1) {
      alert("At least one slide must remain");
      return;
    }

    const slideToDelete = heroSlides.find(s => s.id === id);
    
    // If it's not a new slide (exists in DB), confirm deletion
    if (!slideToDelete.isNew) {
      if (!window.confirm('Are you sure you want to delete this slide from the database?')) {
        return;
      }

      try {
        setSaving(true);
        // Call delete API
        await axios.delete(`${API_URL}/sliders/${id}`);
        setSuccessMessage('Slide deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Error deleting slide:', err);
        setError('Failed to delete slide. Please try again.');
        setSaving(false);
        return;
      }
    }

    // Remove from UI
    setHeroSlides(prev => prev.filter(s => s.id !== id));
    setSaving(false);
  };

  const updateSlide = (id, field, value) => {
    setHeroSlides(prev => 
      prev.map(slide => {
        if (slide.id === id) {
          return { ...slide, [field]: value };
        }
        return slide;
      })
    );
  };

  const handleImageUpload = (id, file) => {
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    setUploadingId(id);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSlide(id, 'imagePreview', reader.result);
      updateSlide(id, 'image', reader.result);
      setUploadingId(null);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (id) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setPreviewImage(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (previewImage && e.target.files[0]) {
            handleImageUpload(previewImage, e.target.files[0]);
          }
        }}
      />

      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Hero Slider Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {heroSlides.length} slide{heroSlides.length !== 1 ? 's' : ''} • {heroSlides.filter(s => s.active).length} active
            {heroSlides.filter(s => s.isNew).length > 0 && (
              <span className="ml-2 text-yellow-500">
                ({heroSlides.filter(s => s.isNew).length} new unsaved)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {successMessage && (
            <span className="px-3 py-1.5 bg-green-500/20 text-green-600 rounded-lg text-sm flex items-center gap-1">
              <FiCheck /> {successMessage}
            </span>
          )}
          {error && (
            <span className="px-3 py-1.5 bg-red-500/20 text-red-600 rounded-lg text-sm flex items-center gap-1">
              <FiX /> {error}
            </span>
          )}
          <button
            onClick={fetchSliders}
            className="p-2 bg-gray-500/20 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
            title="Refresh"
            disabled={saving}
          >
            <FiRefreshCw className={`text-lg ${loading || saving ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={saveAllSlides}
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-green-600/30 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave /> Save All Changes
              </>
            )}
          </button>
          <button 
            onClick={addHeroSlide} 
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
          >
            <FiPlus /> Add New Slide
          </button>
        </div>
      </div>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 gap-6">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`relative rounded-xl border overflow-hidden transition-all duration-300 ${
              isDarkMode 
                ? slide.active ? 'border-blue-500/30 bg-gray-800/90' : 'border-gray-700 bg-gray-800/50 opacity-60'
                : slide.active ? 'border-blue-200 bg-white shadow-md' : 'border-gray-200 bg-gray-50 opacity-60'
            } ${slide.isNew ? 'ring-2 ring-yellow-500' : ''}`}
          >
            {/* New Badge */}
            {slide.isNew && (
              <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                New (Not Saved)
              </div>
            )}

            {/* Slide Header */}
            <div className={`px-5 py-3 flex items-center justify-between border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } ${slide.active ? '' : 'opacity-75'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {slide.brand || "New Slide"}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {slide.isNew ? 'New (Unsaved)' : `ID: ${slide.id}`} • Order: {slide.order}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {/* Move Up/Down */}
                <button 
                  onClick={() => moveSlide(slide.id, 'up')} 
                  disabled={index === 0 || saving} 
                  className={`p-2 rounded-lg transition-colors ${
                    index === 0 || saving
                      ? 'opacity-30 cursor-not-allowed' 
                      : isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Move Up"
                >
                  <FiChevronUp className="text-lg" />
                </button>
                <button 
                  onClick={() => moveSlide(slide.id, 'down')} 
                  disabled={index === heroSlides.length - 1 || saving} 
                  className={`p-2 rounded-lg transition-colors ${
                    index === heroSlides.length - 1 || saving
                      ? 'opacity-30 cursor-not-allowed' 
                      : isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Move Down"
                >
                  <FiChevronDown className="text-lg" />
                </button>

                {/* Duplicate */}
                <button 
                  onClick={() => duplicateSlide(slide.id)} 
                  disabled={saving}
                  className={`p-2 rounded-lg transition-colors ${
                    saving
                      ? 'opacity-30 cursor-not-allowed'
                      : isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Duplicate Slide"
                >
                  <FiCopy className="text-lg" />
                </button>

                {/* Active Toggle */}
                <button 
                  className={`p-2 rounded-lg transition-colors ${
                    slide.active 
                      ? isDarkMode ? 'text-green-400 hover:bg-green-500/20' : 'text-green-600 hover:bg-green-50'
                      : isDarkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'
                  }`}
                  onClick={() => updateSlide(slide.id, 'active', !slide.active)}
                  title={slide.active ? 'Active' : 'Inactive'}
                >
                  {slide.active ? <FiEye className="text-lg" /> : <FiEyeOff className="text-lg" />}
                </button>

                {/* Delete */}
                <button 
                  onClick={() => deleteHeroSlide(slide.id)} 
                  className="p-2 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
                  title="Delete Slide"
                  disabled={heroSlides.length <= 1 || saving}
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            </div>

            {/* Slide Content */}
            <div className="p-5">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Image Upload */}
                <div className="lg:col-span-1">
                  <div className={`relative rounded-lg border-2 border-dashed overflow-hidden ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-300'
                  }`}>
                    {/* Image Preview */}
                    <div className="aspect-square relative group">
                      {slide.image || slide.imagePreview ? (
                        <img 
                          src={slide.imagePreview || slide.image} 
                          alt={slide.brand || "Slide"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full flex flex-col items-center justify-center ${
                          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                        }`}>
                          <FiImage className={`text-4xl mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            No image
                          </p>
                        </div>
                      )}

                      {/* Upload Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => triggerFileInput(slide.id)}
                          disabled={uploadingId === slide.id || saving}
                          className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          {uploadingId === slide.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <FiUpload />
                              Upload Image
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className={`text-xs mt-2 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Click to upload • Recommended: 500x500px • Max 2MB
                  </p>
                </div>

                {/* Right Column - Text Fields */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Brand & Badge Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Badge Product Name
                      </label>
                      <input
                        type="text"
                        value={slide.brand}
                        onChange={(e) => updateSlide(slide.id, 'brand', e.target.value)}
                        placeholder="e.g., Vapes"
                        disabled={saving}
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Offer Tag
                      </label>
                      <input
                        type="text"
                        value={slide.badge}
                        onChange={(e) => updateSlide(slide.id, 'badge', e.target.value)}
                        placeholder="e.g., WAVES COLLECTION • 25% OFF"
                        disabled={saving}
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Title & Highlight Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Title (First Line)
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                        placeholder="e.g., Ride the waves of"
                        disabled={saving}
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Highlight (Second Line)
                      </label>
                      <input
                        type="text"
                        value={slide.highlight}
                        onChange={(e) => updateSlide(slide.id, 'highlight', e.target.value)}
                        placeholder="e.g., smooth vaping"
                        disabled={saving}
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Paragraph
                    </label>
                    <textarea
                      value={slide.description}
                      onChange={(e) => updateSlide(slide.id, 'description', e.target.value)}
                      rows="3"
                      placeholder="Enter slide description..."
                      disabled={saving}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Footer */}
            <div className={`px-5 py-2 border-t flex items-center gap-3 text-xs ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <FiMove className="text-sm" />
                Drag to reorder
              </span>
              <span className={`flex items-center gap-1 ${slide.active 
                ? 'text-green-500' 
                : isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {slide.active ? <FiEye className="text-sm" /> : <FiEyeOff className="text-sm" />}
                {slide.active ? 'Active' : 'Inactive'}
              </span>
              {slide.isNew && (
                <span className="text-yellow-500 flex items-center gap-1">
                  <FiX className="text-sm" /> Not saved yet
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Footer */}
      <div className={`mt-6 p-4 rounded-lg border flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Total Slides: <strong>{heroSlides.length}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Active: <strong className="text-green-500">{heroSlides.filter(s => s.active).length}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Unsaved: <strong className="text-yellow-500">{heroSlides.filter(s => s.isNew).length}</strong>
          </span>
        </div>
        <button
          onClick={addHeroSlide}
          disabled={saving}
          className="px-3 py-1.5 bg-blue-600/20 text-blue-600 rounded-lg text-xs hover:bg-blue-600/30 transition-colors flex items-center gap-1 disabled:opacity-50"
        >
          <FiPlus /> Quick Add
        </button>
      </div>
    </div>
  );
};

export default HeroSliderCMS;