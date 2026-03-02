import React, { useState, useRef } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiMapPin,
  FiPhone, FiMail, FiSend
} from "react-icons/fi";

const ContactCMS = ({ isDarkMode, isVisible }) => {
  const [uploading, setUploading] = useState(false);

  // Contact Section Data
  const [contactData, setContactData] = useState({
    badge: "CONTACT US",
    title: "Get in touch",
    highlight: "with us",
    description: "Have questions about our products or need assistance? Our team is here to help you. Fill out the form and we'll get back to you as soon as possible.",
    address: "202 Helga Springs Rd, Crawford, TN 38554",
    phone: "800.275.8777",
    email: "support@vapeshop.com",
    buttonText: "Send Message",
    active: true,
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "Email"
  });

  const updateField = (field, value) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActive = () => {
    setContactData(prev => ({ ...prev, active: !prev.active }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Contact Section Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage contact section content
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
              contactData.active 
                ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {contactData.active ? <FiEye /> : <FiEyeOff />}
            <span className="text-sm">{contactData.active ? 'Active' : 'Inactive'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Text Content */}
        <div className="space-y-4">
          {/* Badge */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Badge Text
            </label>
            <input
              type="text"
              value={contactData.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Title & Highlight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Title
              </label>
              <input
                type="text"
                value={contactData.title}
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
                value={contactData.highlight}
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
              value={contactData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows="3"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Address */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Address
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center">
                <FiMapPin className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="text"
                value={contactData.address}
                onChange={(e) => updateField('address', e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Phone
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center">
                <FiPhone className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="text"
                value={contactData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center">
                <FiMail className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="email"
                value={contactData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Button Text */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Button Text
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center">
                <FiSend className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="text"
                value={contactData.buttonText}
                onChange={(e) => updateField('buttonText', e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Field Labels */}
        <div className="space-y-4">
          <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Field Labels (Optional)
          </h3>

          {/* Address Label */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Address Label
            </label>
            <input
              type="text"
              value={contactData.addressLabel}
              onChange={(e) => updateField('addressLabel', e.target.value)}
              placeholder="Address"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Phone Label */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Phone Label
            </label>
            <input
              type="text"
              value={contactData.phoneLabel}
              onChange={(e) => updateField('phoneLabel', e.target.value)}
              placeholder="Phone"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Email Label */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Email Label
            </label>
            <input
              type="text"
              value={contactData.emailLabel}
              onChange={(e) => updateField('emailLabel', e.target.value)}
              placeholder="Email"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Preview Card */}
          <div className={`mt-6 p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Preview
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FiMapPin className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {contactData.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {contactData.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {contactData.email}
                </span>
              </div>
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
            Status: <strong className={contactData.active ? 'text-green-500' : 'text-red-500'}>
              {contactData.active ? 'Active' : 'Inactive'}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactCMS;