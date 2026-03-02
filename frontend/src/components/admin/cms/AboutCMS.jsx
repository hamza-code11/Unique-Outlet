import React, { useState, useRef } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
  FiShield, FiZap, FiUsers, FiSmile, FiPlus, FiX
} from "react-icons/fi";

const AboutCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  // About Section Data
  const [aboutData, setAboutData] = useState({
    badge: "ABOUT US",
    title: "Passionate About",
    highlight: "Quality & Innovation",
    description1: "We are dedicated to delivering premium vaping products designed for performance, safety, and satisfaction. Our store offers a carefully curated collection of devices and accessories that combine modern technology with elegant design.",
    description2: "Whether you're new to vaping or an experienced enthusiast, our mission is to provide reliable products, trusted quality, and exceptional customer support that makes your experience smooth and enjoyable.",
    buttonText: "Explore More",
    image: "/assets/home/9w45ht.png",
    imagePreview: null,
    active: true,
    features: [
      {
        id: 1,
        icon: "FiShield",
        title: "Premium Quality",
        description: "Lab tested products",
        active: true
      },
      {
        id: 2,
        icon: "FiZap",
        title: "Innovation",
        description: "Latest technology",
        active: true
      },
      {
        id: 3,
        icon: "FiUsers",
        title: "Trusted",
        description: "10k+ customers",
        active: true
      },
      {
        id: 4,
        icon: "FiSmile",
        title: "Satisfaction",
        description: "100% guaranteed",
        active: true
      }
    ]
  });

  const updateField = (field, value) => {
    setAboutData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActive = () => {
    setAboutData(prev => ({ ...prev, active: !prev.active }));
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
        setAboutData(prev => ({
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
    setAboutData(prev => ({
      ...prev,
      features: prev.features.map(f =>
        f.id === id ? { ...f, [field]: value } : f
      )
    }));
  };

  const toggleFeatureActive = (id) => {
    setAboutData(prev => ({
      ...prev,
      features: prev.features.map(f =>
        f.id === id ? { ...f, active: !f.active } : f
      )
    }));
  };

  const addFeature = () => {
    const newId = Math.max(...aboutData.features.map(f => f.id), 0) + 1;
    setAboutData(prev => ({
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
    if (aboutData.features.length <= 1) {
      alert("At least one feature must remain");
      return;
    }
    setAboutData(prev => ({
      ...prev,
      features: prev.features.filter(f => f.id !== id)
    }));
  };

  // Icon selector
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'FiShield': return <FiShield />;
      case 'FiZap': return <FiZap />;
      case 'FiUsers': return <FiUsers />;
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
            About Section Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {aboutData.features.length} features • {aboutData.features.filter(f => f.active).length} active
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
              aboutData.active 
                ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {aboutData.active ? <FiEye /> : <FiEyeOff />}
            <span className="text-sm">{aboutData.active ? 'Active' : 'Inactive'}</span>
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
              {aboutData.image || aboutData.imagePreview ? (
                <img 
                  src={aboutData.imagePreview || aboutData.image} 
                  alt="About"
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
            Recommended: 500x500px • Max 2MB
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
              value={aboutData.badge}
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
                value={aboutData.title}
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
                value={aboutData.highlight}
                onChange={(e) => updateField('highlight', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description 1
            </label>
            <textarea
              value={aboutData.description1}
              onChange={(e) => updateField('description1', e.target.value)}
              rows="3"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
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
              Description 2
            </label>
            <textarea
              value={aboutData.description2}
              onChange={(e) => updateField('description2', e.target.value)}
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
              value={aboutData.buttonText}
              onChange={(e) => updateField('buttonText', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Features ({aboutData.features.length})
          </h3>
          <button
            onClick={addFeature}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 flex items-center gap-1"
          >
            <FiPlus /> Add Feature
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutData.features.map((feature) => (
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
                    {feature.active ? <FiEye className="text-sm" /> : <FiEyeOff className="text-sm" />}
                  </button>
                  <button
                    onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                    className={`p-1.5 rounded transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {activeFeature === feature.id ? <FiX /> : 'Edit'}
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
                      <option value="FiZap">Zap</option>
                      <option value="FiUsers">Users</option>
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
                  <input
                    type="text"
                    value={feature.description}
                    onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                    placeholder="Feature description"
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
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
            Total Features: <strong>{aboutData.features.length}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Active: <strong className="text-green-500">{aboutData.features.filter(f => f.active).length}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Inactive: <strong className="text-red-500">{aboutData.features.filter(f => !f.active).length}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutCMS;