import React, { useState, useRef } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiTrash2,
  FiPlus, FiChevronUp, FiChevronDown, FiHelpCircle
} from "react-icons/fi";

const FaqCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // FAQ Section Data
  const [faqData, setFaqData] = useState({
    badge: "FAQ",
    title: "Feel free to ask",
    highlight: "more questions",
    image: "/assets/home/faq-vape-sec-768x993.png",
    imagePreview: null,
    active: true,
    trustText: "Can't find your answer?",
    contactButtonText: "Contact us",
    faqs: [
      {
        id: 1,
        question: "When will my order be delivered?",
        answer: "Orders are typically delivered within 3–5 business days depending on your location. You will receive tracking details once your order is shipped.",
        active: true,
        order: 1
      },
      {
        id: 2,
        question: "How to charge a vape device?",
        answer: "Use the provided USB cable and connect it to a safe power source. Avoid overcharging to maintain battery life.",
        active: true,
        order: 2
      },
      {
        id: 3,
        question: "I am a beginner, how do I start vaping?",
        answer: "Start with a beginner-friendly starter kit and low nicotine strength. Our team can help you choose the right product.",
        active: true,
        order: 3
      }
    ]
  });

  const updateField = (field, value) => {
    setFaqData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActive = () => {
    setFaqData(prev => ({ ...prev, active: !prev.active }));
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
        setFaqData(prev => ({
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

  // FAQ Management
  const updateFaq = (id, field, value) => {
    setFaqData(prev => ({
      ...prev,
      faqs: prev.faqs.map(faq =>
        faq.id === id ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const toggleFaqActive = (id) => {
    setFaqData(prev => ({
      ...prev,
      faqs: prev.faqs.map(faq =>
        faq.id === id ? { ...faq, active: !faq.active } : faq
      )
    }));
  };

  const addFaq = () => {
    const newId = Math.max(...faqData.faqs.map(f => f.id), 0) + 1;
    setFaqData(prev => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        {
          id: newId,
          question: "New FAQ Question",
          answer: "New FAQ answer",
          active: true,
          order: prev.faqs.length + 1
        }
      ]
    }));
  };

  const deleteFaq = (id) => {
    if (faqData.faqs.length <= 1) {
      alert("At least one FAQ must remain");
      return;
    }
    setFaqData(prev => ({
      ...prev,
      faqs: prev.faqs.filter(faq => faq.id !== id)
    }));
  };

  const moveFaq = (id, direction) => {
    setFaqData(prev => {
      const index = prev.faqs.findIndex(f => f.id === id);
      if (direction === 'up' && index > 0) {
        const newFaqs = [...prev.faqs];
        [newFaqs[index], newFaqs[index - 1]] = [newFaqs[index - 1], newFaqs[index]];
        return { ...prev, faqs: newFaqs };
      }
      if (direction === 'down' && index < prev.faqs.length - 1) {
        const newFaqs = [...prev.faqs];
        [newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]];
        return { ...prev, faqs: newFaqs };
      }
      return prev;
    });
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
            FAQ Section Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {faqData.faqs.length} questions • {faqData.faqs.filter(f => f.active).length} active
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
              faqData.active 
                ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {faqData.active ? <FiEye /> : <FiEyeOff />}
            <span className="text-sm">{faqData.active ? 'Active' : 'Inactive'}</span>
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
            <div className="aspect-[3/4] relative group">
              {faqData.image || faqData.imagePreview ? (
                <img 
                  src={faqData.imagePreview || faqData.image} 
                  alt="FAQ"
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
            Recommended: 400x500px • Max 2MB
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
              value={faqData.badge}
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
                value={faqData.title}
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
                value={faqData.highlight}
                onChange={(e) => updateField('highlight', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Trust Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Trust Text
              </label>
              <input
                type="text"
                value={faqData.trustText}
                onChange={(e) => updateField('trustText', e.target.value)}
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
                Contact Button Text
              </label>
              <input
                type="text"
                value={faqData.contactButtonText}
                onChange={(e) => updateField('contactButtonText', e.target.value)}
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

      {/* FAQ List Section */}
      <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            FAQ Questions ({faqData.faqs.length})
          </h3>
          <button
            onClick={addFaq}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 flex items-center gap-1"
          >
            <FiPlus /> Add Question
          </button>
        </div>

        <div className="space-y-4">
          {faqData.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? faq.active ? 'border-blue-500/30 bg-gray-800' : 'border-gray-700 bg-gray-800/50 opacity-60'
                  : faq.active ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              {/* FAQ Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <FiHelpCircle className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                  </div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Q{index + 1}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {/* Move Up/Down */}
                  <button
                    onClick={() => moveFaq(faq.id, 'up')}
                    disabled={index === 0}
                    className={`p-1.5 rounded transition-colors ${
                      index === 0
                        ? 'opacity-30 cursor-not-allowed'
                        : isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <FiChevronUp />
                  </button>
                  <button
                    onClick={() => moveFaq(faq.id, 'down')}
                    disabled={index === faqData.faqs.length - 1}
                    className={`p-1.5 rounded transition-colors ${
                      index === faqData.faqs.length - 1
                        ? 'opacity-30 cursor-not-allowed'
                        : isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <FiChevronDown />
                  </button>

                  {/* Active Toggle */}
                  <button
                    onClick={() => toggleFaqActive(faq.id)}
                    className={`p-1.5 rounded transition-colors ${
                      faq.active
                        ? isDarkMode ? 'text-green-400 hover:bg-green-500/20' : 'text-green-600 hover:bg-green-50'
                        : isDarkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {faq.active ? <FiEye /> : <FiEyeOff />}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteFaq(faq.id)}
                    className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>

                  {/* Expand/Collapse */}
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className={`p-1.5 rounded transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {expandedFaq === faq.id ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(faq.id, 'question', e.target.value)}
                  placeholder="Question"
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                
                {expandedFaq === faq.id && (
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)}
                    placeholder="Answer"
                    rows="4"
                    className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                )}
              </div>
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
            Total FAQs: <strong>{faqData.faqs.length}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Active: <strong className="text-green-500">{faqData.faqs.filter(f => f.active).length}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Inactive: <strong className="text-red-500">{faqData.faqs.filter(f => !f.active).length}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FaqCMS;