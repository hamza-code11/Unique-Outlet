// import React, { useState, useRef } from "react";
// import { 
//   FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
//   FiShoppingBag, FiGift, FiArrowRight
// } from "react-icons/fi";

// const InteractivePromoCMS = ({ isDarkMode, isVisible }) => {
//   const fileInputRefs = {
//     left: useRef(null),
//     top: useRef(null),
//     bottom: useRef(null)
//   };
  
//   const [uploading, setUploading] = useState({ left: false, top: false, bottom: false });

//   // Interactive Promo Data
//   const [promoData, setPromoData] = useState({
//     leftCard: {
//       id: 1,
//       title: "The Best E-Liquid Bundles",
//       description: "Explore a wide range of vaping products with fast delivery and beginner-friendly guidance.",
//       buttonText: "Shop Now",
//       secondaryButtonText: "Get 25% Off",
//       image: "/assets/home/view-image1.jpg",
//       imagePreview: null,
//       active: true
//     },
//     topCard: {
//       id: 2,
//       title: "New To Vaping?",
//       description: "Learn how vaping works and choose the right starter kit.",
//       buttonText: "Start Here",
//       image: "/assets/home/view-image2.jpg",
//       imagePreview: null,
//       active: true
//     },
//     bottomCard: {
//       id: 3,
//       title: "Vap Mode",
//       description: "Discover advanced devices and customize your experience.",
//       buttonText: "Shop Now",
//       image: "/assets/home/view-image3.jpg",
//       imagePreview: null,
//       active: true
//     }
//   });

//   const updateCardField = (card, field, value) => {
//     setPromoData(prev => ({
//       ...prev,
//       [card]: {
//         ...prev[card],
//         [field]: value
//       }
//     }));
//   };

//   const toggleCardActive = (card) => {
//     setPromoData(prev => ({
//       ...prev,
//       [card]: {
//         ...prev[card],
//         active: !prev[card].active
//       }
//     }));
//   };

//   const handleImageUpload = (card, file) => {
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

//     setUploading(prev => ({ ...prev, [card]: true }));

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setTimeout(() => {
//         setPromoData(prev => ({
//           ...prev,
//           [card]: {
//             ...prev[card],
//             image: reader.result,
//             imagePreview: reader.result
//           }
//         }));
//         setUploading(prev => ({ ...prev, [card]: false }));
//       }, 500);
//     };
//     reader.readAsDataURL(file);
//   };

//   const triggerFileInput = (card) => {
//     if (fileInputRefs[card]?.current) {
//       fileInputRefs[card].current.click();
//     }
//   };

//   const toggleSection = () => {
//     // This is handled by parent component
//   };

//   return (
//     <div className="space-y-6">
//       {/* Hidden file inputs */}
//       <input
//         type="file"
//         ref={fileInputRefs.left}
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files[0]) {
//             handleImageUpload('left', e.target.files[0]);
//           }
//         }}
//       />
//       <input
//         type="file"
//         ref={fileInputRefs.top}
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files[0]) {
//             handleImageUpload('top', e.target.files[0]);
//           }
//         }}
//       />
//       <input
//         type="file"
//         ref={fileInputRefs.bottom}
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files[0]) {
//             handleImageUpload('bottom', e.target.files[0]);
//           }
//         }}
//       />

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Interactive Promo Manager
//           </h2>
//           <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             3 promo cards • Edit content below
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {!isVisible && (
//             <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
//               Section Hidden
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Big Card */}
//         <div className="lg:col-span-1">
//           <div className={`p-5 rounded-xl border ${
//             isDarkMode 
//               ? promoData.leftCard.active ? 'border-blue-500/30 bg-gray-800' : 'border-gray-700 bg-gray-800/50 opacity-60'
//               : promoData.leftCard.active ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
//           }`}>
//             {/* Card Header */}
//             <div className="flex items-center justify-between mb-4">
//               <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                 Left Card (Large)
//               </h3>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => toggleCardActive('leftCard')}
//                   className={`p-2 rounded-lg transition-colors ${
//                     promoData.leftCard.active 
//                       ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
//                       : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
//                   }`}
//                 >
//                   {promoData.leftCard.active ? <FiEye /> : <FiEyeOff />}
//                 </button>
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div className="mb-4">
//               <div className={`relative rounded-lg border-2 border-dashed overflow-hidden ${
//                 isDarkMode ? 'border-gray-600' : 'border-gray-300'
//               }`}>
//                 <div className="aspect-video relative group">
//                   {promoData.leftCard.image || promoData.leftCard.imagePreview ? (
//                     <img 
//                       src={promoData.leftCard.imagePreview || promoData.leftCard.image} 
//                       alt="Left Card"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className={`w-full h-full flex flex-col items-center justify-center ${
//                       isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                     }`}>
//                       <FiImage className={`text-4xl mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
//                       <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                         No image
//                       </p>
//                     </div>
//                   )}

//                   {/* Upload Overlay */}
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                     <button
//                       onClick={() => triggerFileInput('left')}
//                       disabled={uploading.left}
//                       className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
//                     >
//                       {uploading.left ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                           Uploading...
//                         </>
//                       ) : (
//                         <>
//                           <FiUpload />
//                           Upload Image
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Content Fields */}
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 value={promoData.leftCard.title}
//                 onChange={(e) => updateCardField('leftCard', 'title', e.target.value)}
//                 placeholder="Card Title"
//                 className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//               <textarea
//                 value={promoData.leftCard.description}
//                 onChange={(e) => updateCardField('leftCard', 'description', e.target.value)}
//                 placeholder="Card Description"
//                 rows="2"
//                 className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="text"
//                   value={promoData.leftCard.buttonText}
//                   onChange={(e) => updateCardField('leftCard', 'buttonText', e.target.value)}
//                   placeholder="Button Text"
//                   className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                     isDarkMode 
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                   }`}
//                 />
//                 <input
//                   type="text"
//                   value={promoData.leftCard.secondaryButtonText}
//                   onChange={(e) => updateCardField('leftCard', 'secondaryButtonText', e.target.value)}
//                   placeholder="Secondary Button"
//                   className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                     isDarkMode 
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                   }`}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Cards Column */}
//         <div className="lg:col-span-1 space-y-6">
//           {/* Top Card */}
//           <div className={`p-5 rounded-xl border ${
//             isDarkMode 
//               ? promoData.topCard.active ? 'border-blue-500/30 bg-gray-800' : 'border-gray-700 bg-gray-800/50 opacity-60'
//               : promoData.topCard.active ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
//           }`}>
//             <div className="flex items-center justify-between mb-4">
//               <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                 Top Right Card
//               </h3>
//               <button
//                 onClick={() => toggleCardActive('topCard')}
//                 className={`p-2 rounded-lg transition-colors ${
//                   promoData.topCard.active 
//                     ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
//                     : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
//                 }`}
//               >
//                 {promoData.topCard.active ? <FiEye /> : <FiEyeOff />}
//               </button>
//             </div>

//             <div className="mb-4">
//               <div className={`relative rounded-lg border-2 border-dashed overflow-hidden ${
//                 isDarkMode ? 'border-gray-600' : 'border-gray-300'
//               }`}>
//                 <div className="aspect-video relative group">
//                   <img 
//                     src={promoData.topCard.imagePreview || promoData.topCard.image} 
//                     alt="Top Card"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                     <button
//                       onClick={() => triggerFileInput('top')}
//                       disabled={uploading.top}
//                       className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
//                     >
//                       {uploading.top ? <span className="animate-spin">⏳</span> : <FiUpload />}
//                       Change
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <input
//                 type="text"
//                 value={promoData.topCard.title}
//                 onChange={(e) => updateCardField('topCard', 'title', e.target.value)}
//                 className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                   isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//               />
//               <textarea
//                 value={promoData.topCard.description}
//                 onChange={(e) => updateCardField('topCard', 'description', e.target.value)}
//                 rows="2"
//                 className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
//                   isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//               />
//               <input
//                 type="text"
//                 value={promoData.topCard.buttonText}
//                 onChange={(e) => updateCardField('topCard', 'buttonText', e.target.value)}
//                 className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                   isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Bottom Card */}
//           <div className={`p-5 rounded-xl border ${
//             isDarkMode 
//               ? promoData.bottomCard.active ? 'border-blue-500/30 bg-gray-800' : 'border-gray-700 bg-gray-800/50 opacity-60'
//               : promoData.bottomCard.active ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
//           }`}>
//             <div className="flex items-center justify-between mb-4">
//               <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                 Bottom Right Card
//               </h3>
//               <button
//                 onClick={() => toggleCardActive('bottomCard')}
//                 className={`p-2 rounded-lg transition-colors ${
//                   promoData.bottomCard.active 
//                     ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
//                     : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
//                 }`}
//               >
//                 {promoData.bottomCard.active ? <FiEye /> : <FiEyeOff />}
//               </button>
//             </div>

//             <div className="mb-4">
//               <div className={`relative rounded-lg border-2 border-dashed overflow-hidden ${
//                 isDarkMode ? 'border-gray-600' : 'border-gray-300'
//               }`}>
//                 <div className="aspect-video relative group">
//                   <img 
//                     src={promoData.bottomCard.imagePreview || promoData.bottomCard.image} 
//                     alt="Bottom Card"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                     <button
//                       onClick={() => triggerFileInput('bottom')}
//                       disabled={uploading.bottom}
//                       className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
//                     >
//                       {uploading.bottom ? <span className="animate-spin">⏳</span> : <FiUpload />}
//                       Change
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <input
//                 type="text"
//                 value={promoData.bottomCard.title}
//                 onChange={(e) => updateCardField('bottomCard', 'title', e.target.value)}
//                 className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                   isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//               />
//               <textarea
//                 value={promoData.bottomCard.description}
//                 onChange={(e) => updateCardField('bottomCard', 'description', e.target.value)}
//                 rows="2"
//                 className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
//                   isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//               />
//               <input
//                 type="text"
//                 value={promoData.bottomCard.buttonText}
//                 onChange={(e) => updateCardField('bottomCard', 'buttonText', e.target.value)}
//                 className={`w-full px-3 py-2 rounded-lg border text-sm ${
//                   isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
//         isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <div className="flex items-center gap-4">
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Active Cards: <strong className="text-green-500">
//               {[promoData.leftCard, promoData.topCard, promoData.bottomCard].filter(c => c.active).length}
//             </strong> / 3
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InteractivePromoCMS;














import React, { useState, useRef, useEffect } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
  FiShoppingBag, FiGift, FiArrowRight,
  FiSave, FiRefreshCw, FiCheck, FiX
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const InteractivePromoCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRefs = {
    left: useRef(null),
    top: useRef(null),
    bottom: useRef(null)
  };
  
  const [uploading, setUploading] = useState({ left: false, top: false, bottom: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Interactive Promo Data
  const [promoData, setPromoData] = useState({
    id: null,
    leftCard: {
      id: null,
      title: "",
      description: "",
      buttonText: "Shop Now",
      secondaryButtonText: "Get 25% Off",
      image: "",
      imagePreview: null,
      active: true
    },
    topCard: {
      id: null,
      title: "",
      description: "",
      buttonText: "Start Here",
      image: "",
      imagePreview: null,
      active: true
    },
    bottomCard: {
      id: null,
      title: "",
      description: "",
      buttonText: "Shop Now",
      image: "",
      imagePreview: null,
      active: true
    }
  });

  // Fetch interactive promo data from API
  const fetchPromoData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/interactive-promo`);
      
      if (response.data.success && response.data.promo) {
        const promo = response.data.promo;

        setPromoData({
          id: promo.id,
          leftCard: {
            id: promo.id,
            title: promo.left_heading || "The Best E-Liquid Bundles",
            description: promo.left_paragraph || "",
            buttonText: promo.left_button_text || "Shop Now",
            secondaryButtonText: "Get 25% Off",
            image: promo.left_image ? `http://127.0.0.1:8000/storage/${promo.left_image}` : "",
            imagePreview: null,
            active: true
          },
          topCard: {
            id: promo.id,
            title: promo.right_top_heading || "New To Vaping?",
            description: promo.right_top_paragraph || "",
            buttonText: promo.right_top_button_text || "Start Here",
            image: promo.right_top_image ? `http://127.0.0.1:8000/storage/${promo.right_top_image}` : "",
            imagePreview: null,
            active: true
          },
          bottomCard: {
            id: promo.id,
            title: promo.right_bottom_heading || "Vap Mode",
            description: promo.right_bottom_paragraph || "",
            buttonText: promo.right_bottom_button_text || "Shop Now",
            image: promo.right_bottom_image ? `http://127.0.0.1:8000/storage/${promo.right_bottom_image}` : "",
            imagePreview: null,
            active: true
          }
        });
      }
    } catch (err) {
      console.error('Error fetching interactive promo data:', err);
      setError('Failed to load interactive promo data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchPromoData();
  }, []);

  const updateCardField = (card, field, value) => {
    setPromoData(prev => ({
      ...prev,
      [card]: {
        ...prev[card],
        [field]: value
      }
    }));
  };

  const toggleCardActive = (card) => {
    setPromoData(prev => ({
      ...prev,
      [card]: {
        ...prev[card],
        active: !prev[card].active
      }
    }));
  };

  // Save changes to API
  const saveChanges = async () => {
    if (!promoData.id) {
      // If no ID, we need to create new record
      await createNewRecord();
      return;
    }

    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      const formData = new FormData();
      
      // Left Card
      formData.append('left_heading', promoData.leftCard.title);
      formData.append('left_paragraph', promoData.leftCard.description);
      formData.append('left_button_text', promoData.leftCard.buttonText);
      
      // Right Top Card
      formData.append('right_top_heading', promoData.topCard.title);
      formData.append('right_top_paragraph', promoData.topCard.description);
      formData.append('right_top_button_text', promoData.topCard.buttonText);
      
      // Right Bottom Card
      formData.append('right_bottom_heading', promoData.bottomCard.title);
      formData.append('right_bottom_paragraph', promoData.bottomCard.description);
      formData.append('right_bottom_button_text', promoData.bottomCard.buttonText);
      
      // Handle images if changed
      if (promoData.leftCard.imagePreview && promoData.leftCard.imagePreview.startsWith('data:image')) {
        const response = await fetch(promoData.leftCard.imagePreview);
        const blob = await response.blob();
        formData.append('left_image', blob, `left-${Date.now()}.jpg`);
      }
      
      if (promoData.topCard.imagePreview && promoData.topCard.imagePreview.startsWith('data:image')) {
        const response = await fetch(promoData.topCard.imagePreview);
        const blob = await response.blob();
        formData.append('right_top_image', blob, `top-${Date.now()}.jpg`);
      }
      
      if (promoData.bottomCard.imagePreview && promoData.bottomCard.imagePreview.startsWith('data:image')) {
        const response = await fetch(promoData.bottomCard.imagePreview);
        const blob = await response.blob();
        formData.append('right_bottom_image', blob, `bottom-${Date.now()}.jpg`);
      }

      // Send update request
      await axios.post(`${API_URL}/interactive-promo/${promoData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setSuccessMessage('Interactive promo saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh data
      await fetchPromoData();
    } catch (err) {
      console.error('Error saving interactive promo data:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Create new record
  const createNewRecord = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      const formData = new FormData();
      
      // Left Card
      formData.append('left_heading', promoData.leftCard.title || "The Best E-Liquid Bundles");
      formData.append('left_paragraph', promoData.leftCard.description || "Explore a wide range of vaping products with fast delivery and beginner-friendly guidance.");
      formData.append('left_button_text', promoData.leftCard.buttonText || "Shop Now");
      
      // Right Top Card
      formData.append('right_top_heading', promoData.topCard.title || "New To Vaping?");
      formData.append('right_top_paragraph', promoData.topCard.description || "Learn how vaping works and choose the right starter kit.");
      formData.append('right_top_button_text', promoData.topCard.buttonText || "Start Here");
      
      // Right Bottom Card
      formData.append('right_bottom_heading', promoData.bottomCard.title || "Vap Mode");
      formData.append('right_bottom_paragraph', promoData.bottomCard.description || "Discover advanced devices and customize your experience.");
      formData.append('right_bottom_button_text', promoData.bottomCard.buttonText || "Shop Now");
      
      // Handle images if changed
      if (promoData.leftCard.imagePreview && promoData.leftCard.imagePreview.startsWith('data:image')) {
        const response = await fetch(promoData.leftCard.imagePreview);
        const blob = await response.blob();
        formData.append('left_image', blob, `left-${Date.now()}.jpg`);
      }
      
      if (promoData.topCard.imagePreview && promoData.topCard.imagePreview.startsWith('data:image')) {
        const response = await fetch(promoData.topCard.imagePreview);
        const blob = await response.blob();
        formData.append('right_top_image', blob, `top-${Date.now()}.jpg`);
      }
      
      if (promoData.bottomCard.imagePreview && promoData.bottomCard.imagePreview.startsWith('data:image')) {
        const response = await fetch(promoData.bottomCard.imagePreview);
        const blob = await response.blob();
        formData.append('right_bottom_image', blob, `bottom-${Date.now()}.jpg`);
      }

      // Send store request
      const response = await axios.post(`${API_URL}/interactive-promo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success && response.data.promo) {
        setSuccessMessage('Interactive promo created successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        
        // Refresh data
        await fetchPromoData();
      }
    } catch (err) {
      console.error('Error creating interactive promo:', err);
      setError('Failed to create record. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (card, file) => {
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

    setUploading(prev => ({ ...prev, [card]: true }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPromoData(prev => ({
        ...prev,
        [card]: {
          ...prev[card],
          imagePreview: reader.result
        }
      }));
      setUploading(prev => ({ ...prev, [card]: false }));
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (card) => {
    if (fileInputRefs[card]?.current) {
      fileInputRefs[card].current.click();
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
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRefs.left}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleImageUpload('leftCard', e.target.files[0]);
          }
        }}
      />
      <input
        type="file"
        ref={fileInputRefs.top}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleImageUpload('topCard', e.target.files[0]);
          }
        }}
      />
      <input
        type="file"
        ref={fileInputRefs.bottom}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleImageUpload('bottomCard', e.target.files[0]);
          }
        }}
      />

      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Interactive Promo Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ID: {promoData.id || 'New'} • 3 promo cards
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
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Big Card */}
        <div className="lg:col-span-1">
          <div className={`p-5 rounded-xl border ${
            isDarkMode 
              ? promoData.leftCard.active ? 'border-blue-500/30 bg-gray-800' : 'border-gray-700 bg-gray-800/50 opacity-60'
              : promoData.leftCard.active ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
          }`}>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Left Card (Large)
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleCardActive('leftCard')}
                  className={`p-2 rounded-lg transition-colors ${
                    promoData.leftCard.active 
                      ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                      : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {promoData.leftCard.active ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <div className={`relative rounded-lg border-2 border-dashed overflow-hidden ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <div className="aspect-video relative group">
                  {promoData.leftCard.image || promoData.leftCard.imagePreview ? (
                    <img 
                      src={promoData.leftCard.imagePreview || promoData.leftCard.image} 
                      alt="Left Card"
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
                      onClick={() => triggerFileInput('left')}
                      disabled={uploading.left || saving}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {uploading.left ? (
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
            </div>

            {/* Content Fields */}
            <div className="space-y-3">
              <input
                type="text"
                value={promoData.leftCard.title}
                onChange={(e) => updateCardField('leftCard', 'title', e.target.value)}
                placeholder="Card Title"
                disabled={saving}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
              <textarea
                value={promoData.leftCard.description}
                onChange={(e) => updateCardField('leftCard', 'description', e.target.value)}
                placeholder="Card Description"
                rows="2"
                disabled={saving}
                className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={promoData.leftCard.buttonText}
                  onChange={(e) => updateCardField('leftCard', 'buttonText', e.target.value)}
                  placeholder="Button Text"
                  disabled={saving}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                  }`}
                />
                <input
                  type="text"
                  value={promoData.leftCard.secondaryButtonText}
                  onChange={(e) => updateCardField('leftCard', 'secondaryButtonText', e.target.value)}
                  placeholder="Secondary Button"
                  disabled={saving}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Cards Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Top Card */}
          <div className={`p-5 rounded-xl border ${
            isDarkMode 
              ? promoData.topCard.active ? 'border-blue-500/30 bg-gray-800' : 'border-gray-700 bg-gray-800/50 opacity-60'
              : promoData.topCard.active ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Top Right Card
              </h3>
              <button
                onClick={() => toggleCardActive('topCard')}
                className={`p-2 rounded-lg transition-colors ${
                  promoData.topCard.active 
                    ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                    : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {promoData.topCard.active ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>

            <div className="mb-4">
              <div className={`relative rounded-lg border-2 border-dashed overflow-hidden ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <div className="aspect-video relative group">
                  {promoData.topCard.image || promoData.topCard.imagePreview ? (
                    <img 
                      src={promoData.topCard.imagePreview || promoData.topCard.image} 
                      alt="Top Card"
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
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => triggerFileInput('top')}
                      disabled={uploading.top || saving}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {uploading.top ? (
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
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={promoData.topCard.title}
                onChange={(e) => updateCardField('topCard', 'title', e.target.value)}
                placeholder="Card Title"
                disabled={saving}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
              <textarea
                value={promoData.topCard.description}
                onChange={(e) => updateCardField('topCard', 'description', e.target.value)}
                placeholder="Card Description"
                rows="2"
                disabled={saving}
                className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
              <input
                type="text"
                value={promoData.topCard.buttonText}
                onChange={(e) => updateCardField('topCard', 'buttonText', e.target.value)}
                placeholder="Button Text"
                disabled={saving}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
          </div>

          {/* Bottom Card */}
          <div className={`p-5 rounded-xl border ${
            isDarkMode 
              ? promoData.bottomCard.active ? 'border-blue-500/30 bg-gray-800' : 'border-gray-700 bg-gray-800/50 opacity-60'
              : promoData.bottomCard.active ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Bottom Right Card
              </h3>
              <button
                onClick={() => toggleCardActive('bottomCard')}
                className={`p-2 rounded-lg transition-colors ${
                  promoData.bottomCard.active 
                    ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                    : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {promoData.bottomCard.active ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>

            <div className="mb-4">
              <div className={`relative rounded-lg border-2 border-dashed overflow-hidden ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <div className="aspect-video relative group">
                  {promoData.bottomCard.image || promoData.bottomCard.imagePreview ? (
                    <img 
                      src={promoData.bottomCard.imagePreview || promoData.bottomCard.image} 
                      alt="Bottom Card"
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
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => triggerFileInput('bottom')}
                      disabled={uploading.bottom || saving}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {uploading.bottom ? (
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
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={promoData.bottomCard.title}
                onChange={(e) => updateCardField('bottomCard', 'title', e.target.value)}
                placeholder="Card Title"
                disabled={saving}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
              <textarea
                value={promoData.bottomCard.description}
                onChange={(e) => updateCardField('bottomCard', 'description', e.target.value)}
                placeholder="Card Description"
                rows="2"
                disabled={saving}
                className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
              <input
                type="text"
                value={promoData.bottomCard.buttonText}
                onChange={(e) => updateCardField('bottomCard', 'buttonText', e.target.value)}
                placeholder="Button Text"
                disabled={saving}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Record ID: <strong>{promoData.id || 'New'}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Active Cards: <strong className="text-green-500">
              {[promoData.leftCard, promoData.topCard, promoData.bottomCard].filter(c => c.active).length}
            </strong> / 3
          </span>
        </div>
      </div>
    </div>
  );
};

export default InteractivePromoCMS; 