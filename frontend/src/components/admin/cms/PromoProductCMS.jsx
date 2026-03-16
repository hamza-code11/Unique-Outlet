// import React, { useState, useRef } from "react";
// import { 
//   FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
//   FiPlus, FiShoppingBag, FiShield, FiWind, FiSmile,
//   FiStar, FiArrowRight
// } from "react-icons/fi";

// const PromoProductCMS = ({ isDarkMode, isVisible }) => {
//   const fileInputRef = useRef(null);
//   const VapesInputRef = useRef(null);
//   const [uploading, setUploading] = useState({ main: false, Vapes: false });
//   const [activeFeature, setActiveFeature] = useState(null);

//   // Promo Product Section Data
//   const [promoData, setPromoData] = useState({
//     badge: "LATEST ARRIVAL",
//     title: "Premium Products",
//     price: "49.00",
//     originalPrice: "99.00",
//     description: "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which...",
//     buttonText: "Shop Now",
//     secondaryButtonText: "Learn More",
//     hungryText: "HUNGRY UP!",
//     image: "/assets/home/get-image2.png",
//     imagePreview: null,
//     VapesImage: "/assets/home/Vertical Garden Wall With Neon Light.jfif",
//     VapesPreview: null,
//     active: true,
//     features: [
//       {
//         id: 1,
//         icon: "FiShield",
//         title: "100% Natural",
//         description: "Premium quality ingredients",
//         active: true
//       },
//       {
//         id: 2,
//         icon: "FiWind",
//         title: "Fresh Menthol",
//         description: "Smooth cooling effect",
//         active: true
//       },
//       {
//         id: 3,
//         icon: "FiSmile",
//         title: "30 Day Refund",
//         description: "Money-back guarantee",
//         active: true
//       }
//     ]
//   });

//   const updateField = (field, value) => {
//     setPromoData(prev => ({ ...prev, [field]: value }));
//   };

//   const toggleActive = () => {
//     setPromoData(prev => ({ ...prev, active: !prev.active }));
//   };

//   const handleImageUpload = (type, file) => {
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

//     setUploading(prev => ({ ...prev, [type]: true }));

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setTimeout(() => {
//         if (type === 'main') {
//           setPromoData(prev => ({
//             ...prev,
//             image: reader.result,
//             imagePreview: reader.result
//           }));
//         } else {
//           setPromoData(prev => ({
//             ...prev,
//             VapesImage: reader.result,
//             VapesPreview: reader.result
//           }));
//         }
//         setUploading(prev => ({ ...prev, [type]: false }));
//       }, 500);
//     };
//     reader.readAsDataURL(file);
//   };

//   const triggerFileInput = (type) => {
//     if (type === 'main' && fileInputRef.current) {
//       fileInputRef.current.click();
//     } else if (type === 'Vapes' && VapesInputRef.current) {
//       VapesInputRef.current.click();
//     }
//   };

//   // Feature Management
//   const updateFeature = (id, field, value) => {
//     setPromoData(prev => ({
//       ...prev,
//       features: prev.features.map(f =>
//         f.id === id ? { ...f, [field]: value } : f
//       )
//     }));
//   };

//   const toggleFeatureActive = (id) => {
//     setPromoData(prev => ({
//       ...prev,
//       features: prev.features.map(f =>
//         f.id === id ? { ...f, active: !f.active } : f
//       )
//     }));
//   };

//   const addFeature = () => {
//     const newId = Math.max(...promoData.features.map(f => f.id), 0) + 1;
//     setPromoData(prev => ({
//       ...prev,
//       features: [
//         ...prev.features,
//         {
//           id: newId,
//           icon: "FiShield",
//           title: "New Feature",
//           description: "Feature description",
//           active: true
//         }
//       ]
//     }));
//   };

//   const deleteFeature = (id) => {
//     if (promoData.features.length <= 1) {
//       alert("At least one feature must remain");
//       return;
//     }
//     setPromoData(prev => ({
//       ...prev,
//       features: prev.features.filter(f => f.id !== id)
//     }));
//   };

//   // Icon selector
//   const getIconComponent = (iconName) => {
//     switch(iconName) {
//       case 'FiShield': return <FiShield />;
//       case 'FiWind': return <FiWind />;
//       case 'FiSmile': return <FiSmile />;
//       default: return <FiShield />;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Hidden file inputs */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files[0]) {
//             handleImageUpload('main', e.target.files[0]);
//           }
//         }}
//       />
//       <input
//         type="file"
//         ref={VapesInputRef}
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files[0]) {
//             handleImageUpload('Vapes', e.target.files[0]);
//           }
//         }}
//       />

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Promo Product Section Manager
//           </h2>
//           <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             {promoData.features.length} features • {promoData.features.filter(f => f.active).length} active
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {!isVisible && (
//             <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
//               Section Hidden
//             </span>
//           )}
//           <button 
//             onClick={toggleActive}
//             className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
//               promoData.active 
//                 ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
//                 : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
//             }`}
//           >
//             {promoData.active ? <FiEye /> : <FiEyeOff />}
//             <span className="text-sm">{promoData.active ? 'Active' : 'Inactive'}</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Column - Images */}
//         <div className="space-y-4">
//           {/* Main Product Image */}
//           <div>
//             <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//               Product Image
//             </h3>
//             <div className={`relative rounded-xl border-2 border-dashed overflow-hidden ${
//               isDarkMode ? 'border-gray-600' : 'border-gray-300'
//             }`}>
//               <div className="aspect-square relative group">
//                 {promoData.image || promoData.imagePreview ? (
//                   <img 
//                     src={promoData.imagePreview || promoData.image} 
//                     alt="Product"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className={`w-full h-full flex flex-col items-center justify-center ${
//                     isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                   }`}>
//                     <FiImage className={`text-4xl mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
//                     <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                       No image
//                     </p>
//                   </div>
//                 )}

//                 {/* Upload Overlay */}
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                   <button
//                     onClick={() => triggerFileInput('main')}
//                     disabled={uploading.main}
//                     className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
//                   >
//                     {uploading.main ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                         Uploading...
//                       </>
//                     ) : (
//                       <>
//                         <FiUpload />
//                         Upload Image
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <p className={`text-xs mt-1 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//               Main product image • 500x500px • Max 2MB
//             </p>
//           </div>

//           {/* Vapes Background Image */}
//           <div>
//             <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//               Vapes Background Image
//             </h3>
//             <div className={`relative rounded-xl border-2 border-dashed overflow-hidden ${
//               isDarkMode ? 'border-gray-600' : 'border-gray-300'
//             }`}>
//               <div className="aspect-video relative group">
//                 {promoData.VapesImage || promoData.VapesPreview ? (
//                   <img 
//                     src={promoData.VapesPreview || promoData.VapesImage} 
//                     alt="Vapes Background"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className={`w-full h-full flex flex-col items-center justify-center ${
//                     isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                   }`}>
//                     <FiImage className={`text-4xl mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
//                     <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                       No Vapes image
//                     </p>
//                   </div>
//                 )}

//                 {/* Upload Overlay */}
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                   <button
//                     onClick={() => triggerFileInput('Vapes')}
//                     disabled={uploading.Vapes}
//                     className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
//                   >
//                     {uploading.Vapes ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                         Uploading...
//                       </>
//                     ) : (
//                       <>
//                         <FiUpload />
//                         Upload Image
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <p className={`text-xs mt-1 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//               Background smoke/Vapes • 1920x1080px • Max 2MB
//             </p>
//           </div>
//         </div>

//         {/* Right Column - Text Fields */}
//         <div className="space-y-4">
//           {/* Badge */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Badge Text
//             </label>
//             <input
//               type="text"
//               value={promoData.badge}
//               onChange={(e) => updateField('badge', e.target.value)}
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>

//           {/* Title */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Title
//             </label>
//             <input
//               type="text"
//               value={promoData.title}
//               onChange={(e) => updateField('title', e.target.value)}
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>

//           {/* Price */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={`block text-xs font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Price ($)
//               </label>
//               <input
//                 type="text"
//                 value={promoData.price}
//                 onChange={(e) => updateField('price', e.target.value)}
//                 className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//             <div>
//               <label className={`block text-xs font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Original Price ($)
//               </label>
//               <input
//                 type="text"
//                 value={promoData.originalPrice}
//                 onChange={(e) => updateField('originalPrice', e.target.value)}
//                 className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Description
//             </label>
//             <textarea
//               value={promoData.description}
//               onChange={(e) => updateField('description', e.target.value)}
//               rows="3"
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>

//           {/* Button Texts */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={`block text-xs font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Primary Button
//               </label>
//               <input
//                 type="text"
//                 value={promoData.buttonText}
//                 onChange={(e) => updateField('buttonText', e.target.value)}
//                 className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//             <div>
//               <label className={`block text-xs font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Secondary Button
//               </label>
//               <input
//                 type="text"
//                 value={promoData.secondaryButtonText}
//                 onChange={(e) => updateField('secondaryButtonText', e.target.value)}
//                 className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Hungry Text */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Hungry Text
//             </label>
//             <input
//               type="text"
//               value={promoData.hungryText}
//               onChange={(e) => updateField('hungryText', e.target.value)}
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//         <div className="flex items-center justify-between mb-4">
//           <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Product Features ({promoData.features.length})
//           </h3>
//           <button
//             onClick={addFeature}
//             className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 flex items-center gap-1"
//           >
//             <FiPlus /> Add Feature
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {promoData.features.map((feature) => (
//             <div
//               key={feature.id}
//               className={`p-4 rounded-lg border relative ${
//                 isDarkMode 
//                   ? feature.active ? 'border-blue-500/30 bg-gray-800' : 'border-gray-700 bg-gray-800/50 opacity-60'
//                   : feature.active ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
//               }`}
//             >
//               {/* Feature Header */}
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//                     isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//                   }`}>
//                     <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
//                       {getIconComponent(feature.icon)}
//                     </span>
//                   </div>
//                   <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                     ID: {feature.id}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <button
//                     onClick={() => toggleFeatureActive(feature.id)}
//                     className={`p-1.5 rounded transition-colors ${
//                       feature.active
//                         ? isDarkMode ? 'text-green-400 hover:bg-green-500/20' : 'text-green-600 hover:bg-green-50'
//                         : isDarkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'
//                     }`}
//                   >
//                     {feature.active ? <FiEye /> : <FiEyeOff />}
//                   </button>
//                   <button
//                     onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
//                     className={`p-1.5 rounded transition-colors ${
//                       isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
//                     }`}
//                   >
//                     {activeFeature === feature.id ? 'Close' : 'Edit'}
//                   </button>
//                   <button
//                     onClick={() => deleteFeature(feature.id)}
//                     className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
//                   >
//                     <FiTrash2 className="text-sm" />
//                   </button>
//                 </div>
//               </div>

//               {/* Feature Content */}
//               {activeFeature === feature.id ? (
//                 <div className="space-y-3 mt-2">
//                   {/* Icon Selector */}
//                   <div>
//                     <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       Icon
//                     </label>
//                     <select
//                       value={feature.icon}
//                       onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
//                       className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                         isDarkMode 
//                           ? 'bg-gray-700 border-gray-600 text-white' 
//                           : 'bg-white border-gray-300 text-gray-900'
//                       }`}
//                     >
//                       <option value="FiShield">Shield</option>
//                       <option value="FiWind">Wind</option>
//                       <option value="FiSmile">Smile</option>
//                     </select>
//                   </div>

//                   {/* Title */}
//                   <input
//                     type="text"
//                     value={feature.title}
//                     onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
//                     placeholder="Feature title"
//                     className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                       isDarkMode 
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                     }`}
//                   />

//                   {/* Description */}
//                   <input
//                     type="text"
//                     value={feature.description}
//                     onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
//                     placeholder="Feature description"
//                     className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                       isDarkMode 
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                     }`}
//                   />
//                 </div>
//               ) : (
//                 <div>
//                   <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {feature.title}
//                   </h4>
//                   <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                     {feature.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
//         isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <div className="flex items-center gap-4">
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Total Features: <strong>{promoData.features.length}</strong>
//           </span>
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Active: <strong className="text-green-500">{promoData.features.filter(f => f.active).length}</strong>
//           </span>
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Inactive: <strong className="text-red-500">{promoData.features.filter(f => !f.active).length}</strong>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PromoProductCMS;













import React, { useState, useRef, useEffect } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
  FiPlus, FiShoppingBag, FiShield, FiWind, FiSmile,
  FiStar, FiArrowRight, FiSave, FiRefreshCw, FiCheck, FiX
} from "react-icons/fi";
import axios from "axios";
import { API_URL, STORAGE_URL } from "../../../config";


const PromoProductCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Promo Product Section Data
  const [promoData, setPromoData] = useState({
    id: null,
    badge: "Best Seller",
    title: "Organic Menthol Balm",
    price: "19.99",
    description: "",
    buttonText: "Shop Now",
    image: "",
    imagePreview: null,
    active: true,
    feature_one: "100% Natural",
    feature_two: "Fresh Menthol",
    feature_three: "30 Day Refund",
    originalData: null
  });

  // Fetch promo product data from API
  const fetchPromoData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/promo-product`);
      
      if (response.data.success && response.data.promo_product) {
        const product = response.data.promo_product;

        setPromoData({
          id: product.id,
          badge: product.badge || "Best Seller",
          title: product.heading || "Organic Menthol Balm",
          price: product.price || "19.99",
          description: product.paragraph || "",
          buttonText: product.button_text || "Shop Now",
          image: product.image ? `${STORAGE_URL}/${product.image}` : "",
          imagePreview: null,
          active: true,
          feature_one: product.feature_one || "100% Natural",
          feature_two: product.feature_two || "Fresh Menthol",
          feature_three: product.feature_three || "30 Day Refund",
          originalData: product
        });
      }
    } catch (err) {
      console.error('Error fetching promo product data:', err);
      setError('Failed to load promo product data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Load promo product data on mount
  useEffect(() => {
    fetchPromoData();
  }, []);

  const updateField = (field, value) => {
    setPromoData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActive = () => {
    setPromoData(prev => ({ ...prev, active: !prev.active }));
  };

  // Save changes to API
  const saveChanges = async () => {
    if (!promoData.id) {
      setError('No promo product found to update');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      const formData = new FormData();
      
      formData.append('badge', promoData.badge);
      formData.append('heading', promoData.title);
      formData.append('paragraph', promoData.description);
      formData.append('price', promoData.price);
      formData.append('feature_one', promoData.feature_one);
      formData.append('feature_two', promoData.feature_two);
      formData.append('feature_three', promoData.feature_three);
      formData.append('button_text', promoData.buttonText);
      
      // Handle image if changed
      if (promoData.imagePreview && promoData.imagePreview.startsWith('data:image')) {
        const response = await fetch(promoData.imagePreview);
        const blob = await response.blob();
        formData.append('image', blob, `product-${Date.now()}.png`);
      }

      // Send update request
      await axios.post(`${API_URL}/promo-product/${promoData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setSuccessMessage('Promo product saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh data
      await fetchPromoData();
    } catch (err) {
      console.error('Error saving promo product data:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (file) => {
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

    setUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPromoData(prev => ({
        ...prev,
        imagePreview: reader.result
      }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Feature Management
  const updateFeature = (feature, value) => {
    setPromoData(prev => ({ ...prev, [feature]: value }));
  };

  // Icon selector
  const getIconComponent = (featureName) => {
    switch(featureName) {
      case 'feature_one': return <FiShield />;
      case 'feature_two': return <FiWind />;
      case 'feature_three': return <FiSmile />;
      default: return <FiShield />;
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
          if (e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
          }
        }}
      />

      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Promo Product Section Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ID: {promoData.id || 'N/A'} • 3 features
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
          {!isVisible && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
              Section Hidden
            </span>
          )}
          <button
            onClick={fetchPromoData}
            className="p-2 bg-gray-500/20 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
            title="Refresh"
            disabled={saving}
          >
            <FiRefreshCw className={`text-lg ${saving ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={saveChanges}
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
                <FiSave /> Save Changes
              </>
            )}
          </button>
          <button 
            onClick={toggleActive}
            className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
              promoData.active 
                ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {promoData.active ? <FiEye /> : <FiEyeOff />}
            <span className="text-sm">{promoData.active ? 'Active' : 'Inactive'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Product Image */}
        <div className="space-y-4">
          <div>
            <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Product Image
            </h3>
            <div className={`relative rounded-xl border-2 border-dashed overflow-hidden ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <div className="aspect-square relative group">
                {promoData.image || promoData.imagePreview ? (
                  <img 
                    src={promoData.imagePreview || promoData.image} 
                    alt="Product"
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
                    onClick={triggerFileInput}
                    disabled={uploading || saving}
                    className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {uploading ? (
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
            <p className={`text-xs mt-1 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Product image • 500x500px • Max 2MB
            </p>
          </div>
        </div>

        {/* Right Column - Text Fields */}
        <div className="space-y-4">
          {/* Badge */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Badge
            </label>
            <input
              type="text"
              value={promoData.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              disabled={saving}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
              }`}
              placeholder="e.g., Best Seller"
            />
          </div>

          {/* Title */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Product Title
            </label>
            <input
              type="text"
              value={promoData.title}
              onChange={(e) => updateField('title', e.target.value)}
              disabled={saving}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
              }`}
              placeholder="e.g., Organic Menthol Balm"
            />
          </div>

          {/* Price */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Price ($)
            </label>
            <input
              type="text"
              value={promoData.price}
              onChange={(e) => updateField('price', e.target.value)}
              disabled={saving}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
              }`}
              placeholder="e.g., 19.99"
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              value={promoData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows="3"
              disabled={saving}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
              }`}
              placeholder="Product description..."
            />
          </div>

          {/* Button Text */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Button Text
            </label>
            <input
              type="text"
              value={promoData.buttonText}
              onChange={(e) => updateField('buttonText', e.target.value)}
              disabled={saving}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
              }`}
              placeholder="e.g., Shop Now"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Product Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Feature One */}
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'border-blue-500/30 bg-gray-800' : 'border-blue-200 bg-white'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <FiShield className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Feature 1
              </span>
            </div>
            <input
              type="text"
              value={promoData.feature_one}
              onChange={(e) => updateFeature('feature_one', e.target.value)}
              disabled={saving}
              className={`w-full px-3 py-2 rounded-lg border text-sm ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="e.g., 100% Natural"
            />
          </div>

          {/* Feature Two */}
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'border-blue-500/30 bg-gray-800' : 'border-blue-200 bg-white'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <FiWind className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Feature 2
              </span>
            </div>
            <input
              type="text"
              value={promoData.feature_two}
              onChange={(e) => updateFeature('feature_two', e.target.value)}
              disabled={saving}
              className={`w-full px-3 py-2 rounded-lg border text-sm ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="e.g., Fresh Menthol"
            />
          </div>

          {/* Feature Three */}
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'border-blue-500/30 bg-gray-800' : 'border-blue-200 bg-white'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <FiSmile className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Feature 3
              </span>
            </div>
            <input
              type="text"
              value={promoData.feature_three}
              onChange={(e) => updateFeature('feature_three', e.target.value)}
              disabled={saving}
              className={`w-full px-3 py-2 rounded-lg border text-sm ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="e.g., 30 Day Refund"
            />
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Record ID: <strong>{promoData.id || 'N/A'}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Status: <strong className={promoData.active ? 'text-green-500' : 'text-red-500'}>
              {promoData.active ? 'Active' : 'Inactive'}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoProductCMS;