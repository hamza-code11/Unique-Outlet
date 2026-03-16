import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FiEye, FiEyeOff, FiHeart,
  FiMapPin, FiPhone, FiMail, FiSend,
  FiSave, FiClock, FiWifiOff
} from "react-icons/fi";
import axios from "axios";
import { API_URL, STORAGE_URL } from "../../../config";

// Cache for footer data
let footerDataCache = null;
let footerCacheTime = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Default data when nothing in DB
const DEFAULT_FOOTER_DATA = {
  brand_name: "Wapo",
  description: "Reinventing the way of creating websites, we aim to create the most masterpiece WordPress theme available on the market.",
  location: "202 Helga Springs Rd, Crawford, TN 38554",
  contact: "800.275.8777",
  gmail: "alex@company.com",
  newsletter_desc: "Sign up with your email address to receive news and updates.",
  active: true
};

const FooterCMS = ({ isDarkMode, isVisible }) => {
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
      
      const response = await axios.get(`${API_URL}/footer-setting`, {
        timeout: 8000,
        signal: abortControllerRef.current.signal,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Accept': 'application/json'
        }
      });
      
      console.log("API Response:", response.data);
      
      if (response.data) {
        // Directly use the response data since backend returns the object
        const data = response.data;
        
        // Update cache
        footerDataCache = data;
        footerCacheTime = Date.now();
        setFooterData(data);
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

  // Update field
  const updateField = useCallback((field, value) => {
    setFooterData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const toggleActive = useCallback(() => {
    setFooterData(prev => ({ ...prev, active: !prev.active }));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setConnectionError(false);

    try {
      // Prepare data for backend
      const dataToSave = {
        brand_name: footerData.brand_name || "",
        description: footerData.description || "",
        location: footerData.location || "",
        contact: footerData.contact || "",
        gmail: footerData.gmail || "",
        newsletter_desc: footerData.newsletter_desc || "",
        active: footerData.active || false
      };

      console.log("Saving data:", dataToSave);

      const response = await axios.post(
        `${API_URL}/footer-setting`,
        dataToSave,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 8000
        }
      );

      console.log("Save response:", response.data);
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
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
            >
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

      {/* Content Area */}
      <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="space-y-4">
          {/* Brand Name */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Brand Name
            </label>
            <input
              type="text"
              value={footerData.brand_name || ""}
              onChange={(e) => updateField('brand_name', e.target.value)}
              placeholder="Enter brand name"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Brand Description
            </label>
            <textarea
              value={footerData.description || ""}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Enter brand description"
              rows="3"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm resize-none ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Location */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Location / Address
            </label>
            <div className="flex gap-2">
              <FiMapPin className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <input
                type="text"
                value={footerData.location || ""}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Enter address"
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Contact (Phone) */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Phone Number
            </label>
            <div className="flex gap-2">
              <FiPhone className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <input
                type="text"
                value={footerData.contact || ""}
                onChange={(e) => updateField('contact', e.target.value)}
                placeholder="Enter phone number"
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Gmail */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className="flex gap-2">
              <FiMail className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <input
                type="email"
                value={footerData.gmail || ""}
                onChange={(e) => updateField('gmail', e.target.value)}
                placeholder="Enter email address"
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Newsletter Description */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Newsletter Description
            </label>
            <div className="flex gap-2">
              <FiSend className={`mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <textarea
                value={footerData.newsletter_desc || ""}
                onChange={(e) => updateField('newsletter_desc', e.target.value)}
                placeholder="Enter newsletter description"
                rows="2"
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm resize-none ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
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
            Status: <strong className={footerData.active ? 'text-green-500' : 'text-red-500'}>
              {footerData.active ? 'Active' : 'Inactive'}
            </strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FiHeart className="inline mr-1 text-blue-500" />
            {footerData.brand_name || "Wapo"}
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