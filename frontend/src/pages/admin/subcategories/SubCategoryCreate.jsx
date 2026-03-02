import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSave, FiLayers, FiEye, FiEyeOff, FiList
} from "react-icons/fi";

const SubCategoryCreate = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parentCategory: "",
  });

  const [errors, setErrors] = useState({});
  const [slugEditable, setSlugEditable] = useState(false);

  // Parent categories (example data - replace with actual API data)
  const parentCategories = [
    { id: 1, name: "Vapes" },
    { id: 2, name: "Mobile Accessories" },
    { id: 3, name: "E-Liquids" },
    { id: 4, name: "Devices" },
  ];

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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subcategory name is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (!formData.parentCategory) {
      newErrors.parentCategory = 'Parent category is required';
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

    // Log data (replace with actual API call)
    console.log('Subcategory data:', formData);
    
    // Show success message and redirect
    alert('Subcategory created successfully!');
    navigate('/admin/subcategories');
  };

  return (
    <div className="space-y-6">
      {/* Header with Show Subcategories Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Add New Subcategory
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Create a new product subcategory
          </p>
        </div>
        
        {/* Show Subcategories Button */}
        <button
          onClick={() => navigate('/admin/subcategories')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
            ${isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <FiList className="text-base" />
          <span>Show Subcategories</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Basic Information */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b ${
            isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
          }`}>
            Subcategory Information
          </h2>

          <div className="space-y-4">
            {/* Parent Category */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Parent Category <span className="text-red-500">*</span>
              </label>
              <select
                name="parentCategory"
                value={formData.parentCategory}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.parentCategory ? 'border-red-500' : ''}
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
              >
                <option value="">Select Parent Category</option>
                {parentCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              {errors.parentCategory && (
                <p className="text-xs text-red-500 mt-1">{errors.parentCategory}</p>
              )}
            </div>

            {/* Subcategory Name */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Subcategory Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLayers className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Starter Kits, Phone Cases"
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
                  placeholder="starter-kits"
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
                URL-friendly version of the name. Auto-generated from subcategory name.
              </p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/subcategories')}
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
            Save Subcategory
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubCategoryCreate;