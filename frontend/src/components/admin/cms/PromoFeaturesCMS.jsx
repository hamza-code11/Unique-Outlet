// import React, { useState, useRef } from "react";
// import { 
//   FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
//   FiPlus, FiShoppingBag, FiShield, FiWind, FiSmile,
//   FiStar
// } from "react-icons/fi";

// const PromoFeaturesCMS = ({ isDarkMode, isVisible }) => {
//   const fileInputRef = useRef(null);
//   const [uploading, setUploading] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(null);

//   // Promo Features Section Data
//   const [promoData, setPromoData] = useState({
//     heading: "Try our new taste",
//     description: "Our vape shop is not only a variety of vaping products, but also an operational support service.",
//     buttonText: "Shop Now",
//     image: "/assets/home/product-single-no-decor-501x1024.png",
//     imagePreview: null,
//     active: true,
//     rating: 4.9,
//     features: [
//       {
//         id: 1,
//         icon: "FiShield",
//         title: "No dangerous toxins",
//         description: "We offer a wide range of quality vaping products",
//         active: true
//       },
//       {
//         id: 2,
//         icon: "FiWind",
//         title: "Feel of menthol",
//         description: "We offer a wide range of quality vaping products",
//         active: true
//       },
//       {
//         id: 3,
//         icon: "FiSmile",
//         title: "Safer than smoking",
//         description: "We offer a wide range of quality vaping products",
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

//   const handleImageUpload = (file) => {
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

//     setUploading(true);

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setTimeout(() => {
//         setPromoData(prev => ({
//           ...prev,
//           image: reader.result,
//           imagePreview: reader.result
//         }));
//         setUploading(false);
//       }, 500);
//     };
//     reader.readAsDataURL(file);
//   };

//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
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
//       {/* Hidden file input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files[0]) {
//             handleImageUpload(e.target.files[0]);
//           }
//         }}
//       />

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Promo Features Section Manager
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
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Text Content */}
//         <div className="lg:col-span-1 space-y-4">
//           {/* Heading */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Heading
//             </label>
//             <input
//               type="text"
//               value={promoData.heading}
//               onChange={(e) => updateField('heading', e.target.value)}
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
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

//           {/* Button Text */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Button Text
//             </label>
//             <input
//               type="text"
//               value={promoData.buttonText}
//               onChange={(e) => updateField('buttonText', e.target.value)}
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>

//           {/* Rating */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Rating (0-5)
//             </label>
//             <input
//               type="number"
//               step="0.1"
//               min="0"
//               max="5"
//               value={promoData.rating}
//               onChange={(e) => updateField('rating', parseFloat(e.target.value))}
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>
//         </div>

//         {/* Center Column - Image */}
//         <div className="lg:col-span-1 space-y-4">
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
//                     onClick={triggerFileInput}
//                     disabled={uploading}
//                     className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
//                   >
//                     {uploading ? (
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
//               Product image • 500x500px • Max 2MB
//             </p>
//           </div>

//           {/* New Badge Toggle */}
//           <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   "New" Badge
//                 </h4>
//                 <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                   Shows "New" tag on image
//                 </p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input 
//                   type="checkbox" 
//                   className="sr-only peer"
//                   checked={promoData.showNewBadge !== false}
//                   onChange={(e) => updateField('showNewBadge', e.target.checked)}
//                 />
//                 <div className={`w-11 h-6 rounded-full peer 
//                   ${isDarkMode 
//                     ? 'bg-gray-600 peer-checked:bg-blue-600' 
//                     : 'bg-gray-200 peer-checked:bg-blue-600'
//                   } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Empty (for balance) */}
//         <div className="lg:col-span-1"></div>
//       </div>

//       {/* Features Section */}
//       <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//         <div className="flex items-center justify-between mb-4">
//           <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Feature Cards ({promoData.features.length})
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
//                   <textarea
//                     value={feature.description}
//                     onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
//                     rows="2"
//                     placeholder="Feature description"
//                     className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
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

// export default PromoFeaturesCMS;



import React, { useState, useRef, useEffect } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
  FiPlus, FiShoppingBag, FiShield, FiWind, FiSmile,
  FiStar, FiSave, FiRefreshCw, FiCheck, FiX
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const PromoFeaturesCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Promo Features Section Data
  const [promoData, setPromoData] = useState({
    id: null,
    badge: "New",
    heading: "Try our new taste",
    paragraph: "Our vape shop is not only a variety of vaping products, but also an operational support service.",
    button_text: "Shop Now",
    image: "",
    imagePreview: null,
    active: true,
    feature_one_heading: "No dangerous toxins",
    feature_one_paragraph: "We offer a wide range of quality vaping products",
    feature_two_heading: "Feel of menthol",
    feature_two_paragraph: "We offer a wide range of quality vaping products",
    feature_three_heading: "Safer than smoking",
    feature_three_paragraph: "We offer a wide range of quality vaping products",
    originalData: null
  });

  // Fetch promo features data from API
  const fetchPromoData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/promo-features`);
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;

        setPromoData({
          id: data.id,
          badge: data.badge || "New",
          heading: data.heading || "Try our new taste",
          paragraph: data.paragraph || "",
          button_text: data.button_text || "Shop Now",
          image: data.image ? `http://127.0.0.1:8000/storage/${data.image}` : "",
          imagePreview: null,
          active: true,
          feature_one_heading: data.feature_one_heading || "No dangerous toxins",
          feature_one_paragraph: data.feature_one_paragraph || "We offer a wide range of quality vaping products",
          feature_two_heading: data.feature_two_heading || "Feel of menthol",
          feature_two_paragraph: data.feature_two_paragraph || "We offer a wide range of quality vaping products",
          feature_three_heading: data.feature_three_heading || "Safer than smoking",
          feature_three_paragraph: data.feature_three_paragraph || "We offer a wide range of quality vaping products",
          originalData: data
        });
      }
    } catch (err) {
      console.error('Error fetching promo features data:', err);
      setError('Failed to load promo features data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Load promo features data on mount
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
      setError('No promo features found to update');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      const formData = new FormData();
      
      formData.append('badge', promoData.badge);
      formData.append('heading', promoData.heading);
      formData.append('paragraph', promoData.paragraph);
      formData.append('button_text', promoData.button_text);
      formData.append('feature_one_heading', promoData.feature_one_heading);
      formData.append('feature_one_paragraph', promoData.feature_one_paragraph);
      formData.append('feature_two_heading', promoData.feature_two_heading);
      formData.append('feature_two_paragraph', promoData.feature_two_paragraph);
      formData.append('feature_three_heading', promoData.feature_three_heading);
      formData.append('feature_three_paragraph', promoData.feature_three_paragraph);
      
      // Handle image if changed
      if (promoData.imagePreview && promoData.imagePreview.startsWith('data:image')) {
        const response = await fetch(promoData.imagePreview);
        const blob = await response.blob();
        formData.append('image', blob, `features-${Date.now()}.png`);
      }

      // Send update request
      await axios.post(`${API_URL}/promo-features/${promoData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setSuccessMessage('Promo features saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh data
      await fetchPromoData();
    } catch (err) {
      console.error('Error saving promo features data:', err);
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

  // Icon selector based on feature index
  const getIconComponent = (index) => {
    switch(index) {
      case 0: return <FiShield />;
      case 1: return <FiWind />;
      case 2: return <FiSmile />;
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
            Promo Features Section Manager
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Text Content */}
        <div className="lg:col-span-1 space-y-4">
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
              placeholder="e.g., New"
            />
          </div>

          {/* Heading */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Heading
            </label>
            <input
              type="text"
              value={promoData.heading}
              onChange={(e) => updateField('heading', e.target.value)}
              disabled={saving}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
              }`}
              placeholder="e.g., Try our new taste"
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
              value={promoData.paragraph}
              onChange={(e) => updateField('paragraph', e.target.value)}
              rows="3"
              disabled={saving}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
              }`}
              placeholder="Section description..."
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
              value={promoData.button_text}
              onChange={(e) => updateField('button_text', e.target.value)}
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

        {/* Center Column - Image */}
        <div className="lg:col-span-1 space-y-4">
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

        {/* Right Column - Empty */}
        <div className="lg:col-span-1"></div>
      </div>

      {/* Features Section */}
      <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Feature Cards
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
              value={promoData.feature_one_heading}
              onChange={(e) => updateField('feature_one_heading', e.target.value)}
              disabled={saving}
              className={`w-full px-3 py-2 rounded-lg border text-sm mb-2 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Heading"
            />
            <textarea
              value={promoData.feature_one_paragraph}
              onChange={(e) => updateField('feature_one_paragraph', e.target.value)}
              rows="2"
              disabled={saving}
              className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Description"
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
              value={promoData.feature_two_heading}
              onChange={(e) => updateField('feature_two_heading', e.target.value)}
              disabled={saving}
              className={`w-full px-3 py-2 rounded-lg border text-sm mb-2 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Heading"
            />
            <textarea
              value={promoData.feature_two_paragraph}
              onChange={(e) => updateField('feature_two_paragraph', e.target.value)}
              rows="2"
              disabled={saving}
              className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Description"
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
              value={promoData.feature_three_heading}
              onChange={(e) => updateField('feature_three_heading', e.target.value)}
              disabled={saving}
              className={`w-full px-3 py-2 rounded-lg border text-sm mb-2 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Heading"
            />
            <textarea
              value={promoData.feature_three_paragraph}
              onChange={(e) => updateField('feature_three_paragraph', e.target.value)}
              rows="2"
              disabled={saving}
              className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Description"
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

export default PromoFeaturesCMS;