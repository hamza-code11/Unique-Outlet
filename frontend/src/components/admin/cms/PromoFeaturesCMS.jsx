import React, { useState, useRef } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
  FiPlus, FiShoppingBag, FiShield, FiWind, FiSmile,
  FiStar
} from "react-icons/fi";

const PromoFeaturesCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  // Promo Features Section Data
  const [promoData, setPromoData] = useState({
    heading: "Try our new taste",
    description: "Our vape shop is not only a variety of vaping products, but also an operational support service.",
    buttonText: "Shop Now",
    image: "/assets/home/product-single-no-decor-501x1024.png",
    imagePreview: null,
    active: true,
    rating: 4.9,
    features: [
      {
        id: 1,
        icon: "FiShield",
        title: "No dangerous toxins",
        description: "We offer a wide range of quality vaping products",
        active: true
      },
      {
        id: 2,
        icon: "FiWind",
        title: "Feel of menthol",
        description: "We offer a wide range of quality vaping products",
        active: true
      },
      {
        id: 3,
        icon: "FiSmile",
        title: "Safer than smoking",
        description: "We offer a wide range of quality vaping products",
        active: true
      }
    ]
  });

  const updateField = (field, value) => {
    setPromoData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActive = () => {
    setPromoData(prev => ({ ...prev, active: !prev.active }));
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
      setTimeout(() => {
        setPromoData(prev => ({
          ...prev,
          image: reader.result,
          imagePreview: reader.result
        }));
        setUploading(false);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Feature Management
  const updateFeature = (id, field, value) => {
    setPromoData(prev => ({
      ...prev,
      features: prev.features.map(f =>
        f.id === id ? { ...f, [field]: value } : f
      )
    }));
  };

  const toggleFeatureActive = (id) => {
    setPromoData(prev => ({
      ...prev,
      features: prev.features.map(f =>
        f.id === id ? { ...f, active: !f.active } : f
      )
    }));
  };

  const addFeature = () => {
    const newId = Math.max(...promoData.features.map(f => f.id), 0) + 1;
    setPromoData(prev => ({
      ...prev,
      features: [
        ...prev.features,
        {
          id: newId,
          icon: "FiShield",
          title: "New Feature",
          description: "Feature description",
          active: true
        }
      ]
    }));
  };

  const deleteFeature = (id) => {
    if (promoData.features.length <= 1) {
      alert("At least one feature must remain");
      return;
    }
    setPromoData(prev => ({
      ...prev,
      features: prev.features.filter(f => f.id !== id)
    }));
  };

  // Icon selector
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'FiShield': return <FiShield />;
      case 'FiWind': return <FiWind />;
      case 'FiSmile': return <FiSmile />;
      default: return <FiShield />;
    }
  };

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

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Promo Features Section Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {promoData.features.length} features • {promoData.features.filter(f => f.active).length} active
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isVisible && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
              Section Hidden
            </span>
          )}
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
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
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
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
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
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Rating */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Rating (0-5)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={promoData.rating}
              onChange={(e) => updateField('rating', parseFloat(e.target.value))}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
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
                    disabled={uploading}
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

          {/* New Badge Toggle */}
          <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  "New" Badge
                </h4>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Shows "New" tag on image
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={promoData.showNewBadge !== false}
                  onChange={(e) => updateField('showNewBadge', e.target.checked)}
                />
                <div className={`w-11 h-6 rounded-full peer 
                  ${isDarkMode 
                    ? 'bg-gray-600 peer-checked:bg-blue-600' 
                    : 'bg-gray-200 peer-checked:bg-blue-600'
                  } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Empty (for balance) */}
        <div className="lg:col-span-1"></div>
      </div>

      {/* Features Section */}
      <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Feature Cards ({promoData.features.length})
          </h3>
          <button
            onClick={addFeature}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 flex items-center gap-1"
          >
            <FiPlus /> Add Feature
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promoData.features.map((feature) => (
            <div
              key={feature.id}
              className={`p-4 rounded-lg border relative ${
                isDarkMode 
                  ? feature.active ? 'border-blue-500/30 bg-gray-800' : 'border-gray-700 bg-gray-800/50 opacity-60'
                  : feature.active ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              {/* Feature Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                      {getIconComponent(feature.icon)}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ID: {feature.id}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFeatureActive(feature.id)}
                    className={`p-1.5 rounded transition-colors ${
                      feature.active
                        ? isDarkMode ? 'text-green-400 hover:bg-green-500/20' : 'text-green-600 hover:bg-green-50'
                        : isDarkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {feature.active ? <FiEye /> : <FiEyeOff />}
                  </button>
                  <button
                    onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                    className={`p-1.5 rounded transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {activeFeature === feature.id ? 'Close' : 'Edit'}
                  </button>
                  <button
                    onClick={() => deleteFeature(feature.id)}
                    className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Feature Content */}
              {activeFeature === feature.id ? (
                <div className="space-y-3 mt-2">
                  {/* Icon Selector */}
                  <div>
                    <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Icon
                    </label>
                    <select
                      value={feature.icon}
                      onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="FiShield">Shield</option>
                      <option value="FiWind">Wind</option>
                      <option value="FiSmile">Smile</option>
                    </select>
                  </div>

                  {/* Title */}
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                    placeholder="Feature title"
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />

                  {/* Description */}
                  <textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                    rows="2"
                    placeholder="Feature description"
                    className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              ) : (
                <div>
                  <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h4>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {feature.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Total Features: <strong>{promoData.features.length}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Active: <strong className="text-green-500">{promoData.features.filter(f => f.active).length}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Inactive: <strong className="text-red-500">{promoData.features.filter(f => !f.active).length}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoFeaturesCMS;