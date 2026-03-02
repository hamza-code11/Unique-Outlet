import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSave, FiPackage, FiEye, FiEyeOff, FiList,
  FiDollarSign, FiHash, FiTag, FiLayers, FiPlus, FiX,
  FiUpload, FiImage, FiUser, FiMapPin, FiArrowLeft
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const ProductEdit = () => {
  const { id } = useParams();
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  
  // States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  
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
    specifications: {},
    vendor_info: {
      vendor: "",
      country: ""
    },
    status: 1
  });

  // Image states
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

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

  // ✅ FIXED: Proper GET request for product
  const fetchProduct = async () => {
    setLoading(true);
    setFetchError(null);
    
    try {
      console.log("Fetching product with ID:", id); // Debug log
      const response = await axios.get(`${API_URL}/products/${id}`);
      console.log("Product data received:", response.data); // Debug log
      
      const product = response.data;
      
      // Parse specifications if it's a string
      let specifications = product.specifications || {};
      if (typeof specifications === 'string') {
        try {
          specifications = JSON.parse(specifications);
        } catch (e) {
          specifications = {};
        }
      }

      // Parse vendor info if it's a string
      let vendorInfo = product.vendor_info || { vendor: '', country: '' };
      if (typeof vendorInfo === 'string') {
        try {
          vendorInfo = JSON.parse(vendorInfo);
        } catch (e) {
          vendorInfo = { vendor: '', country: '' };
        }
      }

      setFormData({
        category_id: product.category_id || "",
        sub_category_id: product.sub_category_id || "",
        name: product.name || "",
        brand_name: product.brand_name || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
        bottle_size: product.bottle_size || "30ml",
        specifications: specifications,
        vendor_info: vendorInfo,
        status: product.status ?? 1
      });

      // Collect existing images
      const images = [];
      for (let i = 1; i <= 6; i++) {
        if (product[`image${i}`]) {
          images.push({
            key: `image${i}`,
            url: getImageUrl(product[`image${i}`]),
            path: product[`image${i}`]
          });
        }
      }
      setExistingImages(images);

    } catch (error) {
      console.error("Error fetching product:", error);
      console.error("Error response:", error.response); // Debug log
      setFetchError(`Failed to load product data: ${error.response?.status} ${error.response?.statusText}`);
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
    } else {
      setFilteredSubs([]);
    }
  }, [formData.category_id, subcategories]);

  // Get image URL
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `${API_URL.replace('/api', '')}/storage/${image}`;
  };

  // Handle input changes
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

  // Handle new image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (existingImages.length + newImages.length + files.length > 6) {
      alert("You can only have up to 6 images total");
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setNewImagePreviews(prev => [...prev, ...newPreviews]);
    setNewImages(prev => [...prev, ...files]);
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    const imageToDelete = existingImages[index];
    setImagesToDelete(prev => [...prev, imageToDelete.path]);
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  // Remove new image
  const removeNewImage = (index) => {
    URL.revokeObjectURL(newImagePreviews[index]);
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
    setNewImages(prev => prev.filter((_, i) => i !== index));
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);

    try {
      // Create FormData for multipart upload
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
      submitData.append('specifications', JSON.stringify(formData.specifications));
      submitData.append('vendor_info', JSON.stringify(formData.vendor_info));
      submitData.append('status', formData.status);
      
      // Append images to delete
      submitData.append('images_to_delete', JSON.stringify(imagesToDelete));

      // Append new images
      newImages.forEach((image, index) => {
        submitData.append(`new_images[]`, image);
      });

      // Send PUT request using POST with _method=PUT (for FormData)
      const response = await axios.post(`${API_URL}/products/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          _method: 'PUT' // Laravel method spoofing
        }
      });

      console.log('Product updated:', response.data);
      alert('Product updated successfully!');
      navigate('/admin/products');
      
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.response?.data?.message || 'Failed to update product. Please try again.');
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
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{fetchError}</p>
        <button
          onClick={() => navigate('/admin/products')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
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
              Update product information
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
        {/* ... rest of your form JSX remains exactly the same ... */}
        {/* (I'm keeping the form JSX identical to your previous version) */}
        
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