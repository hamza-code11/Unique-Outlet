import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSave, FiImage, FiTag, FiEye, FiEyeOff, FiList
} from "react-icons/fi";

const CategoryCreate = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [slugEditable, setSlugEditable] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from name if slug is not manually edited
    if (name === 'name' && !slugEditable) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 2MB' }));
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please upload an image file' }));
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data for API
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('slug', formData.slug);
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    // Log data (replace with actual API call)
    console.log('Category data:', {
      name: formData.name,
      slug: formData.slug,
      image: formData.image ? formData.image.name : null
    });
    
    // Show success message and redirect
    alert('Category created successfully!');
    navigate('/admin/categories');
  };

  return (
    <div className="space-y-6">
      {/* Header with Show Categories Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Add New Category
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Create a new product category
          </p>
        </div>
        
        {/* Show Categories Button - replaces cross */}
        <button
          onClick={() => navigate('/admin/categories')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
            ${isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <FiList className="text-base" />
          <span>Show Categories</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Basic Information */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b ${
            isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
          }`}>
            Category Information
          </h2>

          <div className="space-y-4">
            {/* Category Name */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Category Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiTag className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Vapes, Accessories"
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

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={`block text-xs sm:text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Slug <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setSlugEditable(!slugEditable)}
                  className={`text-xs flex items-center gap-1 px-2 py-1 rounded
                    ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  {slugEditable ? <FiEyeOff className="text-xs" /> : <FiEye className="text-xs" />}
                  <span>{slugEditable ? 'Auto-generate' : 'Edit'}</span>
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>/</span>
                </div>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  readOnly={!slugEditable}
                  placeholder="vapes-accessories"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${!slugEditable ? 'opacity-75 cursor-not-allowed' : ''}
                    ${errors.slug ? 'border-red-500' : ''}
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                />
              </div>
              {errors.slug && (
                <p className="text-xs text-red-500 mt-1">{errors.slug}</p>
              )}
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                URL-friendly version of the name. Auto-generated from category name.
              </p>
            </div>
          </div>
        </div>

        {/* Category Image */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b ${
            isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
          }`}>
            Category Image
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Image Preview */}
            <div className={`w-32 h-32 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden
              ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <FiImage className={`text-3xl ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              )}
            </div>

            {/* Upload Controls */}
            <div className="flex-1 space-y-3">
              <div>
                <label
                  htmlFor="image-upload"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium
                    ${isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  <FiImage className="text-sm" />
                  Choose Image
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Recommended size: 200x200px. Max file size: 2MB.
              </p>
              {errors.image && (
                <p className="text-xs text-red-500">{errors.image}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/categories')}
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
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <FiSave className="text-sm" />
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreate;