import React, { useState, useRef } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
  FiPlus, FiShoppingBag, FiUsers, FiStar
} from "react-icons/fi";

const PromoCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // Promo Section Data
  const [promoData, setPromoData] = useState({
    badge: "LIMITED OFFER",
    title: "Try our new starter kit",
    highlight: "now and get 10% off",
    description: "Our vape shop is not only a variety of vaping products, but also an operational support service that ensures quality, reliability, and customer satisfaction.",
    buttonText: "Go to shop",
    trustText: "Join 5k+ happy customers",
    image: "/assets/home/products-new.png",
    imagePreview: null,
    active: true,
    features: [
      {
        id: 1,
        text: "Premium Quality",
        active: true
      },
      {
        id: 2,
        text: "Limited Time",
        active: true
      }
    ],
    trustAvatars: [
      { id: 1, letter: "U" },
      { id: 2, letter: "S" },
      { id: 3, letter: "A" }
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
  const updateFeature = (id, value) => {
    setPromoData(prev => ({
      ...prev,
      features: prev.features.map(f =>
        f.id === id ? { ...f, text: value } : f
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
          text: "New Feature",
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

  // Trust Avatar Management
  const updateAvatarLetter = (id, value) => {
    setPromoData(prev => ({
      ...prev,
      trustAvatars: prev.trustAvatars.map(a =>
        a.id === id ? { ...a, letter: value } : a
      )
    }));
  };

  const addAvatar = () => {
    const newId = Math.max(...promoData.trustAvatars.map(a => a.id), 0) + 1;
    setPromoData(prev => ({
      ...prev,
      trustAvatars: [
        ...prev.trustAvatars,
        {
          id: newId,
          letter: "N"
        }
      ]
    }));
  };

  const deleteAvatar = (id) => {
    if (promoData.trustAvatars.length <= 1) {
      alert("At least one avatar must remain");
      return;
    }
    setPromoData(prev => ({
      ...prev,
      trustAvatars: prev.trustAvatars.filter(a => a.id !== id)
    }));
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
            Promo Section Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {promoData.features.length} features • {promoData.trustAvatars.length} avatars
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
        {/* Left Column - Image Upload */}
        <div className="lg:col-span-1 space-y-4">
          <div className={`relative rounded-xl border-2 border-dashed overflow-hidden ${
            isDarkMode ? 'border-gray-600' : 'border-gray-300'
          }`}>
            {/* Image Preview */}
            <div className="aspect-square relative group">
              {promoData.image || promoData.imagePreview ? (
                <img 
                  src={promoData.imagePreview || promoData.image} 
                  alt="Promo"
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
          <p className={`text-xs text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Recommended: 300x300px • Max 2MB
          </p>
        </div>

        {/* Right Column - Text Fields */}
        <div className="lg:col-span-2 space-y-4">
          {/* Badge */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Badge Text
            </label>
            <input
              type="text"
              value={promoData.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Title & Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Title
              </label>
              <input
                type="text"
                value={promoData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Highlight Text
              </label>
              <input
                type="text"
                value={promoData.highlight}
                onChange={(e) => updateField('highlight', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
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

          {/* Button & Trust Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label className={`block text-xs font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Trust Text
              </label>
              <input
                type="text"
                value={promoData.trustText}
                onChange={(e) => updateField('trustText', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Feature Points ({promoData.features.length})
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
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Feature #{feature.id}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFeatureActive(feature.id)}
                    className={`p-1.5 rounded transition-colors ${
                      feature.active
                        ? isDarkMode ? 'text-green-400 hover:bg-green-500/20' : 'text-green-600 hover:bg-green-50'
                        : isDarkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {feature.active ? <FiEye className="text-sm" /> : <FiEyeOff className="text-sm" />}
                  </button>
                  <button
                    onClick={() => deleteFeature(feature.id)}
                    className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={feature.text}
                onChange={(e) => updateFeature(feature.id, e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trust Avatars Section */}
      <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Trust Avatars ({promoData.trustAvatars.length})
          </h3>
          <button
            onClick={addAvatar}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 flex items-center gap-1"
          >
            <FiPlus /> Add Avatar
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {promoData.trustAvatars.map((avatar) => (
            <div
              key={avatar.id}
              className="relative group"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 
                              flex items-center justify-center text-white font-bold text-sm`}>
                {avatar.letter}
              </div>
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <input
                  type="text"
                  value={avatar.letter}
                  onChange={(e) => updateAvatarLetter(avatar.id, e.target.value)}
                  maxLength="2"
                  className="w-8 h-8 text-xs rounded-full border bg-white text-gray-900 text-center"
                  style={{ fontSize: '10px' }}
                />
                <button
                  onClick={() => deleteAvatar(avatar.id)}
                  className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <FiTrash2 className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className={`text-xs mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Hover over avatars to edit letters
        </p>
      </div>

      {/* Stats Summary */}
      <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Features: <strong>{promoData.features.length}</strong> • 
            Active: <strong className="text-green-500">{promoData.features.filter(f => f.active).length}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Avatars: <strong>{promoData.trustAvatars.length}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoCMS;