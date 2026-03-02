import React, { useState, useRef } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
  FiShoppingBag, FiGift, FiArrowRight
} from "react-icons/fi";

const InteractivePromoCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRefs = {
    left: useRef(null),
    top: useRef(null),
    bottom: useRef(null)
  };
  
  const [uploading, setUploading] = useState({ left: false, top: false, bottom: false });

  // Interactive Promo Data
  const [promoData, setPromoData] = useState({
    leftCard: {
      id: 1,
      title: "The Best E-Liquid Bundles",
      description: "Explore a wide range of vaping products with fast delivery and beginner-friendly guidance.",
      buttonText: "Shop Now",
      secondaryButtonText: "Get 25% Off",
      image: "/assets/home/view-image1.jpg",
      imagePreview: null,
      active: true
    },
    topCard: {
      id: 2,
      title: "New To Vaping?",
      description: "Learn how vaping works and choose the right starter kit.",
      buttonText: "Start Here",
      image: "/assets/home/view-image2.jpg",
      imagePreview: null,
      active: true
    },
    bottomCard: {
      id: 3,
      title: "Vap Mode",
      description: "Discover advanced devices and customize your experience.",
      buttonText: "Shop Now",
      image: "/assets/home/view-image3.jpg",
      imagePreview: null,
      active: true
    }
  });

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
      setTimeout(() => {
        setPromoData(prev => ({
          ...prev,
          [card]: {
            ...prev[card],
            image: reader.result,
            imagePreview: reader.result
          }
        }));
        setUploading(prev => ({ ...prev, [card]: false }));
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (card) => {
    if (fileInputRefs[card]?.current) {
      fileInputRefs[card].current.click();
    }
  };

  const toggleSection = () => {
    // This is handled by parent component
  };

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
            handleImageUpload('left', e.target.files[0]);
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
            handleImageUpload('top', e.target.files[0]);
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
            handleImageUpload('bottom', e.target.files[0]);
          }
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Interactive Promo Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            3 promo cards • Edit content below
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isVisible && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
              Section Hidden
            </span>
          )}
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
                      disabled={uploading.left}
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
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
              <textarea
                value={promoData.leftCard.description}
                onChange={(e) => updateCardField('leftCard', 'description', e.target.value)}
                placeholder="Card Description"
                rows="2"
                className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={promoData.leftCard.buttonText}
                  onChange={(e) => updateCardField('leftCard', 'buttonText', e.target.value)}
                  placeholder="Button Text"
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <input
                  type="text"
                  value={promoData.leftCard.secondaryButtonText}
                  onChange={(e) => updateCardField('leftCard', 'secondaryButtonText', e.target.value)}
                  placeholder="Secondary Button"
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
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
                  <img 
                    src={promoData.topCard.imagePreview || promoData.topCard.image} 
                    alt="Top Card"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => triggerFileInput('top')}
                      disabled={uploading.top}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {uploading.top ? <span className="animate-spin">⏳</span> : <FiUpload />}
                      Change
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
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <textarea
                value={promoData.topCard.description}
                onChange={(e) => updateCardField('topCard', 'description', e.target.value)}
                rows="2"
                className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <input
                type="text"
                value={promoData.topCard.buttonText}
                onChange={(e) => updateCardField('topCard', 'buttonText', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
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
                  <img 
                    src={promoData.bottomCard.imagePreview || promoData.bottomCard.image} 
                    alt="Bottom Card"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => triggerFileInput('bottom')}
                      disabled={uploading.bottom}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {uploading.bottom ? <span className="animate-spin">⏳</span> : <FiUpload />}
                      Change
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
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <textarea
                value={promoData.bottomCard.description}
                onChange={(e) => updateCardField('bottomCard', 'description', e.target.value)}
                rows="2"
                className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <input
                type="text"
                value={promoData.bottomCard.buttonText}
                onChange={(e) => updateCardField('bottomCard', 'buttonText', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
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