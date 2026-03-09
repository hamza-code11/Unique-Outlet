// src/pages/admin/flavours/FlavourEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSave, FiPackage, FiList, FiDollarSign, 
  FiBox, FiTag, FiLayers, FiX, FiCheck,
  FiArrowLeft, FiUpload, FiImage
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';
const STORAGE_URL = 'http://127.0.0.1:8000/storage/';

const FlavourEdit = () => {
  const { id } = useParams();
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  
  // States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [fetchError, setFetchError] = useState(null);
  
  // Categories and subcategories
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    category_id: "",
    subcategory_id: "",
    product_id: "",
    name: "",
    desc: "",
    flavour: "",
    price: "",
    stock: "",
    image: null,
    existingImage: null
  });

  // Image preview
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchAllProducts();
  }, []);

  // Fetch flavour data
  useEffect(() => {
    if (id) {
      fetchFlavourData();
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

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchFlavourData = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      
      const response = await axios.get(`${API_URL}/flavours`);
      
      if (response.data.success && response.data.flavours) {
        const flavour = response.data.flavours.find(f => f.id === parseInt(id));
        
        if (flavour) {
          console.log('Fetched flavour:', flavour);
          
          setFormData({
            category_id: flavour.category_id?.toString() || "",
            subcategory_id: flavour.subcategory_id?.toString() || "",
            product_id: flavour.product_id?.toString() || "",
            name: flavour.name || "",
            desc: flavour.desc || "",
            flavour: flavour.flavour || "",
            price: flavour.price?.toString() || "",
            stock: flavour.stock?.toString() || "",
            image: null,
            existingImage: flavour.image || null
          });

          if (flavour.image) {
            setImagePreview(`${STORAGE_URL}${flavour.image}`);
          }

          // ✅ FIXED: Wait for products and subcategories to be loaded
          setTimeout(() => {
            // Filter subcategories based on selected category
            if (flavour.category_id) {
              const filtered = subcategories.filter(
                sub => sub.category_id === flavour.category_id
              );
              setFilteredSubs(filtered);
              console.log('Filtered subcategories:', filtered);

              // Filter products based on selected category
              const filteredProds = products.filter(
                p => p.category_id === flavour.category_id
              );
              setFilteredProducts(filteredProds);
              console.log('Filtered products:', filteredProds);
            }
          }, 100);
        } else {
          setFetchError('Flavour not found');
        }
      }
    } catch (err) {
      console.error('Error fetching flavour:', err);
      setFetchError('Failed to load flavour data');
    } finally {
      setLoading(false);
    }
  };

  // Filter subcategories when category changes
  useEffect(() => {
    if (formData.category_id) {
      const filtered = subcategories.filter(
        sub => sub.category_id === parseInt(formData.category_id)
      );
      setFilteredSubs(filtered);
      
      const filteredProds = products.filter(
        p => p.category_id === parseInt(formData.category_id)
      );
      setFilteredProducts(filteredProds);
    } else {
      setFilteredSubs([]);
      setFilteredProducts([]);
    }
  }, [formData.category_id, subcategories, products]);

  // Filter products when subcategory changes
  useEffect(() => {
    if (formData.subcategory_id) {
      const filtered = products.filter(
        p => p.sub_category_id === parseInt(formData.subcategory_id)
      );
      setFilteredProducts(filtered);
    } else if (formData.category_id) {
      const filtered = products.filter(
        p => p.category_id === parseInt(formData.category_id)
      );
      setFilteredProducts(filtered);
    }
  }, [formData.subcategory_id, formData.category_id, products]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      category_id: categoryId,
      subcategory_id: "",
      product_id: ""
    }));
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId) => {
    setFormData(prev => ({
      ...prev,
      subcategory_id: subcategoryId,
      product_id: ""
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageChanged(true);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageChanged(true);
    setFormData(prev => ({ ...prev, image: null }));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.category_id) {
      setError('Please select a category');
      return false;
    }
    if (!formData.product_id) {
      setError('Please select a product');
      return false;
    }
    if (!formData.name.trim()) {
      setError('Please enter flavour name');
      return false;
    }
    if (!formData.price) {
      setError('Please enter price');
      return false;
    }
    if (!formData.stock) {
      setError('Please enter stock quantity');
      return false;
    }
    return true;
  };

  // ✅ FIXED: Handle form submit with proper data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      const submitData = new FormData();
      
      submitData.append('category_id', formData.category_id);
      
      if (formData.subcategory_id) {
        submitData.append('subcategory_id', formData.subcategory_id);
      }
      
      submitData.append('product_id', formData.product_id);
      submitData.append('name', formData.name);
      submitData.append('desc', formData.desc || '');
      submitData.append('flavour', formData.flavour || '');
      submitData.append('price', formData.price);
      submitData.append('stock', formData.stock);
      
      // ✅ FIXED: Only append image if changed
      if (imageChanged && imageFile) {
        submitData.append('image', imageFile);
      }

      // Log FormData for debugging
      console.log('Submitting form data:');
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
      }

      const response = await axios.post(`${API_URL}/update-flavour/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Flavour updated:', response.data);

      if (response.data.success) {
        setSuccessMessage('Flavour updated successfully!');
        setTimeout(() => {
          navigate('/admin/flavours');
        }, 1500);
      } else {
        setError('Failed to update flavour');
      }
    } catch (err) {
      console.error('Error updating flavour:', err);
      
      // Show detailed error message
      if (err.response) {
        console.error('Error response:', err.response.data);
        setError(err.response.data?.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setSaving(false);
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
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Flavour</h2>
          <p className="text-red-500 mb-2">{fetchError}</p>
          <button
            onClick={() => navigate('/admin/flavours')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Flavours
          </button>
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
            onClick={() => navigate('/admin/flavours')}
            className={`p-2 rounded-lg transition-colors
              ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Edit Flavour
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ID: {id} • {formData.name}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/admin/flavours')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
            ${isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <FiList className="text-base" />
          <span>Show Flavours</span>
        </button>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-600 flex items-center gap-2">
          <FiCheck className="text-lg" />
          {successMessage}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 flex items-center gap-2">
          <FiX className="text-lg" />
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b ${
            isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
          }`}>
            Flavour Information
          </h2>

          <div className="space-y-4">
            {/* Category Selection */}
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
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
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
            </div>

            {/* Subcategory Selection */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Subcategory
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLayers className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <select
                  name="subcategory_id"
                  value={formData.subcategory_id}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  disabled={!formData.category_id}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${!formData.category_id ? 'opacity-50 cursor-not-allowed' : ''}
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
            </div>

            {/* Product Selection */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Product <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPackage className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <select
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                  disabled={!formData.category_id}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${!formData.category_id ? 'opacity-50 cursor-not-allowed' : ''}
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                >
                  <option value="">Select Product</option>
                  {filteredProducts.map(prod => (
                    <option key={prod.id} value={prod.id}>{prod.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Flavour Name */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Flavour Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Mint Vape"
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
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                rows="3"
                placeholder="Brief description of the flavour..."
                className={`w-full px-4 py-2 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
              />
            </div>

            {/* Flavour Type */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Flavour Type
              </label>
              <input
                type="text"
                name="flavour"
                value={formData.flavour}
                onChange={handleChange}
                placeholder="e.g., Mint"
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
                    required
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Stock <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBox className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    step="1"
                    placeholder="0"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Flavour Image
              </label>
              
              {imagePreview ? (
                <div className="relative w-32 h-32 mb-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              ) : (
                <label className={`border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                  ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <FiUpload className={`text-xl mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className="text-xs">Upload Image</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Supported formats: JPG, PNG, JPEG, GIF, WEBP (Max 2MB)
              </p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/flavours')}
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
                <span>Updating...</span>
              </>
            ) : (
              <>
                <FiSave className="text-sm" />
                <span>Update Flavour</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlavourEdit;

