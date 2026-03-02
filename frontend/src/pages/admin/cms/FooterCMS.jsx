import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { 
  FiEye, FiEyeOff, FiUpload, FiHeart,
  FiMapPin, FiPhone, FiMail, FiSend,
  FiTwitter, FiFacebook, FiInstagram, FiYoutube,
  FiSave, FiClock, FiWifi, FiWifiOff
} from "react-icons/fi";
import axios from "axios";

// Cache for footer data
let footerDataCache = null;
let footerCacheTime = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Default data when nothing in DB
const DEFAULT_FOOTER_DATA = {
  brand: {
    name: "",
    description: "",
    madeWithText: "",
    logo: null,
    logoPreview: null
  },
  contact: {
    title: "",
    address: "",
    phone: "",
    email: "",
    addressLine2: "",
    showIconBackground: true
  },
  newsletter: {
    title: "",
    description: "",
    placeholder: "",
    buttonText: "",
    trustText: "",
    showTrustBadge: true
  },
  socialLinks: [
    { id: 1, platform: "facebook", url: "", active: true },
    { id: 2, platform: "twitter", url: "", active: true },
    { id: 3, platform: "instagram", url: "", active: true },
    { id: 4, platform: "youtube", url: "", active: true }
  ],
  wavesImage: null,
  wavesPreview: null,
  active: true
};

const FooterCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("brand");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const fetchRef = useRef(false);
  const abortControllerRef = useRef(null);

  // Footer Data
  const [footerData, setFooterData] = useState(() => {
    // Try to load from cache first
    if (footerDataCache && footerCacheTime && (Date.now() - footerCacheTime < CACHE_DURATION)) {
      return footerDataCache;
    }
    return DEFAULT_FOOTER_DATA;
  });

  // Fetch existing footer data on mount
  useEffect(() => {
    if (fetchRef.current) return;
    fetchFooterData();
    
    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [retryCount]);

  const fetchFooterData = useCallback(async () => {
    // Check cache first
    if (footerDataCache && footerCacheTime && (Date.now() - footerCacheTime < CACHE_DURATION)) {
      setFooterData(footerDataCache);
      setLoading(false);
      setConnectionError(false);
      return;
    }

    // Cancel previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setConnectionError(false);
      fetchRef.current = true;
      
      const response = await axios.get("http://127.0.0.1:8000/api/footer-setting", {
        timeout: 8000,
        signal: abortControllerRef.current.signal,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Accept': 'application/json'
        }
      });
      
      if (response.data && response.data.data) {
        // Parse the JSON data from backend
        const savedData = typeof response.data.data === 'string' 
          ? JSON.parse(response.data.data) 
          : response.data.data;
        
        // Merge with defaults to ensure all fields exist
        const newData = {
          ...DEFAULT_FOOTER_DATA,
          ...savedData,
          brand: { ...DEFAULT_FOOTER_DATA.brand, ...savedData.brand },
          contact: { ...DEFAULT_FOOTER_DATA.contact, ...savedData.contact },
          newsletter: { ...DEFAULT_FOOTER_DATA.newsletter, ...savedData.newsletter },
          socialLinks: savedData.socialLinks || DEFAULT_FOOTER_DATA.socialLinks,
          wavesPreview: savedData.wavesImage ? `http://127.0.0.1:8000/${savedData.wavesImage}` : null
        };
        
        // Update cache
        footerDataCache = newData;
        footerCacheTime = Date.now();
        setFooterData(newData);
        setConnectionError(false);
      } else {
        // No data in DB, use defaults
        setFooterData(DEFAULT_FOOTER_DATA);
      }
    } catch (error) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        console.log("Request cancelled");
        return;
      }
      
      console.error("Error fetching footer data:", error);
      setConnectionError(true);
      
      // If network error, use defaults
      setFooterData(DEFAULT_FOOTER_DATA);
      
    } finally {
      setLoading(false);
      fetchRef.current = false;
    }
  }, []);

  // Retry connection
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  // Memoized update functions
  const updateField = useCallback((section, field, value) => {
    setFooterData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  }, []);

  const updateSocialLink = useCallback((id, field, value) => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: (prev.socialLinks || []).map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  }, []);

  const toggleSocialActive = useCallback((id) => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: (prev.socialLinks || []).map(link =>
        link.id === id ? { ...link, active: !link.active } : link
      )
    }));
  }, []);

  const toggleActive = useCallback(() => {
    setFooterData(prev => ({ ...prev, active: !prev.active }));
  }, []);

  const handleWavesUpload = useCallback((file) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setFooterData(prev => ({
          ...prev,
          wavesImage: reader.result,
          wavesPreview: reader.result
        }));
        setUploading(false);
      }, 500);
    };
    reader.readAsDataURL(file);
  }, []);

  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setConnectionError(false);

    try {
      // Prepare data for backend - remove preview before saving
      const dataToSave = {
        brand: footerData.brand || {},
        contact: footerData.contact || {},
        newsletter: footerData.newsletter || {},
        socialLinks: footerData.socialLinks || [],
        wavesImage: footerData.wavesImage,
        active: footerData.active
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/footer-setting",
        { data: JSON.stringify(dataToSave) },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 8000
        }
      );

      alert("Footer settings saved successfully!");
      
      // Update cache after successful save
      footerDataCache = footerData;
      footerCacheTime = Date.now();

    } catch (error) {
      console.error("Error saving footer:", error);
      setConnectionError(true);
      alert("Failed to save footer. Please check if backend server is running.");
    } finally {
      setSaving(false);
    }
  }, [footerData]);

  const getSocialIcon = useCallback((platform) => {
    switch(platform) {
      case 'facebook': return <FiFacebook />;
      case 'twitter': return <FiTwitter />;
      case 'instagram': return <FiInstagram />;
      case 'youtube': return <FiYoutube />;
      default: return <FiTwitter />;
    }
  }, []);

  // Memoized active social count
  const activeSocialCount = useMemo(() => {
    return (footerData.socialLinks || []).filter(l => l?.active).length;
  }, [footerData.socialLinks]);

  // Cancel handler
  const handleCancel = useCallback(() => {
    if (window.confirm("Discard unsaved changes?")) {
      window.location.reload();
    }
  }, []);

  // Show connection error UI
  if (connectionError && !loading) {
    return (
      <div className="space-y-6">
        <div className={`p-8 rounded-lg border text-center ${
          isDarkMode ? 'border-red-800 bg-red-900/20' : 'border-red-200 bg-red-50'
        }`}>
          <FiWifiOff className={`text-4xl mx-auto mb-3 ${
            isDarkMode ? 'text-red-400' : 'text-red-500'
          }`} />
          <h3 className={`text-lg font-semibold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Cannot Connect to Server
          </h3>
          <p className={`text-sm mb-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Unable to reach backend server at http://127.0.0.1:8000
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <FiWifi />
              Retry Connection
            </button>
            <button
              onClick={() => setConnectionError(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Use Offline Mode
            </button>
          </div>
          <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Offline mode will use default values. Changes won't be saved until connection is restored.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hidden file input for waves bg */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleWavesUpload(e.target.files[0]);
          }
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Footer Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage footer content and settings
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
              footerData.active 
                ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
            aria-label={footerData.active ? "Deactivate footer" : "Activate footer"}
          >
            {footerData.active ? <FiEye /> : <FiEyeOff />}
            <span className="text-sm">{footerData.active ? 'Active' : 'Inactive'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b flex flex-wrap gap-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {['brand', 'contact', 'newsletter', 'social'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 capitalize
              ${activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent hover:text-blue-500'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {/* Brand Tab */}
        {activeTab === "brand" && (
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Brand Name
              </label>
              <input
                type="text"
                value={footerData.brand?.name || ""}
                onChange={(e) => updateField('brand', 'name', e.target.value)}
                placeholder="Enter brand name"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Brand Description
              </label>
              <textarea
                value={footerData.brand?.description || ""}
                onChange={(e) => updateField('brand', 'description', e.target.value)}
                placeholder="Enter brand description"
                rows="3"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm resize-none ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Made With Text
              </label>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <FiHeart className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                </div>
                <input
                  type="text"
                  value={footerData.brand?.madeWithText || ""}
                  onChange={(e) => updateField('brand', 'madeWithText', e.target.value)}
                  placeholder="e.g., Made with passion"
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Section Title
              </label>
              <input
                type="text"
                value={footerData.contact?.title || ""}
                onChange={(e) => updateField('contact', 'title', e.target.value)}
                placeholder="Contact Us"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Address
              </label>
              <div className="flex gap-2">
                <FiMapPin className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <input
                  type="text"
                  value={footerData.contact?.address || ""}
                  onChange={(e) => updateField('contact', 'address', e.target.value)}
                  placeholder="Enter address"
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone
              </label>
              <div className="flex gap-2">
                <FiPhone className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <input
                  type="text"
                  value={footerData.contact?.phone || ""}
                  onChange={(e) => updateField('contact', 'phone', e.target.value)}
                  placeholder="Enter phone number"
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="flex gap-2">
                <FiMail className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <input
                  type="email"
                  value={footerData.contact?.email || ""}
                  onChange={(e) => updateField('contact', 'email', e.target.value)}
                  placeholder="Enter email address"
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={footerData.contact?.showIconBackground ?? true}
                  onChange={(e) => updateField('contact', 'showIconBackground', e.target.checked)}
                />
                <div className={`w-11 h-6 rounded-full peer 
                  ${isDarkMode 
                    ? 'bg-gray-600 peer-checked:bg-blue-600' 
                    : 'bg-gray-200 peer-checked:bg-blue-600'
                  } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                </div>
              </label>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Show icon background
              </span>
            </div>
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === "newsletter" && (
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Section Title
              </label>
              <input
                type="text"
                value={footerData.newsletter?.title || ""}
                onChange={(e) => updateField('newsletter', 'title', e.target.value)}
                placeholder="Newsletter"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                value={footerData.newsletter?.description || ""}
                onChange={(e) => updateField('newsletter', 'description', e.target.value)}
                placeholder="Enter newsletter description"
                rows="2"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm resize-none ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Input Placeholder
              </label>
              <input
                type="text"
                value={footerData.newsletter?.placeholder || ""}
                onChange={(e) => updateField('newsletter', 'placeholder', e.target.value)}
                placeholder="Your e-mail address"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Button Text
              </label>
              <div className="flex gap-2">
                <FiSend className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <input
                  type="text"
                  value={footerData.newsletter?.buttonText || ""}
                  onChange={(e) => updateField('newsletter', 'buttonText', e.target.value)}
                  placeholder="Subscribe"
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Trust Badge Text
              </label>
              <input
                type="text"
                value={footerData.newsletter?.trustText || ""}
                onChange={(e) => updateField('newsletter', 'trustText', e.target.value)}
                placeholder="No spam, unsubscribe anytime"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={footerData.newsletter?.showTrustBadge ?? true}
                  onChange={(e) => updateField('newsletter', 'showTrustBadge', e.target.checked)}
                />
                <div className={`w-11 h-6 rounded-full peer 
                  ${isDarkMode 
                    ? 'bg-gray-600 peer-checked:bg-blue-600' 
                    : 'bg-gray-200 peer-checked:bg-blue-600'
                  } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                </div>
              </label>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Show trust badge
              </span>
            </div>
          </div>
        )}

        {/* Social Links Tab */}
        {activeTab === "social" && (
          <div className="space-y-4">
            <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage social media links
            </p>
            {(footerData.socialLinks || []).map((link) => (
              <div key={link.id} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {getSocialIcon(link.platform)}
                </div>
                <select
                  value={link.platform}
                  onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                </select>
                <input
                  type="url"
                  value={link.url || ""}
                  onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                  placeholder="https://..."
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <button
                  onClick={() => toggleSocialActive(link.id)}
                  className={`p-2 rounded transition-colors ${
                    link.active
                      ? isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
                      : isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'
                  }`}
                  aria-label={link.active ? "Deactivate link" : "Activate link"}
                >
                  {link.active ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Status: <strong className={footerData.active ? 'text-green-500' : 'text-red-500'}>
              {footerData.active ? 'Active' : 'Inactive'}
            </strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Social Links: <strong>{activeSocialCount}</strong> active
          </span>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
        <button
          onClick={handleCancel}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50 hover:from-blue-700 hover:to-cyan-700 transition-all"
        >
          {saving ? <FiClock className="animate-spin" /> : <FiSave />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default FooterCMS;