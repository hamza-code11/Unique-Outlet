// import React, { useState, useRef } from "react";
// import { 
//   FiImage, FiEye, FiEyeOff, FiUpload, FiMapPin,
//   FiPhone, FiMail, FiSend
// } from "react-icons/fi";

// const ContactCMS = ({ isDarkMode, isVisible }) => {
//   const [uploading, setUploading] = useState(false);

//   // Contact Section Data
//   const [contactData, setContactData] = useState({
//     badge: "CONTACT US",
//     title: "Get in touch",
//     highlight: "with us",
//     description: "Have questions about our products or need assistance? Our team is here to help you. Fill out the form and we'll get back to you as soon as possible.",
//     address: "202 Helga Springs Rd, Crawford, TN 38554",
//     phone: "800.275.8777",
//     email: "support@vapeshop.com",
//     buttonText: "Send Message",
//     active: true,
//     addressLabel: "Address",
//     phoneLabel: "Phone",
//     emailLabel: "Email"
//   });

//   const updateField = (field, value) => {
//     setContactData(prev => ({ ...prev, [field]: value }));
//   };

//   const toggleActive = () => {
//     setContactData(prev => ({ ...prev, active: !prev.active }));
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Contact Section Manager
//           </h2>
//           <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Manage contact section content
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {!isVisible && (
//             <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
//               Section Hidden
//             </span>
//           )}
//           <button 
//             onClick={toggleActive}
//             className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
//               contactData.active 
//                 ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
//                 : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
//             }`}
//           >
//             {contactData.active ? <FiEye /> : <FiEyeOff />}
//             <span className="text-sm">{contactData.active ? 'Active' : 'Inactive'}</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Column - Text Content */}
//         <div className="space-y-4">
//           {/* Badge */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Badge Text
//             </label>
//             <input
//               type="text"
//               value={contactData.badge}
//               onChange={(e) => updateField('badge', e.target.value)}
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>

//           {/* Title & Highlight */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={`block text-xs font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Title
//               </label>
//               <input
//                 type="text"
//                 value={contactData.title}
//                 onChange={(e) => updateField('title', e.target.value)}
//                 className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//             <div>
//               <label className={`block text-xs font-medium mb-1 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 Highlight Text
//               </label>
//               <input
//                 type="text"
//                 value={contactData.highlight}
//                 onChange={(e) => updateField('highlight', e.target.value)}
//                 className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Description
//             </label>
//             <textarea
//               value={contactData.description}
//               onChange={(e) => updateField('description', e.target.value)}
//               rows="3"
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Address
//             </label>
//             <div className="flex gap-2">
//               <div className="flex items-center justify-center">
//                 <FiMapPin className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//               </div>
//               <input
//                 type="text"
//                 value={contactData.address}
//                 onChange={(e) => updateField('address', e.target.value)}
//                 className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Phone
//             </label>
//             <div className="flex gap-2">
//               <div className="flex items-center justify-center">
//                 <FiPhone className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//               </div>
//               <input
//                 type="text"
//                 value={contactData.phone}
//                 onChange={(e) => updateField('phone', e.target.value)}
//                 className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Email
//             </label>
//             <div className="flex gap-2">
//               <div className="flex items-center justify-center">
//                 <FiMail className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//               </div>
//               <input
//                 type="email"
//                 value={contactData.email}
//                 onChange={(e) => updateField('email', e.target.value)}
//                 className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Button Text */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               Button Text
//             </label>
//             <div className="flex gap-2">
//               <div className="flex items-center justify-center">
//                 <FiSend className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//               </div>
//               <input
//                 type="text"
//                 value={contactData.buttonText}
//                 onChange={(e) => updateField('buttonText', e.target.value)}
//                 className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                 }`}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Field Labels */}
//         <div className="space-y-4">
//           <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Field Labels (Optional)
//           </h3>

//           {/* Address Label */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-500'
//             }`}>
//               Address Label
//             </label>
//             <input
//               type="text"
//               value={contactData.addressLabel}
//               onChange={(e) => updateField('addressLabel', e.target.value)}
//               placeholder="Address"
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>

//           {/* Phone Label */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-500'
//             }`}>
//               Phone Label
//             </label>
//             <input
//               type="text"
//               value={contactData.phoneLabel}
//               onChange={(e) => updateField('phoneLabel', e.target.value)}
//               placeholder="Phone"
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>

//           {/* Email Label */}
//           <div>
//             <label className={`block text-xs font-medium mb-1 ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-500'
//             }`}>
//               Email Label
//             </label>
//             <input
//               type="text"
//               value={contactData.emailLabel}
//               onChange={(e) => updateField('emailLabel', e.target.value)}
//               placeholder="Email"
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//               }`}
//             />
//           </div>

//           {/* Preview Card */}
//           <div className={`mt-6 p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
//             <h4 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Preview
//             </h4>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-center gap-2">
//                 <FiMapPin className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
//                 <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   {contactData.address}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiPhone className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
//                 <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   {contactData.phone}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiMail className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
//                 <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   {contactData.email}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
//         isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <div className="flex items-center gap-4">
//           <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Status: <strong className={contactData.active ? 'text-green-500' : 'text-red-500'}>
//               {contactData.active ? 'Active' : 'Inactive'}
//             </strong>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactCMS;













import React, { useState, useRef, useEffect } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiMapPin,
  FiPhone, FiMail, FiSend, FiSave, FiRefreshCw,
  FiCheck, FiX, FiHeadphones, FiHelpCircle
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const ContactCMS = ({ isDarkMode, isVisible }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showMapHelp, setShowMapHelp] = useState(false);

  // Contact Section Data
  const [contactData, setContactData] = useState({
    id: null,
    badge: "CONTACT US",
    heading: "Get in Touch",
    paragraph: "Feel free to contact us anytime",
    address: "123 Main Street, New York",
    phone: "+1 234 567 890",
    email: "support@vape.com",
    customer_support: "24/7 Customer Support",
    map_location: "https://maps.google.com/?q=New+York",
    active: true,
    originalData: null
  });

  // Fetch contact data from API
  const fetchContactData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/contact-section`);
      
      if (response.data.success && response.data.contact) {
        const contact = response.data.contact;

        // Split heading into title and highlight
        const headingParts = contact.heading?.split(' ') || ["Get", "in", "Touch"];
        const title = headingParts.slice(0, 2).join(' ') || "Get in";
        const highlight = headingParts.slice(2).join(' ') || "Touch";

        setContactData({
          id: contact.id,
          badge: contact.badge || "CONTACT US",
          title: title,
          highlight: highlight,
          paragraph: contact.paragraph || "Feel free to contact us anytime",
          address: contact.address || "123 Main Street, New York",
          phone: contact.phone || "+1 234 567 890",
          email: contact.email || "support@vape.com",
          customer_support: contact.customer_support || "24/7 Customer Support",
          map_location: contact.map_location || "https://maps.google.com/?q=New+York",
          active: true,
          originalData: contact
        });
      }
    } catch (err) {
      console.error('Error fetching contact data:', err);
      setError('Failed to load contact data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Load contact data on mount
  useEffect(() => {
    fetchContactData();
  }, []);

  const updateField = (field, value) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActive = () => {
    setContactData(prev => ({ ...prev, active: !prev.active }));
  };

  // Save changes to API
  const saveChanges = async () => {
    if (!contactData.id) {
      setError('No contact section found to update');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      const formData = new FormData();
      
      // Combine title and highlight into heading
      const heading = `${contactData.title || "Get in"} ${contactData.highlight || "Touch"}`;
      
      formData.append('badge', contactData.badge);
      formData.append('heading', heading);
      formData.append('paragraph', contactData.paragraph);
      formData.append('address', contactData.address);
      formData.append('phone', contactData.phone);
      formData.append('email', contactData.email);
      formData.append('customer_support', contactData.customer_support);
      formData.append('map_location', contactData.map_location);

      // Send update request
      await axios.post(`${API_URL}/contact-section/${contactData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setSuccessMessage('Contact section saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh data
      await fetchContactData();
    } catch (err) {
      console.error('Error saving contact data:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Function to test if URL is valid
  const isValidMapUrl = (url) => {
    return url && (url.includes('google.com/maps') || url.includes('openstreetmap'));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Contact Section Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ID: {contactData.id || 'N/A'} • Manage contact section content
          </p>
        </div>
        <div className="flex items-center gap-2">
          {successMessage && (
            <span className="px-3 py-1.5 bg-green-500/20 text-green-600 rounded-lg text-sm flex items-center gap-1">
              <FiCheck /> {successMessage}
            </span>
          )}
          {error && (
            <span className="px-3 py-1.5 bg-red-500/20 text-red-600 rounded-lg text-sm flex items-center gap-1">
              <FiX /> {error}
            </span>
          )}
          {!isVisible && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
              Section Hidden
            </span>
          )}
          <button
            onClick={fetchContactData}
            className="p-2 bg-gray-500/20 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
            title="Refresh"
            disabled={saving}
          >
            <FiRefreshCw className={`text-lg ${saving ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={saveChanges}
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-green-600/30 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave /> Save Changes
              </>
            )}
          </button>
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
        {/* Left Column - Main Content */}
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
              disabled={saving}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
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
                disabled={saving}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
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
                disabled={saving}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
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
              value={contactData.paragraph}
              onChange={(e) => updateField('paragraph', e.target.value)}
              rows="3"
              disabled={saving}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
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
                disabled={saving}
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
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
                disabled={saving}
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
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
                disabled={saving}
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Customer Support
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center">
                <FiHeadphones className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="text"
                value={contactData.customer_support}
                onChange={(e) => updateField('customer_support', e.target.value)}
                disabled={saving}
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
                placeholder="e.g., 24/7 Customer Support"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Map Location */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Map Location
            </h3>
            <button
              onClick={() => setShowMapHelp(!showMapHelp)}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-xs"
            >
              <FiHelpCircle /> How to get map URL?
            </button>
          </div>

          {/* Map Help Section */}
          {showMapHelp && (
            <div className={`p-4 rounded-lg border mb-4 ${
              isDarkMode ? 'border-blue-700 bg-blue-900/20' : 'border-blue-200 bg-blue-50'
            }`}>
              <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                How to get Google Maps URL:
              </h4>
              <ol className={`text-xs space-y-2 list-decimal list-inside ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li>Go to <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Maps</a></li>
                <li>Search for your location (e.g., "Empire State Building")</li>
                <li>Copy the URL from your browser's address bar</li>
                <li>Paste it in the field below</li>
              </ol>
              <p className={`text-xs mt-2 p-2 rounded ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <strong>Example:</strong><br />
                https://www.google.com/maps/place/Empire+State+Building/@40.748817,-73.985428,17z
              </p>
              <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <strong>Note:</strong> Aap simple search URL ya embed URL dono use kar sakte hain. System automatically handle karega.
              </p>
            </div>
          )}

          {/* Map Location Input */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Map Location URL
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center">
                <FiMapPin className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="text"
                value={contactData.map_location}
                onChange={(e) => updateField('map_location', e.target.value)}
                disabled={saving}
                placeholder="https://maps.google.com/?q=..."
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
            {contactData.map_location && (
              <p className={`text-xs mt-1 ${
                isValidMapUrl(contactData.map_location) 
                  ? isDarkMode ? 'text-green-400' : 'text-green-600'
                  : isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>
                {isValidMapUrl(contactData.map_location) 
                  ? '✓ Valid map URL' 
                  : '⚠️ This may not be a valid map URL'}
              </p>
            )}
          </div>

          {/* Map Preview */}
          {contactData.map_location && (
            <div className="mt-4">
              <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Map Preview
              </h4>
              <div className={`rounded-lg overflow-hidden border h-[200px] ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <iframe
                  src={contactData.map_location.includes('embed') 
                    ? contactData.map_location 
                    : `https://www.openstreetmap.org/export/embed.html?bbox=-74.0113%2C40.7059%2C-74.0113%2C40.7059&layer=mapnik&marker=40.7059%2C-74.0113`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Map Preview"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {/* Preview Card */}
          <div className={`mt-6 p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Info Preview
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FiMapPin className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {contactData.address || "No address set"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {contactData.phone || "No phone set"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {contactData.email || "No email set"}
                </span>
              </div>
              {contactData.customer_support && (
                <div className="flex items-center gap-2">
                  <FiHeadphones className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {contactData.customer_support}
                  </span>
                </div>
              )}
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
            Record ID: <strong>{contactData.id || 'N/A'}</strong>
          </span>
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