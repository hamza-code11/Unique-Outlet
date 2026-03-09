// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";
// import { 
//   FiSave, FiPackage, FiEye, FiEyeOff, FiList,
//   FiDollarSign, FiHash, FiTag, FiLayers, FiPlus, FiX,
//   FiUpload, FiImage, FiUser, FiMapPin, FiArrowLeft
// } from "react-icons/fi";
// import axios from "axios";

// const API_URL = 'http://127.0.0.1:8000/api';
// const STORAGE_URL = 'http://127.0.0.1:8000/storage/';

// const ProductEdit = () => {
//   const { id } = useParams();
//   const { isDarkMode } = useOutletContext();
//   const navigate = useNavigate();
  
//   // States
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [errorDetails, setErrorDetails] = useState(null);
  
//   // Categories and subcategories
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSubs, setFilteredSubs] = useState([]);
  
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
//     specifications: {},
//     vendor_info: {
//       vendor: "",
//       country: ""
//     },
//     status: 1
//   });

//   // Image states
//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [newImagePreviews, setNewImagePreviews] = useState([]);
//   const [imagesToDelete, setImagesToDelete] = useState([]);
//   const [imageUploading, setImageUploading] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [slugEditable, setSlugEditable] = useState(false);

//   // Fetch categories on mount
//   useEffect(() => {
//     fetchCategories();
//     fetchSubcategories();
//   }, []);

//   // Fetch product data
//   useEffect(() => {
//     if (id) {
//       fetchProduct();
//     }
//   }, [id]);

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

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return null;
//     if (imagePath.startsWith('http')) return imagePath;
//     if (imagePath.startsWith('products/')) {
//       return `${STORAGE_URL}${imagePath}`;
//     }
//     return `${STORAGE_URL}products/${imagePath}`;
//   };

//   const fetchProduct = async () => {
//     setLoading(true);
//     setFetchError(null);
//     setErrorDetails(null);
    
//     try {
//       console.log("Fetching product with ID:", id);
      
//       const response = await axios.get(`${API_URL}/products/${id}`);
//       console.log("Product data received:", response.data);
      
//       const product = response.data;
      
//       if (!product) {
//         throw new Error("Product not found");
//       }

//       let specifications = product.specifications || {};
//       if (typeof specifications === 'string') {
//         try {
//           specifications = JSON.parse(specifications);
//         } catch (e) {
//           specifications = {};
//         }
//       }

//       let vendorInfo = product.vendor_info || { vendor: '', country: '' };
//       if (typeof vendorInfo === 'string') {
//         try {
//           vendorInfo = JSON.parse(vendorInfo);
//         } catch (e) {
//           vendorInfo = { vendor: '', country: '' };
//         }
//       }

//       setFormData({
//         category_id: product.category_id?.toString() || "",
//         sub_category_id: product.sub_category_id?.toString() || "",
//         name: product.name || "",
//         brand_name: product.brand_name || "",
//         price: product.price?.toString() || "",
//         stock: product.stock?.toString() || "",
//         description: product.description || "",
//         bottle_size: product.bottle_size || "30ml",
//         specifications: specifications,
//         vendor_info: vendorInfo,
//         status: product.status ?? 1
//       });

//       // Collect existing images with proper URLs
//       const images = [];
//       for (let i = 1; i <= 6; i++) {
//         const imageKey = `image${i}`;
//         if (product[imageKey]) {
//           const imageUrl = getImageUrl(product[imageKey]);
//           images.push({
//             key: imageKey,
//             url: imageUrl,
//             path: product[imageKey],
//             index: i
//           });
//         }
//       }
      
//       console.log("Found images:", images);
//       setExistingImages(images);
//       setImagesToDelete([]); // Reset images to delete

//     } catch (error) {
//       console.error("Error fetching product:", error);
//       setFetchError("Failed to load product data");
//       setErrorDetails({
//         status: error.response?.status,
//         statusText: error.response?.statusText,
//         message: error.response?.data?.message || error.message,
//         data: error.response?.data
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
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

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     if (existingImages.length + newImages.length + files.length > 6) {
//       alert("You can only have up to 6 images total");
//       return;
//     }

//     // Validate file types and sizes
//     const validFiles = files.filter(file => {
//       const isValidType = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'].includes(file.type);
//       const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB
      
//       if (!isValidType) {
//         alert(`File ${file.name} is not a valid image type`);
//         return false;
//       }
//       if (!isValidSize) {
//         alert(`File ${file.name} is too large. Max size is 2MB`);
//         return false;
//       }
//       return true;
//     });

//     const newPreviews = validFiles.map(file => URL.createObjectURL(file));
//     setNewImagePreviews(prev => [...prev, ...newPreviews]);
//     setNewImages(prev => [...prev, ...validFiles]);
//   };

//   // ✅ FIXED: Properly handle image deletion
//   const removeExistingImage = (index) => {
//     const imageToDelete = existingImages[index];
    
//     // Add to imagesToDelete array
//     setImagesToDelete(prev => [...prev, {
//       path: imageToDelete.path,
//       index: imageToDelete.index
//     }]);
    
//     // Remove from existing images
//     setExistingImages(prev => prev.filter((_, i) => i !== index));
    
//     console.log("Image marked for deletion:", imageToDelete.path);
//   };

//   const removeNewImage = (index) => {
//     URL.revokeObjectURL(newImagePreviews[index]);
//     setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
//     setNewImages(prev => prev.filter((_, i) => i !== index));
//   };

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
//     const newSpecs = { ...formData.specifications };
//     delete newSpecs[key];
//     setFormData(prev => ({
//       ...prev,
//       specifications: newSpecs
//     }));
//   };

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

//   // ✅ FIXED: Handle form submission with proper image deletion
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setSaving(true);
//     setImageUploading(true);

//     try {
//       const submitData = new FormData();
      
//       // Append all form fields
//       submitData.append('category_id', formData.category_id);
//       submitData.append('sub_category_id', formData.sub_category_id);
//       submitData.append('name', formData.name);
//       submitData.append('brand_name', formData.brand_name || '');
//       submitData.append('price', formData.price);
//       submitData.append('stock', formData.stock);
//       submitData.append('description', formData.description || '');
//       submitData.append('bottle_size', formData.bottle_size);
//       submitData.append('specifications', JSON.stringify(formData.specifications));
//       submitData.append('vendor_info', JSON.stringify(formData.vendor_info));
//       submitData.append('status', formData.status);
      
//       // ✅ FIXED: Send images to delete as JSON string
//       if (imagesToDelete.length > 0) {
//         const pathsToDelete = imagesToDelete.map(img => img.path);
//         submitData.append('images_to_delete', JSON.stringify(pathsToDelete));
//         console.log("Images to delete:", pathsToDelete);
//       }

//       // Send remaining existing images order
//       const remainingImageIndices = existingImages.map(img => img.index);
//       submitData.append('existing_images', JSON.stringify(remainingImageIndices));

//       // Append new images
//       newImages.forEach((image) => {
//         submitData.append('images[]', image);
//       });

//       // Log FormData contents for debugging
//       console.log("Submitting form data:");
//       for (let pair of submitData.entries()) {
//         console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
//       }

//       const response = await axios.post(`${API_URL}/products/${id}`, submitData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         params: {
//           _method: 'PUT'
//         }
//       });

//       console.log('Product updated:', response.data);
//       alert('Product updated successfully!');
//       navigate('/admin/products');
      
//     } catch (error) {
//       console.error('Error updating product:', error);
//       console.error('Error response:', error.response?.data);
//       alert(error.response?.data?.message || 'Failed to update product. Please try again.');
//     } finally {
//       setSaving(false);
//       setImageUploading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (fetchError) {
//     return (
//       <div className="text-center py-12 max-w-2xl mx-auto">
//         <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
//           <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Product</h2>
//           <p className="text-red-500 mb-2">{fetchError}</p>
          
//           {errorDetails && (
//             <div className={`mt-4 p-4 rounded text-left text-sm ${
//               isDarkMode ? 'bg-gray-800' : 'bg-white'
//             }`}>
//               <p className="font-mono mb-2">
//                 <span className="font-bold">Status:</span> {errorDetails.status} {errorDetails.statusText}
//               </p>
//               <p className="font-mono mb-2">
//                 <span className="font-bold">Message:</span> {errorDetails.message}
//               </p>
//               {errorDetails.data && (
//                 <pre className="overflow-auto text-xs">
//                   {JSON.stringify(errorDetails.data, null, 2)}
//                 </pre>
//               )}
//             </div>
//           )}
          
//           <div className="flex gap-3 justify-center mt-6">
//             <button
//               onClick={() => navigate('/admin/products')}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Back to Products
//             </button>
//             <button
//               onClick={fetchProduct}
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate('/admin/products')}
//             className={`p-2 rounded-lg transition-colors
//               ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//           >
//             <FiArrowLeft className="text-lg" />
//           </button>
//           <div>
//             <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Edit Product
//             </h1>
//             <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               ID: {id} • {formData.name || 'Loading...'}
//             </p>
//           </div>
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
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                       ${errors.sub_category_id ? 'border-red-500' : ''}
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

//         {/* Images */}
//         <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <h2 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Product Images (Max 6)
//           </h2>

//           {/* Existing Images */}
//           {existingImages.length > 0 && (
//             <>
//               <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 Existing Images:
//               </p>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
//                 {existingImages.map((image, index) => (
//                   <div key={index} className="relative group">
//                     <img
//                       src={image.url}
//                       alt={`Existing ${index + 1}`}
//                       className="w-full h-24 object-cover rounded-lg border"
//                       onError={(e) => {
//                         console.log("Image failed to load:", image.url);
//                         e.target.src = 'https://via.placeholder.com/100?text=Error';
//                       }}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeExistingImage(index)}
//                       className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
//                       title="Remove image"
//                     >
//                       <FiX className="text-xs" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* New Images Preview */}
//           {newImagePreviews.length > 0 && (
//             <>
//               <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 New Images:
//               </p>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
//                 {newImagePreviews.map((preview, index) => (
//                   <div key={index} className="relative group">
//                     <img
//                       src={preview}
//                       alt={`New ${index + 1}`}
//                       className="w-full h-24 object-cover rounded-lg border"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeNewImage(index)}
//                       className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
//                       title="Remove image"
//                     >
//                       <FiX className="text-xs" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Upload New Images */}
//           {existingImages.length + newImages.length < 6 && (
//             <label className={`border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
//               ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
//               <FiUpload className={`text-xl mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//               <span className="text-xs">Upload Images</span>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </label>
//           )}
//           <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Supported formats: JPG, PNG, JPEG, GIF, WEBP (Max 2MB each)
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
//                 ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={saving}
//             className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
//           >
//             {saving ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                 <span>{imageUploading ? 'Uploading images...' : 'Updating...'}</span>
//               </>
//             ) : (
//               <>
//                 <FiSave className="text-sm" />
//                 <span>Update Product</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductEdit;





















// src/pages/admin/products/ProductEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSave, FiPackage, FiEye, FiEyeOff, FiList,
  FiDollarSign, FiHash, FiTag, FiLayers, FiPlus, FiX,
  FiUpload, FiImage, FiUser, FiMapPin, FiArrowLeft
} from "react-icons/fi";
import { HexColorPicker } from "react-colorful"; // Import color picker
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';
const STORAGE_URL = 'http://127.0.0.1:8000/storage/';

const ProductEdit = () => {
  const { id } = useParams();
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  
  // States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  
  // Color picker state
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  
  // Categories and subcategories
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    category_id: "",
    sub_category_id: "",
    name: "",
    brand_name: "",
    price: "",
    stock: "",
    description: "",
    bottle_size: "30ml",
    colors: [], // Colors array
    specifications: {},
    status: 1
  });

  // Image states
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);

  const [errors, setErrors] = useState({});
  const [slugEditable, setSlugEditable] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Fetch product data
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('products/')) {
      return `${STORAGE_URL}${imagePath}`;
    }
    return `${STORAGE_URL}products/${imagePath}`;
  };

  const fetchProduct = async () => {
    setLoading(true);
    setFetchError(null);
    setErrorDetails(null);
    
    try {
      console.log("Fetching product with ID:", id);
      
      const response = await axios.get(`${API_URL}/products/${id}`);
      console.log("Product data received:", response.data);
      
      const product = response.data;
      
      if (!product) {
        throw new Error("Product not found");
      }

      let specifications = product.specifications || {};
      if (typeof specifications === 'string') {
        try {
          specifications = JSON.parse(specifications);
        } catch (e) {
          specifications = {};
        }
      }

      let vendorInfo = product.vendor_info || { vendor: '', country: '' };
      if (typeof vendorInfo === 'string') {
        try {
          vendorInfo = JSON.parse(vendorInfo);
        } catch (e) {
          vendorInfo = { vendor: '', country: '' };
        }
      }

      // Parse colors array
      let colors = [];
      if (product.colors) {
        if (typeof product.colors === 'string') {
          try {
            colors = JSON.parse(product.colors);
          } catch (e) {
            colors = [];
          }
        } else if (Array.isArray(product.colors)) {
          colors = product.colors;
        }
      }

      setFormData({
        category_id: product.category_id?.toString() || "",
        sub_category_id: product.sub_category_id?.toString() || "",
        name: product.name || "",
        brand_name: product.brand_name || "",
        price: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        description: product.description || "",
        bottle_size: product.bottle_size || "30ml",
        colors: colors,
        specifications: specifications,
        vendor_info: vendorInfo,
        status: product.status ?? 1
      });

      // Collect existing images with proper URLs
      const images = [];
      for (let i = 1; i <= 6; i++) {
        const imageKey = `image${i}`;
        if (product[imageKey]) {
          const imageUrl = getImageUrl(product[imageKey]);
          images.push({
            key: imageKey,
            url: imageUrl,
            path: product[imageKey],
            index: i
          });
        }
      }
      
      console.log("Found images:", images);
      setExistingImages(images);
      setImagesToDelete([]); // Reset images to delete

    } catch (error) {
      console.error("Error fetching product:", error);
      setFetchError("Failed to load product data");
      setErrorDetails({
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle color addition with color picker
  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, selectedColor]
    }));
    setSelectedColor("#FF0000"); // Reset to red after adding
    setShowColorPicker(false);
  };

  // Handle manual color input
  const addManualColor = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const colorValue = e.target.value.trim();
      // Check if it's a valid hex color
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (existingImages.length + newImages.length + files.length > 6) {
      alert("You can only have up to 6 images total");
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB
      
      if (!isValidType) {
        alert(`File ${file.name} is not a valid image type`);
        return false;
      }
      if (!isValidSize) {
        alert(`File ${file.name} is too large. Max size is 2MB`);
        return false;
      }
      return true;
    });

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setNewImagePreviews(prev => [...prev, ...newPreviews]);
    setNewImages(prev => [...prev, ...validFiles]);
  };

  const removeExistingImage = (index) => {
    const imageToDelete = existingImages[index];
    
    setImagesToDelete(prev => [...prev, {
      path: imageToDelete.path,
      index: imageToDelete.index
    }]);
    
    setExistingImages(prev => prev.filter((_, i) => i !== index));
    
    console.log("Image marked for deletion:", imageToDelete.path);
  };

  const removeNewImage = (index) => {
    URL.revokeObjectURL(newImagePreviews[index]);
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category_id) {
      newErrors.category_id = 'Category is required';
    }

    if (!formData.sub_category_id) {
      newErrors.sub_category_id = 'Subcategory is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    setImageUploading(true);

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
      submitData.append('bottle_size', formData.bottle_size);
      
      // Append colors array
      formData.colors.forEach((color, index) => {
        submitData.append(`colors[${index}]`, color);
      });
      
      submitData.append('specifications', JSON.stringify(formData.specifications));
      submitData.append('vendor_info', JSON.stringify(formData.vendor_info));
      submitData.append('status', formData.status);
      
      if (imagesToDelete.length > 0) {
        const pathsToDelete = imagesToDelete.map(img => img.path);
        submitData.append('images_to_delete', JSON.stringify(pathsToDelete));
        console.log("Images to delete:", pathsToDelete);
      }

      const remainingImageIndices = existingImages.map(img => img.index);
      submitData.append('existing_images', JSON.stringify(remainingImageIndices));

      newImages.forEach((image) => {
        submitData.append('images[]', image);
      });

      console.log("Submitting form data:");
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
      }

      const response = await axios.post(`${API_URL}/products/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          _method: 'PUT'
        }
      });

      console.log('Product updated:', response.data);
      alert('Product updated successfully!');
      navigate('/admin/products');
      
    } catch (error) {
      console.error('Error updating product:', error);
      console.error('Error response:', error.response?.data);
      alert(error.response?.data?.message || 'Failed to update product. Please try again.');
    } finally {
      setSaving(false);
      setImageUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center py-12 max-w-2xl mx-auto">
        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Product</h2>
          <p className="text-red-500 mb-2">{fetchError}</p>
          
          {errorDetails && (
            <div className={`mt-4 p-4 rounded text-left text-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <p className="font-mono mb-2">
                <span className="font-bold">Status:</span> {errorDetails.status} {errorDetails.statusText}
              </p>
              <p className="font-mono mb-2">
                <span className="font-bold">Message:</span> {errorDetails.message}
              </p>
              {errorDetails.data && (
                <pre className="overflow-auto text-xs">
                  {JSON.stringify(errorDetails.data, null, 2)}
                </pre>
              )}
            </div>
          )}
          
          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Products
            </button>
            <button
              onClick={fetchProduct}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/products')}
            className={`p-2 rounded-lg transition-colors
              ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Edit Product
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ID: {id} • {formData.name || 'Loading...'}
            </p>
          </div>
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

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subcategory <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLayers className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <select
                    name="sub_category_id"
                    value={formData.sub_category_id}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors.sub_category_id ? 'border-red-500' : ''}
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                  >
                    <option value="">Select Subcategory</option>
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

            {/* Brand Name */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Brand Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleChange}
                  placeholder="e.g., RockMe"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                />
              </div>
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
              
              {/* Color Picker and Controls */}
              <div className="space-y-3">
                {/* Color Picker Toggle and Selected Color Display */}
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

                {/* Color Picker */}
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

                {/* Manual Hex Input */}
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
              
              {/* Color Tags */}
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

            {/* Bottle Size */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Bottle Size
              </label>
              <select
                name="bottle_size"
                value={formData.bottle_size}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
              >
                <option value="30ml">30ml</option>
                <option value="60ml">60ml</option>
                <option value="100ml">100ml</option>
                <option value="120ml">120ml</option>
              </select>
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
                  name={`specifications.${key}`}
                  value={value}
                  onChange={handleChange}
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



        {/* Images */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Product Images (Max 6)
          </h2>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <>
              <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Existing Images:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`Existing ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                      onError={(e) => {
                        console.log("Image failed to load:", image.url);
                        e.target.src = 'https://via.placeholder.com/100?text=Error';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <FiX className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* New Images Preview */}
          {newImagePreviews.length > 0 && (
            <>
              <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                New Images:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                {newImagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`New ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <FiX className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Upload New Images */}
          {existingImages.length + newImages.length < 6 && (
            <label className={`border-2 border-dashed rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
              ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <FiUpload className={`text-xl mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className="text-xs">Upload Images</span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Supported formats: JPG, PNG, JPEG, GIF, WEBP (Max 2MB each)
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
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>{imageUploading ? 'Uploading images...' : 'Updating...'}</span>
              </>
            ) : (
              <>
                <FiSave className="text-sm" />
                <span>Update Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;