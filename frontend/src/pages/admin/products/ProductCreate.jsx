// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";
// import { 
//   FiSave, FiPackage, FiEye, FiEyeOff, FiList,
//   FiDollarSign, FiHash, FiTag, FiLayers, FiPlus, FiX,
//   FiUpload, FiImage, FiUser, FiMapPin
// } from "react-icons/fi";
// import axios from "axios";

// const API_URL = 'http://127.0.0.1:8000/api';

// const ProductCreate = () => {
//   const { isDarkMode } = useOutletContext();
//   const navigate = useNavigate();
  
//   // State for categories and subcategories
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSubs, setFilteredSubs] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     category_id: "",
//     sub_category_id: "",
//     name: "",
//     brand_name: "",
//     price: "",
//     stock: "",
//     description: "",
//     bottle_size: "30ml",
//     specifications: {
//       flavor: "",
//       puffs: "",
//       nicotine: "",
//       type: ""
//     },
//     vendor_info: {
//       vendor: "",
//       country: ""
//     },
//     status: 1
//   });

//   // Image upload state
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   const [errors, setErrors] = useState({});
//   const [slugEditable, setSlugEditable] = useState(false);

//   // Fetch categories on mount
//   useEffect(() => {
//     fetchCategories();
//     fetchSubcategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/categories`);
//       setCategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchSubcategories = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/subcategories`);
//       setSubcategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//     }
//   };

//   // Filter subcategories when category changes
//   useEffect(() => {
//     if (formData.category_id) {
//       const filtered = subcategories.filter(
//         sub => sub.category_id === parseInt(formData.category_id)
//       );
//       setFilteredSubs(filtered);
//     } else {
//       setFilteredSubs([]);
//     }
//   }, [formData.category_id, subcategories]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Handle nested objects
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }

//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Max 6 images
//     if (images.length + files.length > 6) {
//       alert("You can only upload up to 6 images");
//       return;
//     }

//     // Create previews
//     const newPreviews = files.map(file => URL.createObjectURL(file));
//     setImagePreviews(prev => [...prev, ...newPreviews]);
//     setImages(prev => [...prev, ...files]);
//   };

//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   // Add specification field
//   const addSpecification = () => {
//     setFormData(prev => ({
//       ...prev,
//       specifications: {
//         ...prev.specifications,
//         newSpec: ""
//       }
//     }));
//   };

//   const removeSpecification = (key) => {
//     if (key === 'flavor' || key === 'puffs' || key === 'nicotine' || key === 'type') {
//       alert("Cannot remove default specifications");
//       return;
//     }
//     const newSpecs = { ...formData.specifications };
//     delete newSpecs[key];
//     setFormData(prev => ({
//       ...prev,
//       specifications: newSpecs
//     }));
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.category_id) {
//       newErrors.category_id = 'Category is required';
//     }

//     if (!formData.sub_category_id) {
//       newErrors.sub_category_id = 'Subcategory is required';
//     }

//     if (!formData.name.trim()) {
//       newErrors.name = 'Product name is required';
//     }

//     if (!formData.price) {
//       newErrors.price = 'Price is required';
//     } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
//       newErrors.price = 'Price must be a positive number';
//     }

//     if (!formData.stock) {
//       newErrors.stock = 'Stock is required';
//     } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
//       newErrors.stock = 'Stock must be a non-negative number';
//     }

//     return newErrors;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create FormData for multipart upload
//       const submitData = new FormData();
      
//       // Append all form fields
//       submitData.append('category_id', formData.category_id);
//       submitData.append('sub_category_id', formData.sub_category_id);
//       submitData.append('name', formData.name);
//       submitData.append('brand_name', formData.brand_name);
//       submitData.append('price', formData.price);
//       submitData.append('stock', formData.stock);
//       submitData.append('description', formData.description || '');
//       submitData.append('bottle_size', formData.bottle_size);
//       submitData.append('specifications', JSON.stringify(formData.specifications));
//       submitData.append('vendor_info', JSON.stringify(formData.vendor_info));
//       submitData.append('status', formData.status);

//       // Append images
//       images.forEach((image, index) => {
//         submitData.append(`images[]`, image);
//       });

//       // Send to API
//       const response = await axios.post(`${API_URL}/products`, submitData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Product created:', response.data);
//       alert('Product created successfully!');
//       navigate('/admin/products');
      
//     } catch (error) {
//       console.error('Error creating product:', error);
//       alert('Failed to create product. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header with Show Products Button */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Add New Product
//           </h1>
//           <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Create a new product
//           </p>
//         </div>
        
//         <button
//           onClick={() => navigate('/admin/products')}
//           className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
//             ${isDarkMode
//               ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//         >
//           <FiList className="text-base" />
//           <span>Show Products</span>
//         </button>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
//         {/* Basic Information */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <h2 className={`text-base font-medium mb-4 pb-2 border-b ${
//             isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
//           }`}>
//             Product Information
//           </h2>

//           <div className="space-y-4">
//             {/* Category and Subcategory */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Category */}
//               <div>
//                 <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiTag className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   <select
//                     name="category_id"
//                     value={formData.category_id}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${errors.category_id ? 'border-red-500' : ''}
//                       ${isDarkMode
//                         ? 'bg-gray-700 border-gray-600 text-white'
//                         : 'bg-white border-gray-300 text-gray-900'
//                       }`}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map(cat => (
//                       <option key={cat.id} value={cat.id}>{cat.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.category_id && (
//                   <p className="text-xs text-red-500 mt-1">{errors.category_id}</p>
//                 )}
//               </div>

//               {/* Subcategory */}
//               <div>
//                 <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Subcategory <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiLayers className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   <select
//                     name="sub_category_id"
//                     value={formData.sub_category_id}
//                     onChange={handleChange}
//                     disabled={!formData.category_id}
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${errors.sub_category_id ? 'border-red-500' : ''}
//                       ${!formData.category_id ? 'opacity-50 cursor-not-allowed' : ''}
//                       ${isDarkMode
//                         ? 'bg-gray-700 border-gray-600 text-white'
//                         : 'bg-white border-gray-300 text-gray-900'
//                       }`}
//                   >
//                     <option value="">Select Subcategory</option>
//                     {filteredSubs.map(sub => (
//                       <option key={sub.id} value={sub.id}>{sub.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.sub_category_id && (
//                   <p className="text-xs text-red-500 mt-1">{errors.sub_category_id}</p>
//                 )}
//               </div>
//             </div>

//             {/* Product Name */}
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Product Name <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiPackage className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="e.g., Mega Pro Pods 40K - Watermelon Ice"
//                   className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                     focus:outline-none focus:ring-2 focus:ring-blue-500
//                     ${errors.name ? 'border-red-500' : ''}
//                     ${isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                     }`}
//                 />
//               </div>
//               {errors.name && (
//                 <p className="text-xs text-red-500 mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Brand Name */}
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Brand Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiUser className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   type="text"
//                   name="brand_name"
//                   value={formData.brand_name}
//                   onChange={handleChange}
//                   placeholder="e.g., RockMe"
//                   className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                     focus:outline-none focus:ring-2 focus:ring-blue-500
//                     ${isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                     }`}
//                 />
//               </div>
//             </div>

//             {/* Price and Stock */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Price ($) <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiDollarSign className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     step="0.01"
//                     min="0"
//                     placeholder="0.00"
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${errors.price ? 'border-red-500' : ''}
//                       ${isDarkMode
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                       }`}
//                   />
//                 </div>
//                 {errors.price && (
//                   <p className="text-xs text-red-500 mt-1">{errors.price}</p>
//                 )}
//               </div>

//               <div>
//                 <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Stock Quantity <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiHash className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   <input
//                     type="number"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     min="0"
//                     step="1"
//                     placeholder="0"
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${errors.stock ? 'border-red-500' : ''}
//                       ${isDarkMode
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                       }`}
//                   />
//                 </div>
//                 {errors.stock && (
//                   <p className="text-xs text-red-500 mt-1">{errors.stock}</p>
//                 )}
//               </div>
//             </div>

//             {/* Bottle Size */}
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Bottle Size
//               </label>
//               <select
//                 name="bottle_size"
//                 value={formData.bottle_size}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 rounded-lg border text-sm
//                   focus:outline-none focus:ring-2 focus:ring-blue-500
//                   ${isDarkMode
//                     ? 'bg-gray-700 border-gray-600 text-white'
//                     : 'bg-white border-gray-300 text-gray-900'
//                   }`}
//               >
//                 <option value="30ml">30ml</option>
//                 <option value="60ml">60ml</option>
//                 <option value="100ml">100ml</option>
//                 <option value="120ml">120ml</option>
//               </select>
//             </div>

//             {/* Description */}
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Product description..."
//                 className={`w-full px-4 py-2 rounded-lg border text-sm
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
//                   ${isDarkMode
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                   }`}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Specifications */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Specifications
//             </h2>
//             <button
//               type="button"
//               onClick={addSpecification}
//               className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
//             >
//               <FiPlus className="text-sm" />
//               Add Field
//             </button>
//           </div>

//           <div className="space-y-3">
//             {Object.entries(formData.specifications).map(([key, value]) => (
//               <div key={key} className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={key}
//                   readOnly
//                   className={`w-1/3 px-3 py-2 rounded-lg border text-sm bg-gray-100
//                     ${isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}
//                 />
//                 <input
//                   type="text"
//                   name={`specifications.${key}`}
//                   value={value}
//                   onChange={handleChange}
//                   placeholder={`Enter ${key}`}
//                   className={`flex-1 px-3 py-2 rounded-lg border text-sm
//                     focus:outline-none focus:ring-2 focus:ring-blue-500
//                     ${isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white'
//                       : 'bg-white border-gray-300 text-gray-900'
//                     }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeSpecification(key)}
//                   className="p-2 text-red-500 hover:text-red-600"
//                 >
//                   <FiX className="text-sm" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Vendor Information */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <h2 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Vendor Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Vendor Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiUser className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   type="text"
//                   name="vendor_info.vendor"
//                   value={formData.vendor_info.vendor}
//                   onChange={handleChange}
//                   placeholder="e.g., RockMe"
//                   className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                     focus:outline-none focus:ring-2 focus:ring-blue-500
//                     ${isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                     }`}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Country
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiMapPin className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   type="text"
//                   name="vendor_info.country"
//                   value={formData.vendor_info.country}
//                   onChange={handleChange}
//                   placeholder="e.g., USA"
//                   className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                     focus:outline-none focus:ring-2 focus:ring-blue-500
//                     ${isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                     }`}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Image Upload */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <h2 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Product Images (Max 6)
//           </h2>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-3">
//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={preview}
//                   alt={`Preview ${index + 1}`}
//                   className="w-full h-24 object-cover rounded-lg border"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                 >
//                   <FiX className="text-xs" />
//                 </button>
//               </div>
//             ))}

//             {images.length < 6 && (
//               <label className={`border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer
//                 ${isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}`}>
//                 <FiUpload className={`text-xl mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                 <span className="text-xs">Upload</span>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>
//           <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Supported formats: JPG, PNG, JPEG (Max 2MB each)
//           </p>
//         </div>

//         {/* Status */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <h2 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Status
//           </h2>

//           <div className="flex items-center gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="status"
//                 value="1"
//                 checked={formData.status === 1}
//                 onChange={() => setFormData(prev => ({ ...prev, status: 1 }))}
//                 className="w-4 h-4 accent-blue-600"
//               />
//               <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Active</span>
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="status"
//                 value="0"
//                 checked={formData.status === 0}
//                 onChange={() => setFormData(prev => ({ ...prev, status: 0 }))}
//                 className="w-4 h-4 accent-red-600"
//               />
//               <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Inactive</span>
//             </label>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={() => navigate('/admin/products')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium
//               ${isDarkMode
//                 ? 'bg-gray-700 text-gray-300'
//                 : 'bg-gray-200 text-gray-700'
//               }`}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
//           >
//             <FiSave className="text-sm" />
//             {loading ? 'Saving...' : 'Save Product'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductCreate;


















// // src/pages/admin/products/ProductCreate.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";
// import { 
//   FiSave, FiPackage, FiEye, FiEyeOff, FiList,
//   FiDollarSign, FiHash, FiTag, FiLayers, FiPlus, FiX,
//   FiUpload, FiImage
// } from "react-icons/fi";
// import axios from "axios";

// const API_URL = 'http://127.0.0.1:8000/api';

// const ProductCreate = () => {
//   const { isDarkMode } = useOutletContext();
//   const navigate = useNavigate();
  
//   // State for categories and subcategories
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSubs, setFilteredSubs] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     category_id: "",
//     sub_category_id: "",
//     name: "",
//     brand_name: "",
//     price: "",
//     stock: "",
//     description: "",
//     bottle_size: "30ml",
//     colors: [], // Colors array
//     specifications: {
//       flavor: "",
//       puffs: "",
//       nicotine: "",
//       type: ""
//     },
//     status: 1
//   });

//   // Color input state
//   const [colorInput, setColorInput] = useState("");

//   // Image upload state
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   const [errors, setErrors] = useState({});

//   // Fetch categories on mount
//   useEffect(() => {
//     fetchCategories();
//     fetchSubcategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/categories`);
//       setCategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchSubcategories = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/subcategories`);
//       setSubcategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//     }
//   };

//   // Filter subcategories when category changes
//   useEffect(() => {
//     if (formData.category_id) {
//       const filtered = subcategories.filter(
//         sub => sub.category_id === parseInt(formData.category_id)
//       );
//       setFilteredSubs(filtered);
//     } else {
//       setFilteredSubs([]);
//     }
//   }, [formData.category_id, subcategories]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Handle nested objects
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }

//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Handle color addition
//   const addColor = () => {
//     if (colorInput.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         colors: [...prev.colors, colorInput.trim()]
//       }));
//       setColorInput("");
//     }
//   };

//   // Handle color removal
//   const removeColor = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       colors: prev.colors.filter((_, i) => i !== index)
//     }));
//   };

//   // Handle key press in color input
//   const handleColorKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       addColor();
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Max 6 images
//     if (images.length + files.length > 6) {
//       alert("You can only upload up to 6 images");
//       return;
//     }

//     // Create previews
//     const newPreviews = files.map(file => URL.createObjectURL(file));
//     setImagePreviews(prev => [...prev, ...newPreviews]);
//     setImages(prev => [...prev, ...files]);
//   };

//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   // Add specification field
//   const addSpecification = () => {
//     setFormData(prev => ({
//       ...prev,
//       specifications: {
//         ...prev.specifications,
//         newSpec: ""
//       }
//     }));
//   };

//   const removeSpecification = (key) => {
//     if (key === 'flavor' || key === 'puffs' || key === 'nicotine' || key === 'type') {
//       alert("Cannot remove default specifications");
//       return;
//     }
//     const newSpecs = { ...formData.specifications };
//     delete newSpecs[key];
//     setFormData(prev => ({
//       ...prev,
//       specifications: newSpecs
//     }));
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.category_id) {
//       newErrors.category_id = 'Category is required';
//     }

//     if (!formData.sub_category_id) {
//       newErrors.sub_category_id = 'Subcategory is required';
//     }

//     if (!formData.name.trim()) {
//       newErrors.name = 'Product name is required';
//     }

//     if (!formData.price) {
//       newErrors.price = 'Price is required';
//     } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
//       newErrors.price = 'Price must be a positive number';
//     }

//     if (!formData.stock) {
//       newErrors.stock = 'Stock is required';
//     } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
//       newErrors.stock = 'Stock must be a non-negative number';
//     }

//     return newErrors;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create FormData for multipart upload
//       const submitData = new FormData();
      
//       // Append all form fields
//       submitData.append('category_id', formData.category_id);
//       submitData.append('sub_category_id', formData.sub_category_id);
//       submitData.append('name', formData.name);
//       submitData.append('brand_name', formData.brand_name);
//       submitData.append('price', formData.price);
//       submitData.append('stock', formData.stock);
//       submitData.append('description', formData.description || '');
//       submitData.append('bottle_size', formData.bottle_size);
      
//       // Append colors array
//       formData.colors.forEach((color, index) => {
//         submitData.append(`colors[${index}]`, color);
//       });
      
//       // Append specifications as JSON
//       submitData.append('specifications', JSON.stringify(formData.specifications));
//       submitData.append('status', formData.status);

//       // Append images
//       images.forEach((image, index) => {
//         submitData.append(`images[${index}]`, image);
//       });

//       // Send to API
//       const response = await axios.post(`${API_URL}/products`, submitData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Product created:', response.data);
//       alert('Product created successfully!');
//       navigate('/admin/products');
      
//     } catch (error) {
//       console.error('Error creating product:', error);
//       alert('Failed to create product. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header with Show Products Button */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Add New Product
//           </h1>
//           <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Create a new product
//           </p>
//         </div>
        
//         <button
//           onClick={() => navigate('/admin/products')}
//           className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
//             ${isDarkMode
//               ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//         >
//           <FiList className="text-base" />
//           <span>Show Products</span>
//         </button>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
//         {/* Basic Information */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <h2 className={`text-base font-medium mb-4 pb-2 border-b ${
//             isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
//           }`}>
//             Product Information
//           </h2>

//           <div className="space-y-4">
//             {/* Category and Subcategory */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Category */}
//               <div>
//                 <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiTag className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   <select
//                     name="category_id"
//                     value={formData.category_id}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${errors.category_id ? 'border-red-500' : ''}
//                       ${isDarkMode
//                         ? 'bg-gray-700 border-gray-600 text-white'
//                         : 'bg-white border-gray-300 text-gray-900'
//                       }`}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map(cat => (
//                       <option key={cat.id} value={cat.id}>{cat.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.category_id && (
//                   <p className="text-xs text-red-500 mt-1">{errors.category_id}</p>
//                 )}
//               </div>

//               {/* Subcategory */}
//               <div>
//                 <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Subcategory <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiLayers className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   <select
//                     name="sub_category_id"
//                     value={formData.sub_category_id}
//                     onChange={handleChange}
//                     disabled={!formData.category_id}
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${errors.sub_category_id ? 'border-red-500' : ''}
//                       ${!formData.category_id ? 'opacity-50 cursor-not-allowed' : ''}
//                       ${isDarkMode
//                         ? 'bg-gray-700 border-gray-600 text-white'
//                         : 'bg-white border-gray-300 text-gray-900'
//                       }`}
//                   >
//                     <option value="">Select Subcategory</option>
//                     {filteredSubs.map(sub => (
//                       <option key={sub.id} value={sub.id}>{sub.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.sub_category_id && (
//                   <p className="text-xs text-red-500 mt-1">{errors.sub_category_id}</p>
//                 )}
//               </div>
//             </div>

//             {/* Product Name */}
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Product Name <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiPackage className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="e.g., Mega Pro Pods 40K - Watermelon Ice"
//                   className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                     focus:outline-none focus:ring-2 focus:ring-blue-500
//                     ${errors.name ? 'border-red-500' : ''}
//                     ${isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                     }`}
//                 />
//               </div>
//               {errors.name && (
//                 <p className="text-xs text-red-500 mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Brand Name */}
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Brand Name
//               </label>
//               <input
//                 type="text"
//                 name="brand_name"
//                 value={formData.brand_name}
//                 onChange={handleChange}
//                 placeholder="e.g., RockMe"
//                 className={`w-full px-4 py-2 rounded-lg border text-sm
//                   focus:outline-none focus:ring-2 focus:ring-blue-500
//                   ${isDarkMode
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                   }`}
//               />
//             </div>

//             {/* Price and Stock */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Price ($) <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiDollarSign className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     step="0.01"
//                     min="0"
//                     placeholder="0.00"
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${errors.price ? 'border-red-500' : ''}
//                       ${isDarkMode
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                       }`}
//                   />
//                 </div>
//                 {errors.price && (
//                   <p className="text-xs text-red-500 mt-1">{errors.price}</p>
//                 )}
//               </div>

//               <div>
//                 <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   Stock Quantity <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiHash className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   <input
//                     type="number"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     min="0"
//                     step="1"
//                     placeholder="0"
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${errors.stock ? 'border-red-500' : ''}
//                       ${isDarkMode
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                       }`}
//                   />
//                 </div>
//                 {errors.stock && (
//                   <p className="text-xs text-red-500 mt-1">{errors.stock}</p>
//                 )}
//               </div>
//             </div>

//             {/* Colors Section */}
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Colors
//               </label>
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={colorInput}
//                   onChange={(e) => setColorInput(e.target.value)}
//                   onKeyPress={handleColorKeyPress}
//                   placeholder="Enter color (e.g., Red, Blue, Black)"
//                   className={`flex-1 px-4 py-2 rounded-lg border text-sm
//                     focus:outline-none focus:ring-2 focus:ring-blue-500
//                     ${isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                     }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={addColor}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
//                 >
//                   Add
//                 </button>
//               </div>
              
//               {/* Color Tags */}
//               {formData.colors.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {formData.colors.map((color, index) => (
//                     <span
//                       key={index}
//                       className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                     >
//                       {color}
//                       <button
//                         type="button"
//                         onClick={() => removeColor(index)}
//                         className="ml-1 text-blue-600 hover:text-blue-800"
//                       >
//                         <FiX className="text-sm" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Bottle Size */}
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Bottle Size
//               </label>
//               <select
//                 name="bottle_size"
//                 value={formData.bottle_size}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 rounded-lg border text-sm
//                   focus:outline-none focus:ring-2 focus:ring-blue-500
//                   ${isDarkMode
//                     ? 'bg-gray-700 border-gray-600 text-white'
//                     : 'bg-white border-gray-300 text-gray-900'
//                   }`}
//               >
//                 <option value="30ml">30ml</option>
//                 <option value="60ml">60ml</option>
//                 <option value="100ml">100ml</option>
//                 <option value="120ml">120ml</option>
//               </select>
//             </div>

//             {/* Description */}
//             <div>
//               <label className={`block text-xs sm:text-sm font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Product description..."
//                 className={`w-full px-4 py-2 rounded-lg border text-sm
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
//                   ${isDarkMode
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                   }`}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Specifications */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Specifications
//             </h2>
//             <button
//               type="button"
//               onClick={addSpecification}
//               className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
//             >
//               <FiPlus className="text-sm" />
//               Add Field
//             </button>
//           </div>

//           <div className="space-y-3">
//             {Object.entries(formData.specifications).map(([key, value]) => (
//               <div key={key} className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={key}
//                   readOnly
//                   className={`w-1/3 px-3 py-2 rounded-lg border text-sm bg-gray-100
//                     ${isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}
//                 />
//                 <input
//                   type="text"
//                   name={`specifications.${key}`}
//                   value={value}
//                   onChange={handleChange}
//                   placeholder={`Enter ${key}`}
//                   className={`flex-1 px-3 py-2 rounded-lg border text-sm
//                     focus:outline-none focus:ring-2 focus:ring-blue-500
//                     ${isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white'
//                       : 'bg-white border-gray-300 text-gray-900'
//                     }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeSpecification(key)}
//                   className="p-2 text-red-500 hover:text-red-600"
//                 >
//                   <FiX className="text-sm" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Image Upload */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <h2 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Product Images (Max 6)
//           </h2>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-3">
//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={preview}
//                   alt={`Preview ${index + 1}`}
//                   className="w-full h-24 object-cover rounded-lg border"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                 >
//                   <FiX className="text-xs" />
//                 </button>
//               </div>
//             ))}

//             {images.length < 6 && (
//               <label className={`border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer
//                 ${isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}`}>
//                 <FiUpload className={`text-xl mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                 <span className="text-xs">Upload</span>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>
//           <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Supported formats: JPG, PNG, JPEG (Max 2MB each)
//           </p>
//         </div>

//         {/* Status */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <h2 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Status
//           </h2>

//           <div className="flex items-center gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="status"
//                 value="1"
//                 checked={formData.status === 1}
//                 onChange={() => setFormData(prev => ({ ...prev, status: 1 }))}
//                 className="w-4 h-4 accent-blue-600"
//               />
//               <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Active</span>
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="status"
//                 value="0"
//                 checked={formData.status === 0}
//                 onChange={() => setFormData(prev => ({ ...prev, status: 0 }))}
//                 className="w-4 h-4 accent-red-600"
//               />
//               <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Inactive</span>
//             </label>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={() => navigate('/admin/products')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium
//               ${isDarkMode
//                 ? 'bg-gray-700 text-gray-300'
//                 : 'bg-gray-200 text-gray-700'
//               }`}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
//           >
//             <FiSave className="text-sm" />
//             {loading ? 'Saving...' : 'Save Product'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductCreate;

















// src/pages/admin/products/ProductCreate.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSave, FiPackage, FiEye, FiEyeOff, FiList,
  FiDollarSign, FiHash, FiTag, FiLayers, FiPlus, FiX,
  FiUpload, FiImage
} from "react-icons/fi";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import { API_URL, STORAGE_URL } from "../../../config";


const ProductCreate = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  
  // State for categories and subcategories
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Color picker state
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  
  // Form state
  const [formData, setFormData] = useState({
    category_id: "",
    sub_category_id: "",
    name: "",
    brand_name: "",
    price: "",
    stock: "",
    description: "",
    bottle_size: "", // ✅ Changed to empty string
    colors: [],
    specifications: {},
    status: 1
  });

  // Image upload state
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [errors, setErrors] = useState({});

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/subcategories`);
      setSubcategories(response.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Filter subcategories when category changes
  useEffect(() => {
    if (formData.category_id) {
      const filtered = subcategories.filter(
        sub => sub.category_id === parseInt(formData.category_id)
      );
      setFilteredSubs(filtered);
    } else {
      setFilteredSubs([]);
    }
  }, [formData.category_id, subcategories]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle specification changes
  const handleSpecChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }));
  };

  // Handle color addition with color picker
  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, selectedColor]
    }));
    setSelectedColor("#FF0000");
    setShowColorPicker(false);
  };

  // Handle manual color input
  const addManualColor = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const colorValue = e.target.value.trim();
      if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorValue)) {
        setFormData(prev => ({
          ...prev,
          colors: [...prev.colors, colorValue]
        }));
      } else {
        alert("Please enter a valid hex color (e.g., #FF0000)");
      }
      e.target.value = "";
    }
  };

  // Handle color removal
  const removeColor = (index) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > 6) {
      alert("You can only upload up to 6 images");
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Add specification field
  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        newSpec: ""
      }
    }));
  };

  const removeSpecification = (key) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.category_id) {
      newErrors.category_id = 'Category is required';
    }

    if (!formData.sub_category_id) {
      newErrors.sub_category_id = 'Brand is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.stock) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }

    return newErrors;
  };

  // ✅ FIXED: Handle form submission with proper data structure
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setLoading(true);

  try {
    const submitData = new FormData();
    
    // Append all form fields
    submitData.append('category_id', formData.category_id);
    submitData.append('sub_category_id', formData.sub_category_id);
    submitData.append('name', formData.name);
    submitData.append('brand_name', formData.brand_name || '');
    submitData.append('price', formData.price);
    submitData.append('stock', formData.stock);
    submitData.append('description', formData.description || '');
    submitData.append('bottle_size', formData.bottle_size || '');
    
    // ✅ FIXED: Colors ko array format me bhejna (jese ProductEdit mein hai)
    if (formData.colors.length > 0) {
      formData.colors.forEach((color, index) => {
        submitData.append(`colors[${index}]`, color);
      });
    } else {
      // Agar koi color nahi hai to empty array bhejo
      submitData.append('colors', '[]');
    }
    
    // ✅ Specifications as JSON
    if (Object.keys(formData.specifications).length > 0) {
      submitData.append('specifications', JSON.stringify(formData.specifications));
    }
    
    submitData.append('status', formData.status);

    // Append images
    if (images.length > 0) {
      images.forEach((image, index) => {
        submitData.append(`images[${index}]`, image);
      });
    }

    // Log FormData for debugging
    console.log('Submitting form data:');
    for (let pair of submitData.entries()) {
      console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
    }

    const response = await axios.post(`${API_URL}/products`, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Product created:', response.data);
    alert('Product created successfully!');
    navigate('/admin/products');
    
  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      
      if (error.response.data.errors) {
        // Validation errors from Laravel
        const validationErrors = error.response.data.errors;
        let errorMessage = 'Validation failed:\n';
        Object.keys(validationErrors).forEach(key => {
          errorMessage += `- ${key}: ${validationErrors[key].join(', ')}\n`;
        });
        alert(errorMessage);
      } else if (error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert(`Server error (${error.response.status}): Failed to create product`);
      }
    } else if (error.request) {
      alert('No response from server. Please check your connection.');
    } else {
      alert(`Error: ${error.message}`);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6">
      {/* Header with Show Products Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Add New Product
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Create a new product
          </p>
        </div>
        
        <button
          onClick={() => navigate('/admin/products')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
            ${isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <FiList className="text-base" />
          <span>Show Products</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Basic Information */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b ${
            isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
          }`}>
            Product Information
          </h2>

          <div className="space-y-4">
            {/* Category and Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiTag className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors.category_id ? 'border-red-500' : ''}
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                {errors.category_id && (
                  <p className="text-xs text-red-500 mt-1">{errors.category_id}</p>
                )}
              </div>

              {/* Subcategory */}
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLayers className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <select
                    name="sub_category_id"
                    value={formData.sub_category_id}
                    onChange={handleChange}
                    disabled={!formData.category_id}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors.sub_category_id ? 'border-red-500' : ''}
                      ${!formData.category_id ? 'opacity-50 cursor-not-allowed' : ''}
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  >
                    <option value="">Select Brand</option>
                    {filteredSubs.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
                {errors.sub_category_id && (
                  <p className="text-xs text-red-500 mt-1">{errors.sub_category_id}</p>
                )}
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Product Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPackage className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Mega Pro Pods 40K - Watermelon Ice"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${errors.name ? 'border-red-500' : ''}
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Edition  */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Edition 
              </label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                placeholder="Enter Edition"
                className={`w-full px-4 py-2 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors.price ? 'border-red-500' : ''}
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiHash className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    placeholder="0"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors.stock ? 'border-red-500' : ''}
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
                {errors.stock && (
                  <p className="text-xs text-red-500 mt-1">{errors.stock}</p>
                )}
              </div>
            </div>

            {/* Colors Section with Color Picker */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Colors
              </label>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                      ${isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    <div 
                      className="w-5 h-5 rounded-full border-2"
                      style={{ backgroundColor: selectedColor, borderColor: isDarkMode ? '#4B5563' : '#D1D5DB' }}
                    />
                    {showColorPicker ? 'Close Picker' : 'Open Color Picker'}
                  </button>
                  
                  {showColorPicker && (
                    <button
                      type="button"
                      onClick={addColor}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      Add Color
                    </button>
                  )}
                </div>

                {showColorPicker && (
                  <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                    <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
                    <div className="mt-3 flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full border-2"
                        style={{ backgroundColor: selectedColor, borderColor: isDarkMode ? '#4B5563' : '#D1D5DB' }}
                      />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Selected: {selectedColor}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Or enter hex code (e.g., #FF0000) and press Enter"
                    onKeyPress={addManualColor}
                    className={`flex-1 px-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
              </div>
              
              {formData.colors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.colors.map((color, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm text-white"
                      style={{ backgroundColor: color }}
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="ml-1 text-white hover:text-gray-200"
                      >
                        <FiX className="text-sm" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ FIXED: Bottle Size as Text Input */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Bottle Size (Optional)
              </label>
              <input
                type="text"
                name="bottle_size"
                value={formData.bottle_size}
                onChange={handleChange}
                placeholder="e.g., 30ml, 60ml, 100ml"
                className={`w-full px-4 py-2 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
              />
            </div>

            {/* Description */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Product description..."
                className={`w-full px-4 py-2 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
              />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Specifications
            </h2>
            <button
              type="button"
              onClick={addSpecification}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <FiPlus className="text-sm" />
              Add Field
            </button>
          </div>

          <div className="space-y-3">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <input
                  type="text"
                  value={key}
                  readOnly
                  className={`w-1/3 px-3 py-2 rounded-lg border text-sm bg-gray-100
                    ${isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleSpecChange(key, e.target.value)}
                  placeholder={`Enter ${key}`}
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(key)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <FiX className="text-sm" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Product Images (Max 6)
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-3">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <FiX className="text-xs" />
                </button>
              </div>
            ))}

            {images.length < 6 && (
              <label className={`border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer
                ${isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}`}>
                <FiUpload className={`text-xl mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className="text-xs">Upload</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Supported formats: JPG, PNG, JPEG (Max 2MB each)
          </p>
        </div>

        {/* Status */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Status
          </h2>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="1"
                checked={formData.status === 1}
                onChange={() => setFormData(prev => ({ ...prev, status: 1 }))}
                className="w-4 h-4 accent-blue-600"
              />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Active</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="0"
                checked={formData.status === 0}
                onChange={() => setFormData(prev => ({ ...prev, status: 0 }))}
                className="w-4 h-4 accent-red-600"
              />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Inactive</span>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className={`px-4 py-2 rounded-lg text-sm font-medium
              ${isDarkMode
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
              }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <FiSave className="text-sm" />
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;